
/*
灵敢提词器 4.2.0

[rewrite_local]

https://teleprompter-api.quthing.com/vip/state url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/lgtcq.js


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
