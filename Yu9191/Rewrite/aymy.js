/*
哎呀漫鸭
解锁会员权益
[rewrite_local]
#课程题库
https://www.aiyamanya.com/aymy/api/getUserInfo url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/aymy.js

[mitm] 

hostname = www.aiyamanya.com
*/



let obj = JSON.parse($response.body);
obj.data.purchasedVIPExpiresAt = "2099-09-09";
obj.data.vipexpiresAt = "2099-09-09";
obj.data.vipStatus = 2;
obj.data.purchasedVIP = "2099-09-09";
obj.data.inviteNum = 99;
$done({
    body: JSON.stringify(obj)
});
