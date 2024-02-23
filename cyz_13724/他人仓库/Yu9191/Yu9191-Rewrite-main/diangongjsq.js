/*************************************

项目名称：电工计算器
软件版本：6.1.0
使用说明：点购买点取消
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/diangongjsq.js

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

  anni1.subscriber.subscriptions["electricalcalculations.pro.lifetime"] = data;
  anni1.subscriber.entitlements["pro"] = JSON.parse(JSON.stringify(data));
  anni1.subscriber.entitlements["pro"].product_identifier = "electricalcalculations.pro.lifetime";

  anni.body = JSON.stringify(anni1);
}

$done(anni);











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
