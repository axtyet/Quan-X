/*

SOOGIF工具永久会员
#小程序://SOOGIF工具/eIA7y46MQcygBVo

[rewrite_local]
https://www.soogif.com/search-smallapp/small-soogif/vip url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/soogif.js

[mitm] 
hostname = www.soogif.com

*/

var baby = JSON.parse($response.body);
baby.data.activeTime = "2099-09-09";
baby.data.leftNumMatting = 1;
baby.data.utmProductInfo = true;
baby.data.roleId = 1;
$done({body : JSON.stringify(baby)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
