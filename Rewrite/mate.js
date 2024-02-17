/*************************************

项目名称：Mate-翻译神器 解锁订阅
下载地址：https://t.cn/A69OzKuZ
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用方法：先开脚本再开App，失败请重复打开App！

**************************************

[rewrite_local]
^https:\/\/asia\.gikken\.co\/matesync\/(subscription|login|register_user|check_user) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/mate.js

[mitm]
hostname = asia.gikken.co

*************************************/


var chxm1023 = JSON.parse($response.body);
const xxa = '/matesync/subscription';
const xxb = '/matesync/register_user';
const xxc = '/matesync/login';
const xxd = '/matesync/check_user';
const hyxx = {
  "next_bill_date" : "2099-09-09",
  "next_payment_amount" : "0",
  "paused_from" : null,
  "billing_period" : "lifetime",
  "cancel_url" : "itms-apps://apps.apple.com/account/subscriptions",
  "isSubscriptionVerified" : true,
  "unit_price" : "0",
  "old_status" : null,
  "update_url" : "itms-apps://apps.apple.com/account/subscriptions",
  "isLifetime" : true,
  "cancellation_effective_date" : "2099-09-09",
  "currency" : "CNY",
  "status" : "active",
  "endsOn" : "2099-09-09"
};

if ($request.url.indexOf(xxa) != -1){
chxm1023 = (hyxx);}

if ($request.url.indexOf(xxb) != -1){
chxm1023.subscriptionInfo = (hyxx);}

if ($request.url.indexOf(xxc) != -1){
chxm1023.subscriptionInfo = (hyxx);}

if ($request.url.indexOf(xxd) != -1){
chxm1023 = {
  "registered" : true
};}

$done({body : JSON.stringify(chxm1023)});
