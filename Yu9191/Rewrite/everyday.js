/*
everyday-习惯养成
3.3.0
2023.12.21

[rewrite_local]
https://api.everyday.app/users url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/everyday.js

[mitm]
hostname = api.everyday.app

*/
let obj = JSON.parse($response.body);
obj.plan = "year"; 
obj.premium_access = "2099-09-09T00:00:00.000Z";
obj.last_action = "2023-12-20T19:02:52.000Z"; 
$done({ body: JSON.stringify(obj) });
