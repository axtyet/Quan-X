/* nolog

符号：🅳=电信 🅻=联通 🆈=移动 🆉=直连 🅶=垃圾
接口：入口查询[inte.net],落地查询[ip-api]；
功能：根据接口返回的真实结果，重新对节点命名，添加入口城市、落地国家或地区、国内运营商信息；
作者：@Key @奶茶姐
用法：Sub-Store脚本操作添加； 只支持 Surge Loon
日期：2023/05/01
例如：https://raw.githubusercontent.com/Keywos/rule/main/name.js#timeout=2000&name=测试&flag
----------------
name.js 以下是此脚本支持的参数，必须以 # 为开头多个参数使用"&"连接，参考上述地址为例使用参数。
[one]    清理只有一个节点的地区的01
[sim]    使用简写(第一个字),如: 广移, 而不是: 广东移动 ...
[flag]   添加旗帜、运营商符号和直连符号，默认无此参数；
[city]   添加入口城市名，默认不添加城市名，无 city 参数则只输出省份不输出城市；
[name= ]    添加机场名前缀
[batch= ]   每次检查多少节点，默认每次16个节点。
[timeout= ] 最大超时参数，超出允许范围则判定为无效节点，默认1000ms；

*/

const $ = $substore
const sim = $arguments["sim"];
const flag = $arguments["flag"];
const numone = $arguments["one"];
const citys = $arguments["city"];
const {isLoon, isSurge, isQX} = $substore.env;
const batch_size = $arguments["batch"] ? $arguments["batch"] : 16;
const keynames = $arguments.name ? decodeURI($arguments.name) : "";
const timeout = $arguments["timeout"] ? $arguments["timeout"] : 1000;
const target = isLoon ? "Loon" : isSurge ? "Surge" : isQX ? "QX" : undefined;
async function operatorss(proxies) {
const support = (isLoon || isSurge);
if (!support) { $.error(`No Loon or Surge`);
$notify("不支持此设备","本脚本仅支持 Loon or Surge",'')
return proxies; }
const startTime = new Date();
const prs = proxies.length //初始节点数
console.log(`初始节点: ` + prs + "个");
console.log("处理节点: 0%");
let i = 0;
let completed = 0;
let counter = 0;
while (i < proxies.length) {
const batch = proxies.slice(i, i + batch_size);
await Promise.allSettled( batch.map(async (proxy) => {
  try {
    completed++; counter++;
    if (counter % 4 === 0) {
      const progress = (completed / proxies.length) * 98;
      // console.log(`数量:${completed}/${proxies.length} `);
      console.log(`处理进度: ${progress.toFixed(0)}%`);
    }
      // console.log("..");
      const in_info = await queryDNSInfo(proxy.server, dnsCache);
      // console.log(proxy.server + "in节点ip = " + JSON.stringify(in_info));
      const out_info = await queryIpApi(proxy);
      //入口 省 or 市
      const incity = citys
      ? (in_info.data[2] || in_info.data[1] || in_info.data[0]).slice(0, 2)
      : (in_info.data[1] || in_info.data[0]).slice(0, 2);

    if (flag) { 
        // emoji
        const kkEmoji = { '电信': '🅳', '联通': '🅻', '移动': '🆈', '移通': '🆈'};
        const operator = in_info.data[in_info.data.length - 1];
        const dly = kkEmoji[operator] || '🅶';
        if (in_info.ip === out_info.query) { 
          proxy.name = "🆉直连" + "→" + getFlagEmoji(out_info.countryCode) + out_info.country;
        } else {
          proxy.name = dly + incity + "→" + getFlagEmoji(out_info.countryCode) + out_info.country;
        }
    } else if (sim) {
        // simple
        if (in_info.ip === out_info.query) {
            proxy.name = "直连" + "→" + out_info.country;
        } else {                
            // proxy.name = incity.slice(0, 1) + (in_info.data[in_info.data.length - 1].length === 2 ? in_info.data[in_info.data.length - 1].slice(0 ,1) : "中转") + "→" + out_info.country; // 两个字运营商
            proxy.name = incity.slice(0, 1) + in_info.data[in_info.data.length - 1].slice(0 ,1) + "→" + out_info.country; // 电信ADSL  api 数据库 不行 乱来
        }
    } else {
        // no emoji
        if (in_info.ip === out_info.query) {
            proxy.name = "直连" + "→" + out_info.country;
        } else {                
            // proxy.name = incity + (in_info.data[in_info.data.length - 1].length === 2 ? in_info.data[in_info.data.length - 1] : "中转") + "→" + out_info.country;
            proxy.name = incity + in_info.data[in_info.data.length - 1] + "→" + out_info.country;
        // console.log(proxy.name)
      }
    }
  // proxy.name = out_info.country; //只有国家
  // 去重字段不显示在节点名,判断方法：入口IP 与 出口IP
proxy.qc = in_info.ip + "|" + out_info.query;
// console.log(proxy.qc)
} catch (err) {
// console.log(`err = ${err}`);
}}));i += batch_size;
}
  proxies = removeDuplicateName(proxies);
  // 去除去重时添加的qc属性
  proxies = removeqcName(proxies);
  // 按节点全名分组加序号
  proxies = processProxies(proxies);
  if (keynames !== "") { proxies.forEach(proxy => { 
  proxy.name = keynames + ' ' + proxy.name;});}
  // console.log("节点信息 = " + JSON.stringify(proxies));
  // 清理相同地区节点的01
  numone && (proxies = oneProxies(proxies));
  // log or push
  const prso = proxies.length
  console.log("处理进度: 100%");
  console.log(`去复用后: ` + prso + "个");
  const endTime = new Date();
  const timeDiff = endTime.getTime() - startTime.getTime();
  console.log(`方法耗时: ${timeDiff / 1000} 秒`);
  const tzs = (prso == prs) ? "无复用节点，" : "去除无效节点后剩" + prso + "个，";
  $notification.post( prs + "个节点处理已完成",'', tzs + "耗时" + timeDiff / 1000 + "秒" )
  
  return proxies;}
// 入口ip解析，添加对象来缓存已经查询过的 DNS 信息
const dnsCache = {};
async function queryDNSInfo(server) {
  // 先从缓存中查找是否已经查询过该 DNS 信息
  if (dnsCache[server]) { return dnsCache[server]; }
  return new Promise((resolve,reject) => {
    const ips = server;
    const url = `http://www.inte.net/tool/ip/api.ashx?ip=${server}&datatype=json`;
    $.http.get({ url }).then((resp) => {
        const dnsInfo = JSON.parse(resp.body);
        // 将查询到的 DNS 信息缓存起来，以便下次直接使用
        dnsCache[server] = dnsInfo;
        if (dnsInfo.ip !== "0.0.0.0") {
          resolve(dnsInfo);
        } else {resolve(ips);}
      }).catch((err) => {reject(err);});
  });
}
// 查询落地ip，定义代理缓存对象
const proxyCache = {};
async function queryIpApi(proxy) {
  // 检查是否已经有该代理的缓存信息
  const cacheKey = `${proxy.server}:${proxy.port}`;
  if (proxyCache[cacheKey]) {return proxyCache[cacheKey];}
  return new Promise((resolve, reject) => {
    const url = `http://ip-api.com/json?lang=zh-CN&fields=status,message,country,countryCode,city,query`;
    let node = ProxyUtils.produce([proxy], target);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {reject();}, timeout);});
    const queryPromise = $.http.get({ url,
      node: node, // Loon or Surge IOS 
      "policy-descriptor": node, // Surge MAC
    }).then((resp) => {
      const data = JSON.parse(resp.body);
      if (data.status === "success") {
        // 将查询到的代理信息缓存起来
        proxyCache[cacheKey] = data;
        resolve(data);
      } else {reject();}
    }).catch((err) => {reject(err);});
    // 超时处理
    Promise.race([timeoutPromise, queryPromise]).catch((err) => {reject(err);});
  });
}
function removeDuplicateName(arr){const nameSet=new Set;const result=[];for(const e of arr){if(e.qc&&!nameSet.has(e.qc)){nameSet.add(e.qc);result.push(e)}}return result}
function removeqcName(arr){const nameSet=new Set;const result=[];for(const e of arr){if(!nameSet.has(e.qc)){nameSet.add(e.qc);const modifiedE={...e};delete modifiedE.qc;result.push(modifiedE)}}return result}
function processProxies(proxies) {const groupedProxies = proxies.reduce((groups, item) => {const existingGroup = groups.find(group => group.name === item.name);if (existingGroup) {existingGroup.count++;existingGroup.items.push({ ...item, name: `${item.name} ${existingGroup.count.toString().padStart(2, '0')}` });} else {groups.push({ name: item.name, count: 1, items: [{ ...item, name: `${item.name} 01` }] });}return groups;}, []);const sortedProxies = groupedProxies.flatMap(group =>group.items);proxies.splice(0,proxies.length, ...sortedProxies);return proxies;}
function getFlagEmoji(cc){const codePoints=cc.toUpperCase().split("").map((char=>127397+char.charCodeAt()));return String.fromCodePoint(...codePoints).replace(/🇹🇼/g,"🇨🇳")}
function oneProxies(proxies){const groups = proxies.reduce((groups, proxy) => { const name = proxy.name.replace(/\s\d+$/, ''); if (!groups[name]) { groups[name] = []; } groups[name].push(proxy);
return groups; }, {});for(const name in groups) {if (groups[name].length === 1 && groups[name][0].name.endsWith(' 01')) {const proxy = groups[name][0];proxy.name = name;}};return proxies;}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
