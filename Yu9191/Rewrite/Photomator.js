/*

项目名称：Photomator-照片编辑
下载地址：https://t.cn/A60W87es
脚本作者：ios151,2023.8.3.23.18
电报频道：https://t.me/ios151
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Photomator.js
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Photomator.js

[mitm]
hostname = api.revenuecat.com

*/

const baby = {};
const lovebaby = JSON.parse(typeof $response != "undefined" && $response.body || null);

const name = "pixelmator_photo_pro_access";
const love = "pixelmator_photo_lifetime_v1";

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  baby.headers = $request.headers;
} else if (lovebaby && lovebaby.subscriber) {
  data = {
    "Author": "ios151",
    "Telegram" : "https://t.me/ios151",
    "warning": "仅供学习，禁止转载或售卖",
    //"expires_date": "2099-09-09T09:09:09Z",
    "purchase_date": "2022-09-09T09:09:09Z"
  };
  lovebaby.subscriber.subscriptions[(love)] = {
    "Author": "ios151",
    "Telegram" : "https://t.me/ios151",
    "warning": "仅供学习，禁止转载或售卖",
    "original_purchase_date": "2022-09-09T09:09:09Z",
    "period_type" : "1",
    "purchase_date": "2022-09-09T09:09:09Z",
    //"expires_date": "2099-09-09T09:09:09Z",
    "store" : "app_store",
    "ownership_type": "PURCHASED"
  };
  lovebaby.subscriber.entitlements[(name)] = JSON.parse(JSON.stringify(data));
  lovebaby.subscriber.entitlements[(name)].product_identifier = (love);
  baby.body = JSON.stringify(lovebaby);
}

$done(baby);
