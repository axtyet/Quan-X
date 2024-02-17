/****************************************

项目名称：Mizframa
下载工具：https://t.cn/A6Nmv2hg
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*****************************************

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/Mizframa.js

[mitm]
hostname = api.revenuecat.com

****************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "request_date_ms" : 1683809007860,
  "request_date" : "2023-05-11T12:43:27Z",
  "subscriber" : {
    "non_subscriptions" : {

    },
    "first_seen" : "2023-05-11T12:42:39Z",
    "original_application_version" : null,
    "entitlement" : {

    },
    "other_purchases" : {

    },
    "management_url" : null,
    "subscriptions" : {
      "mf_20_lifetime2" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED"
      }
    },
    "entitlements" : {
      "premium" : {
        "warning" : "仅供学习，禁止转载或售卖",
        "wechat" : "chxm1023",
        "purchase_date" : "2022-09-09T09:09:09Z",
        "original_purchase_date" : "2022-09-09T09:09:09Z",
        "ownership_type" : "PURCHASED",
        "product_identifier" : "mf_20_lifetime2"
      }
    },
    "original_purchase_date" : null,
    "original_app_user_id" : "$RCAnonymousID:27646d9ac4f943f68a2f506b469670cb",
    "last_seen" : "2023-05-11T12:42:39Z"
  }
};

$done({body : JSON.stringify(chxm1023)});
