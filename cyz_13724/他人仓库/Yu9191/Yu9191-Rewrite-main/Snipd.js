/*

Snipd 3.0.20 

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Snipd.js

[mitm] 

hostname = api.revenuecat.com

*/
var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms": 1697818457484,
  "request_date": "2023-10-20T16:14:17Z",
  "subscriber": {
    "last_seen": "2023-10-20T16:11:48Z",
    "first_seen": "2023-10-20T16:11:48Z",
    "original_application_version": "820",
    "other_purchases": {
    },
    "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
    "subscriptions": {
      "snipd_premium_referral_1_month_free_1y_7199_trial_1m_v1": {
        "store_transaction_id": "220001767981426",
        "expires_date": "2099-11-03T16:12:17Z",
        "is_sandbox": false,
        "refunded_at": null,
        "unsubscribe_detected_at": null,
        "auto_resume_date": null,
        "grace_period_expires_date": null,
        "period_type": "trial",
        "purchase_date": "2023-10-20T16:12:17Z",
        "billing_issues_detected_at": null,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "original_purchase_date": "2023-10-20T16:12:18Z"
      }
    },
    "entitlements": {
      "premium": {
        "expires_date": "2099-11-03T16:12:17Z",
        "purchase_date": "2023-10-20T16:12:17Z",
        "product_identifier": "snipd_premium_referral_1_month_free_1y_7199_trial_1m_v1",
        "grace_period_expires_date": null
      }
    },
    "original_purchase_date": "2023-10-20T16:10:53Z",
    "original_app_user_id": "uBa8n4w7XYT1IjjgIo6os4im3Gr1",
    "non_subscriptions": {
    }
  }
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
