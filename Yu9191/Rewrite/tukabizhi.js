
/*
图卡壁纸
[rewrite_local]
https://smallatom.xyz/bz/img006/periodList url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/tukabizhi.js

[mitm]
hostname = smallatom.xyz
*/

var body = $response.body;
body = body.replace(/"is_vip":"1"/g, '"is_vip": "0"');
$done({ body });
