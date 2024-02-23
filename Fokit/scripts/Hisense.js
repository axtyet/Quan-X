/**
 * 脚本名称：海信爱家
 * 活动入口：海信爱家（公众号） -> 个人中心 -> 会员中心 -> 玩转积分 -> 签到
 * 活动说明：每日签到送10积分；连续签到7天、第7天额外赠送20积分；连续签到20天，第20天额外赠送50积分；连续签到50天，第50天额外赠送100积分。
 * 脚本说明：配置重写并手动签到一次或进入打地鼠活动页面即可获取签到数据。兼容 Node.js 环境，变量名称 HISENSE_CPS，多账号分割符 "@"。
 * 仓库地址：https://github.com/FoKit/Scripts
 * 更新记录：2023-11-03  优化 Cookie 获取流程，进入个人中心即可获取 Cookie
 * -------- 2023-11-16  当 Cookie 失效时，通过 Bark App 推送通知
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
const notify = $.isNode() ? require('./sendNotify') : '';
const HISENSE_CPS_KEY = 'HISENSE_CPS';
const HISENSE_SWEIXIN_KEY = 'HISENSE_SWEIXIN';
const HISENSE_GAME_SCORE_KEY = 'HISENSE_GAME_SCORE';
const HISENSE_PARTY_EXCHANGE_KEY = 'HISENSE_PARTY_EXCHANGE';
const bark_key = ($.isNode() ? process.env.bark_key : $.getdata('bark_key')) || '';
let HISENSE_CPS = ($.isNode() ? process.env.HISENSE_CPS : $.getdata(HISENSE_CPS_KEY)) || '';
let HISENSE_SWEIXIN = ($.isNode() ? process.env.HISENSE_SWEIXIN : $.getdata(HISENSE_SWEIXIN_KEY)) || '';
let HISENSE_GAME_SCORE = ($.isNode() ? process.env.HISENSE_GAME_SCORE : $.getdata(HISENSE_GAME_SCORE_KEY)) || '15-20';
let HISENSE_PARTY_EXCHANGE = ($.isNode() ? process.env.HISENSE_PARTY_EXCHANGE : $.getdata(HISENSE_PARTY_EXCHANGE_KEY)) || 'false';
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata('is_debug')) || 'false';
let message = '';

if (isGetCookie = typeof $request !== `undefined`) {
  GetCookie();
  $.done();
} else {
  !(async () => {
    let HISENSE_CPS_ARR = HISENSE_CPS.split('@');
    let HISENSE_SWEIXIN_ARR = HISENSE_SWEIXIN.split('@');
    if (!HISENSE_CPS_ARR[0]) {
      $.msg($.name, '❌ 请先获取海信爱家签到数据。');
      return;
    }
    console.log(`\n共有[${HISENSE_CPS_ARR.length}]个海信爱家账号`);
    for (let i = 0; i < HISENSE_CPS_ARR.length; i++) {
      if (HISENSE_CPS_ARR[i]) {
        $.SWEIXIN_CK = HISENSE_SWEIXIN_ARR[i];
        $.CPS_CK = HISENSE_CPS_ARR[i];
        $.index = i + 1;
        $.isLogin = true;
        $.gameScores = 0;
        $.userRemainingCount = 0;
        let randomInt = Math.floor(Math.random() * 30);
        console.log(`\n随机等待 ${randomInt} 秒\n`);
        await $.wait(randomInt * 1000);
        console.log(`===== 账号[${$.index}]开始执行 =====\n`);
        await main();  // 每日签到
        if (!$.isLogin) {
          let msg = `❌ Cookie 已失效，请重新获取。\n`;
          if (bark_key) await barkNotice($.name, `账号[${$.index}] ${msg}`);  // 当 Cookie 失效时，通过 Bark App 推送通知。
          message += msg;
          console.log(msg);
          break;
        }
        await gameStart();  // 开始游戏
        while ($.userRemainingCount >= 1) {
          await $.wait(1000 * 3);
          await gameStart();  // 开始游戏{
          if (!$.userRemainingCount) break;
          console.log(`开始[打地鼠]游戏...`);
          await $.wait(1000 * 30);  // 等待 30 秒
          await submitScore();  // 提交分数
        }
        if (HISENSE_PARTY_EXCHANGE == "true") {
          for (let j = 1; j <= 2; j++) {
            await $.wait(1000 * 3);
            await partyExchange();
            await gameStart();  // 开始游戏{
            if (!$.userRemainingCount) break;
            console.log(`开始[打地鼠]游戏...`);
            await $.wait(1000 * 30);  // 等待 30 秒
            await submitScore();  // 提交分数
          }
        }
        if ($.SWEIXIN_CK) {
          await getInfo();  // 用户信息
        } else {
          message += `${$.message}\n参与打地鼠活动共获得 ${$.gameScores} 积分 🎉\n`;
        }
      }
    }
    if (message) {
      message = message.replace(/\n+$/, '');
      if ($.isNode()) {
        await notify.sendNotify($.name, message);
      } else {
        $.msg($.name, '', message);
      }
    }
  })()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
}


// 获取签到数据
function GetCookie() {
  if ($request && /initMember/.test($request.url)) {
    $.ck = $request.headers['COOKIE'] || $request.headers['Cookie'] || $request.headers['cookie'];
    if ($.ck) {
      console.log("HISENSE_SWEIXIN: " + $.ck);
      $.setdata($.ck, HISENSE_SWEIXIN_KEY);
      // if (!HISENSE_SWEIXIN) {
      //   $.msg($.name, ``, `🎈 点击【玩转积分】签到一次即可获取签到数据。`);
      // }
    }
    $.token = $response.body.match(/TOKEN_ACTIVITY=(?:\w)+/) ? $response.body.match(/TOKEN_ACTIVITY=(?:\w)+/)[0] : '';
    if ($.token) {
      console.log("HISENSE_CPS: " + $.token);
      $.setdata($.token, HISENSE_CPS_KEY);
      $.msg($.name, ``, `🎉 签到数据获取/更新成功。`);
    }
  }//  else if ($request && /participate|noLoginCheck/.test($request.url)) {
  //   $.data = $request.headers['COOKIE'] || $request.headers['Cookie'] || $request.headers['cookie'];
  //   if ($.data) {
  //     console.log("HISENSE_CPS: " + $.data);
  //     $.setdata($.data, HISENSE_CPS_KEY);
  //     if (!HISENSE_CPS) {
  //       $.msg($.name, ``, `🎉 签到数据获取成功。`);
  //     }
  //   }
  //   try {
  //     console.log("HISENSE_BODY: " + $response.body);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}


// 每日签到
function main() {
  let opt = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/participate`,
    headers: {
      // 'X-Requested-With': `XMLHttpRequest`,
      // 'Connection': `keep-alive`,
      // 'Accept-Encoding': `gzip, deflate, br`,
      'Content-Type': `application/json`,
      // 'Origin': `https://cps.hisense.com`,
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/4G Language/zh_CN`,
      'Cookie': $.CPS_CK,
      // 'Host': `cps.hisense.com`,
      // 'Referer': `https://cps.hisense.com/static/game_sign.shtml?code=74f51fd29cea445e9b95eb0dd14fba40`,
      // 'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
      // 'Accept': `application/json, text/javascript, */*; q=0.01`
    },
    body: `{"code":"74f51fd29cea445e9b95eb0dd14fba40"}`
  }
  debug(opt);
  return new Promise(resolve => {
    $.post(opt, async (err, resp, data) => {
      try {
        err && $.log(err);
        if (data) {
          debug(data);
          $.message = '';
          let result = JSON.parse(data);
          if (result?.isSuccess && result?.resultCode == "00000") {
            $.signScores = result.data.obtainScore;
            $.message += `签到成功，获得 ${$.signScores} 积分 🎉`;
          } else if (result?.resultCode == "A0202") {
            $.message += `重复签到 ❌`;
          } else {
            $.isLogin = false;
            $.message += `${result.resultMsg} ❌`;
            console.log(JSON.stringify($.message));
          }
        } else {
          $.log("服务器返回了空数据");
        }
      } catch (error) {
        $.log(error);
      } finally {
        resolve();
      }
    })
  })
}


// 用户信息
async function getInfo() {
  let opt = {
    url: `https://sweixin.hisense.com/ecrp/member/initMember`,
    headers: {
      // 'Accept-Encoding': `gzip, deflate, br`,
      'Cookie': $.SWEIXIN_CK,
      // 'Connection': `keep-alive`,
      // 'Accept': `application/json, text/plain, */*`,
      // 'Referer': `https://sweixin.hisense.com/front/?`,
      // 'Host': `sweixin.hisense.com`,
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/4G Language/zh_CN`,
      // 'Authorization': ``,
      // 'Accept-Language': `zh-CN,zh-Hans;q=0.9`
    }
  }
  debug(opt);
  return new Promise(resolve => {
    $.get(opt, async (err, resp, data) => {
      try {
        err && $.log(err);
        if (data) {
          debug(data);
          let text = '';
          let result = JSON.parse(data);
          if (result?.data?.memberDetail) {
            let memberDetail = result.data.memberDetail;
            const { gradeName, score, customerName, memberCard, kdOpenId, grade, grouthValue, thdCusmobile, nextGrouthValue } = memberDetail;
            text += `账号[${hideSensitiveData(thdCusmobile, 3, 4)}] ${$.message}\n参与打地鼠活动共获得 ${$.gameScores} 积分 🎉\n当前积分:${score}, 会员等级:${gradeName}, 成长值:${grouthValue}/${grouthValue + nextGrouthValue}\n`;
          } else {
            console.log(JSON.stringify(data));
            // text += `❌ 用户信息获取失败\n`;
            text += `${$.message}\n参与打地鼠活动共获得 ${$.gameScores} 积分 🎉\n`;
          }
          console.log("\n" + text);
          message += text;
        } else {
          $.log("❌ 服务器返回了空数据");
        }
      } catch (error) {
        $.log(error);
      } finally {
        resolve();
      }
    })
  })
}


// 开始游戏
async function gameStart() {
  let opt = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/getActivityInfo?code=a55ca53d96bd43be81c0df7ced7ef2b0`,
    headers: {
      'Cookie': $.CPS_CK,
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/4G Language/zh_CN`,
    }
  }
  debug(opt);
  return new Promise(resolve => {
    $.get(opt, async (err, resp, data) => {
      try {
        err && $.log(err);
        if (data) {
          debug(data);
          $.gameCode = '';
          let result = JSON.parse(data);
          $.gameCode = result.data.code;
          $.userRemainingCount = result.data.userRemainingCount;
        } else {
          $.log("❌ 服务器返回了空数据");
        }
      } catch (error) {
        $.log(error);
      } finally {
        resolve();
      }
    })
  })
}


// 提交分数
async function submitScore() {
  console.log(`游戏结束, 提交分数`);
  let ScoreArr = HISENSE_GAME_SCORE.split('-');
  $.gameScore = randomNumber(parseInt(ScoreArr[0]), parseInt(ScoreArr[1])) * 20;
  console.log(`提交分数: ${$.gameScore} 分`);
  let opt = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/participate`,
    headers: {
      'Cookie': $.CPS_CK,
      'Content-Type': `application/json`,
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/4G Language/zh_CN`,
    },
    body: `{"code":"${$.gameCode}","gameScore":"${$.gameScore}","gameSignature":"${MD5($.gameCode + $.gameScore)}"}`
  }
  debug(opt);
  return new Promise(resolve => {
    $.post(opt, async (err, resp, data) => {
      try {
        err && $.log(err);
        debug(data);
        let result = JSON.parse(data);
        if (result) {
          if (result?.isSuccess && result?.resultCode == "00000" && result?.data?.obtainScore) {
            // message += `打地鼠获得 ${result.data.obtainScore} 积分 🎉\n`;
            $.gameScores += result.data.obtainScore;
            $.userRemainingCount -= 1;
          } else {
            // $.message += `${result.resultMsg} ❌`;
            console.log(data);
          }
        } else {
          $.log("❌ 服务器返回了空数据");
        }
      } catch (error) {
        $.log(error);
      } finally {
        resolve();
      }
    })
  })
}


// 兑换次数
async function partyExchange() {
  let opt = {
    url: `https://cps.hisense.com/customerAth/activity-manage/activityUser/partyExchange`,
    headers: {
      'Cookie': $.CPS_CK,
      'Content-Type': `application/json`,
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.33(0x18002129) NetType/4G Language/zh_CN`,
    },
    body: `{"code":"${$.gameCode}"}`
  }
  debug(opt);
  return new Promise(resolve => {
    $.post(opt, async (err, resp, data) => {
      try {
        err && $.log(err);
        debug(data);
        let result = JSON.parse(data);
        if (result) {
          if (result?.isSuccess && result?.resultCode == "00000") {
            console.log(`🎉 游戏机会兑换成功`);
          } else if (result?.resultCode == "A0211") {
            console.log("❌ 游戏机会兑换失败, " + result.resultMsg);
          } else {
            console.log(data);
          }
        } else {
          $.log("服务器返回了空数据");
        }
      } catch (error) {
        $.log(error);
      } finally {
        resolve();
      }
    })
  })
}


// Bark 通知
async function barkNotice(title, content) {
  let opt = {
    url: `https://api.day.app/${bark_key}/${encodeURIComponent(title)}/${encodeURIComponent(content.replace(/\n+$/, ''))}`,
    headers: {
      'Content-Type': `application/x-www-form-urlencoded`
    }
  }
  debug(opt);
  return new Promise(resolve => {
    $.get(opt, (err, resp, data) => {
      try {
        err && $.log(err);
        debug(data);
        let result = JSON.parse(data);
        if (result?.code == 200) {
          console.log(`🎉 bark 推送成功`);
        } else {
          console.log(`❌ bark 推送失败`);
        }
      } catch (error) {
        $.log(error);
      } finally {
        resolve();
      }
    })
  })
}


// 数据脱敏
function hideSensitiveData(string, head_length = 2, foot_length = 2) {
  let star = '';
  try {
    for (var i = 0; i < string.length - head_length - foot_length; i++) {
      star += '*';
    }
    return string.substring(0, head_length) + star + string.substring(string.length - foot_length);
  } catch (e) {
    console.log(e);
    return string;
  }
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


// 生成随机数
function randomNumber(min = 0, max = 100) {
  return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}


// MD5 (Message-Digest Algorithm)
function MD5(string) { function RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); } function AddUnsigned(lX, lY) { var lX4, lY4, lX8, lY8, lResult; lX8 = (lX & 0x80000000); lY8 = (lY & 0x80000000); lX4 = (lX & 0x40000000); lY4 = (lY & 0x40000000); lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF); if (lX4 & lY4) { return (lResult ^ 0x80000000 ^ lX8 ^ lY8); } if (lX4 | lY4) { if (lResult & 0x40000000) { return (lResult ^ 0xC0000000 ^ lX8 ^ lY8); } else { return (lResult ^ 0x40000000 ^ lX8 ^ lY8); } } else { return (lResult ^ lX8 ^ lY8); } } function F(x, y, z) { return (x & y) | ((~x) & z); } function G(x, y, z) { return (x & z) | (y & (~z)); } function H(x, y, z) { return (x ^ y ^ z); } function I(x, y, z) { return (y ^ (x | (~z))); } function FF(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function GG(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function HH(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function II(a, b, c, d, x, s, ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac)); return AddUnsigned(RotateLeft(a, s), b); }; function ConvertToWordArray(string) { var lWordCount; var lMessageLength = string.length; var lNumberOfWords_temp1 = lMessageLength + 8; var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64; var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16; var lWordArray = Array(lNumberOfWords - 1); var lBytePosition = 0; var lByteCount = 0; while (lByteCount < lMessageLength) { lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)); lByteCount++; } lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition); lWordArray[lNumberOfWords - 2] = lMessageLength << 3; lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29; return lWordArray; }; function WordToHex(lValue) { var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount; for (lCount = 0; lCount <= 3; lCount++) { lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValue_temp = "0" + lByte.toString(16); WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2); } return WordToHexValue; }; function Utf8Encode(string) { string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); } else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); } else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); } } return utftext; }; var x = Array(); var k, AA, BB, CC, DD, a, b, c, d; var S11 = 7, S12 = 12, S13 = 17, S14 = 22; var S21 = 5, S22 = 9, S23 = 14, S24 = 20; var S31 = 4, S32 = 11, S33 = 16, S34 = 23; var S41 = 6, S42 = 10, S43 = 15, S44 = 21; string = Utf8Encode(string); x = ConvertToWordArray(string); a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; for (k = 0; k < x.length; k += 16) { AA = a; BB = b; CC = c; DD = d; a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756); c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE); a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A); c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501); a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF); c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE); a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193); c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821); a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340); c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA); a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], S22, 0x2441453); c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8); a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6); c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED); a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8); c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A); a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681); c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C); a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9); c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70); a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA); c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05); a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5); c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665); a = II(a, b, c, d, x[k + 0], S41, 0xF4292244); d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97); c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039); a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92); c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1); a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0); c = II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1); a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82); d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235); c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB); b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391); a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD); } var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d); return temp.toLowerCase(); }


// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } isShadowrocket() { return "undefined" != typeof $rocket } isStash() { return "undefined" != typeof $environment && $environment["stash-version"] } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, a] = i.split("@"), n = { url: `http://${a}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), a = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(a); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) }); else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t && t.error || "UndefinedError")); else if (this.isNode()) { let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: i, statusCode: r, headers: o, rawBody: a } = t, n = s.decode(a, this.encoding); e(null, { status: i, statusCode: r, headers: o, rawBody: a, body: n }, n) }, t => { const { message: i, response: r } = t; e(i, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) }); else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t && t.error || "UndefinedError")); else if (this.isNode()) { let i = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...o } = t; this.got[s](r, o).then(t => { const { statusCode: s, statusCode: r, headers: o, rawBody: a } = t, n = i.decode(a, this.encoding); e(null, { status: s, statusCode: r, headers: o, rawBody: a, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && i.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, i = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": i } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), this.isSurge() || this.isQuanX() || this.isLoon() ? $done(t) : this.isNode() && process.exit(1) } }(t, e) }
