/*
Rootd 美区2.50.0

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Rootd.js

[mitm]
hostname = api.revenuecat.com
*/


var Q = JSON.parse($response.body);

Q = {
  "request_date_ms" : 1684774345008,
  "request_date" : "2023-05-22T16:52:25Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2022-10-17T14:23:20Z",
    "original_application_version" : "5077",
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : null,
    "subscriptions" : {
      "subscription_lifetime" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "Q",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED",
        "expires_date" : "2099-09-09T09:09:09Z"
      }
    },
    "entitlements" : {
      "pro" : {
        "wechat" : "Q",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "subscription_lifetime",
        "expires_date" : "2099-09-09T09:09:09Z",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date" : "2022-10-17T14:12:21Z",
    "original_app_user_id" : "$RCAnonymousID:ebc2c4f413f740c284494afbdfec8c93",
    "last_seen" : "2022-11-17T11:10:56Z"
  }
};

$done({body : JSON.stringify(Q)});
