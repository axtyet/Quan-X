/*************************************

项目名称：微信听书
下载地址：https://t.cn/A6pj4xeR
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/i\.at\.qq\.com\/pay\/memberinfo.+ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/wxts.js

[mitm]
hostname = i.at.qq.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "subscriptionPeriod" : 2405400000,
  "memberCount" : 308000,
  "subscriptionPrice" : 99999999,
  "subscriptionButtonLabel" : "立即续费",
  "hasPromoRight" : false,
  "autoRenewableTime" : 0,
  "autoRenewableChannel" : 0,
  "isAutoRenewable" : 1,
  "subscriptionDesc" : "已解锁付费会员",
  "expiresIn" : 2405400000,
  "endTime" : 4092599349,
  "historyAutoRenewable" : true,
  "isMember" : 1,
  "isExperienceMember" : true,
  "startTime" : 1666666666
};

$done({body : JSON.stringify(chxm1023)});
