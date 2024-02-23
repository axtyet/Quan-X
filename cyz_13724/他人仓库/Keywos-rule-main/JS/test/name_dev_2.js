// 66 测试别的api 入口阿里dns 落地v4.ident.me
const $ = $substore;
const { isLoon, isSurge, isQX } = $substore.env;
const target = isLoon ? "Loon" : isSurge ? "Surge" : isQX ? "QX" : undefined;
const timeout = $arguments["timeout"] ? $arguments["timeout"] : 1000;
const flag = $arguments["flag"];
const batch_size = $arguments["batch"] ? $arguments["batch"] : 16;
async function operatorss(proxies) {
  const support = (isLoon || isSurge);
  if (!support) {
    $.error(`Only supports Loon and Surge!`);
    return proxies;
  }
  const startTime = new Date(); // 获取当前时间作为开始时间
  const prs = proxies.length //初始节点数
  // console.log("初始节点数 = " + proxies.length);
  let i = 0;
  while (i < proxies.length) {
    const batch = proxies.slice(i, i + batch_size);
    await Promise.allSettled(
      batch.map(async (proxy) => {
        try {
          // 查询入口IP信息
          const in_info = await queryDNSInfo(proxy.server);
          // console.log(proxy.server + "in节点ip = " + JSON.stringify(in_info));
         
          // 查询出口IP信息
          const out_info = await queryIpApi(proxy);
          //   console.log(proxy.server + "out节点信息 = " + JSON.stringify(out_info));

          // proxy.name = out_info.country;

        //    const type = in_info === out_info.ip ? out_info.cc : "CN";
        //   proxy.name = getFlagEmoji(out_info.cc) + " " + type + "→" + out_info.cc;
            
          proxy.name = flag ? getFlagEmoji(out_info.cc) + " " + (in_info === out_info.ip ? out_info.cc : "CN") + "→" + out_info.country : out_info.country;

          // 新增一个去重用字段，该字段不显示在节点名字不需要修改 ,只用于去重, 重复那就是重复节点：入口IP|出口IP
          proxy.qc = in_info + "|" + out_info.ip;
          // proxy.px = out_info.cc;
        } catch (err) { console.log(`err = ${err}`); } }) ); i += batch_size;
  }
  // console.log("💰💕去重前的节点信息 = " + JSON.stringify(proxies));
  // 去除重复的节点
  proxies = removeDuplicateName(proxies);
  // console.log("去重后的节点信息 = " + JSON.stringify(proxies));
  // 加序号
  const processedProxies = processProxies(proxies);
  // console.log("排序后的节点信息 = " + JSON.stringify(proxies));
  // 去除去重时添加的qc属性: ip 与 dns解析ip
  proxies = removeqcName(proxies);
  // console.log("去qc后的节点信息 = " + JSON.stringify(proxies));
  console.log(`初始节点数 = `+ prs); 
  console.log(`去重后个数 = ${proxies.length}`); 
  const endTime = new Date(); // 获取当前时间作为结束时间
  const timeDiff = endTime.getTime() - startTime.getTime(); // 获取时间差（以毫秒为单位）
  console.log(`方法总耗时 = ${timeDiff / 1000} 秒`); // 将时间差转换为秒并打印到控制台上
  return proxies;
}
async function queryDNSInfo(server) {
  // 如果是ip直接返回
  const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(server);
  if (isIP) {
    console.log("此节点入口为IP不查DNS")
    return server;}
  return new Promise((resolve, reject) => {
    const url = `http://223.5.5.5/resolve?name=${server}&type=A&short=1`;
    $.http
      .get({ url })
      .then((resp) => {
        const body = JSON.parse(resp.body);
        if (body.length > 0) {
          resolve(body[0]);
        }
      })
      .catch((err) => {
        console.log("dns = " + err);
        reject(err);
      });
  });
}

// 查询落地ip
async function queryIpApi(proxy) {
  return new Promise((resolve, reject) => {
    const url = `http://v4.ident.me/json`;
    let node = ProxyUtils.produce([proxy], target);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("请求超时,丢弃节点"));
      }, timeout);
    });
    const queryPromise = $.http.get({ url, node: node, "policy-descriptor": node, }) .then((resp) => {
        const data = JSON.parse(resp.body);
        if (data.tz) {
          resolve(data);
        } else {
          reject(new Error(data.message));
        }
      })
      .catch((err) => {
        console.log("api = " + err);
        reject(err);
      });
    // 超时处理
    Promise.race([timeoutPromise, queryPromise]).catch((err) => {
      reject(err);
    });
  });
}

function removeDuplicateName(arr){const nameSet=new Set;const result=[];for(const e of arr){if(e.qc&&!nameSet.has(e.qc)){nameSet.add(e.qc);result.push(e)}}return result}
function removeqcName(arr){const nameSet=new Set;const result=[];for(const e of arr){if(!nameSet.has(e.qc)){nameSet.add(e.qc);const modifiedE={...e};delete modifiedE.qc;result.push(modifiedE)}}return result}
function processProxies(proxies) {const groupedProxies = proxies.reduce((groups, item) => {const existingGroup = groups.find(group => group.name === item.name);if (existingGroup) {existingGroup.count++;existingGroup.items.push({ ...item, name: `${item.name} ${existingGroup.count.toString().padStart(2, '0')}` });} else {groups.push({ name: item.name, count: 1, items: [{ ...item, name: `${item.name} 01` }] });}return groups;}, []);const sortedProxies = groupedProxies.flatMap(group =>group.items);proxies.splice(0,proxies.length, ...sortedProxies);return proxies;}
function getFlagEmoji(cc){const codePoints=cc.toUpperCase().split("").map((char=>127397+char.charCodeAt()));return String.fromCodePoint(...codePoints).replace(/🇹🇼/g,"🇨🇳")}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
