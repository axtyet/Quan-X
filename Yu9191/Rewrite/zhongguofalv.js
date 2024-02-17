/*
中国法律
[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/zhongguofalv.js
[mitm]
hostname = api.revenuecat.com
*/

let obj = {
  "request_date_ms": 1704664060864,
  "request_date": "2024-01-07T21:47:40Z",
  "subscriber": {
    "last_seen": "2024-01-07T21:42:02Z",
    "first_seen": "2024-01-07T21:42:02Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": null,
    "subscriptions": {
      "LawVIPOneMonth": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "LawVIPOneYear": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      }
    },
    "entitlements": {
      "vip": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "LawVIPOneYear",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      }
    },
    "original_purchase_date": "2024-01-07T21:38:41Z",
    "original_app_user_id": "$RCAnonymousID:06923c3f1dfc4f23b1b56c9e24dbdffc",
    "non_subscriptions": {
    }
  }
};

$done({ body: JSON.stringify(obj), status: 200 });
