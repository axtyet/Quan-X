/*

九锤配音

[rewrite_local]
https://api.next.bspapp.com/client url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jiuchuipeiyin.js
[mitm] 
hostname = api.next.bspapp.com

**/

var Q = JSON.parse($response.body);
Q.data.vip = 1;
//Q.data.vipExpiredTim = "2099-11-01 20:58:21";
$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
