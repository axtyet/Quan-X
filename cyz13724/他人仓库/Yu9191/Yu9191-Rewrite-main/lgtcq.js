
/*
灵敢提词器 4.2.0

[rewrite_local]

https://teleprompter-api.quthing.com/vip/state url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/lgtcq.js


[mitm]
hostname = teleprompter-api.quthing.com
*/




var Q = JSON.parse($response.body);
Q.data.vipType = 1;
Q.data.androidVipType = 7;
Q.data.validVip = true;
Q.data.validViptrialVip = true;
Q.data.expireTime = 4699703622370;
$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
