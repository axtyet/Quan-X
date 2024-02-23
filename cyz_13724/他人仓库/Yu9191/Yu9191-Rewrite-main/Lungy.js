/*

Lungy：https://apps.apple.com/app/id1545223887

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Lungy.js

[MITM]
hostname = api.revenuecat.com

*/




var lovebaby = JSON.parse($response.body);

if (lovebaby && lovebaby.subscriber) {
  // 更新订阅信息
  lovebaby.subscriber.entitlements = {
    "Deluxe": {
      "expires_date": "6666-06-06T06:06:06Z",
      "product_identifier": "lungy_1999_lifetime",
      "purchase_date": "2023-02-23T02:33:33Z"
    }
  };

  // 更新原始购买日期
  lovebaby.subscriber.original_purchase_date = "2023-02-23T03:33:33Z";

  // 更新订阅
  lovebaby.subscriber.subscriptions = {
    "lungy_1999_lifetime": {
      "expires_date": "6666-06-06T06:06:06Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    }
  };
}

$done({ body: JSON.stringify(lovebaby) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
