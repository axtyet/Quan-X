/*************************************

项目名称：灵敢足迹
软件版本：3.0.0
下载地址：https://is.gd/cHrCCs
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/footprint-api\.quthing\.com\/vip\/state url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/lgzj.js

[mitm]
hostname = footprint-api.quthing.com

*************************************/


var body = JSON.parse($response.body);

body.data.trialPeriod = false,
body.data.vipType = 7,
body.data.validVip = true,
body.data.expireTime = 4102372800000,
body.data.vipCount = 999999999,

$done({ body: JSON.stringify(body) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
