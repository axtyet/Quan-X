/*
 妙音国学
 Ai未解锁 
 付费的全解锁
（会员目前是送的半年）
 同时也解锁会员功能
tip：如果您搬运借鉴请备注来源 虽然简单 毕竟花费时间啦

[rewrite_local]
#课程题库
https://gx\.miaoyin\.cn/(direct/token/(selectVideoClassCatalogueList|selectVideoClassDetails)|course/queryAiCourseCatalogue|user(token/info|VipEquity/token/findNewUserVipInfoV3)) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/mygx.js

[mitm] 

hostname = gx.miaoyin.cn
*/
var body = $response.body;

body = body.replace(/("isTryLearn"\s*:\s*)false/g, '$1true');
body = body.replace(/("isTry"\s*:\s*)false/g, '$1true');
body = body.replace(/("isUnlock"\s*:\s*)false/g, '$1true');
body = body.replace(/("vipStatus"\s*:\s*)\d+/g, '$11');
body = body.replace(/("isPay"\s*:\s*)\d+/g, '$11');
body = body.replace(/("vipTitle"\s*:\s*)".*?"/g, '$1"2099-09-29后过期"');

$done({ body });





