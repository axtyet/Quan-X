/*
怪兽轻断食1.4.4


[rewrite_local]

https://ef.aiotoolbox.com.cn/basis/v2/init url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/gsqds.js

[mitm]
hostname = ef.aiotoolbox.com.cn

*/

var baby = JSON.parse($response.body);
baby.data.pro = true;//vip
baby.data.expiryTimeMillis = 253392455349000;//时间
$done({body : JSON.stringify(baby)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
