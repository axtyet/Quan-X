/*
狮子老爸讲故事
解锁会员权益
付费专享

[rewrite_local]

^http:\/\/152\.136\.134\.81:8090\/wechat\/(weiXin\/queryUserById|classify\/(getClassifyInfoByIdList2|getIndexPlay2)|audio\/getList2) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/shizilaobajgs.js

[mitm]
hostname = 152.136.134.81:8090
*/
var body = $response.body;

// 试听
body = body.replace(/("auditionStatus"\s*:\s*)\d+/g, '$11');

// 试听
body = body.replace(/("auditionStatusFlag"\s*:\s*)\d+/g, '$11');

//下载
body = body.replace(/("downloadStatus"\s*:\s*)\d+/g, '$11');


// 开始
body = body.replace(/("vipStartDate"\s*:\s*)null/g, '$1"1711261640000"');

// 是否
body = body.replace(/("isVip"\s*:\s*)\d+/g, '$11');

// 到期
body = body.replace(/("vipEndDate"\s*:\s*)null/g, '$1"999999999999"');

// 名字
body = body.replace(/("nickName"\s*:\s*)"[^"]+"/g, '$1"Baby"');

// 名字
//body = body.replace(/("name"\s*:\s*)"[^"]+"/g, '$1"Baby"');
$done({ body: body });


