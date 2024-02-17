/*
Knotes 1.0.2
读书笔记
2023.12.19

[rewrite_local]
https://knotesapp.cn/api/v1/account/profile? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Knotes.js

[mitm]
hostname = knotesapp.cn

*/
var body = $response.body;
body = body.replace(/"isVip"\s*:\s*false/g, '"isVip": true');
body = body.replace(/"vipExpiresAt"\s*:\s*0/g, '"vipExpiresAt": 4092595200000');
$done({ body });
