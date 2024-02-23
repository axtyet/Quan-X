/*

Persona 1.8.24

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Persona.js

[mitm] 

hostname = api.revenuecat.com

*/

var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms" : 1692277501204,
  "request_date" : "2023-08-17T13:05:01Z",
  "subscriber" : {
    "last_seen" : "2023-08-17T13:04:43Z",
    "first_seen" : "2023-08-17T13:04:43Z",
    "original_application_version" : "201",
    "other_purchases" : {

    },
    "management_url" : "https://apps.apple.com/account/subscriptions",
    "subscriptions" : {
      "httpbot_1499_1y_1w0" : {
        "store_transaction_id" : "310001526027197",
        "expires_date" : "2999-07-24T13:04:56Z",
        "is_sandbox" : false,
        "refunded_at" : null,
        "unsubscribe_detected_at" : null,
        "auto_resume_date" : null,
        "grace_period_expires_date" : null,
        "period_type" : "trial",
        "purchase_date" : "2023-08-17T13:04:56Z",
        "billing_issues_detected_at" : null,
        "ownership_type" : "PURCHASED",
        "store" : "app_store",
        "original_purchase_date" : "2023-08-17T13:04:57Z"
      }
    },
    "entitlements" : {
      "pro" : {
        "expires_date" : "2999-07-24T13:04:56Z",
        "purchase_date" : "2023-08-17T13:04:56Z",
        "product_identifier" : "ios151_1499_1y_1w0",
        "grace_period_expires_date" : null
      }
    },
    "original_purchase_date" : "2023-06-27T12:15:30Z",
    "original_app_user_id" : "$RCAnonymousID:ded6a7de98824745b76e2d354e64ea4f",
    "non_subscriptions" : {

    }
  }
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
