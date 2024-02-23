/*

听书助手

[rewrite_local]
https:\/\/www\.huojiwangluo.cn\/ting\/user\/(get|anonylogin) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/tingshuzhushou.js

[mitm] 
hostname = www.huojiwangluo.cn

*/

var obj = JSON.parse($response.body);
obj.user_info = "永久 vip";
obj.vip_expire = 4070880000;
obj.vip_state = 1;
$done({body: JSON.stringify(obj)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
