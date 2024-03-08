/*
大渔大师课

[rewrite_local]


https:\/\/api\.dayuclass\.com\/api\/v2\/(course|member\/detail) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/dydsk.js

[mitm] 

hostname = api.dayuclass.com
*/
let url = $request.url;

if (url.includes("https://api.dayuclass.com/api/v2/member/detail")) {
    let obj = JSON.parse($response.body);
    obj.data.nick_name = "Baby";
    obj.data.role_expired_at = "2099-09-09";
    obj.data.had_vip = 1;
    obj.data.vipExpired = 0;
    obj.data.credit1 = 98992;
    obj.data.buy_status = 1;
    $done({
        body: JSON.stringify(obj),
        status: 200
    });
} else if (url.includes("https://api.dayuclass.com/api/v2/course")) {
    let body = $response.body;
    body = body.replace(/"is_watch":\s*false/g, '"is_watch": true');
    body = body.replace(/"is_trailer":\s*0/g, '"is_trailer": 1');

    $done({ body });
} else {
    $done({});
}
