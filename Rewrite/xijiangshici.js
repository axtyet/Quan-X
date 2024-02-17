/****************************************

项目名称：西江诗词 解锁高级版
下载工具：https://t.cn/A6CFTG1l
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*****************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(\$RCAnonymousID%)?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/xijiangshici.js

[mitm]
hostname = api.revenuecat.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1680071100255,
  "request_date" : "2023-03-29T06:25:00Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-03-29T06:25:00Z",
    "original_application_version" : "1",
    "entitlement" : {

    },
    "other_purchases" : {
      "com.uzero.poem.month1" : {
        "purchase_date" : "2023-03-29T06:25:00Z"
      }
    },
    "management_url" : "https://apps.apple.com/account/subscriptions",
    "subscriptions" : {
      "com.uzero.poem.month1" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED",
        "expires_date" : "2099-09-09T09:09:09Z"
      }
    },
    "entitlements" : {
      "Pro Access" : {
        "wechat" : "chxm1023",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "com.uzero.poem.month1",
        "expires_date" : "2099-09-09T09:09:09Z",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date" : "2023-03-29T06:25:00Z",
    "original_app_user_id" : "$RCAnonymousID:303520791ddf43fd8f77090d644c6502",
    "last_seen" : "2023-03-29T06:25:00Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
