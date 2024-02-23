/* 

Name：解忧娃娃 download：https://t.cn/A6UHFub0
To：@ios151 thank @GuDing's code
Disclaimers：Study, not spread


[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/wyww.js


[MITM]
hostname = api.revenuecat.com


*/
const baby = {};

if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  baby.headers = $request.headers;
} else {
  const ios151 = JSON.parse($response.body);
  if (ios151 && ios151.subscriber) {
    ios151.subscriber.subscriptions = ios151.subscriber.subscriptions || {};
    ios151.subscriber.entitlement = ios151.subscriber.entitlement || {};
    const app = 'love'; // Changed 'gd' to 'love'
    const list = { 'love': { name: 'magicmode', id: 'magicmode' } }; // Changed 'gd' to 'love'
    const data = {
      "expires_date": "6666-06-06T06:06:06Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };

    for (const i in list) {
      if (new RegExp(`^${i}`, `i`).test(app)) {
        ios151.subscriber.subscriptions[list[i].id] = data;
        ios151.subscriber.entitlements[list[i].name] = { ...data, product_identifier: list[i].id };
        break;
      }
    }
    baby.body = JSON.stringify(ios151);
  }
}

$done(baby);











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
