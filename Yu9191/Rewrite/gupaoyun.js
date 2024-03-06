/*
咕泡云课堂
全课程全题库解锁

[rewrite_local]

https:\/\/ke\.gupaoedu\.cn\/api\/(web\/quiz\/package|v2\/curriculum\/outline|user\/) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/gupaoyun.js

[mitm] 

hostname = ke.gupaoedu.cn
*/
if ($response.body) {
    let responseBody = $response.body;
    responseBody = responseBody.replace(/("isFreeAccess"\s*:\s*)0/g, '$11');
    responseBody = responseBody.replace(/("isHot"\s*:\s*)0/g, '$11');
    responseBody = responseBody.replace(/("isOwn"\s*:\s*)0/g, '$11');
    
    let Baby = JSON.parse(responseBody);
    if ($request.url.includes("https://ke.gupaoedu.cn/api/user/") && Baby.data) {
        Baby.data.nickName = "Baby";
    }
    $done({ body: JSON.stringify(Baby) });
} else {
    $done({});
}
