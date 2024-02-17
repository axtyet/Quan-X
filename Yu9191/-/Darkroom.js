/******************************

脚本名称:  Darkroom


*******************************

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Darkroom.js

[mitm] 

hostname = api.revenuecat.com

*******************************/

var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms": 1692808352527,
  "request_date": "2023-08-23T16:32:32Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2023-07-14T10:16:45Z",
    "original_application_version": "64200",
    "other_purchases": {
    },
    "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
    "subscriptions": {
      "co.bergen.Darkroom.product.year.everything": {
        "original_purchase_date": "2023-07-14T10:18:51Z",
        "expires_date": "2999-07-21T10:18:50Z",
        "is_sandbox": false,
        "refunded_at": null,
        "store_transaction_id": "730001197179186",
        "unsubscribe_detected_at": null,
        "grace_period_expires_date": null,
        "period_type": "normal",
        "purchase_date": "2023-07-21T10:18:50Z",
        "billing_issues_detected_at": null,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "auto_resume_date": null
      }
    },
    "entitlements": {
      "co.bergen.Darkroom.entitlement.allToolsAndFilters": {
        "grace_period_expires_date": null,
        "purchase_date": "2023-07-21T10:18:50Z",
        "product_identifier": "co.bergen.Darkroom.product.year.everything",
        "expires_date": "2999-07-21T10:18:50Z"
      },
      "co.bergen.Darkroom.entitlement.selectiveAdjustments": {
        "grace_period_expires_date": null,
        "purchase_date": "2999-07-21T10:18:50Z",
        "product_identifier": "co.bergen.Darkroom.product.year.everything",
        "expires_date": "2024-07-21T10:18:50Z"
      }
    },
    "original_purchase_date": "2023-07-14T10:15:25Z",
    "original_app_user_id": "$RCAnonymousID:e6a469d660e440ba81c6b1ae245f05ba",
    "last_seen": "2023-08-23T10:27:21Z"
  }
}

$done({body : JSON.stringify(objc)});

