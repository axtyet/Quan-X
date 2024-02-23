
/*
灵兰中医

[rewrite_local]

https://user.linglan.com/api/personCenter/getMyUser url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/linglanzhongyi.js


[mitm]
hostname = user.linglan.com
*/


var Q = JSON.parse($response.body);
Q.data.isVip = 1;
Q.data.expireDate = "2099-09-01";
Q.data.formatAccount = 555555;
Q.data.tongBaoNum = 5555;
Q.data.vipLevel = 6;
Q.data.isSecretVip = 1;
$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
