/*************************************

项目名称：我的书橱
下载地址：https://t.cn/A6W8XeYf
更新日期：2023-11-15
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/iTunes/wodeshuchu.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1464406562,
    "receipt_creation_date" : "2023-11-14 18:05:27 Etc/GMT",
    "bundle_id" : "com.zhk.forworld",
    "original_purchase_date" : "2023-11-14 18:05:19 Etc/GMT",
    "in_app" : [

    ],
    "adam_id" : 1464406562,
    "receipt_creation_date_pst" : "2023-11-14 10:05:27 America/Los_Angeles",
    "request_date" : "2023-11-14 18:09:03 Etc/GMT",
    "request_date_pst" : "2023-11-14 10:09:03 America/Los_Angeles",
    "version_external_identifier" : 861446681,
    "request_date_ms" : "1699985343828",
    "original_purchase_date_pst" : "2023-11-14 10:05:19 America/Los_Angeles",
    "application_version" : "101",
    "original_purchase_date_ms" : "1699985119000",
    "receipt_creation_date_ms" : "1699985127000",
    "original_application_version" : "1",
    "download_id" : 502954437595091800
  },
  "environment" : "Production",
  "status" : 0,
  "Telegram" : "https://t.me/chxm1023",
  "warning" : "仅供学习，禁止转载或售卖"
};

$done({body: JSON.stringify(chxm1023)});
