// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/chatpdf.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/chatpdf.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/chatpdf.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/chatpdf.stoverride

/*
项目名称： chatpdf
项目作者： Levi
下载地址： https://apps.apple.com/app/id6457365457
使用说明： 无 
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/chatpdf.js

[mitm]
hostname = api.revenuecat.com
*/

var Levi = JSON.parse($response.body);
Levi= {
  "request_date_ms" : 1706074455134,
  "request_date" : "2024-01-24T05:34:15Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2024-01-23T00:10:47Z",
    "original_application_version" : "89",
    "other_purchases" : {

    },
    "management_url" : "https:\/\/apps.apple.com\/account\/subscriptions", 
    "subscriptions" : {
      "chatpdf_annual_2" : {
        "original_purchase_date" : "2024-01-24T05:34:03Z",
        "expires_date" : "2099-01-27T05:34:02Z",
        "is_sandbox" : false,
        "refunded_at" : null,
        "store_transaction_id" : "320001699307998",
        "unsubscribe_detected_at" : null,
        "grace_period_expires_date" : null,
        "period_type" : "trial",
        "purchase_date" : "2024-01-24T05:34:02Z",
        "billing_issues_detected_at" : null,
        "ownership_type" : "PURCHASED",
        "store" : "app_store",
        "auto_resume_date" : null
      }
    },
    "entitlements" : {
      "premium" : {
        "grace_period_expires_date" : null,
        "purchase_date" : "2024-01-24T05:34:02Z",
        "product_identifier" : "chatpdf_annual_2",
        "expires_date" : "2099-01-27T05:34:02Z"
      }
    },
    "original_purchase_date" : "2024-01-23T00:09:25Z",
    "original_app_user_id" : "1FPKzIIgxMdhhSwfQ3xavh0FmBQ2",
    "last_seen" : "2024-01-24T03:29:23Z"
  }
};
$done({body : JSON.stringify(Levi)});
