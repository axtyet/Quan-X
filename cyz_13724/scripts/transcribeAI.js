// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/transcribeAI.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/transcribeAI.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/transcribeAI.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/transcribeAI.stoverride

/*
项目名称： transcribeAI
项目作者： Levi
下载地址： https://apps.apple.com/app/id6451265628
使用说明： 先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/transcribeAI.js

[mitm]
hostname = api.revenuecat.com
*/

var Levi = JSON.parse($response.body);
Levi= {
  "request_date_ms": 1707323487257,
  "request_date": "2024-02-07T16:31:27Z",
  "subscriber": {
    "non_subscriptions": {
      "voicenotes_0_lifetime": [
        {
          "id": "40e4a52db7",
          "is_sandbox": false,
          "purchase_date": "2024-01-10T05:35:24Z",
          "original_purchase_date": "2024-01-10T05:35:24Z",
          "store": "app_store",
          "ownership_type": "PURCHASED",
          "store_transaction_id": "580001283302291"
        }
      ]
    },
    "first_seen": "2024-01-10T05:34:39Z",
    "original_application_version": "18",
    "other_purchases": {
      "voicenotes_0_lifetime": {
        "purchase_date": "2024-01-10T05:35:24Z"
      }
    },
    "management_url": https://t.me/plbyjl,
    "subscriptions": {
    },
    "entitlements": {
      "pro": {
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "store": "app_store",
        "grace_period_expires_date": null,
        "purchase_date": "2024-01-10T05:35:24Z",
        "product_identifier": "voicenotes_0_lifetime",
        "expires_date": "2099-12-31T01:01:01Z",
      }
    },
    "original_purchase_date": "2024-01-10T05:35:24Z",
    "original_app_user_id": "$RCAnonymousID:b80cc063078b4abea93f88b1b4c7ba2d",
    "last_seen": "2024-02-07T16:21:59Z"
  }
};
     
$done({body: JSON.stringify(Levi)});
