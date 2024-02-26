/*
羿文教育
课程无法解决
题库 下载资源都没问题
tip：如果您搬运借鉴请备注来源 虽然简单 毕竟花费时间啦
[rewrite_local]
#课程题库
https://proxyweb\.yiwenjy\.com/yiwen_mobile/(queryApp|query_classDetail_info) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ywjy.js

[mitm] 

hostname = proxyweb.yiwenjy.com
*/


var body = $response.body;

body = body.replace(/("tryBuy"\s*:\s*)\d+/g, '$12');
body = body.replace(/("leven"\s*:\s*)\d+/g, '$10');
body = body.replace(/("isLook"\s*:\s*)\d+/g, '$11');

body = body.replace(/("type"\s*:\s*)\d+/g, '$11');

$done({ body });


