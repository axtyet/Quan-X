/*
脚本名称：捷停车签到
活动入口：捷停车APP-停车币签到
签到规则：连签奖励，首日 6 停车币、次日 7 停车币，以此类推7天封顶
活动奖励：停车币可用于兑换停车券，比例 1000:1
环境变量：jtc_userId（Node环境，多账号以@隔开）
使用说明：添加重写规则并打开捷停车APP即可获取userId
更新时间：2024-02-01

================ Surge 配置 ================
[MITM]
hostname = %APPEND% sytgate.jslife.com.cn

[Script]
获取捷停车userId = type=http-request, pattern=^https:\/\/sytgate\.jslife\.com\.cn\/core-gateway\/order\/carno\/pay\/info, requires-body=1, max-size=0, script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/jparking_sign.js

捷停车签到 = type=cron, cronexp=15 9 * * *, timeout=60, script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/jparking_sign.js, script-update-interval=0

============ Quantumult X 配置 =============
[MITM]
hostname = sytgate.jslife.com.cn

[rewrite_local]
^https:\/\/sytgate\.jslife\.com\.cn\/core-gateway\/order\/carno\/pay\/info url script-request-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/jparking_sign.js

[task_local]
15 9 * * * https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/jparking_sign.js, tag=捷停车签到, enabled=true

================ Loon 配置 ================
[MITM]
hostname = sytgate.jslife.com.cn

cron "15 9 * * *" script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/jparking_sign.js, tag=捷停车签到

http-request ^https:\/\/sytgate\.jslife\.com\.cn\/core-gateway\/order\/carno\/pay\/info script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/jparking_sign.js, requires-body=true, timeout=10, enabled=false, tag=获取捷停车userId

================ Boxjs订阅 ================
订阅地址：https://raw.githubusercontent.com/FoKit/Scripts/main/boxjs/fokit.boxjs.json

*/

// ---------------------- 一般不动变量区域 ----------------------
const $ = new Env('捷停车签到');
const origin = 'https://sytgate.jslife.com.cn';
const jtc_userId_key = 'jtc_userId';
const Notify = 1;  // 0 为关闭通知, 1 为打开通知, 默认为 1
$.messages = [];  // 为通知准备的空数组

// ---------------------- 自定义变量区域 ----------------------
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata('is_debug')) || 'false';  // 调试模式
let userId = ($.isNode() ? process.env.jtc_userId : $.getdata(jtc_userId_key)) || '', userIdArr = [];
let watchVideo = ($.isNode() ? process.env.jtc_video : $.getdata('jtc_video')) || 'false';  // 此功能有封号风险，默认禁用

// 统一管理 api 接口
const Api = {
  // 领取奖励
  "receive": {
    "url": "/base-gateway/integral/v2/task/receive",
  },
  // 执行任务
  "complete": {
    "url": "/base-gateway/integral/v2/task/complete",
  },
  // 个人信息
  "query": {
    "url": "/base-gateway/member/queryMbrCityBaseInfo",
  },
  // adToken
  "adToken": {
    "url": "/base-gateway/integral/v2/task/token",
  }
}

// 主执行程序
!(async () => {
  // 检查变量
  await checkEnv();
  // 获取 Cookie
  if (isGetCookie = typeof $request !== 'undefined') {
    GetCookie();
    return;
  }
  // 未检测到账号变量, 退出
  if (!userIdArr[0]) {
    throw new Error(`❌ 未获取到 userId, 请添加环境变量`);
  } else {
    // 执行任务
    await main();
  }
})()
  .catch((e) => $.messages.push(e.message || e) && console.log(e))  // 捕获登录函数等抛出的异常, 并把原因添加到全局变量(通知)
  .finally(async () => {
    await sendMsg($.messages.join('\n'));  // 推送通知
    $.done();
  })


// 脚本入口函数
async function main() {
  for (let i = 0; i < userIdArr.length; i++) {
    console.log(`账号[${i + 1}]开始执行`);

    // 变量初始化
    $.message = '';
    $.result = '';
    $.mobile = '未知';
    $.integralValue = 0;
    $.userId = userIdArr[i].split(',')[0];
    $.token = userIdArr[i].split(',')[1];
    $.taskMap = { "T00": "签到", "T01": "浏览", "T02": "看视频" };

    // 领取浏览任务
    await browse();

    // 看视频任务
    watchVideo == 'true' && $.token && await videos();

    // 领取签到奖励
    await receive("T00");

    // 领取浏览奖励
    $.taskMap['T01'] && await receive("T01");

    // 打印结果
    console.log($.result);

    // 等待 1 秒
    await $.wait(1000 * 1);

    // 获取账号信息， 带 2 次重试机制
    let trys = 0;
    while ($.integralValue == 0 && trys <= 3) {
      trys++;
      if (trys > 1) console.log(`⚠️ 第 ${trys}/3 次重试...\n`)
      await getUserInfo();
    }

    // 拼接通知消息
    $.messages.push(`${$.result.replace(/\n$/, '')}`);  // 签到 & 浏览 任务结果
    $.messages.push(`停车币余额: ${$.integralValue} 可抵扣: ${($.integralValue / 1000).toFixed(2)} 元\n`);

    // 每个账号间隔 3 秒
    await $.wait(1000 * 3);
  }
}


// 获取数据
function GetCookie() {
  if ($request && $request.body) {
    let body = JSON.parse($request.body);
    if (body?.userId) {
      if (!new RegExp(body.userId).test(userId)) {
        userId ? userId += `@${body.userId},${body.token}` : userId += `${body.userId},${body.token}`;
        $.setdata(userId, jtc_userId_key);
        console.log(`userId: ${body.userId} \n`);
        $.messages.push(`🎉 userId 写入成功\n${hideSensitiveData(body.userId, 4, 4)} `);
      } else {
        console.log(`❌ ${body.userId} 已存在\n`);
      }
    }
  }
}


// 提交任务（浏览 & 签到）
async function receive(taskNo) {
  let result = await httpRequest(options(Api.receive.url, `{"userId":"${$.userId}","reqSource":"APP_JTC","taskNo":"${taskNo}"}`));
  debug(result, "receive");
  if (result.success) {
    $.result += `${$.taskMap[taskNo]} 任务完成, 获得 ${result.data} 停车币\n`;
  } else {
    $.result += `${result.message} \n`;
  }
}

// 浏览
async function browse() {
  let result = await httpRequest(options(Api.complete.url, `{"userId":"${$.userId}","reqSource":"APP_JTC","taskNo":"T01"}`));
  debug(result, "browse");
  if (!result.success) {
    console.log(`❌ 领取${$.taskMap['T01']}任务失败: ${result.message}`);
    delete $.taskMap['T01'];
  }
}

// 看视频
async function videos() {
  // 获取 adToken
  let res = await httpRequest(options(Api.adToken.url, `{"adTime":"600","userId":"${$.userId}","taskNo":"T02","token":"${$.token}","timestamp":"${Date.now()}"}`));
  debug(res, "getAdToken");
  if (res.success) {
    let = adToken = res['data']['token'];
    let videosCoins = 0;  // 看视频奖励数
    // 领取奖励(每日50次)
    for (let i = 1; i <= 50; i++) {
      let result = await httpRequest(options(Api.complete.url, `{"timestamp":"${Date.now()}","taskNo":"T02","reqSource":"APP_JTC","receiveTag":"true","userId":"${$.userId}","token":"${$.token}","adToken":"${adToken}"}`));
      debug(result, "videos");
      if (result.success) {
        videosCoins += result['data']['integralValue'];
        console.log(`✅ 完成看视频任务，获得 ${result['data']['integralValue']} 停车币`);
      } else {
        console.log(`❌ 看视频任务失败: `, result);
        break;
      }
    }
    videosCoins && ($.result += `${$.taskMap['T02']} 任务完成, 获得 ${videosCoins} 停车币\n`);
  } else {
    console.log(`❌ 领取${$.taskMap['T02']}任务失败: ${res.message}`);
  }
}


// 用户信息
async function getUserInfo() {
  let result = await httpRequest(options(Api.query.url, `{"userId":"${$.userId}","reqSource":"APP_JTC"}`));
  debug(result, "getUserInfo");
  if (result.code == '0') {
    $.mobile = result.data.mobile;
    $.integralValue = result.data.integralValue;
    $.messages.push(`账号: ${hideSensitiveData($.mobile, 3, 4)} `);
    console.log(`账号 ${$.mobile}  停车币余额 ${$.integralValue} \n`);
  } else {
    console.log(`❌ 用户信息查询失败\n${result} \n`);
  }
}


// 检查变量
async function checkEnv() {
  // 多账号分割
  userIdArr = userId.split('@');
  // 当下标0为空字符串也会占用长度，所以需判断是否为空字符串
  if (userIdArr[0]) {
    console.log(`\n检测到 ${userIdArr.length} 个账号变量\n`);
    return userIdArr.length;
  } else {
    console.log(`\n检测到 0 个账号变量\n`);
    return 0;
  }
}


// 发送消息
async function sendMsg(message) {
  if (!message) return;
  message = message.replace(/\n+$/, '');  // 清除末尾换行
  if (Notify > 0) {
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
  } else {
    console.log(message);
  }
}


// 封装请求参数
function options(url, body = '') {
  let opt = {
    url: `${origin}${url}`,
    headers: {
      "Host": "sytgate.jslife.com.cn",
      "Content-Type": "application/json;charset=utf-8",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "Accept": "*/*",
      "User-Agent": "JTC/6.2.0 (iPhone; iOS 16.6.1; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1, zh-Hant-HK;q=0.9, en-CN;q=0.8, de-DE;q=0.7, ja-CN;q=0.6",
      "content-type": "application/json"
    },
    body,
    timeout: 10000
  }
  if (body == '') delete opt.body;
  debug(opt);
  return opt;
}


// DEBUG
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


// 数据脱敏
function hideSensitiveData(string, head_length = 2, foot_length = 2) {
  let star = '';
  for (var i = 0; i < string.length - head_length - foot_length; i++) {
    star += '*';
  }
  return string.substring(0, head_length) + star + string.substring(string.length - foot_length);
}


// 请求函数二次封装
function httpRequest(options, method = 'get') { if ('body' in options) { method = 'post' }; return new Promise((resolve) => { $[method](options, (err, resp, data) => { try { if (err) { console.log(`❌ ${options['url']} 请求失败`); $.logErr(err); } else { if (data) { try { typeof JSON.parse(data) == 'object' ? (data = JSON.parse(data)) : ''; } catch (e) { } } else { console.log(`服务器返回空数据`); } } } catch (e) { $.logErr(e, resp); } finally { resolve(data); } }) }) }

// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } isShadowrocket() { return "undefined" != typeof $rocket } isStash() { return "undefined" != typeof $environment && $environment["stash-version"] } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, a] = i.split("@"), n = { url: `http://${a}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), a = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(a); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) }); else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t && t.error || "UndefinedError")); else if (this.isNode()) { let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: i, statusCode: r, headers: o, rawBody: a } = t, n = s.decode(a, this.encoding); e(null, { status: i, statusCode: r, headers: o, rawBody: a, body: n }, n) }, t => { const { message: i, response: r } = t; e(i, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) }); else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t && t.error || "UndefinedError")); else if (this.isNode()) { let i = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...o } = t; this.got[s](r, o).then(t => { const { statusCode: s, statusCode: r, headers: o, rawBody: a } = t, n = i.decode(a, this.encoding); e(null, { status: s, statusCode: r, headers: o, rawBody: a, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && i.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, i = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": i } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), this.isSurge() || this.isQuanX() || this.isLoon() ? $done(t) : this.isNode() && process.exit(1) } }(t, e) }
