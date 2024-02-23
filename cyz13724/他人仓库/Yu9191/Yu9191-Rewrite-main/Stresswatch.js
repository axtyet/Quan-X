/* 



Name：StressWatch 

download：https://t.cn/A60aLBxu

To：@ios151 特别感谢@RealGuizhong付费提供数据

Disclaimers：Study, not spread


[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Stresswatch.js


[MITM]

hostname = api.revenuecat.com


*/


const lovebaby = {};
const lovelovebabyforevey = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  lovebaby.headers = $request.headers;
} else if (lovelovebabyforevey && lovelovebabyforevey.subscriber) {
  lovelovebabyforevey.subscriber.subscriptions = lovelovebabyforevey.subscriber.subscriptions || {};
  lovelovebabyforevey.subscriber.entitlements = lovelovebabyforevey.subscriber.entitlements || {};

  const data = {
    "expires_date": "3021-03-14T08:57:58Z",
    "original_purchase_date": "2023-07-27T08:57:58Z",
    "purchase_date": "2023-07-27T08:57:58Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  lovelovebabyforevey.subscriber.subscriptions["stress_membership_monthly"] = data;
  lovelovebabyforevey.subscriber.entitlements["StressWatch Pro"] = JSON.parse(JSON.stringify(data));
  lovelovebabyforevey.subscriber.entitlements["StressWatch Pro"].product_identifier = "stress_membership_monthly";

  lovebaby.body = JSON.stringify(lovelovebabyforevey);
}

$done(lovebaby);











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
