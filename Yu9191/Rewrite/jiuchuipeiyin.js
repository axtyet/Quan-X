/*

九锤配音

[rewrite_local]
https://api.next.bspapp.com/client url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/jiuchuipeiyin.js
[mitm] 
hostname = api.next.bspapp.com

**/

var Q = JSON.parse($response.body);
Q.data.vip = 1;
//Q.data.vipExpiredTim = "2099-11-01 20:58:21";
$done({body : JSON.stringify(Q)});
