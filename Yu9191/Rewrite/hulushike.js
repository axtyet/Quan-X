/*
葫芦时刻 3.2.01

[rewrite_local]

https://api-search.hulusaas.com/api/user/ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/hulushike.js


[mitm]
hostname = api-search.hulusaas.com
*/


var Q = JSON.parse($response.body);
Q.result.payType = 1;
Q.result.validTime = "2099-09-01";
Q.result.money = "999.99";//自慰
Q.result.hasPayItem = 1;
Q.result.vipLevel = 1;
Q.result.isCard = 1;
Q.result.isAutoPay = 1;
$done({body : JSON.stringify(Q)});
