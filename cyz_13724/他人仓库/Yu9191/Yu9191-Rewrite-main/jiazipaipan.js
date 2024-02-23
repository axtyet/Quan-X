/******************************

脚本名称: 甲子排盘
脚本作者：ios151
更新时间：2023年8月20日 22:37
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

***************************

[rewrite_local]

^https:\/\/app.iyzbz.com\/app\/user\/selfinfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jiazipaipan.js

[mitm] 

hostname = app.iyzbz.com

*******************************/

var baby = JSON.parse($response.body);
baby.data.memberLevel = 1;
baby.data.userName = "牛马算命";
baby.data.expireTime = "2023-13-32T25:61:41.000+08:00";
$done({body : JSON.stringify(baby)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
