/**
 * 脚本名称：微信支付有优惠 - 领金币
 * 活动规则：每周累计使用微信支付 10 次可领取 15 金币，每周日执行一次即可。
 * 脚本说明：添加重写进入微信支付有优惠小程序即可获取 Token，支持多账号，兼容 NE / Node.js 环境。
 * 环境变量：WECHAT_PAY_TOKEN / CODESERVER_ADDRESS、CODESERVER_FUN
 * 更新时间：2024-03-27

# BoxJs 订阅：https://raw.githubusercontent.com/FoKit/Scripts/main/boxjs/fokit.boxjs.json

------------------ Surge 配置 ------------------

[MITM]
hostname = payapp.weixin.qq.com

[Script]
微付金币² = type=http-response, pattern=https:\/\/payapp\.weixin\.qq\.com\/coupon-center-user\/home\/login, requires-body=1, max-size=0, script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js

微付金币 = type=cron,cronexp=30 9 * * 0, timeout=60, script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js, script-update-interval=0

------------------- Loon 配置 -------------------

[MITM]
hostname = payapp.weixin.qq.com

[Script]
http-response https:\/\/payapp\.weixin\.qq\.com\/coupon-center-user\/home\/login tag=微付金币², script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js,requires-body=1

cron "30 9 * * 0" script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js,tag = 微付金币,enable=true

--------------- Quantumult X 配置 ---------------

[MITM]
hostname = payapp.weixin.qq.com

[rewrite_local]
https:\/\/payapp\.weixin\.qq\.com\/coupon-center-user\/home\/login url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js

[task_local]
30 9 * * 0 https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js, tag=微付金币, img-url=https://raw.githubusercontent.com/FoKit/Scripts/main/images/wechat_pay_coupon.png, enabled=true

------------------ Stash 配置 ------------------

cron:
  script:
    - name: 微付金币
      cron: '30 9 * * 0'
      timeout: 10

http:
  mitm:
    - "payapp.weixin.qq.com"
  script:
    - match: https:\/\/payapp\.weixin\.qq\.com\/coupon-center-user\/home\/login
      name: 微付金币
      type: response
      require-body: true

script-providers:
  微付金币:
    url: https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/wechat_pay_coupon.js
    interval: 86400

 */

const $ = new Env('微信支付有优惠');
$.is_debug = getEnv('is_debug') || 'false';  // 调试模式
$.version = getEnv('wechat_pay_version') || '6.49.5';  // 小程序版本
$.userInfo = getEnv('wechat_pay_token') || '';  // Token
$.userArr = $.toObj($.userInfo) || [];  // 用户数组
$.appid = 'wxe73c2db202c7eebf';  // 小程序 appId
$.messages = [];


// 主函数
async function main() {
  // 获取微信 Code
  await getWxCode();
  for (let i = 0; i < $.codeList.length; i++) {
    await getToken($.codeList[i]);  // 获取 Token
  }

  if ($.userArr.length) {
    $.log(`找到 ${$.userArr.length} 个 Token 变量 ✅`);
    for (let i = 0; i < $.userArr.length; i++) {
      $.log(`----- 账号 [${i + 1}] 开始执行 -----`);
      // 初始化
      $.token = $.userArr[i]['token'];

      // 获取任务列表
      await getTask();
    }
    $.log(`----- 所有账号执行完成 -----`);
  } else {
    throw new Error('未找到 Token 变量 ❌');
  }
}

// 获取 Token
async function getToken(code) {
  console.log(typeof code, code)
  // 构造请求
  const options = {
    url: `https://payapp.weixin.qq.com/coupon-center-user/home/login`,
    params: {
      wx_code: code,
      coutom_version: $.version
    }
  }


  // 发起请求
  const result = await Request(options);
  if (result?.errcode == 0 && result?.data) {
    const { session_token, openid } = result.data;
    // 把新的 Token 添加到 $.userArr
    session_token && openid && $.userArr.push({ "openid": openid, "token": session_token });
    $.log(`✅ 成功获取 Token`);
  } else {
    $.log(`❌ 获取 Token 失败: ${$.toStr(result)}`);
  }
}


// 获取任务列表
async function getTask() {
  let msg = ''
  // 构造请求
  const options = {
    url: `https://payapp.weixin.qq.com/coupon-center-user/home/mainpage`,
    params: {
      session_token: $.token,
      coutom_version: $.version
    }
  }

  // 发起请求
  const result = await Request(options);
  if (result?.errcode == 0 && result?.data) {
    let task_list = result.data.task_info.task_item_list;
    for (let i = 1; i <= task_list.length; i++) {
      const { name, reward_coin_count, state, task_id, total_times } = task_list[i - 1];
      switch (state) {
        case 'USER_TASK_STATE_OBTAIN':  // 奖励已领取
          msg += `任务${i}: 支付${total_times}次, 已获得${reward_coin_count}金币 ✅\n`;
          break;

        case 'USER_TASK_STATE_COMPLETE_NOT_OBTAIN':  // 奖励未领取
          const coin_count = await getCoin(task_id);
          msg += `任务${i}: 支付${total_times}次, 已领取${coin_count}金币 💰\n`;
          break;

        case 'USER_TASK_STATE_RUNNING':  // 任务未完成
          msg += `任务${i}: 支付${total_times}次, 可获得${reward_coin_count}金币 ❌\n`;
          break;
      }
    }
  } else {
    msg += `\nToken 已失效 ❌`;
    $.log($.toStr(result));
  }
  $.messages.push(msg), $.log(msg);
}


// 领取金币
async function getCoin(task_id) {
  // 构造请求
  let opt = {
    url: `https://payapp.weixin.qq.com/coupon-center-account/task/obtaincoin`,
    params: {
      session_token: $.token,
      task_id,
      coutom_version: $.version
    }
  };

  let coin_count = 0;
  var result = await Request(opt);
  if (result?.errcode == 0 && result?.data) {
    coin_count = result.data.coin_type_package.coin_count || 0;
  }
  return coin_count;
}

// 脚本执行入口
!(async () => {
  if (typeof $request !== `undefined`) {
    GetCookie();
  } else {
    await main();  // 主函数
  }
})()
  .catch((e) => $.messages.push(e.message || e) && $.logErr(e))
  .finally(async () => {
    await sendMsg($.messages.join('\n').trimStart().trimEnd());  // 推送通知
    $.done();
  })



// 获取签到数据
function GetCookie() {
  try {
    let msg = '';
    debug($response.body);
    const body = $.toObj($response.body);
    const { session_token, openid } = body['data'];
    const version = new URLSearchParams($request.url).get('coutom_version');
    if (version) $.setdata(version, 'wechat_pay_version');
    if (session_token && openid) {
      // 使用 find() 方法找到与 member_id 匹配的对象，以新增/更新用户 token
      const user = $.userArr.find(user => user.openid === openid);
      if (user) {
        if (user.token == session_token) return;
        msg += `更新用户 [${openid}] Token: ${session_token}`;
        user.token = session_token;
      } else {
        msg += `新增用户 [${openid}] Token: ${session_token}`;
        $.userArr.push({ "openid": openid, "token": session_token });
      }
      // 写入数据持久化
      $.setdata($.toStr($.userArr), 'wechat_pay_token');
      $.messages.push(msg), $.log(msg);
    }
  } catch (e) {
    $.log("❌ 签到数据获取失败"), $.log(e);
  }
}


// 获取环境变量
function getEnv(...keys) {
  for (let key of keys) {
    var value = $.isNode() ? process.env[key] || process.env[key.toUpperCase()] || process.env[key.toLowerCase()] || $.getdata(key) : $.getdata(key);
    if (value) return value;
  }
}


// 获取微信 Code
async function getWxCode() {
  try {
    $.codeList = [];
    $.codeServer = getEnv("CODESERVER_ADDRESS", "@codeServer.address");
    $.codeFuc = getEnv("CODESERVER_FUN", "@codeServer.fun");
    if (!$.codeServer) return $.log(`🐛 WeChat code server is not configured.\n`);

    $.codeList = ($.codeFuc
      ? (eval($.codeFuc), await WxCode($.appid))
      : (await Request(`${$.codeServer}/?wxappid=${$.appid}`))?.split("|"))
      .filter(item => item.length === 32);
    $.log(`♻️ 获取到 ${$.codeList.length} 个微信 Code:\n${$.codeList}`);
  } catch (e) {
    $.logErr(`❌ 获取微信 Code 失败！`);
  }
}


/**
 * 请求函数二次封装
 * @param {(object|string)} options - 构造请求内容，可传入对象或 Url
 * @returns {(object|string)} - 根据 options['respType'] 传入的 {status|headers|rawBody} 返回对象或字符串，默认为 body
 */
async function Request(options) {
  try {
    options = options.url ? options : { url: options };
    const _method = options?._method || ('body' in options ? 'post' : 'get');
    const _respType = options?._respType || 'body';
    const _timeout = options?._timeout || 15e3;
    const _http = [
      new Promise((_, reject) => setTimeout(() => reject(`❌ 请求超时： ${options['url']}`), _timeout)),
      new Promise((resolve, reject) => {
        debug(options, '[Request]');
        $[_method.toLowerCase()](options, (error, response, data) => {
          debug(response, '[response]');
          error && $.log($.toStr(error));
          if (_respType !== 'all') {
            resolve($.toObj(response?.[_respType], response?.[_respType]));
          } else {
            resolve(response);
          }
        })
      })
    ];
    return await Promise.race(_http);
  } catch (err) {
    $.logErr(err);
  }
}


// 发送消息
async function sendMsg(message) {
  if (!message) return;
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
    $.log(`\n\n----- ${$.name} -----\n${message}`);
  }
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
      $.log(start + content + end);
    } else if (typeof content == "object") {
      $.log(start + $.toStr(content) + end);
    }
  }
}

// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, r) => { s.call(this, t, (t, s, a) => { t ? r(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null, ...s) { try { return JSON.stringify(t, ...s) } catch { return e } } getjson(t, e) { let s = e; const r = this.getdata(t); if (r) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, r) => e(r)) }) } runScript(t, e) { return new Promise(s => { let r = this.getdata("@chavy_boxjs_userCfgs.httpapi"); r = r ? r.replace(/\n/g, "").trim() : r; let a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); a = a ? 1 * a : 20, a = e && e.timeout ? e.timeout : a; const [i, o] = r.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: a }, headers: { "X-Key": i, Accept: "*/*" }, timeout: a }; this.post(n, (t, e, r) => s(r)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), r = !s && this.fs.existsSync(e); if (!s && !r) return {}; { const r = s ? t : e; try { return JSON.parse(this.fs.readFileSync(r)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), r = !s && this.fs.existsSync(e), a = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, a) : r ? this.fs.writeFileSync(e, a) : this.fs.writeFileSync(t, a) } } lodash_get(t, e, s) { const r = e.replace(/\[(\d+)\]/g, ".$1").split("."); let a = t; for (const t of r) if (a = Object(a)[t], void 0 === a) return s; return a } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, r) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[r + 1]) >> 0 == +e[r + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, r] = /^@(.*?)\.(.*?)$/.exec(t), a = s ? this.getval(s) : ""; if (a) try { const t = JSON.parse(a); e = t ? this.lodash_get(t, r, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, r, a] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(r), o = r ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, a, t), s = this.setval(JSON.stringify(e), r) } catch (e) { const i = {}; this.lodash_set(i, a, t), s = this.setval(JSON.stringify(i), r) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = { redirection: !1 })), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, r) => { !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, r) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: r, headers: a, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: r, headers: a, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: r, statusCode: a, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: r, statusCode: a, headers: i, rawBody: o, body: n }, n) }, t => { const { message: r, response: a } = t; e(r, a, a && s.decode(a.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = { redirection: !1 })), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, r) => { !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, r) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: r, headers: a, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: r, headers: a, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let r = require("iconv-lite"); this.initGotEnv(t); const { url: a, ...i } = t; this.got[s](a, i).then(t => { const { statusCode: s, statusCode: a, headers: i, rawBody: o } = t, n = r.decode(o, this.encoding); e(null, { status: s, statusCode: a, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: a } = t; e(s, a, a && r.decode(a.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let r = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in r) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[e] : ("00" + r[e]).substr(("" + r[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let r = t[s]; null != r && "" !== r && ("object" == typeof r && (r = JSON.stringify(r)), e += `${s}=${r}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", r = "", a) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, r = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": r } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, r, i(a)); break; case "Quantumult X": $notify(e, s, r, i(a)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), r && t.push(r), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, e, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, e, void 0 !== t.message ? t.message : t, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
