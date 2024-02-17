/*
遥忘
2023.12.13
[rewrite_local]
^https:\/\/(mars-prod\.|ins-web\.whalean\.com\/(poseidon-service\/api\/user\/homeData|member\/userMemberHomePageV2|taskcenter\/getGrowthInfo|user\/getpersonalcenterlikecount)) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yw.js

[mitm]
hostname = mars-prod.whalean.com, ins-web.whalean.com

*/

var body = $response.body;
var url = $request.url;

if (url.includes("/api/user/homeData")) {
    body = body.replace(/"userId":\d+/, '"userId":6666');
    body = body.replace(/"likeCount":\d+/, '"likeCount":999999888');
    body = body.replace(/"peopleViewNum":\d/, '"peopleViewNum":988888888');
    body = body.replace(/"fansCount":\d/, '"fansCount":99999999');
    body = body.replace(/"hasVip":0/, '"hasVip":1');
    body = body.replace(/"level":0/, '"level":1');
    body = body.replace(/"userType":null/, '"userType":3');
    body = body.replace(/"photographerFlag":false/, '"photographerFlag":true');
} else if (url.includes("/member/userMemberHomePageV2")) {
    body = body.replace(/"memberDisInfoDescription":"限时2\.6折 成为会员望得更远"/, '"memberDisInfoDescription":"lovebabyforever"');
    body = body.replace(/"memberExpirationTime":null/, '"memberExpirationTime":9997004143863');
    body = body.replace(/"permanent":false/, '"permanent":true');
    body = body.replace(/"memberLevel":null/, '"memberLevel":1');
} else if (url.includes("/taskcenter/getGrowthInfo")) {
    body = body.replace(/"growthLevelName":"\w+"/, '"growthLevelName":"baby"');
    body = body.replace(/"aggDay":\d/, '"aggDay":6');
    body = body.replace(/"growthLevel":1/, '"growthLevel":6');
} else if (url.includes("/user/getpersonalcenterlikecount")) {
    body = body.replace(/"batchcount":\d/, '"batchcount":9999999999');
    body = body.replace(/"huozancount":\d/, '"huozancount":9999999999999');
    body = body.replace(/"likecount":\d/, '"likecount":999999999999');
}

$done({ body });

