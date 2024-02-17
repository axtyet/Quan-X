/*
音壳 
类型：乐理试唱 音乐学院app
6.0.6
2023.12.21

[rewrite_local]
https://www.notetech.org/mobile url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yinke.js
https://www.notetech.org/mobile url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yinkedengji.js

[mitm]
hostname = www.notetech.org

*/

var body = $response.body;
body = body.replace(/"isVip"\s*:\s*0/g, '"isVip": 1');
body = body.replace(/"isTeacher"\s*:\s*0/g, '"isTeacher": 1');
body = body.replace(/"is_free"\s*:\s*0/g, '"is_free": 1');
body = body.replace(/"is_use"\s*:\s*0/g, '"is_use": 1');
body = body.replace(/"vipEndTime"\s*:\s*[^,}]+/g, '"vipEndTime": "2099-12-21"');//时间格式猜不出来
//body = body.replace(/"imgIdxName"\s*:\s*[^,}]+/g, '"imgIdxName": "https://raw.githubusercontent.com/Yu9191/-/main/babylogo.jpg"');
$done({ body });
