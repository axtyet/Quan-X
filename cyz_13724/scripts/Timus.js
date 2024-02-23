// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Timus.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/Timus.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/Timus.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/Timus.stoverride

/*
项目名称：Timus
项目作者：Levi
下载地址：https://apps.apple.com/app/id6461119151
使用说明：无
使用声明：仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Timus.js

[mitm]
hostname = api.revenuecat.com  
*/
let obj = {
  "request_date_ms": 1704664060864,
  "request_date": "2024-01-07T21:47:40Z",
  "subscriber": {
    "last_seen": "2024-01-07T21:42:02Z",
    "first_seen": "2024-01-07T21:42:02Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": null,
    "subscriptions": {
      "timus_999_1y_1w0": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "timus_999_1y_3d0": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "timus_299_1m": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "timus_lt": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "timus_0_lt": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "timus_599_3m_3d0": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      },
      "timus_lt_base": {
        "expires_date": "2099-02-18T07:52:54Z",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "purchase_date": "2020-02-11T07:52:54Z"
      }
    },
    "entitlements": {
      "premium": {
        "purchase_date": "2020-02-11T07:52:54Z",
        "product_identifier": "timus_lt_base",
        "original_purchase_date": "2020-02-11T07:52:55Z",
        "expires_date": "2099-02-18T07:52:54Z"
      }
    },
    "original_purchase_date": "2024-01-07T21:38:41Z",
    "original_app_user_id": "$RCAnonymousID:06923c3f1dfc4f23b1b56c9e24dbdffc",
    "non_subscriptions": {
    }
  }
}

$done({ body: JSON.stringify(obj), status: 200 });
