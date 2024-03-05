
/*

开发者刘杰两款app合集 
传统文化国学
高考英语听力

[rewrite_local]
https:\/\/.*\.cos\.(ap-guangzhou|ap-beijing)\.myqcloud\.com\/dataUrl url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/liujie.js

[mitm] 

hostname = cos.ap-guangzhou.myqcloud.com, cos.ap-beijing.myqcloud.com
*/

var responseBody = $response.body;

responseBody = responseBody.replace(/("needVip"\s*:\s*)true/g, '$1false');

$done({ body: responseBody });
