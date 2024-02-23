// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Whispermemos.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/Whispermemos.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/Whispermemos.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/Whispermemos.stoverride

/*
项目名称：whisper memos
项目作者：Levi
使用说明：先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。
下载地址：https://apps.apple.com/app/id6443658039

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Whispermemos.js

[Mitm]
hostname = api.revenuecat.com
*/
var Levi = JSON.parse($response.body);
Levi= {
  "request_date_ms": 1704664060864,
  "request_date": "2024-01-07T21:47:40Z",
  "subscriber": {
    "last_seen": "2024-01-07T21:42:02Z",
    "first_seen": "2024-01-07T21:42:02Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": "https:\/\/t.me\/plbyjl",
    "subscriptions": {
      "whisper_base_yearly": {
        "store": "app_store",
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "original_purchase_date": "2020-03-27T07:52:55Z",
        "purchase_date": "2020-03-27T07:52:54Z",
        "expires_date": "2099-03-27T07:52:54Z"
      },
      "amber_yearly_discount": {
        "store": "app_store",
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "original_purchase_date": "2020-03-27T07:52:55Z",
        "purchase_date": "2020-03-27T07:52:54Z",
        "expires_date": "2099-03-27T07:52:54Z"
      },
      "whisper_base_monthly": {
        "store": "app_store",
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "original_purchase_date": "2020-03-27T07:52:55Z",
        "purchase_date": "2020-03-27T07:52:54Z",
        "expires_date": "2099-03-27T07:52:54Z"
      },
      "amber_monthly": {
        "store": "app_store",
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "original_purchase_date": "2020-03-27T07:52:55Z",
        "purchase_date": "2020-03-27T07:52:54Z",
        "expires_date": "2099-03-27T07:52:54Z"
      },
      "amber_yearly": {
        "store": "app_store",
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "original_purchase_date": "2020-03-27T07:52:55Z",
        "purchase_date": "2020-03-27T07:52:54Z",
        "expires_date": "2099-03-27T07:52:54Z"
      }
    },
    "entitlements": {
      "amber": {
        "ownership_type": "PURCHASED",
        "is_sandbox": false,
        "product_identifier": "amber_yearly_discount",
        "expires_date": "2099-03-27T07:52:54Z",
        "original_purchase_date": "2020-03-27T07:52:55Z",
        "purchase_date": "2020-03-27T07:52:54Z",
        "store": "app_store"
      }
    },
    "original_purchase_date": "2024-01-07T21:38:41Z",
    "original_app_user_id": "$RCAnonymousID:06923c3f1dfc4f23b1b56c9e24dbdffc",
    "non_subscriptions": {
    }
  }
};

$done({body : JSON.stringify(Levi)});
