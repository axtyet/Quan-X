/*************************************

项目名称：OneClear透明小组件
下载地址：https://t.cn/A6Ohf3V0
项目名称：OneTodo
下载地址：https://t.cn/A6Ohfdb8
项目名称：OneList
下载地址：https://t.cn/A6OhfePB
项目名称：OneScreen截图带壳
下载地址：https://t.cn/A6OhfB4K
脚本作者：聪
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Script/Onexilie.js
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Script/Onexilie.js

[mitm]
hostname = api.revenuecat.com

*************************************/


const chxm1023 = {};
const chxm1024 = JSON.parse(typeof $response != "undefined" && $response.body || null);
const name = "pro";
const appid = "chxm1023_lifetime";

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  chxm1023.headers = $request.headers;
} else if (chxm1024 && chxm1024.subscriber) {
  data = {
 "original_purchase_date": "2022-09-09T09:09:09Z",
 "purchase_date": "2022-09-09T09:09:09Z",
 "store" : "app_store",
 "ownership_type": "PURCHASED"
 };
  chxm1024.subscriber.subscriptions[(appid)] = data
  chxm1024.subscriber.entitlements[(name)] = JSON.parse(JSON.stringify(data));
  chxm1024.subscriber.entitlements[(name)].product_identifier = (appid);
  chxm1023.body = JSON.stringify(chxm1024);
}

$done(chxm1023);
