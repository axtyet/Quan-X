
/*
今日热榜 美区https://apps.apple.com/us/app/%E4%BB%8A%E6%97%A5%E7%83%AD%E6%A6%9C/id1453322696?l=zh-Hans-CN



[rewrite_local]

https://api2.tophub.app/account/sync url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jrrb.js

[mitm] 

hostname = api2.tophub.app

*/
var Q = JSON.parse($response.body);
Q.data.vip_expired = "8888888888";
Q.data.is_vip_now = true;
Q.data.is_vip = "1";
$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
