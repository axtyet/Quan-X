/*************************************

项目名称：FaceSwapper
下载地址：https://t.cn/A6TUPtBv
更新日期：2024-03-26
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api-sgp\.facereplacerext\.com\/api\/rest\/commerce\/integrate\/vip\/perform url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/FaceSwapper.js

[mitm]
hostname = api-sgp.facereplacerext.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.list = [{
  "startTime" : 1703477754000,
  "orderId" : "340001399999999",
  "isTrialPeriod" : true,
  "endTime" : 4092599349000,
  "productId" : "73_premium_normal_yearly",
  "productType" : 3,
  "orderStatus" : 1,
  "autoRenewStatus" : true,
  "originalOrderId" : "340001399999999",
  "sign" : "c5e5450b552ac10149dcd7d4625b1ad2"
}];

$done({body : JSON.stringify(chxm1023)});
