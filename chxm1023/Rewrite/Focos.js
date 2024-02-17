/*************************************

项目名称：Focos相机
下载地址：https://t.cn/AilyJ3mp
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/focos\.oracle\.bendingspoonsapps\.com\/v\d\/(users\/setup|purchases\/verify) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/Focos.js

[mitm]
hostname = focos.oracle.bendingspoonsapps.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023["me"]["active_subscriptions_ids"] = ["com.focos.1y_t130_bundle_creator"];
chxm1023["me"]["active_bundle_subscriptions"] = [{
   "expiry" : "2099-09-09T09:09:09+00:00",
   "product_id" : "com.focos.1y_t130_bundle_creator",
   "features" : ["unlock"]
  }];
chxm1023["settings"]["__identity__"]["expiration"] = "2099-09-09T09:09:09.09+00:00";

$done({body : JSON.stringify(chxm1023)});
