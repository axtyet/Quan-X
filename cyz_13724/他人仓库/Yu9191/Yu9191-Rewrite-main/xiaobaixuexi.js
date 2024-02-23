/*
小白学习打印 2.15.0
小白智慧打印 2.41.9
小白试卷宝 1.28

会员重写具有时效性,如果失效请用之前的"捕获"版本
https://raw.githubusercontent.com/Yu9191/Script/main/shijuan.js

[rewrite_local]

#小白学习打印
https://api.xbxxhz.com/graphql url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xiaobaixuexi.js

#小白智慧打印
https://epbox.gongfudou.com/graphql url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xiaobaixuexi.js

#开屏广告 需清理缓存
^https:\/\/api\.xbxxhz\.com\/big_data\/v1\/home_pages url reject

[mitm] 

hostname = api.xbxxhz.com, epbox.gongfudou.com

*/

var body = $response.body;
body = body.replace(/"free":\w+/g, '"free":true');
body = body.replace(/"isSchoolAgeMember":\w+/g, '"isSchoolAgeMember":true');
body = body.replace(/"isNormalMember":\w+/g, '"isNormalMember":true');
body = body.replace(/"baseMemberAvailable":\w+/g, '"baseMemberAvailable":false');

if (body.includes('"schoolAgeMember"')) {
    body = body.replace(/"expiresAt": "\d{4}年\d{1,2}月\d{1,2}日"/g, '"expiresAt": "2099年9月9日"');
} else {
    body = body.replace(/"selectedKid" : {/g, '"selectedKid" : { "schoolAgeMember" : { "expiresAt" : "2099年9月9日", "__typename" : "Member" },');
}

$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
