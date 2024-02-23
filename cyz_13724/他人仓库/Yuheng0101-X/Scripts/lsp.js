/******************************************
 * @name 绿色产业链通杀
 * @description 好男人专用脚本
 * @channel https://t.me/yqc_123
 * @feedback https://t.me/yqc_777
 * @version 1.1.0
******************************************
## 更新日志

### 20231115

> 既然已经有人放出通杀版本, 没必要私有了, 放出来一起用吧, 其他应用下载地址均可在现有 app 的应用中找到, 不再赘述。

> 提醒某人: 如果把拿来主义做到极致, 你也就无敌了。

### 20231108

> 修复撸先生播放问题、去除全局广告

> 增加一条快手的域名

### 20231021

#### 适配 Surge

> 可以使用 👉[模块](https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/lsp/lsp.sgmodule)

> 亦可使用 Script Hub 直接转换该脚本

### 20231018

> 删除 91av, 增加抖阴 Porn

## 脚本注明

1. 脚本只是针对基于 Quantumult X 和 Surge 对 Javascript 和 WEB 逆向的学习，不得用于商业用途，否则后果自负。
2. 不保证脚本合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
3. 本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
4. 转载脚本请注明来源，欢迎分享，拒绝倒卖，倒卖 🐕 必死 🐎。
5. 如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
6. 所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明, 本人保留随时更改或补充此声明的权利, 一旦您使用或复制了此脚本，即视为您已接受此免责声明。
7. 欢迎对[本仓库](https://github.com/Yuheng0101/X)Star✅，但请不要 Fork❌。

## 脚本描述

解锁下方所有 APP(仅限轻量版)

## 下载地址

[50 度灰](https://50.aff009.net/af/jDM3U)

[91 短视频](https://dbf4801.zfijby.com/aff-hVbkx)

[汤头条](https://ttt.aff009.net/af/caJtT)

[微密圈](https://app.wmq.life/aff-nVJM)

[小蓝视频](https://p4.gv009.fun/#/home)

[她趣](https://app.xttworld.com/af/bnjU)

[撸先生](http://b.sir010.co/)

[抖阴 Porn](https://dypj.app004.me/aff-atdvk)

******************************************
# Quantumult X
[mimt]
hostname = *50a*,*bmafdxt*,*psovzwr*,*yxlauhm*,*yiqiapi*,*jiujiao*,*myb*api*,*hichatapi*,*tbrapi*,*wmqapi*,*gvlan*,*ksapi*,*nbpqfxr*,*91av*,*xtt*,*dyweb*,*argaxqn*,*eoeicmg*,*.longyuandingyi.com,*.zihzot.com,*.snowing.ren,*.vzcnqmr.cn,*beibeini3.cn,*.pili01a.net,*.hhclyjz.cn, *.bhhcdou.cn, *.xuxivwx.cn, *.sdtuxyh.cn, *.kngpdsz.cn

[rewrite_local]
# 50度灰/汤头条/他趣
^http[s]?:\/\/.*((50(aa|ab|apia)pi|xtt.*)\.com|tbrapi\.org)\/pwa\.php\/api\/(user\/userinfo|MvDetail\/(detail|xiao_detail)|home\/(getOpenAdsAndVersion|appcenter)|system\/getad)$ url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/lsp.js
# 91短视频/微密圈
^http[s]?:\/\/.*(yiqiapi|jiujiao|myb[0-9]+api|wmqapi|psovzwr|bmafdxt|yxlauhm).*\/pwa\.php$ url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/lsp.js
# 撸先生
^http[s]?:\/\/.*hichatapi.+\/api\.php$ url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/lsp.js
# 小蓝视频/快手
^http[s]?:\/\/.*(gvlan|ksapi|nbpqfxr).*pwa\.php.*(home\/getConfig|user(s)?\/getBaseInfo|(mv|manhua|story)\/detail|mv\/(pwa_main|listOfFeature|getFeature)|ChargeVideo\/(upIndex|vipIndex|recommend))$ url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/lsp.js
# 抖阴Porn
^http[s]?:\/\/.*(dyweb|argaxqn|eoeicmg).+\/pwa\.php$ url script-response-body https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/lsp.js
# 通杀所有
^(https?:\/\/)(?!long)([^./]+\.)*(longyuandingyi.com|zihzot.com|snowing.ren|vzcnqmr.cn|beibeini3.cn|pili01a.net|hhclyjz.cn|bhhcdou.cn|xuxivwx.cn|sdtuxyh.cn|kngpdsz.cn)(\/.*)? url 302 $1long.$3$4
******************************************/
async function handle50DHAndTQ(){console.log("\n===🔔50度灰===\n");var t=await DecryptResp(obj.data,"50dh");try{t=JSON.parse(t)}catch(t){}if(/system\/getad/.test($request.url))t.data=[];else if(/home\/appcenter/.test($request.url))t.data.banner=[];else if(/home\/getOpenAdsAndVersion/.test($request.url))t.data.ads={},t.data.pop_ads=[];else if(/\/user\/userinfo/.test($request.url))t.isVip=!0,t.daily_view=999,t.data.nickname="𝒀𝒖𝒉𝒆𝒏𝒈",t.data.followed=999,t.data.fabulous_count=999,t.data.videos_count=999,t.data.vip=!0,t.data.free_view_cnt=999,t.data.coins=999;else if(/MvDetail\/xiao_detail/.test($request.url))t.data.detail.preview_video=__fuck(t.data.detail.preview_video),t.data.detail.is_pay=!0,t.data.detail.status=2,t.isVip=!0;else if(/\/MvDetail\/(detail)/.test($request.url)){t.isVip=!0,t.daily_view=999;const e=__fuck(t.data.detail.preview_video);t.data.banner=[],t.data.detail.source_240=e,t.data.detail.preview_video=e,t.data.detail.is_pay=!0}obj.data=await EncryptReq(JSON.stringify(JSON.stringify(t)),"50dh")}async function handle91DSPORWMQ(t){console.log(`\n===🔔${0===t?"91短视频":"微密圈"}===\n`);let e=await DecryptResp(obj.data,"91dsp");try{e=JSON.parse(e)}catch(t){}if(e.hasOwnProperty("data")||$.done({}),e.data.hasOwnProperty("pop_ads")&&e.data.pop_ads.length>0&&(e.data.popupWindowAds={},e.data.isVip=!0,e.data.vip_level=6,e.data.pop_ads=[]),e.data.hasOwnProperty("info")){const t={...e.data.info,username:"13888888888",phone:"13888888888",nickname:"𝒀𝒖𝒉𝒆𝒏𝒈",topbanner:[],invitedNum:999,isVip:!0,watchCount:999,watchStr:"无限",city:"M78",canWatchCount:"999",coins:999999,fans:"999",followed:"999",fabulous:"999",videosCount:"999",vip_level:6,buy_count:999,age:18,exp:4084941654,level:99,coins_expired:4084941654,coins_free:!0};e.data.info=t,e.isVip=!0}if(e.data.hasOwnProperty("recommendedData")&&e.data.recommendedData.length>0&&(e.data.isVip=!0,e.data.vip_level=4,e.data.pop_ads=[],e.data.recommendedData=e.data.recommendedData.map(t=>({...t,playUrl:__fuck(t.playUrl),hasBuy:!0}))),e.data.hasOwnProperty("playUrl")||e.data.hasOwnProperty("previewUrl")){let t=e.data.hasOwnProperty("playUrl")?e.data.playUrl:e.data.previewUrl;var a=__fuck(t);e.data.hasBuy=!0,e.data.is_club_fans=!0,e.data.is_download=!0,e.data.playUrl=a,e.data.previewUrl=a}e.data.hasOwnProperty("banner")&&(e.data.banner=[]),obj.data=await EncryptReq(JSON.stringify(e),"91dsp")}async function handleLXS(){console.log("\n===🔔撸先生===\n");var t=await DecryptResp(obj.data,"lxs");try{t=JSON.parse(t)}catch(t){}var{status:e,data:a}=t;if(200!=+e)throw"非法数据 !";if(Array.isArray(a)&&(t.data=t.data.filter(t=>"ads"!==t.v_ext)),a&&a.advert&&a.advert.length&&(t.data.advert=[]),a&&a.advert_lable&&a.advert_lable.length&&(t.data.advert=[]),a&&a.alert_ad&&(t.data.alert_ad.url="https://github.com/Yuheng0101/X"),a&&a.openAds&&(t.data.openAds={}),a&&a.hasOwnProperty("oauth_id")&&a.hasOwnProperty("uuid")&&a.hasOwnProperty("uid")&&(t.data.username="𝒀𝒖𝒉𝒆𝒏𝒈",t.data.expired_at=4085561456,t.data.vip_notice=1,t.data.balance=99999,t.data.privilege_num=99,t.data.score=99999,t.data.left_num=999,t.data.have_num=999,t.data.validate=1,t.data.group_url="https://t.me/yqc_123"),a&&a.hasOwnProperty("is_pay")){if(!a.hasOwnProperty("v_ext"))throw"非法数据 !";t.data.is_pay=1}t.hasOwnProperty("line")&&t.line.length>0&&t.line.forEach(t=>{for(const e in t.line)t.line[e]=__fuck(t.line[e]);t.info.can_change={yes_no:1,msg:""}}),t&&t.hasOwnProperty("data")&&t.data.hasOwnProperty("privilege")&&(t.data.privilege={can_change_look:{yes_no:1,msg:""},can_change_video:{yes_no:1,msg:""}}),console.log(`我是解锁后的decrypt:${JSON.stringify(t,null,2)}`),obj.data=await EncryptReq(JSON.stringify(t),"lxs")}async function handleTTT(){console.log("\n===🔔汤头条===\n");let t=await DecryptResp(obj.data,"ttt");try{t=JSON.parse(t)}catch(t){}if(/home\/getOpenAdsAndVersion/.test($request.url)?(t.data.ads={},t.data.pop_ads=[]):/\/user\/userinfo/.test($request.url)&&(t={...t,isVip:!0,daily_view:999,data:{...t.data,nickname:"𝒀𝒖𝒉𝒆𝒏𝒈",followed:999,fabulous_count:999,videos_count:999,vip:!0,free_view_cnt:999,coins:999}}),/\/MvDetail\/detail/.test($request.url)){const e=__fuck(t.data.detail.preview_video);t={...t,isVip:!0,daily_view:999,data:{...t.data,detail:{...t.data.detail,is_pay:!0,preview_video:e,preview_tip:"已为LSP解锁成功"},banner:[]}}}obj.data=await EncryptReq(JSON.stringify(t),"ttt")}async function handleXLSP(){console.log("\n===🔔小蓝视频===\n");let t=await DecryptResp(obj.data,"xlsp");try{t=JSON.parse(t)}catch(t){}/getConfig/.test($request.url)&&(t.data.pop_ads_v2=[]),/listOfFeature/.test($request.url)&&(t.data.ads=[]),/getBaseInfo/.test($request.url)&&(t.data={...t.data,nickname:"𝒀𝒖𝒉𝒆𝒏𝒈",vip_level:4,videos_count:999,live_count:999,level:99,is_vip:1,vvLevel:99,watch_count:999,can_watch:999,auth_level:5,auth_status:1,expired_str:"永久",coins_total:999,fans_count:999,followed_count:999,likes_count:999}),/mv\/detail/.test($request.url)&&(t.data={...t.data,preview_video:t.data.preview_video.replace(/.*play/,"long"),is_pay:1,preview_tip:"𝒀𝒖𝒉𝒆𝒏𝒈已为你解锁",status:1}),/(manhua|story)\/detail/.test($request.url)&&(t.data={...t.data,is_pay:1,is_free:1,status:1}),obj.data=await EncryptReq(JSON.stringify(t),"xlsp")}async function handleKS(){console.log("\n===🔔快手===\n");let t=await DecryptResp(obj.data,"ks");try{t=JSON.parse(t)}catch(t){}/getConfig/.test($request.url)&&(t.data.pop_ads_v2=[]),/listOfFeature/.test($request.url)&&(t.data.ads=[]),/getBaseInfo/.test($request.url)&&(t.data={...t.data,nickname:"𝒀𝒖𝒉𝒆𝒏𝒈",vip_level:4,videos_count:999,live_count:999,level:99,is_vip:1,isVV:1,vvLevel:99,topNav:[],leftNav:[],watch_count:999,can_watch:999,auth_level:5,auth_status:1,expiredStr:"永久",coins_total:999,fans_count:999,followed_count:999,likes_count:999}),/mv\pwa_main/.test($request.url)&&(t.data.banner=[]),/ChargeVideo\/(upIndex|vipIndex)/.test($request.url)&&(t.data.ads=[]),/mv\/getFeature/.test($request.url)&&(t.data=t.data.map(t=>({...t,playURL:__fuck(t.playURL),hotAds:[],hasBuy:!0}))),/ChargeVideo\/recommend/.test($request.url)&&(t.data.list=t.data.list.map(t=>({...t,playURL:__fuck(t.playURL),hotAds:[],hasBuy:!0}))),/mv\/detail/.test($request.url)&&(t.data={...t.data,preview_video:__fuck(t.data.preview_video),is_pay:1,preview_tip:"𝒀𝒖𝒉𝒆𝒏𝒈已为你解锁",status:1}),/(manhua|story)\/detail/.test($request.url)&&(t.data={...t.data,is_pay:1,is_free:1,status:1}),obj.data=await EncryptReq(JSON.stringify(t),"ks")}async function handleDYPorn(){console.log("\n===🔔抖阴Porn===\n");const t=await DecryptResp(obj.data,"dyporn");try{t=JSON.parse(t)}catch(t){}var{data:e}=t,a=$.getdata("DOUYIN_PORN_COIN_LIST")?JSON.parse($.getdata("DOUYIN_PORN_COIN_LIST")):[];const s=(t,e=!1)=>(t.hasOwnProperty("playUrl")&&(t.playUrl=__fuck(t.playUrl)),t.hasOwnProperty("hasBuy")&&(t.hasBuy=!0),t.hasOwnProperty("hasLongVideo")&&(t.hasLongVideo=!1),t.hasOwnProperty("is_club_fans")&&(t.is_club_fans=!0),e&&t.hasOwnProperty("icons")&&t.icons>0&&a.push(item),t);if(e instanceof Array)e=e.filter(t=>!/banner/.test(t.title)).map(t=>{if(t.hasOwnProperty("list")){let e=t.list.map(t=>s(t,!0));t.list=e}return s(t,!0)});else if(e instanceof Object){if(e.hasOwnProperty("recommendedData")&&e.recommendedData.filter(t=>!t.is_ads).map(t=>(t.playUrl=__fuck(t.playUrl),t.hasBuy=!0,t.hasLongVideo=!1)),e.hasOwnProperty("pop_ads")&&(e.pop_ads=[],a=[]),e.hasOwnProperty("home_float")&&(e.home_float=[]),e.hasOwnProperty("info")){var{info:r}=e;r.isVip=!0,r.topbanner=null,r.nickname="𝘠𝘶𝘩𝘦𝘯𝘨",r.canWatchCount=999,r.watchStr="无限",r.coins=999,r.fans=999,r.followed=!0,r.fabulous=999,r.exp=4084941654,r.upLevel=1,r.vip_level=4,e.info=r}if(e.hasOwnProperty("list")&&e.list.map(t=>s(t)),e.hasOwnProperty("items")&&e.items.map(t=>s(t)),e.hasOwnProperty("item")&&e.item.map(t=>{if(t.hasOwnProperty("video_lists")){let e=t.video_lists.map(t=>s(t));t.video_lists=e}return t}),e.hasOwnProperty("hasBuy")&&(e.hasBuy=!0),e.hasOwnProperty("playUrl")){if(!e.playUrl){var{playUrl:i}=a.find(t=>t.id==e.id);e.playUrl=i}e.playUrl=__fuck(e.playUrl)}e.hasOwnProperty("banners")&&(e.banners=[])}t.data=e,t.isVip=!0,obj.data=await EncryptReq(JSON.stringify(t),"dyporn"),$.setdata(JSON.stringify(a),"DOUYIN_PORN_COIN_LIST")}function Env(t,e){class a{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let a=this.get;return"POST"===e&&(a=this.post),new Promise((e,s)=>{a.call(this,t,(t,a,r)=>{t?s(t):e(a)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new a(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let a=e;const s=this.getdata(t);if(s)try{a=JSON.parse(this.getdata(t))}catch{}return a}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,a,s)=>e(s))})}runScript(t,e){return new Promise(a=>{let s=this.getdata("@chavy_boxjs_userCfgs.httpapi");s=s?s.replace(/\n/g,"").trim():s;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,n]=s.split("@"),o={url:`http://${n}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(o,(t,e,s)=>a(s))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),a=this.fs.existsSync(t),s=!a&&this.fs.existsSync(e);if(!a&&!s)return{};{const s=a?t:e;try{return JSON.parse(this.fs.readFileSync(s))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),a=this.fs.existsSync(t),s=!a&&this.fs.existsSync(e),r=JSON.stringify(this.data);a?this.fs.writeFileSync(t,r):s?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,a){const s=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of s)if(r=Object(r)[t],void 0===r)return a;return r}lodash_set(t,e,a){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,a,s)=>Object(t[a])===t[a]?t[a]:t[a]=Math.abs(e[s+1])>>0==+e[s+1]?[]:{},t)[e[e.length-1]]=a,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,a,s]=/^@(.*?)\.(.*?)$/.exec(t),r=a?this.getval(a):"";if(r)try{const a=JSON.parse(r);e=a?this.lodash_get(a,s,""):e}catch(t){e=""}}return e}setdata(t,e){let a=!1;if(/^@/.test(e)){const[,s,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(s),n=s?"null"===i?null:i||"{}":"{}";try{const i=JSON.parse(n);this.lodash_set(i,r,t),a=this.setval(JSON.stringify(i),s)}catch(e){const i={};this.lodash_set(i,r,t),a=this.setval(JSON.stringify(i),s)}}else a=this.setval(t,e);return a}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,a,s)=>{!t&&a&&(a.body=s,a.statusCode=a.status?a.status:a.statusCode,a.status=a.statusCode),e(t,a,s)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:a,statusCode:s,headers:r,body:i,bodyBytes:n}=t;e(null,{status:a,statusCode:s,headers:r,body:i,bodyBytes:n},i,n)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const a=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();a&&this.ckjar.setCookieSync(a,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:n}=t,o=a.decode(n,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:n,body:o},o)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const a=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[a](t,(t,a,s)=>{!t&&a&&(a.body=s,a.statusCode=a.status?a.status:a.statusCode,a.status=a.statusCode),e(t,a,s)});break;case"Quantumult X":t.method=a,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:a,statusCode:s,headers:r,body:i,bodyBytes:n}=t;e(null,{status:a,statusCode:s,headers:r,body:i,bodyBytes:n},i,n)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[a](r,i).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:n}=t,o=s.decode(n,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:n,body:o},o)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}time(t,e=null){const a=e?new Date(e):new Date;let s={"M+":a.getMonth()+1,"d+":a.getDate(),"H+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in s)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?s[e]:("00"+s[e]).substr((""+s[e]).length)));return t}queryStr(t){let e="";for(const a in t){let s=t[a];null!=s&&""!==s&&("object"==typeof s&&(s=JSON.stringify(s)),e+=`${a}=${s}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,a="",s="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],a=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:a}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,a=t["media-url"]||t.mediaUrl,s=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":a,"update-pasteboard":s}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,a,s,i(r));break;case"Quantumult X":$notify(e,a,s,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),a&&t.push(a),s&&t.push(s),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),a=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${a} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}function DecryptResp(t,e){return new Promise((a,s)=>{$.post({url:"https://welfare.yuheng.best/api/91series/decrypt",headers:{"Content-Type":"application/json"},body:JSON.stringify({yh:t,appid:e})},(t,e,r)=>{if(t)s(t);else{const{success:t,data:e,message:i}=JSON.parse(r);t?a(e):s(i)}})})}function EncryptReq(t,e){return new Promise((a,s)=>{$.post({url:"https://welfare.yuheng.best/api/91series/encrypt",headers:{"Content-Type":"application/json"},body:JSON.stringify({yh:t,appid:e})},(t,e,r)=>{if(t)s(t);else{const{success:t,data:e,message:i}=JSON.parse(r);t?a(e):s(i)}})})}function _0x21be(){var t=[version_,"dtRjKJGsdQujNniadTmiy.cFoqYwmAX.vyA7qrPw==","WRS0WP/cQs4lW7u","W7D4dqjSCSkN","WONcSJivdZ8S","WPldG8oNWRlcR8kNW6S9W4PwWQhcLImj","AmoyeSkPsIKIW5SAewfWtG","W6hdTWncW5u","WPi2dCkPW7CiWRJdGmkFm8oNySk8","W4vPWPakDZhcVa"].concat(["rZNdVmkJfa4RhtdcM8oLueW","W4NcHmk8W63dVSo6W6bPW7nWWQ3dVa","W4arWQufEadcHSoB","W54XurD0WQlcVa","WQySW4BdV3byWRldISoiEYpcRG","l3ddPexcUCkLW7JcGrhdSSoo","W7Cgo3KqW5XVWQe","tWJcJmo3WQqsBG","bIiuW7nwv28yWO3cTh3dLdO","WQaWm8kFWObSW7eNWR10"].concat(["W4RdO3npxMWRygBcRhRcQa","WQ3dOSkxrSkUW4mPsmouWOS5Deif","WRj0jCoEq1RcH2m","WQe1n8kqW78CW64kWQn7FCkp","t3ldTSk2W4TKe8ohstSyeau","WPCXvSoEWPDVW4ddPW","W6hdMsldTuKpWRhcKX8Z"]));return _0x21be=function(){return t},_0x21be()}function _0x4682(t,e){var a=_0x21be();return _0x4682=function(e,s){e-=236;var r=a[e];if(void 0===_0x4682.VpKYbI){var i=function(t){for(var e,a,s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=",r="",i="",n=0,o=0;a=t.charAt(o++);~a&&(e=n%4?64*e+a:a,n++%4)?r+=String.fromCharCode(255&e>>(-2*n&6)):0)a=s.indexOf(a);for(var d=0,l=r.length;d<l;d++)i+="%"+("00"+r.charCodeAt(d).toString(16)).slice(-2);return decodeURIComponent(i)},n=function(t,e){var a,s,r=[],n=0,o="";for(t=i(t),s=0;s<256;s++)r[s]=s;for(s=0;s<256;s++)n=(n+r[s]+e.charCodeAt(s%e.length))%256,a=r[s],r[s]=r[n],r[n]=a;s=0,n=0;for(var d=0;d<t.length;d++)s=(s+1)%256,n=(n+r[s])%256,a=r[s],r[s]=r[n],r[n]=a,o+=String.fromCharCode(t.charCodeAt(d)^r[(r[s]+r[n])%256]);return o};_0x4682.nkDclu=n,t=arguments,_0x4682.VpKYbI=!0}var o=a[0],d=e+o,l=t[d];return l?r=l:(void 0===_0x4682.QsfQgI&&(_0x4682.QsfQgI=!0),r=_0x4682.nkDclu(r,s),t[d]=r),r},_0x4682(t,e)}function __fuck(t){var e=_0xe7593e,a={fEfWk:e(252,"ic#T")};return t[e(254,"7BEw")](/\/\/(?!long)[^\.]+\./,a[e(257,"IsKf")]).replace(/\?.*/,"")}const $=new Env("绿色产业链通杀脚本");let body=$response.body,obj=JSON.parse(body);const domainReg=new RegExp(/^(http[s]?:\/\/)([^\/]+)/g),domain=domainReg.exec($request.url)[0];(async()=>{switch(!0){case/(50|xtt)/.test(domain):await handle50DHAndTQ();break;case/(yiqiapi|jiujiao|myb[0-9]+api|wmqapi|psovzwr|bmafdxt|yxlauhm)/.test(domain):await handle91DSPORWMQ(0);break;case/hichat/.test(domain):await handleLXS();break;case/tbr/.test(domain):await handleTTT();break;case/wmq/.test(domain):await handle91DSPORWMQ(1);break;case/gvlan/.test(domain):await handleXLSP();break;case/ksapi|nbpqfxr/.test(domain):await handleKS();break;case/(dyweb|argaxqn|eoeicmg)/.test(domain):await handleDYPorn()}})().catch(t=>$.log("",`❌ ${$.name}, ${t}`)).finally(()=>$.done({body:JSON.stringify(obj)}));var version_="jsjiami.com.v7",_0xe7593e=_0x4682;(function(t,e,a,s,r,i,n){t>>=4,i="hs",n="hs",function(e,a,o,d,l){var c=_0x4682;d="tfi",i=d+i,l="up",n+=l,i=o(i),n=o(n),o=0;for(var u=e();--s+a;)try{d=-parseInt(c(238,"PPU1"))/1*(-parseInt(c(260,"e8K#"))/2)+-parseInt(c(244,"XbQz"))/3+parseInt(c(253,"P^gj"))/4*(parseInt(c(240,"S7e$"))/5)+parseInt(c(243,"n%TJ"))/6+-parseInt(c(237,"hLsS"))/7*(-parseInt(c(248,"XbQz"))/8)+-parseInt(c(256,"rHJ#"))/9+parseInt(c(245,"7BEw"))/10*(-parseInt(c(241,"Y0G%"))/11)}catch(t){d=o}finally{if(l=u[i](),t<=s)o?r?d=l:r=l:o=l;else if(o==r.replace(/[yKFRNrGYPnqTJtdQuXwA=]/g,"")){if(d===a){u["un"+i](l);break}u[n](l)}}}(a,e,function(t,e,a,s,r,i,n){return e="split",t=arguments[0],t=t[e](""),a="reverse",t=t[a]("v"),s="join",t[s]("")})})(3264,365992,_0x21be,206),_0x21be&&(version_=_0xe7593e(246,"11$N")),version_="jsjiami.com.v7";











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
