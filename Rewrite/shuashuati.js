/*************************************

项目名称：刷刷题
下载地址：https://t.cn/A60szmtc
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.shuashuati\.com url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/shuashuati.js

[mitm]
hostname = api.shuashuati.com

*************************************/


var body = $response.body;

function deepDelete(chxm1024, propToDelete) {
  for (let prop in chxm1024) {
    if (prop === propToDelete) {
      delete chxm1024[prop];
    } else if (typeof chxm1024[prop] === "object") {
      deepDelete(chxm1024[prop], propToDelete);
    }
  }
}
var chxm1023 = JSON.parse(body);
deepDelete(chxm1023, ['adInfo','defaultAd']);
body = JSON.stringify(chxm1023);

body = body.replace(/\"state":\d+/g, '\"state":2');

body = body.replace(/\"vipToTime":\w+/g, '\"vipToTime":"2099-09-09 09:09:09"');

body = body.replace(/\"vipToTimeStr":\w+/g, '\"vipToTimeStr":"2099-09-09 09:09:09"');

body = body.replace(/\"first":\d+/g, '\"first":1');

body = body.replace(/\"userDou":\d+/g, '\"userDou":1');

body = body.replace(/\"balance":\w+/g, '\"balance":1');

body = body.replace(/\"adType":"(.*?)"/g, '\"adType":null');

body = body.replace(/\"pay":\d+/g, '\"pay":0');

body = body.replace(/\"pay":\w+/g, '\"pay":false');

body = body.replace(/\"free":\d+/g, '\"free":1');

body = body.replace(/\"word_vip":\d+/g, '\"word_vip":1');

body = body.replace(/\"from":\d+/g, '\"from":0');

$done({body});
