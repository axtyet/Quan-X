/* 


Name：Emoji+ 

download：商店版本15.3.5.2



[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Reven/Emoji+.js


[MITM]

hostname = api.revenuecat.com


*/


let obj = {
  "request_date_ms" : 1706289170367,
  "request_date" : "2024-01-26T17:12:50Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2024-01-26T17:06:09Z",
    "original_application_version" : "15.3.5.2",
    "other_purchases" : {

    },
    "management_url" : "https://apps.apple.com/account/subscriptions",
    "subscriptions" : {
      "com.emoji.freemium.subscription.premium" : {
        "original_purchase_date" : "2024-01-26T17:07:49Z",
        "expires_date" : "2099-09-29T17:07:48Z",
        "is_sandbox" : false,
        "refunded_at" : null,
        "store_transaction_id" : "190001882978869",
        "unsubscribe_detected_at" : null,
        "grace_period_expires_date" : null,
        "period_type" : "trial",
        "purchase_date" : "2024-01-26T17:07:48Z",
        "billing_issues_detected_at" : null,
        "ownership_type" : "PURCHASED",
        "store" : "app_store",
        "auto_resume_date" : null
      }
    },
    "entitlements" : {
      "subscription" : {
        "grace_period_expires_date" : null,
        "purchase_date" : "2024-01-26T17:07:48Z",
        "product_identifier" : "com.emoji.freemium.subscription.premium",
        "expires_date" : "2099-01-29T17:07:48Z"
      }
    },
    "original_purchase_date" : "2024-01-26T17:02:36Z",
    "original_app_user_id" : "$RCAnonymousID:06923c3f1dfc4f23b1b56c9e24dbdffc",
    "last_seen" : "2024-01-26T17:06:09Z"
  }
}



$done({ body: JSON.stringify(obj), status: 200 });
