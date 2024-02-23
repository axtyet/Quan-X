const cookie2object = (cookie) => {
  var obj = {};
  var arr = cookie.split("; ");
  arr.forEach(function (val) {
    var brr = val.split("=");
    obj[brr[0]] = brr[1];
  });
  return obj;
};
let config = {
  cookie: {},
  headers: {}
};

const $ = new Env("biliCookie")
config = $.getjson($.name, {})
var bili_headers = {}
var falg = false
if ($request.headers['x-bili-metadata-bin']) {
  falg = true
  config.headers = $request.headers
  bili_headers.Other = {}
} else {
  config.headers = {}
  bili_headers.Other = config.Other || {}
}

let Cookie
if (typeof $request.headers.cookie != 'undefined') {
  Cookie = $request.headers.cookie
} else if (typeof $request.headers.Cookie != 'undefined') {
  Cookie = $request.headers.Cookie
}

if (Cookie) {
  config.cookie = cookie2object(Cookie)
  bili_headers.Cookie = `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
} else {
  bili_headers.Cookie = config.Cookie
}

if (falg) {
  bili_headers.Other.Authorization = config.headers.Authorization || config.headers.authorization
  bili_headers.Other['User-Agent'] = config['headers']['User-Agent'] || config['headers']['user-agent']
  bili_headers.Other['x-bili-locale-bin'] = config['headers']['x-bili-locale-bin']
  bili_headers.Other['x-bili-device-bin'] = config['headers']['x-bili-device-bin']
  bili_headers.Other['x-bili-metadata-bin'] = config['headers']['x-bili-metadata-bin']
  bili_headers.Other['x-bili-fawkes-req-bin'] = config['headers']['x-bili-fawkes-req-bin']
}

$.setdata($.toStr(bili_headers), $.name)
$.log($.toStr(bili_headers))
if (bili_headers.Other.Authorization && bili_headers.Cookie) {
  $.msg("BiliBili-cookie获取", "获取成功", $.toStr(bili_headers))
}

$.done()

function Env(t,e){class s{constructor(t){this.env=t}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const r=this.getdata(t);if(r)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}lodash_get(t,e,s){const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let a=t;for(const t of r)if(a=Object(a)[t],void 0===a)return s;return a}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,r)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[r+1])>>0==+e[r+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,r]=/^@(.*?)\.(.*?)$/.exec(t),a=s?this.getval(s):"";if(a)try{const t=JSON.parse(a);e=t?this.lodash_get(t,r,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,r,a]=/^@(.*?)\.(.*?)$/.exec(e),n=this.getval(r),i=r?"null"===n?null:n||"{}":"{}";try{const e=JSON.parse(i);this.lodash_set(e,a,t),s=this.setval(JSON.stringify(e),r)}catch(e){const n={};this.lodash_set(n,a,t),s=this.setval(JSON.stringify(n),r)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);default:return this.data&&this.data[e]||null}}msg(e=t,s="",r="",a){const n=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t}}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,r=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":r}}}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,r,n(a));break;case"Quantumult X":$notify(e,s,r,n(a))}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t)}}}(t,e)}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
