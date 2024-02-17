/****************************************

项目名称：bluredit-模糊视频&照片
下载工具：https://t.cn/A69mnM1b
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

*****************************************

[rewrite_local]

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/bluredit.js

[mitm] 

hostname = api.revenuecat.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1675270551638,
  "request_date" : "2023-02-01T16:55:51Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-02-01T16:30:54Z",
    "original_application_version" : "1.3.91",
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : "https://apps.apple.com/account/subscriptions",
    "subscriptions" : {
      "net.kaleidoscope.bluredit.premium1" : {
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
      "Premium" : {
        "wechat" : "chxm1023",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "net.kaleidoscope.bluredit.premium1",
        "feedback" : "chxm1023",
        "expires_date" : "2099-09-09T09:09:09Z",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date" : "2023-02-01T16:22:58Z",
    "original_app_user_id" : "$RCAnonymousID:4f883248284c4b0d969c69fe8cfcae7c",
    "last_seen" : "2023-02-01T16:30:54Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
