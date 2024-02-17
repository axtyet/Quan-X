/*************************************

项目名称：zettelbox
软件版本：1.1.4
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/zettelbox.js
#清理
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/zettelbox.js

[mitm] 
hostname = api.revenuecat.com

************************************/


const anni = {};
const anni1 = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  anni.headers = $request.headers;
} else if (anni1 && anni1.subscriber) {
  anni1.subscriber.subscriptions = anni1.subscriber.subscriptions || {};
  anni1.subscriber.entitlements = anni1.subscriber.entitlements || {};

  const data = {
    "expires_date": "2099-12-31T12:00:00Z",
    "original_purchase_date": "2022-11-18T03:57:16Z",
    "purchase_date": "2022-06-15T12:00:00Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  anni1.subscriber.subscriptions["powerpack_yearly_1"] = data;
  anni1.subscriber.entitlements["Power Pack"] = JSON.parse(JSON.stringify(data));
  anni1.subscriber.entitlements["Power Pack"].product_identifier = "powerpack_yearly_1";

  anni.body = JSON.stringify(anni1);
}

$done(anni);
