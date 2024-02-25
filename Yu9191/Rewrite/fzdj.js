/*
芳仲短剧 微信小程序
解锁会员 解锁神剧

[rewrite_local]
https:\/\/slb\.weilianmenggz\.cn\/api\/(theater\/without\/group\/index|user\/info) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/fzdj.js

[mitm] 

hostname = slb.weilianmenggz.cn
*/
var body = $response.body;
var url = $request.url;

if (url.includes("slb.weilianmenggz.cn/api/user/info")) {
    var obj = JSON.parse(body);
    obj.data.give_kb_num = 9999;//k币
    obj.data.nickname = "广告必须死";
    obj.data.vip_time = "2099-09-29T23:59:59+08:00";
    body = JSON.stringify(obj);
} else if (url.includes("slb.weilianmenggz.cn/api/theater/without/group/index")) {
    body = body.replace(/("lock"\s*:\s*)0/g, '$11');
}

$done({ body: body });
