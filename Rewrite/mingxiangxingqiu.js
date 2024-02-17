/*************************************
项目名称：冥想星球
下载地址：https://t.cn/A6pmsyPj
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/kc\.xinli001\.com url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/mingxiangxingqiu.js

[mitm]
hostname = kc.xinli001.com

*************************************/


//冥想星球
var body = $response.body;

body = body.replace(/\"isVip":"\d+"/g, '\"isVip":"0"');

body = body.replace(/\"isVip":\d+/g, '\"isVip":0');

body = body.replace(/\"vipAttribute":\d+/g, '\"vipAttribute":0');

body = body.replace(/\"expiredTime":".*?"/g, '\"expiredTime":"2099-09-09 09:09:09"');

body = body.replace(/\"isJoin":\d+/g, '\"isJoin":1');

body = body.replace(/\"status":\d+/g, '\"status":1');

body = body.replace(/\"price":"\d+"/g, '\"price":"0"');

body = body.replace(/\"orderStatus":\d+/g, '\"orderStatus":1');

body = body.replace(/\"practiceLevel":\d+/g, '\"practiceLevel":0');

body = body.replace(/\"isJoin":\w+/g, '\"isJoin":true');

body = body.replace(/\"isjoin":\w+/g, '\"isjoin":true');

body = body.replace(/\"expired":\w+/g, '\"expired":false');

body = body.replace(/\"activityExpiredTime":\d+/g, '\"activityExpiredTime":4092599349');

body = body.replace(/\"isFree":\w+/g, '\"isFree":false');

$done({body});
