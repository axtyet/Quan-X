/*************************************

项目名称：记乎
软件版本：3.4.5
下载地址：https://is.gd/M1pfGl
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.geefoo\.cn\/v2\/account\/userinfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jihu.js

[mitm]
hostname = api.geefoo.cn

*************************************/


var body = JSON.parse($response.body);

body.vip.expired_at = 4102363747;

$done({ body: JSON.stringify(body) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
