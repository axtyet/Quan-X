/******************************

脚本名称: Pure记账
下载地址：商店
脚本作者：ios151
更新时间：2023年9月27日 22:05
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

***************************

[rewrite_local]

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Purejizhang.js

[mitm] 

hostname = api.revenuecat.com

*******************************/
var objc = JSON.parse($response.body);

    objc = 

{
  "request_date_ms" : 1695918250311,
  "request_date" : "2023-09-28T16:24:10Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-09-28T02:27:59Z",
    "original_application_version" : "21",
    "other_purchases" : {

    },
    "management_url" : "https://apps.apple.com/account/subscriptions",
    "subscriptions" : {
      "com.lifetimeFamily.pro" : {
        "original_purchase_date" : "2023-09-28T02:28:40Z",
        "expires_date" : "9999-10-01T02:28:38Z",
        "is_sandbox" : false,
        "refunded_at" : null,
        "store_transaction_id" : "570001321078937",
        "unsubscribe_detected_at" : "2023-09-28T02:30:44Z",
        "grace_period_expires_date" : null,
        "period_type" : "trial",
        "purchase_date" : "2023-09-28T02:28:38Z",
        "billing_issues_detected_at" : null,
        "ownership_type" : "PURCHASED",
        "store" : "app_store",
        "auto_resume_date" : null
      }
    },
    "entitlements" : {
      "Pro" : {
        "grace_period_expires_date" : null,
        "purchase_date" : "2023-09-28T02:28:38Z",
        "product_identifier" : "com.lifetimeFamily.pro",
        "expires_date" : "9999-10-01T02:28:38Z"
      }
    },
    "original_purchase_date" : "2023-09-27T14:45:37Z",
    "original_app_user_id" : "$RCAnonymousID:a0ec43881f7642c0bc0fdcecb985cf71",
    "last_seen" : "2023-09-28T02:27:59Z"
  }
}


$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
