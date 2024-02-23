// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/shadowdraw.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/shadowdraw.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/shadowdraw.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/shadowdraw.stoverride

/*
项目名称： ShadowDraw: Learn How to Draw（only iPad）
项目作者： Levi
下载地址： https://apps.apple.com/app/id1223507083
使用说明： 先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/shadowdraw.js

[mitm]
hostname = api.revenuecat.com
*/

var Levi = JSON.parse($response.body);
Levi= {
    "request_date_ms": 1707372034417,
    "request_date": "2024-02-08T06:00:34Z",
    "subscriber": {
      "non_subscriptions": {
      },
      "first_seen": "2024-02-08T05:59:17Z",
      "original_application_version": "819",
      "other_purchases": {
      },
      "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
      "subscriptions": {
        "subscription2_year": {
          "original_purchase_date": "2024-02-08T06:00:29Z",
          "expires_date": "2099-01-27T05:34:02Z",
          "is_sandbox": false,
          "refunded_at": null,
          "store_transaction_id": "320001715509092",
          "unsubscribe_detected_at": null,
          "grace_period_expires_date": null,
          "period_type": "trial",
          "purchase_date": "2024-02-08T06:00:28Z",
          "billing_issues_detected_at": null,
          "ownership_type": "PURCHASED",
          "store": "app_store",
          "auto_resume_date": null
        }
      },
      "entitlements": {
        "subscription": {
          "grace_period_expires_date": null,
          "purchase_date": "2024-02-08T06:00:28Z",
          "product_identifier": "subscription2_year",
          "expires_date": "2099-01-27T05:34:02Z"
        }
      },
      "original_purchase_date": "2024-02-08T00:27:26Z",
      "original_app_user_id": "2F74E5E7-69BE-4C89-BF98-7114673EB4CD",
      "last_seen": "2024-02-08T05:59:17Z"
    }
  };
$done({body: JSON.stringify(Levi)});
