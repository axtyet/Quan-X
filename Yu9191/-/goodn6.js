/*

Goodnotes6


[rewrite_local]
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/goodn6.js
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/Yu9191/Script/main/goodn6.js

[mitm]
hostname = isi.csan.goodnotes.com

*/


var objc = JSON.parse($response.body);

    objc = 

{   "request_date_ms" : 1691592955821,   "request_date" : "2023-08-09T14:55:55Z",   "subscriber" : {     "non_subscriptions" : {      },     "first_seen" : "2023-08-09T14:33:42Z",     "original_application_version" : "1830886.448935350",     "other_purchases" : {      },     "management_url" : "https://apps.apple.com/account/subscriptions",     "subscriptions" : {       "com.goodnotes.gn6_one_time_unlock_3999" : {         "original_purchase_date" : "2023-08-09T14:55:51Z",         "expires_date" : "9999-08-16T14:55:49Z",         "is_sandbox" : false,         "refunded_at" : null,         "store_transaction_id" : "570001278783391",         "unsubscribe_detected_at" : null,         "grace_period_expires_date" : null,         "period_type" : "trial",         "purchase_date" : "2023-08-09T14:55:49Z",         "billing_issues_detected_at" : null,         "ownership_type" : "PURCHASED",         "store" : "app_store",         "auto_resume_date" : null       }     },     "entitlements" : {       "apple_access" : {         "grace_period_expires_date" : null,         "purchase_date" : "2023-08-09T14:55:49Z",         "product_identifier" : "com.goodnotes.gn6_one_time_unlock_3999",         "expires_date" : "9999-08-16T14:55:49Z"       },       "crossplatform_access" : {         "grace_period_expires_date" : null,         "purchase_date" : "2023-08-09T14:55:49Z",         "product_identifier" : "com.goodnotes.gn6_one_time_unlock_3999",         "expires_date" : "9999-08-16T14:55:49Z"       }     },     "original_purchase_date" : "2022-09-27T16:39:03Z",     "original_app_user_id" : "6e239062-3af7-4b5c-b02f-b6e15d26b9a3",     "last_seen" : "2023-08-09T14:33:42Z"   } }

$done({body : JSON.stringify(objc)});
