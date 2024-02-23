/*************************************

项目名称：时光手帐
脚本作者：安妮
软件版本：6.1.5
下载地址：https://is.gd/igxBsZ
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.shouzhang\.com\/memcenterlk\/member\/firstpage\.do url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/shiguangshouzhang.js

[mitm]
hostname = api.shouzhang.com

*************************************/


var body = JSON.parse($response.body);

body.data.vip = true;
body.data.grade.gradeName = "时光守护者";
body.data.grade.img = "http://npic.shouzhang.com/grade_sign_9.png";
body.data.grade.userNum = 1;

$done({ body: JSON.stringify(body) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
