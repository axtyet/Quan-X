/*
药店学堂
解锁全课程  

[rewrite_local]


https://api.yaodiandaxue.vip/api/opencourse/course/details url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yaodianxuetang.js

[mitm] 

hostname = api.yaodiandaxue.vip

**/

var body = $response.body;

body = body.replace(/"open":\s*false/g, '"open":true');

body = body.replace(/"studyStatus":\s*0/g, '"studyStatus":-1');

$done({ body });
