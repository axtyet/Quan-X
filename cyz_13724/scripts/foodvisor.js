// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/foodvisor.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/foodvisor.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/foodvisor.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/foodvisor.stoverride

/*
项目名称： Foodvisor
项目作者： Levi
下载地址： https://apps.apple.com/app/id1064020872
使用说明： 先开脚本再打开软件，未成功尝试恢复购买。下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，禁止用于商业用途。

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/foodvisor.js    

[mitm]
hostname = api.revenuecat.com
*/

var Levi = JSON.parse($response.body);
Levi= {
  "attributes_error_response": {
    "code": 7263,
    "message": "Some subscriber attributes keys were unable to be saved.",
    "attribute_errors": [
      {
        "message": "IDFV cannot be modified.",
        "key_name": "$idfv"
      },
      {
        "message": "AppsFlyer ID cannot be modified.",
        "key_name": "$appsflyerId"
      }
    ]
  },
  "request_date": "2024-02-02T08:10:11Z",
  "request_date_ms": 1706861411911,
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2024-02-02T07:59:19Z",
    "original_application_version": "10409",
    "other_purchases": {
    },
    "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
    "subscriptions": {
      "com.foodvisor.Foodvisor.14free1year": {
        "original_purchase_date": "2024-02-02T08:10:07Z",
        "expires_date": "2099-02-18T07:52:54Z",
        "is_sandbox": false,
        "refunded_at": null,
        "store_transaction_id": "320001709080880",
        "unsubscribe_detected_at": null,
        "grace_period_expires_date": null,
        "period_type": "trial",
        "purchase_date": "2024-02-02T08:10:06Z",
        "billing_issues_detected_at": null,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "auto_resume_date": null
      }
    },
    "entitlements": {
      "recipe": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "journal": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "chat": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "nutritional_facts": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "coaching": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "daily_assessment": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      },
      "diet_article": {
        "grace_period_expires_date": null,
        "purchase_date": "2024-02-02T08:10:06Z",
        "product_identifier": "com.foodvisor.Foodvisor.14free1year",
        "expires_date": "2099-02-18T07:52:54Z"
      }
    },
    "original_purchase_date": "2024-02-02T07:58:29Z",
    "original_app_user_id": "$RCAnonymousID:1d408cd6b1784008a64f98ae389b6f92",
    "last_seen": "2024-02-02T08:01:20Z"
  }
};
$done({body: JSON.stringify(Levi)});
