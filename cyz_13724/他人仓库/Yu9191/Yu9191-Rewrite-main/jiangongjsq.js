/*

项目名称：建工计算器
下载地址：applestore
特别说明：登录解锁
脚本作者：@ios151
使用声明：仅供参考，禁止转载与售卖！


[rewrite_local]
^https:\/\/calc\.kuaicad\.com\/authority\/verify_vip\? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jiangongjsq.js

[mitm]
hostname = calc.kuaicad.com

*/
var originalResponse = $response.body;

var lovebaby = JSON.parse(originalResponse);
lovebaby.data.type = 3;
lovebaby.data.expiresTime = "2099-08-03 16:11:22";
lovebaby.data.isExpires = false;
var modifiedResponseString = JSON.stringify(lovebaby);
$done({
  body: modifiedResponseString
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
