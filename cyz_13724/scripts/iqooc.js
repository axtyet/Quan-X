// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/iqooc.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/iqooc.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/iqooc.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/iqooc.stoverride

/*
项目名称：IQOO社区
项目作者：Levi(@czy13724)
使用说明：微信小程序IQOO社区签到，获取到ck可用。
感谢樱花佬的脚本框架@sliverkiss https://t.me/sliverkiss
脚本功能：积分可用于用于抽奖和兑换实物商品或虚拟勋章，商品不定期更新 详情参考小程序。
更新日期：02/12/2024签到任务 02/23/2024增加每日点赞任务 每日浏览帖子任务
反馈群组：https://t.me/IPAs_Dd
⚠️可复制本脚本头部链接进行远程引用，无需借助Script-Hub进行转换。其他应用请参考头部配置cron表达式即可。
------------------------------------------
*************************
【 签到脚本使用教程 】:
*************************
1.远程引用重写开启抓包并打开小程序随意浏览，提示获取ck成功则可以使用该脚本。
2.如无法获取ck请开启抓包随意浏览，抓包https://bbs-api.iqoo.com/api/...域名下的Authorization和userId。(如找不到Authorization则重放该记录就会提示获取ck成功)
打开boxjs->我的->数据查看器->在数据键输入iqooc_data,点击VIEW->在数据内容输入抓取到的Authorization，点击保存。
打开boxjs->我的->数据查看器->在数据键输入iqooc_userId,点击VIEW->在数据内容输入抓取到的userId，点击保存。
如无法抓去userId则进入小程序，点击'我的'，查看消息上方的爱酷号，爱酷号等于userId。
3.(可选)关闭获取cookie脚本，防止产生不必要的mitm
4.暂不支持多账号，若用@分割多帐号，也会提示登录但无法签到，请知悉。等待增加。如Authorization1@Authorization2；userId1@userId2
5.提示'接口调用成功'即为签到成功。
⚠️自动获取ck指iqooc_data，不会抓取iqooc_userId，需要手动填入到boxjs，不填写'iqooc_userId'不影响签到功能只影响查询积分功能。
------------------------------------------
⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
***************
【签到脚本配置】：
***************

Surge, ShadowRocket配置如下：

[Script]
# （默认上午9点 执行，如需更改请自行修改cron表达式）
IQOO社区签到 = type=cron, cronexp="0 9 * * *", script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/iqooc.js, timeout=60, script-update-interval=-1
IQOO社区获取ck = type=http-request,pattern=^https:\/\/bbs-api\.iqoo\.com\/api\/v3(?:\/.*)?$,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/iqooc.js
*********
Quantumult X配置如下：

[task_local]
0 9 * * * https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/iqooc.js, tag=IQOO社区签到, img-url=https://raw.githubusercontent.com/czy13724/LeviIcons/main/leviicons/iqooc.png, enabled=true

[rewrite_local]
# 签到
^https:\/\/bbs-api\.iqoo\.com\/api\/v3\/sign$ url script-request-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/iqooc.js
# 获取ck
https:\/\/bbs-api\.iqoo\.com\/api\/v3(?:\/.*)?$ url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/iqooc.js

[mitm]
hostname = bbs-api.iqoo.com

*/

// env.js 全局
const $ = new Env("IQOO社区小程序");
const ckName = "iqooc_data";
//-------------------- 一般不动变量区域 -------------------------------------
const Notify = 1;//0为关闭通知,1为打开通知,默认为1
const notify = $.isNode() ? require('./sendNotify') : '';
let envSplitor = ["@"]; //多账号分隔符
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';
let userList = [];
let userIdx = 0;
let userCount = 0;
let userId = $.getdata("iqooc_userId") || '默认的iqooc_userId';  
//调试
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata('is_debug')) || 'false';
// 为通知准备的空数组
$.notifyMsg = [];
//bark推送
$.barkKey = ($.isNode() ? process.env["bark_key"] : $.getdata("bark_key")) || '';
//---------------------- 自定义变量区域 -----------------------------------
const threadIds = [
 "2064039", "2063978", "2029605", "2026651", "2053784", "2057143", "2060947", "2025633", "2032512", "2054035", "2040343", "2058821", "2031946", "2051936", "2054436", "2058848", "2040461", "2053953", "2031202", "2025830", "2057010", "2051796", "2032418", "2025336", "2037692", "2026093",];


// 脚本入口函数main()
async function main() {
    await getNotice()
    console.log('\n================== 任务 ==================\n');
    // 签到
    for (let user of userList) {
        console.log(`账号${user.index} >> 开始运行`)
        console.log(`随机延迟${user.getRandomTime()}ms`);
        await user.signin();
        if (user.ckStatus) {
            await user.point();
            DoubleLog(`${$.signMsg} \n ${$.pointMsg}`);
        } else {
            // 将ck过期消息存入消息数组
            $.notifyMsg.push(`❌账号${user.index} >> CK已过期，请重新抓取!`)
        }
        await user.toggleLike();
        await user.visitPostsAndGetTips(threadIds);
    }
}

class UserInfo {
    constructor(str) {
        this.index = ++userIdx;
        this.token = str;
        this.ckStatus = true;
        this.drawStatus = true;
    }

    getRandomTime() {
        return randomInt(1000, 3000)
    }
    // 随机选取子数组
    getRandomSubarray(arr, size) {
      let shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }


//签到
async signin() {
    try {
        const options = {
            //签到任务调用签到接口
            url: `https://bbs-api.iqoo.com/api/v3/sign`,
            //请求头, 所有接口通用
            headers: {
                "content-type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPad; CPU OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f28) NetType/WIFI Language/zh_CN",
                "Authorization":this.token,
            },
            body: JSON.stringify({})
        };
        //post方法
        let result = await httpRequest(options);
        // console.log(result)
        if (result?.status === true) {
            if (result?.Code === -13006) {
                $.log(`❌重复签到！`);
                $.signMsg = `❌重复签到(${result?.Message})`;
            } else{
                $.log(`✅签到成功！`);
                $.signMsg = `✅签到成功(${result.Meta?.tips?.message})`;
            }
        } else {
          
            $.signMsg = `✅${result?.Message}`;
        }
    } catch (e) {
        console.log(e);
    }
}


//4次点赞任务(每日合计20积分)
async toggleLike() {
    try {
        for (let i = 0; i < 4; i++) {
            const favourite = {
                id: 2062759,
                postId: 8718480,
                data: {
                    attributes: {
                        isLiked: i % 2 === 0
                    }
                }
            };
            const options = {
                url: 'https://bbs-api.iqoo.com/api/v3/posts.update',
                method: 'POST',
                headers: {
                "content-type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPad; CPU OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f28) NetType/WIFI Language/zh_CN",
                "Authorization":this.token,
            },               
                body: JSON.stringify(favourite),
            };

            let favour = await httpRequest(options);
            if (favour?.Code === 0) {
                console.log(`✅ 第${i + 1}次点赞并取消成功，获得5积分`);
            } else {
                console.log(`❌ 第${i + 1}次点赞并取消失败`);
            }
        } console.log(`✅点赞任务完成4次共获得20积分`);
    } catch (e) {
        console.error(`请求异常: ${e}`);
    }
}


// 访问选定的帖子并获取积分(每日合计10积分)
  async visitPostsAndGetTips(threadIds) {
    // 从 threadIds 中随机选取 2 个 ID
    let selectedThreadIds = this.getRandomSubarray(threadIds, 2);
    console.log('随机访问帖子任务:', selectedThreadIds);

    for (let threadId of selectedThreadIds) {
      console.log(`访问帖子: ${threadId}`);
        try{
            let detailResult = await httpRequest({
                url: `https://bbs-api.iqoo.com/api/v3/thread.detail?threadId=${threadId}`,
                headers: {
                    "content-type": "application/json",
                    "User-Agent": "Mozilla/5.0 (iPad; CPU OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f28) NetType/WIFI Language/zh_CN",
                    "Authorization": this.token,
                }
            }); 
        console.log(`✅访问 ${threadId} 帖子成功`, detailResult);
      } catch (error) {
        console.error(`❌访问 ${threadId}帖子失败`, error);
        }         
    }
console.log('⏏️结束访问帖子任务');
}


// 积分查询
 async point() {
         try {
             const options = {
                 //签到任务调用签到接口
                 url: `https://bbs-api.iqoo.com/api/v3/user?userId=${userId}`,
                 //请求头, 所有接口通用
                 headers: {
                     "content-type": "application/json",
                     "User-Agent": "Mozilla/5.0 (iPad; CPU OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f28) NetType/WIFI Language/zh_CN",
                     "Authorization":this.token,
                 },
                 // body: {}
             };
             // post方法
             let result = await httpRequest(options);
             console.log(result)
            
             if (result?.Code === 0) {
                     $.log(`✅查询成功！`);
                     $.pointMsg = `✅当前积分:${result?.Data?.score}个`;
             } else {
                 $.log(`❌查询失败！`);
                 $.pointMsg = `❌查询失败`;
             }
         } catch (e) {
             console.log(e);
         }
     }
 }


//获取Cookie
async function getCookie() {
    if ($request && $request.method != 'OPTIONS') {
        const tokenValue = $request.headers['access-token'] || $request.headers['authorization'] || $request.headers['Authorization'];
        if (tokenValue) {
            $.setdata(tokenValue, ckName);
            $.msg($.name, "", "🎉获取签到Cookie成功");
        } else {
            $.msg($.name, "", "❌获取签到Cookie失败");
        }
    }
}


//免责声明
async function getNotice() {
    try {
        const urls = ["https://raw.githubusercontent.com/czy13724/Quantumult-X/main/NAvailable/Declaration.json", "https://raw.githubusercontent.com/czy13724/Quantumult-X/main/NAvailable/Description.json"];
        for (const url of urls) {
            const options = {
                url,
                headers: {
                    "User-Agent": ""
                },
            }
            const result = await httpRequest(options);
            if (result) console.log(result.notice);
        }
    } catch (e) {
        console.log(e);
    }
}


//主程序执行入口
!(async () => {
    //没有设置变量,执行Cookie获取
    if (typeof $request != "undefined") {
        await getCookie();
        return;
    }
    //未检测到ck，退出
    if (!(await checkEnv())) { throw new Error(`❌未检测到ck，请添加环境变量`) };
    if (userList.length > 0) {
        await main();
    }
    if ($.barkKey) { //如果已填写Bark Key
        await BarkNotify($, $.barkKey, $.name, $.notifyMsg.join('\n')); //推送Bark通知
    };
})()
    .catch((e) => $.notifyMsg.push(e.message || e))//捕获登录函数等抛出的异常, 并把原因添加到全局变量(通知)
    .finally(async () => {
        await SendMsg($.notifyMsg.join('\n'))//带上总结推送通知
        $.done(); //调用Surge、QX内部特有的函数, 用于退出脚本执行
    });

/** --------------------------------辅助函数区域------------------------------------------- */

// 双平台log输出
function DoubleLog(data) {
    if ($.isNode()) {
        if (data) {
            console.log(`${data}`);
            $.notifyMsg.push(`${data}`);
        }
    } else {
        console.log(`${data}`);
        $.notifyMsg.push(`${data}`);
    }
}
// DEBUG
function debug(text, title = 'debug') {
    if ($.is_debug === 'true') {
        if (typeof text == "string") {
            console.log(`\n-----------${title}------------\n`);
            console.log(text);
            console.log(`\n-----------${title}------------\n`);
        } else if (typeof text == "object") {
            console.log(`\n-----------${title}------------\n`);
            console.log($.toStr(text));
            console.log(`\n-----------${title}------------\n`);
        }
    }
}
//把json 转为以 ‘&’ 连接的字符串
function toParams(body) {
    var params = Object.keys(body).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(body[key]);
    }).join("&");
    return params;
}

//检查变量
async function checkEnv() {
    if (userCookie) {
        // console.log(userCookie);
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
        userCount = userList.length;
    } else {
        console.log("未找到CK");
        return;
    }
    return console.log(`共找到${userCount}个账号`), true;//true == !0
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// 发送消息
async function SendMsg(message) {
    if (!message) return;
    if (Notify > 0) {
        if ($.isNode()) {
            await notify.sendNotify($.name, message)
        } else {
            $.msg($.name, '', message)
        }
    } else {
        console.log(message)
    }
}


/** ---------------------------------固定不动区域----------------------------------------- */
// prettier-ignore

//请求函数函数二次封装
function httpRequest(options, method) { typeof (method) === 'undefined' ? ('body' in options ? method = 'post' : method = 'get') : method = method; return new Promise((resolve) => { $[method](options, (err, resp, data) => { try { if (err) { console.log(`${method}请求失败`); $.logErr(err) } else { if (data) { typeof JSON.parse(data) == 'object' ? data = JSON.parse(data) : data = data; resolve(data) } else { console.log(`请求api返回数据为空，请检查自身原因`) } } } catch (e) { $.logErr(e, resp) } finally { resolve() } }) }) }
//Bark APP notify
async function BarkNotify(c, k, t, b) { for (let i = 0; i < 3; i++) { console.log(`🔷Bark notify >> Start push (${i + 1})`); const s = await new Promise((n) => { c.post({ url: 'https://api.day.app/push', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t, body: b, device_key: k, ext_params: { group: t } }) }, (e, r, d) => r && r.status == 200 ? n(1) : n(d || e)) }); if (s === 1) { console.log('✅Push success!'); break } else { console.log(`❌Push failed! >> ${s.message || s}`) } } };
//From chavyleung's Env.js
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
