/*
小白学习打印 2.15.0
小白智慧打印 2.41.9
小白试卷宝 1.28

会员重写具有时效性,如果失效请用之前的"捕获"版本
https://raw.githubusercontent.com/Yu9191/Script/main/shijuan.js

[rewrite_local]

#小白学习打印
https://api.xbxxhz.com/graphql url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/xiaobaixuexi.js

#小白智慧打印
https://epbox.gongfudou.com/graphql url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/xiaobaixuexi.js

#开屏广告 需清理缓存
^https:\/\/api\.xbxxhz\.com\/big_data\/v1\/home_pages url reject

[mitm] 

hostname = api.xbxxhz.com, epbox.gongfudou.com

*/

var body = $response.body;

// 替换 "free":\w+
body = body.replace(/"free":\w+/g, '"free":true');

// 替换 "isSchoolAgeMember":\w+
body = body.replace(/"isSchoolAgeMember":\w+/g, '"isSchoolAgeMember":true');

// 替换 "isNormalMember":\w+
body = body.replace(/"isNormalMember":\w+/g, '"isNormalMember":true');

// 替换 "baseMemberAvailable":\w+
body = body.replace(/"baseMemberAvailable":\w+/g, '"baseMemberAvailable":false');

// 替换 "expiresAt": "\d{4}年\d{1,2}月\d{1,2}日"
body = body.replace(/"expiresAt": "\d{4}年\d{1,2}月\d{1,2}日"/g, '"expiresAt": "2099年9月9日"');

// 替换 "selectedKid" : {
body = body.replace(/"selectedKid" : {/g, '"selectedKid" : { "schoolAgeMember" : { "expiresAt" : "2099年9月9日", "__typename" : "Member" },');

$done({ body });
