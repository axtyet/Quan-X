/**
ReadBot 
2024.01.06 
[rewrite_local]

https://api.readbot.tech/v1/vip/status url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ReadBot.js

[mitm] 
hostname = api.readbot.tech

*/

var Q = JSON.parse($response.body);
Q.pro_end_time = 4707215037000;
Q.is_forever = true;
$done({ body: JSON.stringify(Q) });