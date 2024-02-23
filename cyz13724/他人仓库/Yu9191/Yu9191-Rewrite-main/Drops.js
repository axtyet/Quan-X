/******************************

脚本名称: Drops
下载地址：商店 38.0
脚本作者：ios151
更新时间：2023年10月5日 20:47
问题反馈：TG
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Drops.js

[mitm] 

hostname = api.revenuecat.com

*******************************/

var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms": 1696509937149,
  "request_date": "2023-10-05T12:45:37Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2023-10-05T12:39:19Z",
    "original_application_version": "38.0.7",
    "other_purchases": {
    },
    "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
    "subscriptions": {
      "forever_unlimited_time_discounted_80_int": {
        "original_purchase_date": "2023-10-05T12:43:01Z",
        "expires_date": "2099-10-12T12:43:00Z",
        "is_sandbox": false,
        "refunded_at": null,
        "store_transaction_id": "190001746507030",
        "unsubscribe_detected_at": null,
        "grace_period_expires_date": null,
        "period_type": "trial",
        "purchase_date": "2023-10-05T12:43:00Z",
        "billing_issues_detected_at": null,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "auto_resume_date": null
      }
    },
    "entitlements": {
      "premium": {
        "grace_period_expires_date": null,
        "purchase_date": "2023-10-05T12:43:00Z",
        "product_identifier": "forever_unlimited_time_discounted_80_int",
        "expires_date": "2099-10-12T12:43:00Z"
      }
    },
    "original_purchase_date": "2023-10-05T12:38:34Z",
    "original_app_user_id": "$RCAnonymousID:2ddae30d901a47319a083074495d158b",
    "last_seen": "2023-10-05T12:43:47Z"
  }
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
