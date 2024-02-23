/*

You：APTV
love：store
me：@ios151
Ts：仅供学习，请勿转载售卖




[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/aptv.js


[MITM]
hostname = api.revenuecat.com

*/

var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms": 1691684430913,
  "request_date": "2023-08-10T16:20:30Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2023-08-10T16:15:27Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": null,
    "subscriptions": {
      "com.kimen.aptvpro.lifetime": {
        "store": "app_store",
        "purchase_date": "2023-02-23T02:33:33Z",
        "ownership_type": "PURCHASED",
        "original_purchase_date": "2023-02-23T02:33:33Z",
        "expires_date": "6666-06-06T06:06:06Z"
      }
    },
    "entitlements": {
      "pro": {
        "store": "app_store",
        "purchase_date": "2023-02-23T02:33:33Z",
        "ownership_type": "PURCHASED",
        "original_purchase_date": "2023-02-23T02:33:33Z",
        "product_identifier": "com.kimen.aptvpro.lifetime",
        "expires_date": "6666-06-06T06:06:06Z"
      }
    },
    "original_purchase_date": "2022-10-02T04:32:28Z",
    "original_app_user_id": "$RCAnonymousID:807d56e7d09e4e1f8cfa7e50cd323c6b",
    "last_seen": "2023-08-10T16:15:27Z"
  }
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
