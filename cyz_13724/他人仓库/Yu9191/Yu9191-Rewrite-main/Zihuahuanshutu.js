/*******************************
脚本名称:  字画幻术图1.3.0
描述:仅支持quantumultx
脚本作者：ios151,三岁

[rewrite_local]
^https:\/\/api\.zihuaai\.com\/v1\/users\/accoun url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Zihuahuanshutu.js



[mitm]
hostname = api.zihuaai.com
*******************************/

var body = $response.body;
var data = JSON.parse(body);
data.data.isVip = 1;
data.data.vipExpired = 253392455349000;
body = JSON.stringify(data);
$done(body);











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
