/*************************************

项目名称：消防行
下载地址：https://t.cn/A6OsSXGV
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.xfx119\.com\/ksVRExamSystem\/validityTerm url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/xiaofangxing.js

[mitm]
hostname = www.xfx119.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {...chxm1023,
  "llkcValidityDays" : 4092599349,
  "tkValidityDays" : 4092599349,
  "validityDays" : 4092599349,
  "fgjxjvValidityDays" : 4092599349,
  "studySubsystem" : "2099-09-09 09:09:09"
}

$done({body : JSON.stringify(chxm1023)});
