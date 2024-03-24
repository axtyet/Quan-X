/*
昭昭医考
解锁付费课程观看权限
题库加密 我没密钥

[rewrite_local]

https://api.yikao88.com/api-shop/course/app/v5/selectDetail url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/zhaozhaoyikao.js

[mitm]
hostname = api.yikao88.com
*/
var body = $response.body;


body = body.replace(/("buy"\s*:\s*)false/g, '$1true');


body = body.replace(/("freeTrial"\s*:\s*)\d+/g, '$11');

$done({ body: body });
