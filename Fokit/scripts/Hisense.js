/**
 * 脚本名称：海信爱家
 * 活动入口：海信爱家（公众号） -> 个人中心 -> 会员中心 -> 玩转积分 -> 签到
 * 活动说明：每日签到送10积分；连续签到7天、第7天额外赠送20积分；连续签到20天，第20天额外赠送50积分；连续签到50天，第50天额外赠送100积分。
 * 脚本说明：配置重写并手动签到一次或进入打地鼠活动页面即可获取签到数据，兼容手机 NE 和 Node.js 环境执行。
 * 环境变量：HISENSE_CPS / CODESERVER_ADDRESS、CODESERVER_FUN，多账号分割符 "@"。
 * 仓库地址：https://github.com/FoKit/Scripts
 * 更新记录：2023-11-03  优化 Cookie 获取流程，进入个人中心即可获取 Cookie
 * -------- 2023-11-16  当 Cookie 失效时，通过 Bark App 推送通知
 * -------- 2024-03-19  支持通过微信code执行脚本（无需抓包）
/*
--------------- BoxJS & 重写模块 --------------

https://raw.githubusercontent.com/FoKit/Scripts/main/boxjs/fokit.boxjs.json
https://raw.githubusercontent.com/FoKit/Scripts/main/rewrite/get_hisense_cookie.sgmodule

------------------ Surge 配置 -----------------

[MITM]
hostname = sweixin.hisense.com

[Script]
海信数据 = type=http-response,pattern=^https:\/\/sweixin\.hisense\.com\/ecrp\/member\/initMember,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js

海信爱家 = type=cron,cronexp=52 7 * * *,timeout=500,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js,script-update-interval=0

------------------ Loon 配置 ------------------

[MITM]
hostname = sweixin.hisense.com

[Script]
http-response ^https:\/\/sweixin\.hisense\.com\/ecrp\/member\/initMember tag=海信数据, script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js,requires-body=1

cron "52 7 * * *" script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js,tag = 海信爱家,enable=true

-------------- Quantumult X 配置 --------------

[MITM]
hostname = sweixin.hisense.com

[rewrite_local]
^https:\/\/sweixin\.hisense\.com\/ecrp\/member\/initMember url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js

[task_local]
52 7 * * * https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js, tag=海信爱家, img-url=https://github.com/FoKit/Scripts/blob/main/images/hisense.png?raw=true, enabled=true

------------------ Stash 配置 -----------------

cron:
  script:
    - name: 海信爱家
      cron: '52 7 * * *'
      timeout: 500

http:
  mitm:
    - "sweixin.hisense.com"
  script:
    - match: ^https:\/\/sweixin\.hisense\.com\/ecrp\/member\/initMember
      name: 海信数据
      type: response
      require-body: true

script-providers:
  海信爱家:
    url: https://raw.githubusercontent.com/axtyet/Quan-X/main/Fokit/scripts/Hisense.js
    interval: 86400

*/

const $ = new Env('海信爱家');
let HISENSE_CPS = ($.isNode() ? process.env.HISENSE_CPS : $.getdata('HISENSE_CPS')) || '';
let HISENSE_SWEIXIN = ($.isNode() ? process.env.HISENSE_SWEIXIN : $.getdata('HISENSE_SWEIXIN')) || '';
let HISENSE_GAME_SCORE = ($.isNode() ? process.env.HISENSE_GAME_SCORE : $.getdata('HISENSE_GAME_SCORE')) || '15-20';
let HISENSE_PARTY_EXCHANGE = ($.isNode() ? process.env.HISENSE_PARTY_EXCHANGE : $.getdata('HISENSE_PARTY_EXCHANGE')) || 'false';
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata('is_debug')) || 'false';
$.appid = 'wx3b97b20380656267';  // 微信 appId
$.messages = [];

// 主函数
async function main() {
  let HISENSE_CPS_ARR = HISENSE_CPS ? HISENSE_CPS.split('@') : [];
  let HISENSE_SWEIXIN_ARR = HISENSE_SWEIXIN ? HISENSE_SWEIXIN.split('@') : [];
  // 获取微信 Code
  await getWxCode();
  for (let i = 0; i < $.codeList.length; i++) {
    // 初始化
    $.token = '';
    $.session = '';
    $.cps_token = '';
    $.wx_code = $.codeList[i];
    // 获取 session
    await getSession();
    // 获取 Token
    await getToken();
    if (!$.token) continue;
    HISENSE_SWEIXIN_ARR.push($.session + 'Authorization=' + $.token);
    //  获取活动token
    await getActivityToken();
    // 把新的 Token 添加到 $.tokenArr
    $.cps_token && HISENSE_CPS_ARR.push($.cps_token);
  }
  if (!HISENSE_CPS_ARR[0]) {
    $.msg($.name, '❌ 请先获取海信爱家签到数据。');
    return;
  }
  $.log(`\n共有[${HISENSE_CPS_ARR.length}]个海信爱家账号`);
  for (let i = 0; i < HISENSE_CPS_ARR.length; i++) {
    if (HISENSE_CPS_ARR[i]) {
      $.SWEIXIN_CK = HISENSE_SWEIXIN_ARR[i];
      $.CPS_CK = HISENSE_CPS_ARR[i];
      $.index = i + 1;
      $.isLogin = true;
      $.gameScores = 0;
      $.userRemainingCount = 0;
      let randomInt = Math.floor(Math.random() * 30);
      $.log(`\n随机等待 ${randomInt} 秒\n`);
      await $.wait(randomInt * 1000);
      $.log(`===== 账号[${$.index}]开始执行 =====\n`);
      await checkin();  // 每日签到
      if (!$.isLogin) {
        let msg = `账号[${$.index}] ❌ Cookie 已失效，请重新获取。`;
        $.messages.push(msg) && $.log(msg);
        await barkNotice($.name, msg);  // 当 Cookie 失效时，通过 Bark App 推送通知。
        continue;
      }
      await gameStart();  // 开始游戏
      while ($.userRemainingCount >= 1) {
        await gameMain();
      }
      if (HISENSE_PARTY_EXCHANGE == "true") {
        for (let j = 1; j <= 2; j++) {
          await partyExchange();
          await gameMain();
        }
      }
      // 获取用户信息
      await getInfo();
    }
  }
}


// 获取 Session
async function getSession() {
  // 构造请求
  const options = {
    url: `https://sweixin.hisense.com/ecrp/forward/init?state=center`,
    headers: {
      'Cookie': ``
    },
    _respType: `headers`,
    followRedirect: false
  }
  // 发起请求
  const result = await Request(options);
  const headers = ObjectKeys2LowerCase(result);
  $.session = $.toStr(headers['set-cookie']).match(/SESSION=([\w]+?;)/)?.[0];
}


// 获取 Token
async function getToken() {
  // 构造请求
  const options = {
    url: `https://sweixin.hisense.com/ecrp/oauth/init?code=${$.wx_code}&state=center`,
    headers: {
      'Cookie': $.session
    },
    _respType: `headers`,
    followRedirect: false
  }
  // 发起请求
  const result = await Request(options);
  const headers = ObjectKeys2LowerCase(result);
  $.token = headers?.authorization;
}


// 获取 TOKEN_ACTIVITY
async function getActivityToken() {
  // 构造请求
  const options = {
    url: `https://sweixin.hisense.com/ecrp/member/initMember`,
    headers: {
      'Cookie': `${$.session} Authorization=${$.token};`
    }
  }
  // 发起请求
  const result = await Request(options);
  $.cps_token = $.toStr(result).match(/TOKEN_ACTIVITY=[\w=]+/)?.[0];
}

// 用户信息
async function getInfo() {
  let msg = '';
  // 构造请求
  let options = {
    url: `https://sweixin.hisense.com/ecrp/member/initMember`,
    headers: {
      'Cookie': $.SWEIXIN_CK
    }
  }
  // 发起请求
  const result = await Request(options);
  if (result?.data?.memberDetail) {
    const { gradeName, score, customerName, memberCard, kdOpenId, grade, grouthValue, thdCusmobile, nextGrouthValue } = result?.data?.memberDetail;
    msg += `账号:${hideSensitiveData(thdCusmobile, 3, 4)}  ${$.checkMsg}\n参与打地鼠活动共获得 ${$.gameScores} 积分 🎉\n当前积分:${score}, 会员等级:${gradeName}, 成长值:${grouthValue}/${grouthValue + nextGrouthValue}`;
  } else {
    $.log($.toStr(result));
    msg += `${$.message}\n参与打地鼠活动共获得 ${$.gameScores} 积分 🎉\n`;
  }
  $.messages.push(msg) && $.log(msg);
}


// 每日签到
async function checkin() {
  // 构造请求
  let options = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/participate`,
    headers: {
      'Content-Type': `application/json`,
      'Cookie': $.CPS_CK,
    },
    body: `{"code":"74f51fd29cea445e9b95eb0dd14fba40"}`
  }
  // 发起请求
  const result = await Request(options);
  $.checkMsg = '';
  if (result?.isSuccess && result?.resultCode == "00000") {
    $.signScores = result?.data?.obtainScore;
    $.checkMsg = `签到成功，获得 ${$.signScores} 积分 🎉`;
  } else if (result?.resultCode == "A0202") {
    $.checkMsg = `重复签到 ❌`;
  } else {
    $.isLogin = false;
    $.checkMsg = `${result?.resultMsg} ❌`;
  }
}


// 开始游戏
async function gameStart() {
  // 构造请求
  let options = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/getActivityInfo?code=a55ca53d96bd43be81c0df7ced7ef2b0`,
    headers: {
      'Cookie': $.CPS_CK
    }
  }
  // 发起请求
  const result = await Request(options);
  $.gameCode = result?.data?.code || '';
  $.userRemainingCount = result?.data?.userRemainingCount;
}


// 提交分数
async function submitScore() {
  // 游戏分数
  let ScoreArr = HISENSE_GAME_SCORE.split('-');
  $.gameScore = randomNumber(parseInt(ScoreArr[0]), parseInt(ScoreArr[1])) * 20;
  $.log(`游戏结束, 提交分数: ${$.gameScore} 分`);

  // 构造请求
  let options = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/participate`,
    headers: {
      'Cookie': $.CPS_CK,
      'Content-Type': `application/json`
    },
    body: `{"code":"${$.gameCode}","gameScore":"${$.gameScore}","gameSignature":"${MD5($.gameCode + $.gameScore)}"}`
  }
  // 发起请求
  const result = await Request(options);
  if (result?.isSuccess && result?.resultCode == "00000" && result?.data?.obtainScore) {
    $.gameScores += result.data.obtainScore;
    $.userRemainingCount -= 1;
  } else {
    $.log($.toStr(result));
  }
}


// 兑换次数
async function partyExchange() {
  // 构造请求
  let options = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/partyExchange`,
    headers: {
      'Cookie': $.CPS_CK,
      'Content-Type': `application/json`
    },
    body: `{"code":"${$.gameCode}"}`
  }
  // 发起请求
  const result = await Request(options);
  if (result?.isSuccess && result?.resultCode == "00000") {
    $.log(`🎉 游戏机会兑换成功`);
  } else if (result?.resultCode == "A0211") {
    $.log("❌ 游戏机会兑换失败, " + result.resultMsg);
  } else {
    $.log($.toStr(result));
  }
}

async function gameMain() {
  await $.wait(3e3);
  await gameStart();  // 开始游戏
  if (!$.userRemainingCount) return;
  $.log(`开始[打地鼠]游戏...`);
  await $.wait(1000 * 30);  // 等待 30 秒
  await submitScore();  // 提交分数
}


// 获取签到数据
function GetCookie() {
  if (/initMember/.test($request.url)) {
    debug($request.headers);
    debug($response.body);
    const headers = ObjectKeys2LowerCase($request['headers']);
    $.log("HISENSE_SWEIXIN: " + headers['cookie']);
    $.setdata(headers['cookie'], 'HISENSE_SWEIXIN');
    $.token = $response.body.match(/TOKEN_ACTIVITY=(?:\w)+/) ? $response.body.match(/TOKEN_ACTIVITY=(?:\w)+/)[0] : '';
    if ($.token) {
      $.log("HISENSE_CPS: " + $.token);
      $.setdata($.token, 'HISENSE_CPS');
      $.msg($.name, ``, `🎉 签到数据获取/更新成功。`);
    }
  }
}

// 脚本执行入口
if (typeof $request !== `undefined`) {
  GetCookie();
  $.done();
} else {
  !(async () => {
    await main();  // 主函数
  })()
    .catch((e) => $.messages.push(e.message || e) && $.logErr(e))
    .finally(async () => {
      await sendMsg($.messages.join('\n').trimStart().trimEnd());  // 推送通知
      $.done();
    })
}


// 获取微信 Code
async function getWxCode() {
  try {
    $.codeList = [];
    $.codeServer = ($.isNode() ? process.env["CODESERVER_ADDRESS"] : $.getdata("@codeServer.address")) || '';
    $.codeFuc = ($.isNode() ? process.env["CODESERVER_FUN"] : $.getdata("@codeServer.fun")) || '';
    if (!$.codeServer) return $.log(`⚠️ 未配置微信 Code Server。`);

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
 * 数据脱敏
 * @param {string} string - 传入字符串
 * @param {number} head_length - 前缀展示字符数，默认为 2
 * @param {number} foot_length - 后缀展示字符数，默认为 2
 * @returns {string} - 返回字符串
 */
function hideSensitiveData(string, head_length = 2, foot_length = 2) {
  try {
    let star = '';
    for (var i = 0; i < string.length - head_length - foot_length; i++) {
      star += '*';
    }
    return string.substring(0, head_length) + star + string.substring(string.length - foot_length);
  } catch (e) {
    return string;
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

// Bark 通知
async function barkNotice(title, content) {
  const bark_key = ($.isNode() ? process.env.bark_key : $.getdata('bark_key')) || '';
  if (!bark_key) return;
  // 构造请求
  let url = `https://api.day.app/${bark_key}/${encodeURIComponent(title)}/${encodeURIComponent(content.trimStart().trimEnd())}`
  // 发起请求
  const result = await Request(url);
  result?.code == 200 ? $.log(`🎉 bark 推送成功`) : $.log(`❌ bark 推送失败`);
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

// 生成随机数
function randomNumber(min = 0, max = 100) {
  return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}

// MD5 (Message-Digest Algorithm)
function MD5(string) { function RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); } function AddUnsigned(lX, lY) { var lX4, lY4, lX8, lY8, lResult; lX8 = (lX & 0x80000000); lY8 = (lY & 0x80000000); lX4 = (lX & 0x40000000); lY4 = (lY & 0x40000000); lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF); if (lX4 & lY4) { return (lResult ^ 0x80000000 ^ lX8 ^ lY8); } if (lX4 | lY4) { if (lResult & 0x40000000) { return (lResult ^ 0xC0000000 ^ lX8 ^ lY8); } else { return (lResult ^ 0x40000000 ^ lX8 ^ lY8); } } else { return (lResult ^ lX8 ^ lY8); } } function F(x, y, z) { return (x & y) | ((~x) & z); } function G(x, y, z) { return (x & z) | (y & (~z)); } function H(x, y, z) { return (x ^ y ^ z); } function I(x, y, z) { return (y ^ (x | (~z))); } function FF(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function GG(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function HH(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function II(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function ConvertToWordArray(string) { var lWordCount; var lMessageLength = string.length; var lNumberOfWords_temp1 = lMessageLength + 8; var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64; var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16; var lWordArray = Array(lNumberOfWords - 1); var lBytePosition = 0; var lByteCount = 0; while (lByteCount < lMessageLength) { lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)); lByteCount++; } lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition); lWordArray[lNumberOfWords - 2] = lMessageLength << 3; lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29; return lWordArray; }; function WordToHex(lValue) { var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount; for (lCount = 0; lCount <= 3; lCount++) { lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValue_temp = "0" + lByte.toString(16); WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2); } return WordToHexValue; }; function Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); } } return utftext; }; var x = Array(); var k, AA, BB, CC, DD, a, b, c, d; var S11 = 7, S12 = 12, S13 = 17, S14 = 22; var S21 = 5, S22 = 9, S23 = 14, S24 = 20; var S31 = 4, S32 = 11, S33 = 16, S34 = 23; var S41 = 6, S42 = 10, S43 = 15, S44 = 21; string = Utf8Encode(string); x = ConvertToWordArray(string); a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; for (k = 0; k < x.length; k += 16) { AA = a; BB = b; CC = c; DD = d; a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756); c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE); a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A); c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501); a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF); c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE); a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193); c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821); a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340); c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA); a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], S22, 0x2441453); c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8); a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6); c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED); a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8); c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A); a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681); c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C); a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9); c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70); a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA); c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05); a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5); c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665); a = II(a, b, c, d, x[k + 0], S41, 0xF4292244); d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97); c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039); a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92); c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1); a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0); c = II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1); a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82); d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235); c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB); b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391); a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD); } var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d); return temp.toLowerCase(); }

// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise(((e, r) => { s.call(this, t, ((t, s, a) => { t ? r(t) : e(s) })) })) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; if (this.getdata(t)) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise((e => { this.get({ url: t }, ((t, s, r) => e(r))) })) } runScript(t, e) { return new Promise((s => { let r = this.getdata("@chavy_boxjs_userCfgs.httpapi"); r = r ? r.replace(/\n/g, "").trim() : r; let a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); a = a ? 1 * a : 20, a = e && e.timeout ? e.timeout : a; const [i, o] = r.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: a }, headers: { "X-Key": i, Accept: "*/*" }, timeout: a }; this.post(n, ((t, e, r) => s(r))) })).catch((t => this.logErr(t))) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), r = !s && this.fs.existsSync(e); if (!s && !r) return {}; { const r = s ? t : e; try { return JSON.parse(this.fs.readFileSync(r)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), r = !s && this.fs.existsSync(e), a = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, a) : r ? this.fs.writeFileSync(e, a) : this.fs.writeFileSync(t, a) } } lodash_get(t, e, s = void 0) { const r = e.replace(/\[(\d+)\]/g, ".$1").split("."); let a = t; for (const t of r) if (a = Object(a)[t], void 0 === a) return s; return a } lodash_set(t, e, s) { return Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce(((t, s, r) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[r + 1]) >> 0 == +e[r + 1] ? [] : {}), t)[e[e.length - 1]] = s), t } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, r] = /^@(.*?)\.(.*?)$/.exec(t), a = s ? this.getval(s) : ""; if (a) try { const t = JSON.parse(a); e = t ? this.lodash_get(t, r, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, r, a] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(r), o = r ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, a, t), s = this.setval(JSON.stringify(e), r) } catch (e) { const i = {}; this.lodash_set(i, a, t), s = this.setval(JSON.stringify(i), r) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = { redirection: !1 })), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, ((t, s, r) => { !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, r) })); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then((t => { const { statusCode: s, statusCode: r, headers: a, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: r, headers: a, body: i, bodyBytes: o }, i, o) }), (t => e(t && t.error || "UndefinedError"))); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", ((t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } })).then((t => { const { statusCode: r, statusCode: a, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: r, statusCode: a, headers: i, rawBody: o, body: n }, n) }), (t => { const { message: r, response: a } = t; e(r, a, a && s.decode(a.rawBody, this.encoding)) })) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = { redirection: !1 })), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, ((t, s, r) => { !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, r) })); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then((t => { const { statusCode: s, statusCode: r, headers: a, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: r, headers: a, body: i, bodyBytes: o }, i, o) }), (t => e(t && t.error || "UndefinedError"))); break; case "Node.js": let r = require("iconv-lite"); this.initGotEnv(t); const { url: a, ...i } = t; this.got[s](a, i).then((t => { const { statusCode: s, statusCode: a, headers: i, rawBody: o } = t, n = r.decode(o, this.encoding); e(null, { status: s, statusCode: a, headers: i, rawBody: o, body: n }, n) }), (t => { const { message: s, response: a } = t; e(s, a, a && r.decode(a.rawBody, this.encoding)) })) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let r = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in r) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[e] : ("00" + r[e]).substr(("" + r[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let r = t[s]; null != r && "" !== r && ("object" == typeof r && (r = JSON.stringify(r)), e += `${s}=${r}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", r = "", a) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: return { url: t.url || t.openUrl || t["open-url"] }; case "Loon": return { openUrl: t.openUrl || t.url || t["open-url"], mediaUrl: t.mediaUrl || t["media-url"] }; case "Quantumult X": return { "open-url": t["open-url"] || t.url || t.openUrl, "media-url": t["media-url"] || t.mediaUrl, "update-pasteboard": t["update-pasteboard"] || t.updatePasteboard }; case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, r, i(a)); break; case "Quantumult X": $notify(e, s, r, i(a)); case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), r && t.push(r), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise((e => setTimeout(e, t))) } done(t = {}) { const e = ((new Date).getTime() - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
