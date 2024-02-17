/*
来音节拍器  

[rewrite_local]


https://metronome-api\.quthing\.com/(login/mobile|vip/state) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/laiyinjiepaiqi.js

[mitm] 

hostname = metronome-api.quthing.com

**/


var body = $response.body;

body = body.replace(/"vipType":\s*\d+/g, '"vipType":3');

body = body.replace(/"validVip":\s*false/g, '"validVip":true');

body = body.replace(/"trialVip":\s*false/g, '"trialVip":true');

body = body.replace(/"expireTime":\s*\d+/g, '"expireTime":4707580800000');

body = body.replace(/"vipCount":\s*\d+/g, '"vipCount":9999999');

$done({ body });
