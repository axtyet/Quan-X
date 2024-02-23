/*************************************
七天学堂
@ios151,仅测试4.2.8



[rewrite_local]
#会员
https://szone-my.7net.cc/userInfo/GetUserInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Qitianxuetang.js

[mitm]
hostname = szone-my.7net.cc

*/

var baby = JSON.parse($response.body);
baby.data.isVip = true;
baby.data.serviceSchool.start = "2099-01-01";
baby.data.serviceSchool.end = "2199-01-01";
baby.data.sms.vipType = 1;
baby.data.sms.expiredTime = "2099-01-01";
baby.data.sms.isCloseBuy = true;
//baby.data.sms.smsPhone = "17677777777";//我不需要所以注释掉了,短信通知需要可以改成自己的手机号
baby.data.expiredTime = "2099\/01\/01 00:00:00";
$done({body : JSON.stringify(baby)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
