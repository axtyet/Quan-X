// 根据ip去重, 需要查询ip-api, 所以速度可能慢点,根据节点数量需要数十秒以上,需耐心等待
// 增加超时机制,缩短去重时间
// 转自 @奶茶姐 https://raw.githubusercontent.com/fmz200/wool_scripts/main/scripts/server_rename_dev.js
// 脚本作用：在SubStore内对节点重命名为：旗帜|地区代码|地区名称|IP|序号，
// 使用方法：SubStore内选择"脚本操作"，然后填写上面的脚本地址
// 支持平台：目前只支持Loon，Surge

const RESOURCE_CACHE_KEY = '#sub-store-cached-resource';
const CACHE_EXPIRATION_TIME_MS = 10 * 60 * 1000;
const $ = $substore;
class ResourceCache {
  constructor(expires) {
    this.expires = expires;
    const cachedData = $.read(RESOURCE_CACHE_KEY);
    if (!cachedData) {
      this.resourceCache = {};
      this._persist();
    } else {
      this.resourceCache = JSON.parse(cachedData);
    }
    this._cleanup();
  }
  _cleanup() {
    // clear obsolete cached resource
    let clear = false;
    const now = new Date().getTime();
    Object.keys(this.resourceCache).forEach((id) => {
      const updated = this.resourceCache[id];
      if (!updated.time || now - updated.time > this.expires) {
        delete this.resourceCache[id];
        $.delete(`#${id}`);
        clear = true;
      }
    });
    if (clear) this._persist();
  }
  revokeAll() {
    this.resourceCache = {};
    this._persist();
  }
  _persist() {
 $.write(JSON.stringify(this.resourceCache), RESOURCE_CACHE_KEY);
  }
  get(id) {
    const updated = this.resourceCache[id] && this.resourceCache[id].time;
    if (updated && new Date().getTime() - updated <= this.expires) {
      return this.resourceCache[id].data;
    }
    return null;
  } 
  set(id, value) {
    this.resourceCache[id] = {time: new Date().getTime(), data: value}
    this._persist();
  }
}
const resourceCache = new ResourceCache(CACHE_EXPIRATION_TIME_MS);
// let nodes = [];
const DELIMITER = "|"; // 分隔符

const {isLoon, isSurge, isQX} = $substore.env;

let target; // 节点转换的目标类型
if (isLoon) {
  target = "Loon";
} else if (isSurge) {
  target = "Surge";
} else if (isQX) {
  target = "QX";
}

async function operator(proxies) {
  // console.log("✅💕初始节点个数 = " + proxies.length);
  let support = false;
  if (isLoon || isQX) {
    support = true;
  } else if (isSurge) {
    const build = $environment['surge-build'];
    if (build && parseInt(build) >= 2000) {
      support = true;
    }
  }
  if (!support) {
    $.error(`🚫IP Flag only supports Loon and Surge!`);
    return proxies;
  }
  const BATCH_SIZE = 10; // 每一次处理的节点个数
  let i = 0;
  while (i < proxies.length) {
    const batch = proxies.slice(i, i + BATCH_SIZE);
    await Promise.allSettled(batch.map(async proxy => {
      try {
       // remove flag 移除旗帜
        // let proxyName = removeFlag(proxy.name);
        // query ip-api
        const code_name = await queryIpApi(proxy);
        // 地区代码|地区名称|IP
        const countryCode = code_name.substring(0, code_name.indexOf(DELIMITER));
        // 节点重命名为：旗帜|地区代码|地区名称|IP|序号
        proxy.name = getFlagEmoji(countryCode) + DELIMITER + code_name;
      } catch (err) {
        console.log(`✅💕err=${err}`);
      }
    }));

    await sleep(250); //等待
    i += BATCH_SIZE;
  }
  // 去除重复的节点
  proxies = removeDuplicateName(proxies);
  // console.log(`✅💕去重后的节点个数 = ${proxies.length}`);
  // 再加个序号
  for (let j = 0; j < proxies.length; j++) {
    const index = (j + 1).toString().padStart(2, '0');
    proxies[j].name = proxies[j].name + DELIMITER + index;
  }
  return proxies;
}

// JS数组中去除重复元素
function removeDuplicatesItem(arr) {
  return Array.from(new Set(arr));
}

// 根据节点名字去除重复的节点
function removeDuplicateName(arr) {
  const nameSet = new Set();
  const result = [];
  for (const e of arr) {
    if (!nameSet.has(e.name) && e.name.endsWith("|QC")) {
      nameSet.add(e.name);
      e.name = e.name.substring(0, e.name.lastIndexOf(DELIMITER));
      result.push(e);
    }
  }
  return result;
}

function removeDuplicates(arr, fields) {
  const map = new Map();
  return arr.filter(item => {
    const key = fields.map(field => item[field]).join("-");
    if (map.has(key)) {
      return false;
    } else {
      map.set(key, true);
      return true;
    }
  });
}

const tasks = new Map();
async function queryIpApi(proxy) {
  // 如果节点的server和port一样就认为是重复的，这里就不会去重新请求而是直接返回
  const id = getId(proxy);
  if (tasks.has(id)) {
    return tasks.get(id);
  }

  const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:78.0) Gecko/20100101 Firefox/78.0";
  const headers = {
    "User-Agent": ua
  };

  const result = new Promise((resolve, reject) => {
    const cached = resourceCache.get(id);
    if (cached) {
      resolve(cached);
    }
    const url = `http://ip-api.com/json?lang=zh-CN`;
    let node = ProxyUtils.produce([proxy], target);

    // Loon 需要去掉节点名字
    if (isLoon) {
      const s = node.indexOf("=");
      node = node.substring(s + 1);
    }
    // nodes.push(node);

    // QX只要tag的名字，目前QX不支持
    const QXTag = node.substring(node.lastIndexOf("=") + 1);
    const opts = {
      policy: QXTag
    };

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("请求超时"));
      }, 400); // 超时 延迟 时间ms
    });

    const queryPromise = $.http.get({
      url,
      headers,
      opts: opts, // QX的写法
      node: node,
      "policy-descriptor": node
    }).then(resp => {
      const body = resp.body;
      const data = JSON.parse(body);
      if (data.status === "success") {
        // 地区代码|地区名称|IP ：SG|新加坡|13.215.162.99
        const nodeInfo = data.countryCode + DELIMITER + data.country + DELIMITER + data.query+ "|QC";
        resourceCache.set(id, nodeInfo);
        resolve(nodeInfo);
      } else {
        reject(new Error(data.message));
      }
    }).catch(err => {
      console.log("💕err =" + err);
      reject(err);
    });

    Promise.race([timeoutPromise, queryPromise])
      .catch(err => {
        reject(err);
      });
  });

  tasks.set(id, result);
  return result;
}

function getId(proxy) {
  return MD5(`IP-FLAG-${proxy.server}-${proxy.port}`);
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String
    .fromCodePoint(...codePoints)
    .replace(/🇹🇼/g, '🇨🇳');
}

function removeFlag(str) {
  return str
    .replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g, '')
    .trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
