/*

快制图表 3.92
@ios151仅测试surge


[rewrite_local]
#修改
https://api.revenuecat.com/v1/receipts url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/kuaizhitubiao.js

[mitm] 
hostname = api.revenuecat.com

**/
var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms": 1697793142659,
  "request_date": "2023-10-20T09:12:22Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2023-10-20T09:10:00Z",
    "original_application_version": "40",
    "other_purchases": {
    },
    "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
    "subscriptions": {
      "qgnjs_2": {
        "original_purchase_date": "2023-10-20T09:10:37Z",
        "expires_date": "2099-11-03T09:10:36Z",
        "is_sandbox": false,
        "refunded_at": null,
        "store_transaction_id": "190001763975721",
        "unsubscribe_detected_at": null,
        "grace_period_expires_date": null,
        "period_type": "trial",
        "purchase_date": "2023-10-20T09:10:36Z",
        "billing_issues_detected_at": null,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "auto_resume_date": null
      }
    },
    "entitlements": {
      "unlock all": {
        "grace_period_expires_date": null,
        "purchase_date": "2023-10-20T09:10:36Z",
        "product_identifier": "qgnjs_2",
        "expires_date": "2099-11-03T09:10:36Z"
      }
    },
    "original_purchase_date": "2023-10-20T09:09:40Z",
    "original_app_user_id": "$RCAnonymousID:78f3cbfad9d64ada83571f5c94e0029e",
    "last_seen": "2023-10-20T09:10:00Z"
  }
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
