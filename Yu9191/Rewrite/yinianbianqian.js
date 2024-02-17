/**
 *项目名称：一念便签
 *下载地址：https://apps.apple.com/app/id1473578864



[rewrite_local]
^https?:\/\/yinian\.pro\/api\/user url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yinianbianqian.js

[MITM]
hostname = yinian.pro

*/
let lovebaby = JSON.parse($response.body);
lovebaby.data.is_vip = 1;
lovebaby.data.vip_end_time = "6666-06-06 06:06:06";
$done({ body: JSON.stringify(lovebaby) });
