/**

脚本名称: 和计划心理
价格四位数的课程无法解锁
[rewrite_local]

https://cgzd.hejihua.com/api/teaching/project/catalog/v1 url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/hejihuaxl.js

[mitm] 

hostname = cgzd.hejihua.com

*/


var body = $response.body;

body = body.replace(/"finish":\s*false/g, '"finish": true')
           .replace(/"lock":\s*true/g, '"lock": false');

$done({ body });
