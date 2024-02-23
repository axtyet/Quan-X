/*

Blinkist 8.20.0
运行脚本,登录解锁
@ios151,仅测试Surge


[rewrite_local]

https://api.blinkist.com/v4/me/access url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Blinkist.js

[mitm] 
hostname = api.blinkist.com

*/

var baby = JSON.parse($response.body);
baby.user_access.marketplace = "itunes";
baby.user_access.valid_from = "2023-10-25T07:03:15.955+00:00";
baby.user_access.valid_until = "2999-09-09T07:02:25.000+00:00";
baby.user_access.type = "premium";
baby.user_access.will_renew = true;
baby.user_access.trial = "softpaywall";
$done({body : JSON.stringify(baby)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
