/*
脚本名称：新浪微博签到
脚本说明：本脚本仅适用于微博每日签到，支持多账号运行
环境变量：WB_TOKEN、WB_COOKIE（青龙）
更新时间：2022-6-14
脚本来源：https://github.com/Sunert/Script/blob/master/Task/weibo.js
====================================================================================================
配置 (Surge)
[MITM]
api.weibo.cn

[Script]
获取微博Token = type=http-request,pattern=^https:\/\/api\.weibo\.cn\/\d\/users\/show,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/weibo_sign.js
获取微博Cookie = type=http-request,pattern=^https:\/\/api\.weibo\.cn\/2\/logservice\/attach,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/weibo_sign.js

新浪微博 = type=cron,cronexp=15 8 * * *,timeout=60,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/weibo_sign.js,script-update-interval=0
----------------------------------------------------------------------------------------------------
配置 (QuanX)
[MITM]
api.weibo.cn

[rewrite_local]
^https:\/\/api\.weibo\.cn\/\d\/users\/show url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/weibo_sign.js
^https:\/\/api\.weibo\.cn\/2\/logservice\/attach url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/weibo_sign.js

[task_local]
15 8 * * * https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/weibo_sign.js, tag=新浪微博, enabled=true
====================================================================================================
*/

const $ = new Env('新浪微博')
const notify = $.isNode() ? require('./sendNotify') : '';
let tokenArr = [],  cookieArr = [];
let wbtoken = $.getdata('sy_token_wb');
let cookies = $.getdata('wb_cookie');
let signcash = "";
let myPaybag = "";

if (isGetCookie = typeof $request !== `undefined`) {
    GetCookie();
    $.done()
} else {
    !(async() => {
        if (!$.isNode() && wbtoken.indexOf("#") == -1) {
            tokenArr.push(wbtoken);
            cookieArr.push(cookies)
        } else {
            if ($.isNode()) {
                if (process.env.WB_TOKEN && process.env.WB_TOKEN.indexOf('#') > -1) {
                    wbtoken = process.env.WB_TOKEN.split('#');
                    console.log(`WB_TOKEN您选择的是用"#"隔开\n`)
                } else if (process.env.WB_TOKEN && process.env.WB_TOKEN.indexOf('\n') > -1) {
                    wbtoken = process.env.WB_TOKEN.split('\n');
                    console.log(`WB_TOKEN您选择的是用换行隔开\n`)
                } else {
                    wbtoken = [process.env.WB_TOKEN]
                };
                if (process.env.WB_COOKIE && process.env.WB_COOKIE.indexOf('#') > -1) {
                    cookies = process.env.WB_COOKIE.split('#');
                    console.log(`WB_COOKIE您选择的是用"#"隔开\n`)
                } else if (process.env.WB_COOKIE && process.env.WB_COOKIE.indexOf('\n') > -1) {
                    cookies = process.env.WB_COOKIE.split('\n');
                    console.log(`WB_COOKIE您选择的是用换行隔开\n`)
                } else {
                    cookies = [process.env.WB_COOKIE]
                };
            } else if (!$.isNode() && wbtoken.indexOf("#") > -1) {
                wbtoken = wbtoken.split("#");
                cookies = cookies.split("#")
            }
            Object.keys(wbtoken).forEach((item) => {
                if (wbtoken[item]) {
                    tokenArr.push(wbtoken[item])
                }
            });
            Object.keys(cookies).forEach((item) => {
                if (cookies[item]) {
                    cookieArr.push(cookies[item])
                }
            });
        }
        if (!tokenArr[0]) {
            $.msg($.name, '【提示】请先获取新浪微博一cookie')
            return;
        }
        timeZone = new Date().getTimezoneOffset() / 60;
        timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
        bjTime = new Date(timestamp).toLocaleString('zh', {
            hour12: false,
            timeZoneName: 'long'
        });
        console.log(`\n === 脚本执行 ${bjTime} ===\n`);
        console.log(`------------- 共${tokenArr.length}个账号\n`)
        for (let i = 0; i < tokenArr.length; i++) {
            if (tokenArr[i]) {
                token = tokenArr[i];
                cookie = cookieArr[i]
                $.index = i + 1;
                console.log(`\n开始【微博签到${$.index}】`)
                if (token.indexOf("from") == -1) {
                    token = "&from=10B3193010"+token
                }
                await getsign();
                await paysign();
                await getcash();
                await payinfo();
                await myJifen();
                await showmsg();
            }
        }
    })()
    .catch((e) => $.logErr(e))
        .finally(() => $.done())
}

// 获取 Cookie & Token
function GetCookie() {
    if ($request && $request.method != 'OPTIONS' && $request.url.indexOf("gsid=") > -1) {
        const signurlVal = $request.url;
        let token = signurlVal.match(/from=\w+/) + signurlVal.match(/&uid=\d+/) + signurlVal.match(/&gsid=[_a-zA-Z0-9-]+/) + signurlVal.match(/&s=\w+/);
        uid = token.match(/uid=\d+/)[0];
        if (wbtoken) {
            if (wbtoken.indexOf(uid) > -1) {
                $.log("此账号Cookie已存在，本次跳过")
            } else if (wbtoken.indexOf(uid) == -1) {
                tokens = wbtoken + "#" + token;
                $.setdata(tokens, 'sy_token_wb');
                $.log(`tokens: ${tokens}`)
                $.msg($.name, `获取微博签到Cookie: 成功`, ``)
            }
        } else {
            $.setdata(token, 'sy_token_wb');
            $.log(`tokens: ${token}`)
            $.msg($.name, `获取微博签到Cookie: 成功`, ``)
        }
    } else if ($request && $request.method != 'OPTIONS' && $request.headers.Cookie.indexOf("SUB=") > -1) {
        const cookieval = $request.headers.Cookie.match(/SUB=[\w\-]+/)[0];
        if (cookies) {
            if (cookies.indexOf(cookieval) > -1) {
                $.log("此账号Cookie已存在，本次跳过")
            } else if (cookies.indexOf(cookieval) == -1) {
                cookie = cookies + "#" + cookieval;
                $.setdata(cookie, 'wb_cookie');
                Cookies = cookie.split('#');
                $.log(`cookie: ${cookie}`);
                $.msg($.name, '获取微博用户' + Cookies.length + 'Cookie: 成功', ``)
            }
        } else {
            $.setdata(cookieval, 'wb_cookie');
            $.log(`cookies: ${cookieval}`);
            $.msg($.name, `获取微博用户Cookie: 成功`, ``)
        }
    }
}

//每日签到
function getsign() {
    return new Promise((resolve, reject) => {
        let opt = {
            url: `https://api.weibo.cn/2/checkin/add?c=iphone&`+token,
            headers: {
                "User-Agent": `Weibo/62823 (iPhone; iOS 15.2; Scale/3.00)`
            }
        }
        $.get(opt, async(error, resp, data) => {
            let result = JSON.parse(data)
            if (result.status == 10000) {
                wbsign = `每日签到：连续签到 ${result.data.continuous} 天，${result.data.desc}`
            } else if (result.errno == 30000) {
                wbsign = `每日签到：重复签到`
            } else if (result.status == 90005) {
                wbsign = `每日签到：` + result.msg
            } else {
                wbsign = `每日签到：签到失败，自动清除 Cookie `
                console.log(`${opt}\n${result}`)
                let retoken =  $.getdata('sy_token_wb').replace(token,``)
                if ((retoken.indexOf("#") == '0')||(retoken.indexOf("\n") == '0')){
                    retoken = retoken.substr(1)
                }
                if ((retoken.substr(-1) == "#")||(retoken.substr(-1) == "\n")){
                    retoken = retoken.substr(0,retoken.length-1)
                }
                $.setdata(retoken, 'sy_token_wb')
                $.done()
            }
            resolve()
        })
    })
}

// 钱包签到
function paysign() {
    return new Promise((resolve, reject) => {
        let opt = {
            url: `https://pay.sc.weibo.com/aj/mobile/home/welfare/signin/do?_=${$.startTime + 10}`,
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'pay.sc.weibo.com',
                'Referer': 'https://pay.sc.weibo.com/center/mobile/task/index',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone12,3__weibo__11.12.2__iphone__os15.2)'
            },
            body: token + '&lang=zh_CN&wm=3333_2001'
        }
        $.post(opt, async (error, resp, data) => {
            let result = JSON.parse(data)
            if (result.status == 1) {
                paybag = '钱包签到：签到成功，获得' + result.score + '积分'
            } else if (result.status == '2') {
                paybag = `钱包签到：重复签到`
            } else {
                paybag = `钱包签到：Token失效`
                console.log(`${opt}\n${result}`)
            }
            resolve()

        })
    })
}

// 钱包余额
function payinfo() {
    return new Promise((resolve, reject) => {
        let opt = {
            url: `https://pay.sc.weibo.com/api/client/sdk/app/balance`,
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'pay.sc.weibo.com',
                'Referer': 'https://pay.sc.weibo.com/center/mobile/task/index',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone12,3__weibo__11.12.2__iphone__os15.2)'
            },
            body: token + '&lang=zh_CN&wm=3333_2001'
        }
        $.post(opt, (error, resp, data) => {
            let result = JSON.parse(data)
            if (result.code == 100000) {
                myPaybag = `余额：${result.data.balance}元  `
            } else {
                myPaybag = `余额：获取失败  `
                console.log(`${opt}\n${result}`)
            }
            resolve()
        })
    })
}

// 红包余额
function getcash() {
    return new Promise((resolve, reject) => {
        let opt = {
            url: `https://m.weibo.cn/c/checkin/getcashdetail`,
            headers: {
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone12,3__weibo__11.12.2__iphone__os15.2)`,
                Cookie: cookie
            }
        }
        $.get(opt, async(error, resp, data) => {
            let result = JSON.parse(data)
            if (result.apiCode == 10000) {
                signcash = `红包：${result.data.header[0].value}元  `
            } else {
                signcash = `红包：获取失败  `
                console.log(`${opt}\n${result}`)
            }
            resolve()
        })
    })
}

// 当前积分
function myJifen() {
    return new Promise((resolve, reject) => {
        let opt = {
            url: `https://luck.sc.weibo.com/aj/jifen/info`,
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Length": "0",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": cookie,
                "Host": "luck.sc.weibo.com",
                "If-Modified-Since": "0",
                "Origin": "https://luck.sc.weibo.com",
                "Pragma": "no-cache",
                "Referer": "https://luck.sc.weibo.com/union",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone14,3__weibo__12.5.4__iphone__os15.0.2)",
                "X-Requested-With": "XMLHttpRequest"
            }
        }
        $.get(opt, (error, resp, data) => {
            let result = JSON.parse(data)
            if (result.code === "100000") {
                myScore = `积分：${result.data.score}  `
            } else {
                myScore = `积分：获取失败  `
                console.log(`${opt}\n${result}`)
            }
            resolve()
        })
    })
}

async function showmsg() {
    if (paybag) {
        $.msg($.name, wbsign , paybag + "\n" + myPaybag + signcash + myScore);
        if ($.isNode()) {
            await notify.sendNotify($.name, wbsign + paybag + "\n" + myPaybag + "\n" + signcash + "\n" + myScore + "\n")
        }
    }
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:i,...r}=t;this.got[s](i,r).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
