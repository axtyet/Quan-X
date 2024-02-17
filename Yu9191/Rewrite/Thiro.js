/*

项目名称：Thiro
同时解锁：目标地图
下载地址：https://apps.apple.com/cn/app/thiro/id1555982483
下载地址：目标地图https://t.cn/A60KN9Sf
脚本作者：ios151
使用声明：⚠️仅供参考，🈲转载与售卖！


[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Thiro.js

*/

var lovebaby = JSON.parse($response.body);

lovebaby.subscriber.subscriptions["atelerix_pro_lifetime"] = {
  "purchase_date": "2022-09-09T09:09:09Z",
  "original_purchase_date": "2022-09-09T09:09:09Z",
  "ownership_type": "PURCHASED"
};

lovebaby.subscriber.entitlements["pro"] = {
  "ownership_type": "PURCHASED",
  "product_identifier": "atelerix_pro_lifetime",
  "original_purchase_date": "2022-09-09T09:09:09Z",
  "purchase_date": "2022-09-09T09:09:09Z"
};

$done({ body: JSON.stringify(lovebaby) });
