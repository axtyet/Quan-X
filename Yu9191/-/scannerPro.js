/*************************************

项目名称：ScannerPro
使用说明：失败就下载重新安装
特别说明：已经安装的 开规则进 解锁试用到期2099

**************************************

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/scannerPro.js

#^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/Yu9191/Script/main/scannerPro.js


[mitm]
hostname = api.revenuecat.com

*************************************/

var objc = JSON.parse($response.body);

    objc = {
  "request_date_ms": 1698245545260,
  "request_date": "2023-10-25T14:52:25Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2023-10-25T14:51:32Z",
    "original_application_version": null,
    "other_purchases": {
    },
    "management_url": null,
    "subscriptions": {
      "com.chxm1024.premium.yearly": {
        "Author": "chxm1023",
        "store": "app_store",
        "ownership_type": "PURCHASED",
        "expires_date": "2099-09-09T09:09:09Z",
        "warning": "仅供学习，禁止转载或售卖",
        "original_purchase_date": "2022-09-09T09:09:09Z",
        "purchase_date": "2022-09-09T09:09:09Z",
        "Telegram": "https:\/\/t.me\/chxm1023"
      }
    },
    "entitlements": {
      "plus": {
        "expires_date": "2099-09-09T09:09:09Z",
        "product_identifier": "com.chxm1024.premium.yearly",
        "purchase_date": "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date": null,
    "original_app_user_id": "$RCAnonymousID:9b7e35cbb86a477b80435df26b1c076d",
    "last_seen": "2023-10-25T14:51:32Z"
  }
}

$done({body : JSON.stringify(objc)});
