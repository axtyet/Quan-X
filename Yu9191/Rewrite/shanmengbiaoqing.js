
/*
闪萌表情 2.0.12

[rewrite_local]

https://hi-api.weshineapp.com/v3.0/account/profile? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/shanmengbiaoqing.js


[mitm]
hostname = hi-api.weshineapp.com
*/



var Q = JSON.parse($response.body);
Q.data.is_vip = 1;
Q.data.vip_expiration_time = "2099-09-09";
Q.data.gender = 1;
$done({body : JSON.stringify(Q)});
