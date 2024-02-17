/*************************************

项目名称：AudioMack
下载地址：https://t.cn/A6KS2mvG
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/AM.js

[mitm]

hostname = api.revenuecat.com

*************************************/


var chxm1023 = JSON.parse($response.body);
chxm1023 = {
  "request_date_ms" : 1670637413942,
  "request_date" : "2022-12-10T01:56:53Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2022-12-10T01:47:06Z",
    "original_application_version" : null,
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : null,
    "subscriptions" : {
      "com.audiomack.premium.2022" : {
        "wechat" : "chxm1023",
        "ownership_type" : "PURCHASED",
        "feedback" : "chxm1023",
        "expires_date" : "2099-09-09T09:09:09Z",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "entitlements" : {
      "Premium1" : {
        "wechat" : "chxm1023",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "com.audiomack.premium.2022",
        "feedback" : "chxm1023",
        "expires_date" : "2099-09-09T09:09:09Z",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date" : null,
    "original_app_user_id" : "$RCAnonymousID:887f7a66e4704120b995de752c3354ee",
    "last_seen" : "2022-12-10T01:48:11Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
