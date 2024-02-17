/****************************************

项目名称：Zoomable，Brovacy，Appspree，YubePip，Filepip，Startodo，同作者作品基本都解锁，全家桶解锁
下载工具：https://t.cn/A69upwlg
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

*****************************************

[rewrite_local]

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/Actowise.js

[mitm] 

hostname = api.revenuecat.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1675322930757,
  "request_date" : "2023-02-02T07:28:50Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-02-02T07:28:50Z",
    "original_application_version" : null,
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : null,
    "subscriptions" : {
      "private_pro_lifetime" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "feedback" : "chxm1023",
        "ownership_type" : "PURCHASED"
      }
    },
    "entitlements" : {
      "pro" : {
        "wechat" : "chxm1023",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "private_pro_lifetime",
        "feedback" : "chxm1023",
        "warning" : "仅供学习，禁止转载或售卖",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "purchase_date" : "2022-09-09T09:09:09Z"
      }
    },
    "original_purchase_date" : null,
    "original_app_user_id" : "$RCAnonymousID:d3d5f08f32b54982b65a0a835d0e4bd3",
    "last_seen" : "2023-02-02T07:28:50Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
