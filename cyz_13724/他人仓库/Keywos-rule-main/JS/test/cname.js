/* cname - cache name 说明： https://github.com/Keywos/rule/blob/main/readme.md
 * Update: 2023.05.05 必须安装以下模块，关闭官方版本才能使用: 目前SubStore还未更新脚本持久化缓存超时
 * Surge: https://github.com/Keywos/rule/raw/main/module/Sub-Store.sgmodule
 * Loon: https://github.com/Keywos/rule/raw/main/loon/sub-store.plugin
 * 用法: SubStore ➟ 脚本操作: 作用: 节点去复用 与 批量重命名为真实 「入口 落地 」地区  @key @小一 @奶茶姐
 * 持久化缓存 查询到的节点信息，避免更新订阅超时: 默认48小时 感谢 @小一 修改 SubStore 源码 , 如果出现问题,可以删除缓存: 文件位置Loon持久化缓存读取:「CNAMEKEY」文件名, Surge: 脚本编辑器: 左下角设置, $persistentStore,「CNAMEKEY」
 * 接口：入口查询[inte.net],落地查询[ip-api]； 
 * 默认不加参节点名: "北京 美国 01" ，如果：「入口ip或国家」 或 「落地ip或国家」 一样则为 "直连 德国 01" 
 * 符号：🅳=电信 🅻=联通 🆈=移动 🆉=直连 🅶=其他
 * 参数: 第一个参数用# 后面的用& 连接
 * [name=] 节点前面加机场名
 * [one]  清理相同地区节点的01
 * [flag] 添加旗帜、运营商符号，例如: "🅳北京→🇺🇸美国 01"
 * [fg]   分隔符 例如: "上海 | 新加坡 01"
 * [jt]   箭头 例如: "上海→韩国 01"
 * [dd]   单独落地国家 例如: "香港 01"
 * [cd=]  有缓存后ping 没有缓存成功的 api超时时间, 设置小点比如 [cd=0] 的情况下可以直接读取缓存，几乎无需等待， 如果设置 [cd=600] 有Ping不通的或者上次没有缓存的节点的情况下最低等600+ms,,但是可以写入上次没有写入成功的缓存,,如果全部缓存了的情况,也很快毫秒级,但是可以写入上次没有写入成功的缓存
 * [timeout=] 第一次没有缓存的ping api超时时间 
 */
const $=$substore;const fg=$arguments["fg"];const dd=$arguments["dd"];const jt=$arguments["jt"];const flag=$arguments["flag"];const numone=$arguments["one"];const{isLoon:isLoon,isSurge:isSurge,isQX:isQX}=$substore.env;let timeout=$arguments["timeout"]?$arguments["timeout"]:1600;let with_cache=$arguments["cd"]?$arguments["cd"]:400;const keynames=$arguments.name?decodeURI($arguments.name):"";const target=isLoon?"Loon":isSurge?"Surge":isQX?"QX":undefined;let onen=false;function getid(e){return MD5(`DATAKEY-${e.server}-${e.port}`)}function getinid(e){return MD5(`INKEY-${e}`)}function getflag(e){const t=e.toUpperCase().split("").map((e=>127397+e.charCodeAt()));return String.fromCodePoint(...t).replace(/🇹🇼/g,"🇨🇳")}function removels(e){const t=new Set;const n=[];for(const o of e){if(o.qc&&!t.has(o.qc)){t.add(o.qc);n.push(o)}}return n}function removeqc(e){const t=new Set;const n=[];for(const o of e){if(!t.has(o.qc)){t.add(o.qc);const e={...o};delete e.qc;n.push(e)}}return n}function jxh(e){const t=e.reduce(((e,t)=>{const n=e.find((e=>e.name===t.name));if(n){n.count++;n.items.push({...t,name:`${t.name} ${n.count.toString().padStart(2,"0")}`})}else{e.push({name:t.name,count:1,items:[{...t,name:`${t.name} 01`}]})}return e}),[]);const n=t.flatMap((e=>e.items));e.splice(0,e.length,...n);return e}function oneProxies(e){const t=e.reduce(((e,t)=>{const n=t.name.replace(/\s\d+$/,"");if(!e[n]){e[n]=[]}e[n].push(t);return e}),{});for(const e in t){if(t[e].length===1&&t[e][0].name.endsWith(" 01")){const n=t[e][0];n.name=e}}return e}function mTIme(e){if(e<1e3){return`${Math.round(e)}毫秒`}else if(e<6e4){return`${Math.round(e/1e3)}秒`}}async function operatorss(e){const t=isLoon||isSurge;if(!t){$.error(`No Loon or Surge`);$notify("不支持此设备","本脚本仅支持 Loon or Surge","");console.log("不支持此设备, 本脚本仅支持 Loon or Surge");return e}if(typeof scriptResourceCache==="undefined"){console.log("\n不支持此 SubStore, 目前官方SubStore还未更新scriptResourceCache\n查看脚本说明安装对应版本\nhttps://github.com/Keywos/rule/raw/main/cname.js");if(target=="Surge"){$notification.post("Sub-Store未更新","","请点击或查看Log查看脚本说明安装对应版本",{url:"https://github.com/Keywos/rule/raw/main/cname.js"})}else if(target=="Loon")$notification.post("Sub-Store未更新","","请点击安装插件, 或查看Log安装对应版本, 并关闭原本的Substore","https://www.nsloon.com/openloon/import?plugin=https://github.com/Keywos/rule/raw/main/loon/sub-store.plugin");return e}var n=$arguments["batch"]?$arguments["batch"]:12;const o=new Date;const r=e.length;console.log(`设定API超时: ${timeout}毫秒`);console.log(`有缓API超时: ${with_cache}毫秒`);console.log(`批处理节点数: ${n} 个`);console.log(`开始处理节点: ${r} 个`);const s=[];let c=0;while(c<e.length){const t=e.slice(c,c+n);await Promise.all(t.map((async e=>{try{const t=await INDNS(e.server);const n=await IPAPI(e);const o=t.ip===n.query||t.data[0]===n.country?"直连":t.data[0]?t.data[0].slice(0,2):t.data[1].slice(0,2);if(flag){const o={"电信":"🅳","联通":"🅻","移动":"🆈","移通":"🆈"};const r=t.data[t.data.length-1];const s=o[r]||"🅶";if(t.ip===n.query||t.data[0]===n.country){e.name="🆉直连→"+getflag(n.countryCode)+n.country}else{e.name=s+(t.data[0]||t.data[1].slice(0,2))+"→"+getflag(n.countryCode)+n.country}}else if(jt){e.name=o+"→"+n.country}else if(dd){e.name=n.country}else if(fg){e.name=o+" | "+n.country}else{e.name=o+" "+n.country}e.qc=t.ip+"|"+n.query}catch(e){}})));c+=n}e=removels(e);e=removeqc(e);e=jxh(e);if(keynames!==""){e.forEach((e=>{e.name=keynames+" "+e.name}))}numone&&(e=oneProxies(e));const i=e.length;const a=new Date;const m=a.getTime()-o.getTime();APIREADKEY>0?console.log(`读取API缓存: ${APIREADKEY} 个`):null;APIWRITEKEY>0?console.log(`写入API缓存: ${APIWRITEKEY} 个 `):null;console.log(`处理完后剩余: ${i} 个 `);console.log(`此方法总耗时: ${mTIme(m)}\n----For CNAME----`);const u=APIREADKEY?`读取缓存: ${APIREADKEY} 个 `:"";const d=APIWRITEKEY?`写入缓存: ${APIWRITEKEY} 个 `:"";const f=i==r?"\n无复用节点, ":"\n去除无效节点后剩"+i+"个, ";$notification.post(`CNAME: 共${r}个节点`,"",`${d}${u}${f}耗时:${mTIme(m)}`);return e}const ins=new Map;async function INDNS(e){const t=getinid(e);if(ins.has(t)){return ins.get(t)}const n=scriptResourceCache.get(t);if(n){if(!onen){timeout=with_cache;onen=true}return n}else{const n=new Promise(((n,o)=>{const r=e;const s=`http://www.inte.net/tool/ip/api.ashx?ip=${r}&datatype=json`;$.http.get({url:s}).then((e=>{const o=JSON.parse(e.body);if(o.ip!=="0.0.0.0"){scriptResourceCache.set(t,o);n(o)}else{n(r)}})).catch((e=>{o(e)}))}));ins.set(t,n);return n}}let APIREADKEY=0;let APIWRITEKEY=0;const outs=new Map;async function IPAPI(e){const t=getid(e);if(outs.has(t)){return outs.get(t)}const n=scriptResourceCache.get(t);if(n){APIREADKEY++;return n}else{const n=new Promise(((n,o)=>{const r=`http://ip-api.com/json?lang=zh-CN&fields=status,message,country,countryCode,city,query`;let s=ProxyUtils.produce([e],target);const c=new Promise(((e,t)=>{setTimeout((()=>{t(new Error("timeout"))}),timeout)}));const i=$.http.get({url:r,node:s,"policy-descriptor":s}).then((e=>{const r=JSON.parse(e.body);if(r.status==="success"){scriptResourceCache.set(t,r);APIWRITEKEY++;n(r)}else{o(new Error(r.message))}})).catch((e=>{o(e)}));Promise.race([c,i]).catch((e=>{o(e)}))}));outs.set(t,n);return n}}
var MD5=function(e){var t=M(V(Y(X(e),8*e.length)));return t.toLowerCase()};function M(e){for(var t,n="0123456789ABCDEF",o="",r=0;r<e.length;r++)t=e.charCodeAt(r),o+=n.charAt(t>>>4&15)+n.charAt(15&t);return o}function X(e){for(var t=Array(e.length>>2),n=0;n<t.length;n++)t[n]=0;for(n=0;n<8*e.length;n+=8)t[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;return t}function V(e){for(var t="",n=0;n<32*e.length;n+=8)t+=String.fromCharCode(e[n>>5]>>>n%32&255);return t}function Y(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,o=-271733879,r=-1732584194,s=271733878,c=0;c<e.length;c+=16){var i=n,a=o,m=r,u=s;o=md5_ii(o=md5_ii(o=md5_ii(o=md5_ii(o=md5_hh(o=md5_hh(o=md5_hh(o=md5_hh(o=md5_gg(o=md5_gg(o=md5_gg(o=md5_gg(o=md5_ff(o=md5_ff(o=md5_ff(o=md5_ff(o,r=md5_ff(r,s=md5_ff(s,n=md5_ff(n,o,r,s,e[c+0],7,-680876936),o,r,e[c+1],12,-389564586),n,o,e[c+2],17,606105819),s,n,e[c+3],22,-1044525330),r=md5_ff(r,s=md5_ff(s,n=md5_ff(n,o,r,s,e[c+4],7,-176418897),o,r,e[c+5],12,1200080426),n,o,e[c+6],17,-1473231341),s,n,e[c+7],22,-45705983),r=md5_ff(r,s=md5_ff(s,n=md5_ff(n,o,r,s,e[c+8],7,1770035416),o,r,e[c+9],12,-1958414417),n,o,e[c+10],17,-42063),s,n,e[c+11],22,-1990404162),r=md5_ff(r,s=md5_ff(s,n=md5_ff(n,o,r,s,e[c+12],7,1804603682),o,r,e[c+13],12,-40341101),n,o,e[c+14],17,-1502002290),s,n,e[c+15],22,1236535329),r=md5_gg(r,s=md5_gg(s,n=md5_gg(n,o,r,s,e[c+1],5,-165796510),o,r,e[c+6],9,-1069501632),n,o,e[c+11],14,643717713),s,n,e[c+0],20,-373897302),r=md5_gg(r,s=md5_gg(s,n=md5_gg(n,o,r,s,e[c+5],5,-701558691),o,r,e[c+10],9,38016083),n,o,e[c+15],14,-660478335),s,n,e[c+4],20,-405537848),r=md5_gg(r,s=md5_gg(s,n=md5_gg(n,o,r,s,e[c+9],5,568446438),o,r,e[c+14],9,-1019803690),n,o,e[c+3],14,-187363961),s,n,e[c+8],20,1163531501),r=md5_gg(r,s=md5_gg(s,n=md5_gg(n,o,r,s,e[c+13],5,-1444681467),o,r,e[c+2],9,-51403784),n,o,e[c+7],14,1735328473),s,n,e[c+12],20,-1926607734),r=md5_hh(r,s=md5_hh(s,n=md5_hh(n,o,r,s,e[c+5],4,-378558),o,r,e[c+8],11,-2022574463),n,o,e[c+11],16,1839030562),s,n,e[c+14],23,-35309556),r=md5_hh(r,s=md5_hh(s,n=md5_hh(n,o,r,s,e[c+1],4,-1530992060),o,r,e[c+4],11,1272893353),n,o,e[c+7],16,-155497632),s,n,e[c+10],23,-1094730640),r=md5_hh(r,s=md5_hh(s,n=md5_hh(n,o,r,s,e[c+13],4,681279174),o,r,e[c+0],11,-358537222),n,o,e[c+3],16,-722521979),s,n,e[c+6],23,76029189),r=md5_hh(r,s=md5_hh(s,n=md5_hh(n,o,r,s,e[c+9],4,-640364487),o,r,e[c+12],11,-421815835),n,o,e[c+15],16,530742520),s,n,e[c+2],23,-995338651),r=md5_ii(r,s=md5_ii(s,n=md5_ii(n,o,r,s,e[c+0],6,-198630844),o,r,e[c+7],10,1126891415),n,o,e[c+14],15,-1416354905),s,n,e[c+5],21,-57434055),r=md5_ii(r,s=md5_ii(s,n=md5_ii(n,o,r,s,e[c+12],6,1700485571),o,r,e[c+3],10,-1894986606),n,o,e[c+10],15,-1051523),s,n,e[c+1],21,-2054922799),r=md5_ii(r,s=md5_ii(s,n=md5_ii(n,o,r,s,e[c+8],6,1873313359),o,r,e[c+15],10,-30611744),n,o,e[c+6],15,-1560198380),s,n,e[c+13],21,1309151649),r=md5_ii(r,s=md5_ii(s,n=md5_ii(n,o,r,s,e[c+4],6,-145523070),o,r,e[c+11],10,-1120210379),n,o,e[c+2],15,718787259),s,n,e[c+9],21,-343485551),n=safe_add(n,i),o=safe_add(o,a),r=safe_add(r,m),s=safe_add(s,u)}return Array(n,o,r,s)}function md5_cmn(e,t,n,o,r,s){return safe_add(bit_rol(safe_add(safe_add(t,e),safe_add(o,s)),r),n)}function md5_ff(e,t,n,o,r,s,c){return md5_cmn(t&n|~t&o,e,t,r,s,c)}function md5_gg(e,t,n,o,r,s,c){return md5_cmn(t&o|n&~o,e,t,r,s,c)}function md5_hh(e,t,n,o,r,s,c){return md5_cmn(t^n^o,e,t,r,s,c)}function md5_ii(e,t,n,o,r,s,c){return md5_cmn(n^(t|~o),e,t,r,s,c)}function safe_add(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function bit_rol(e,t){return e<<t|e>>>32-t}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
