
/*
闪萌表情 2.0.12

[rewrite_local]

https://hi-api.weshineapp.com/v3.0/account/profile? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/shanmengbiaoqing.js


[mitm]
hostname = hi-api.weshineapp.com
*/



var Q = JSON.parse($response.body);
Q.data.is_vip = 1;
Q.data.vip_expiration_time = "2099-09-09";
Q.data.gender = 1;
$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
