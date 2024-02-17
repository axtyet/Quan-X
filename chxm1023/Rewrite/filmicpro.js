/*************************************

项目功能：Filmic Pro相机
下载地址：https://t.cn/AiE8fHDr
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/filmicpro\.oracle\.bendingspoonsapps\.com\/v\d\/(users\/setup|purchases\/verify) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/filmicpro.js

[mitm]
hostname = filmicpro.oracle.bendingspoonsapps.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023["me"]["active_subscriptions_ids"] = ["com.cinegenix.filmic.pro.1y_t80_1w_bis"];
chxm1023["me"]["active_bundle_subscriptions"] = [{
   "expiry" : "2099-09-09T09:09:09+00:00",
   "product_id" : "com.cinegenix.filmic.pro.1y_t80_1w_bis",
   "features" : ["unlock"]
  }];
chxm1023["settings"]["__identity__"]["expiration"] = "2099-09-09T09:09:09.09+00:00";

$done({body : JSON.stringify(chxm1023)});