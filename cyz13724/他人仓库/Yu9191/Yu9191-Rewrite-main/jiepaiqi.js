/*************************************

项目名称：节拍器
软件版本：2.6.0
下载地址：https://is.gd/vPe5gw
脚本作者：安妮
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/metronome-api\.quthing\.com\/vip\/state url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jiepaiqi.js

[mitm]
hostname = metronome-api.quthing.com

*************************************/


var anni = JSON.parse($response.body);

anni.data.vipType = 3,
anni.data.validVip = true,
anni.data.trialVip = false,
anni.data.expireTime = 4102372800000,
anni.data.vipCount = 765700,

$done({ body: JSON.stringify(anni) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
