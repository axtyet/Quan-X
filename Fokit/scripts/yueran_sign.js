/**
 * 脚本名称：悦然荟
 * 活动规则：每日签到可获得积分
 * 更新时间：2024-02-22
 * 环境变量：YUERANHUI_BID、YUERANHUI_APPID、YUERANHUI_VERSION、CODESERVER_ADDRESS、CODESERVER_FUN
 * BoxJs订阅：https://raw.githubusercontent.com/FoKit/Scripts/main/boxjs/fokit.boxjs.json
 * 感谢 @yuheng @Sliverkiss 提供帮助

------------------ Surge 配置 -----------------

[MITM]
hostname = wox2019.woxshare.com

[Script]
$悦然荟$ = type=http-request,pattern=^https?:\/\/wox2019\.woxshare\.com\/clientApi\/userCenterDetail,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js

悦然荟 = type=cron,cronexp=17 7 * * *,timeout=60,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js,script-update-interval=0

------------------ Loon 配置 ------------------

[MITM]
hostname = wox2019.woxshare.com

[Script]
http-request ^https?:\/\/wox2019\.woxshare\.com\/clientApi\/userCenterDetail tag=$悦然荟$, script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js,requires-body=0

cron "17 7 * * *" script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js,tag = 悦然荟,enable=true

-------------- Quantumult X 配置 --------------

[MITM]
hostname = wox2019.woxshare.com

[rewrite_local]
^https?:\/\/wox2019\.woxshare\.com\/clientApi\/userCenterDetail url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js

[task_local]
17 7 * * * https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js, tag=悦然荟, enabled=true

------------------ Stash 配置 -----------------

cron:
  script:
    - name: 悦然荟
      cron: '17 7 * * *'
      timeout: 10

http:
  mitm:
    - "wox2019.woxshare.com"
  script:
    - match: ^https?:\/\/wox2019\.woxshare\.com\/clientApi\/userCenterDetail
      name: 悦然荟
      type: request
      require-body: false

script-providers:
  悦然荟:
    url: https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/yueran_sign.js
    interval: 86400

 */

const $ = new Env('悦然荟');
$.is_debug = ($.isNode() ? process.env['IS_DEDUG'] : $.getdata('is_debug')) || 'false';  // 调试模式
$.bid = ($.isNode() ? process.env['YUERANHUI_BID'] : $.getdata('@yueranhui.bid')) || 'bhgff';  // bid
$.appid = ($.isNode() ? process.env['YUERANHUI_APPID'] : $.getdata('@yueranhui.appid')) || 'wx8f3e8a4b8e0ebe84';  // 小程序 appId
$.version = ($.isNode() ? process.env['YUERANHUI_VERSION'] : $.getdata('@yueranhui.version')) || '4.10.71';  // 小程序版本
$.messages = [];

if (isGetUserInfo = typeof $request !== `undefined`) {
  // 获取小程序数据
  getMiniProgramInfo();
  $.done();
} else {
  !(async () => {
    // 获取微信 Code
    await getWxCode();

    for (let i = 0; i < $.codeList.length; i++) {
      // 初始化
      $.body = {
        appId: $.appid,
        js_code: $.codeList[i],
        token: '',
        version: $.version,
        bid: $.bid,
      };

      // 获取 Token
      await getToken();

      if ($.body['token']) {
        // 查询信息
        await userCenter();

        // 每日签到
        await sign();
      }
    }
  })()
    .catch((e) => $.messages.push(e.message || e) && console.log(e))  // 捕获登录函数等抛出的异常, 并把原因添加到全局变量(通知)
    .finally(async () => {
      await sendMsg($.messages.join('\n'));  // 推送通知
      $.done();
    })
}

// 获取小程序数据
function getMiniProgramInfo() {
  if ($request.url.indexOf("userCenterDetail") > -1) {
    debug($request.headers);
    debug($request.body);
    // 将 headers 的所有 key 转换为小写以兼容各个代理 App
    const headers = ObjectKeys2LowerCase($request.headers);
    // 从 referer 提取小程序 appid
    headers['referer'] = headers['referer'].match(/https:\/\/servicewechat\.com\/([a-zA-Z0-9]+)/)[1];
    // 把获取到的数据写入代理缓存
    $.setdata(headers['bid'], '@yueranhui.bid');
    $.setdata(headers['version'], '@yueranhui.version');
    $.setdata(headers['referer'], '@yueranhui.appid');
    $.msg($.name, ``, `🎉 悦然里小程序数据获取成功。`);
  }
}

// 每日签到
async function sign() {
  // 计算 mkey
  $.body['mkeyUrl'] = '/clientApi/signInRecordAdd';
  $.body['mkey'] = hash(generateQueryString($.body));

  // 构造请求
  let opt = {
    url: `https://wox2019.woxshare.com/clientApi/signInRecordAdd`,
    headers: { 'content-type': `application/json` },
    body: JSON.stringify($.body)
  }

  // 发起请求
  const result = await Request(opt);
  if (result?.errCode == 0 || result?.errCode == 60101) {
    let text = result?.detail?.signDays ? `签到成功: 连续签到 ${result?.detail?.signDays} 天, 获得 ${result?.detail?.integral} 积分` : `签到失败: ${result?.errMsg}`;
    $.messages.push(text) && $.log(text);
  } else {
    console.log(`❌ 签到失败: ${$.toStr(result)}`);
  }
}

// 查询信息
async function userCenter() {
  // 计算 mkey
  $.body['mkeyUrl'] = '/clientApi/userCenterDetail';
  console.log($.body)
  $.body['mkey'] = hash(generateQueryString($.body));
  console.log($.body)

  // 构造请求
  let opt = {
    url: `https://wox2019.woxshare.com/clientApi/userCenterDetail`,
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify($.body)
  }
  // 发起请求
  const result = await Request(opt);
  if (result.errCode == 0) {
    const { nickName, cardLevelName, integral } = result?.detail?.userInfoDetail;
    let text = `会员: ${nickName}  等级: ${cardLevelName}  积分: ${integral}`;
    $.messages.push(text) && $.log(text);
  } else {
    console.log(`❌ 个人信息查询失败: ${$.toStr(result)}`);
  }
}

// 获取 Token
async function getToken() {
  try {
    // 计算 mkey
    $.body['mkeyUrl'] = '/publicApi/weiXinAuthorizationUserSession';
    $.body['mkey'] = hash(generateQueryString($.body));

    // 构造请求
    const options = {
      url: `https://wox2019.woxshare.com/publicApi/weiXinAuthorizationUserSession`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify($.body)
    };

    // 清除 appId 和 js_code
    delete $.body['appId']
    delete $.body['js_code']

    // 发起请求
    const result = await Request(options);
    if (result?.detail?.token) {
      $.body['token'] = result?.detail?.token;
      $.log(`✅ 成功获取 Token: ${$.body['token']}`);
    } else {
      $.log(`❌ 获取 Token 失败: ${$.toStr(result)}`);
    }
  } catch (e) {
    console.error(e);
  }
}

// 获取微信 Code
async function getWxCode() {
  try {
    $.codeServer = ($.isNode() ? process.env["CODESERVER_ADDRESS"] : $.getdata("@codeServer.address")) || '';
    $.codeFuc = ($.isNode() ? process.env["CODESERVER_FUN"] : $.getdata("@codeServer.fun")) || '';
    !$.codeServer && (await sendMsg(`❌ 未配置微信 Code Server，结束运行。`), $.done());

    $.codeList = ($.codeFuc
      ? (eval($.codeFuc), await WxCode($.appid))
      : (await Request(`${$.codeServer}/?wxappid=${$.appid}`))?.split("|"))
      .filter(item => item.length === 32);
    debug($.codeList, "getWxCode()");
  } catch (e) {
    console.error(`❌ 获取微信 Code 失败！`);
  }
}

/**
 * 请求函数二次封装
 * @param {object | string} options - 构造请求内容，可传入对象或 Url *
 * @param {string} method - 请求方式 get / post 等，默认自动判断
 * @param {boolean} onlyBody 仅返回 body 内容，默认为 true
 * @returns {object | string} 自动根据内容返回 JSON 对象或字符串
 */
async function Request(options, method, onlyBody = true) {
  options = typeof options === 'string' ? { url: options } : options;
  typeof method === 'undefined' ? ('body' in options ? (method = 'post') : (method = 'get')) : (method = method);
  const timeout = options?.timeout ? options.timeout : 15e3;
  const http = [
    new Promise((_, e) => setTimeout(() => e('当前请求已超时'), timeout)),
    new Promise((resolve, reject) => {
      debug(options, '[Request]');
      $.http[method.toLowerCase()](options)
        .then((response) => {
          debug(response, '[Response]');
          let res = onlyBody ? response.body : response;
          res = $.toObj(res) || res;
          resolve(res);
        })
        .catch((err) => reject(err));
    })
  ];
  return await Promise.race(http).then((res) => res).catch((err) => err);
}

// 发送消息
async function sendMsg(message) {
  if (!message) return;
  message = message.replace(/\n+$/, '');  // 清除末尾换行
  try {
    if ($.isNode()) {
      try {
        var notify = require('./sendNotify');
      } catch (e) {
        var notify = require('./utils/sendNotify');
      }
      await notify.sendNotify($.name, message);
    } else {
      $.msg($.name, '', message);
    }
  } catch (e) {
    console.log(`\n\n----- ${$.name} -----\n${message}`);
  }
}

/**
* 对象属性转小写
* @param {object} obj - 传入 $request.headers
* @returns {object} 返回转换后的对象
*/
function ObjectKeys2LowerCase(obj) {
  const _lower = Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]))
  return new Proxy(_lower, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver)
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver)
    }
  })
}

/**
 * DEBUG
 * @param {*} content - 传入内容
 * @param {*} title - 标题
 */
function debug(content, title = "debug") {
  let start = `\n----- ${title} -----\n`;
  let end = `\n----- ${$.time('HH:mm:ss')} -----\n`;
  if ($.is_debug === 'true') {
    if (typeof content == "string") {
      console.log(start + content + end);
    } else if (typeof content == "object") {
      console.log(start + $.toStr(content) + end);
    }
  }
}

// mkey 计算
function hash(n) { var r, e, t = new Uint8Array(function (n) { var r, e, t, o = []; for (r = 0; r < n.length; r++)(e = n.charCodeAt(r)) < 128 ? o.push(e) : e < 2048 ? o.push(192 + (e >> 6 & 31), 128 + (63 & e)) : ((t = 55296 ^ e) >> 10 == 0 ? (e = (t << 10) + (56320 ^ n.charCodeAt(++r)) + 65536, o.push(240 + (e >> 18 & 7), 128 + (e >> 12 & 63))) : o.push(224 + (e >> 12 & 15)), o.push(128 + (e >> 6 & 63), 128 + (63 & e))); return o }(n)), o = 16 + (t.length + 8 >>> 6 << 4); for ((n = new Uint8Array(o << 2)).set(new Uint8Array(t.buffer)), n = new Uint32Array(n.buffer), e = new DataView(n.buffer), s = 0; s < o; s++)n[s] = e.getUint32(s << 2); n[t.length >> 2] |= 128 << 24 - 8 * (3 & t.length), n[o - 1] = t.length << 3; var i = [], u = [function () { return h[1] & h[2] | ~h[1] & h[3] }, function () { return h[1] ^ h[2] ^ h[3] }, function () { return h[1] & h[2] | h[1] & h[3] | h[2] & h[3] }, function () { return h[1] ^ h[2] ^ h[3] }], f = function (n, r) { return n << r | n >>> 32 - r }, a = [1518500249, 1859775393, -1894007588, -899497514], h = [1732584193, -271733879, null, null, -1009589776]; for (h[2] = ~h[0], h[3] = ~h[1], s = 0; s < n.length; s += 16) { var c = h.slice(0); for (r = 0; r < 80; r++)i[r] = r < 16 ? n[s + r] : f(i[r - 3] ^ i[r - 8] ^ i[r - 14] ^ i[r - 16], 1), e = f(h[0], 5) + u[r / 20 | 0]() + h[4] + i[r] + a[r / 20 | 0] | 0, h[1] = f(h[1], 30), h.pop(), h.unshift(e); for (r = 0; r < 5; r++)h[r] = h[r] + c[r] | 0 } e = new DataView(new Uint32Array(h).buffer); for (var s = 0; s < 5; s++)h[s] = e.getUint32(s << 2); return Array.prototype.map.call(new Uint8Array(new Uint32Array(h).buffer), function (n) { return (n < 16 ? "0" : "") + n.toString(16) }).join("") }
function generateQueryString(r) { var e = [], n = []; for (var t in delete r.mkey, r) e.push(t); e = e.sort(); for (var o = 0; o < e.length; o++) { var a = e[o]; r[a] = void 0 !== r[a] ? r[a] : "", n.push(a + "=" + r[a]) } return n.join("&") + "F6B5EF0CA4639B0D8ED172F749B15D69" }
// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }

