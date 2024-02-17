/*************************************

项目名称：解压小橙子(需试用)
下载地址：https://t.cn/A6lJOsl4
更新日期：2023-12-18
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/iTunes/jyxcz.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "receipt" : {
    "expires_date_formatted" : "2099-09-09 09:09:09 Etc/GMT",
    "app_item_id" : "6451831613",
    "expires_date" : "4092599349000",
    "bid" : "com.stress.test.record",
    "bvrs" : "2.6",
    "original_purchase_date_ms" : "1702788963000",
    "transaction_id" : "490001573188129",
    "purchase_date_pst" : "2023-12-16 20:56:02 America/Los_Angeles",
    "expires_date_formatted_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
    "original_purchase_date" : "2023-12-17 04:56:03 Etc/GMT",
    "purchase_date_ms" : "1702788962000",
    "unique_vendor_identifier" : "6D75F9E7-4D75-4571-A941-AA77B9390E0F",
    "quantity" : "1",
    "purchase_date" : "2023-12-17 04:56:02 Etc/GMT",
    "product_id" : "com.stress.test.record.yearly",
    "unique_identifier" : "00008110-001E55801481801E",
    "original_transaction_id" : "490001573188129",
    "subscription_group_identifier" : "21387202",
    "original_purchase_date_pst" : "2023-12-16 20:56:03 America/Los_Angeles",
    "item_id" : "6466164764",
    "in_app_ownership_type" : "PURCHASED",
    "web_order_line_item_id" : "490000738239649",
    "version_external_identifier" : "862232726",
    "is_in_intro_offer_period" : "false",
    "is_trial_period" : "true"
  },
  "status" : 0,
  "auto_renew_product_id" : "com.stress.test.record.yearly",
  "auto_renew_status" : 1,
  "latest_receipt_info" : {
    "expires_date_formatted" : "2099-09-09 09:09:09 Etc/GMT",
    "app_item_id" : "6451831613",
    "expires_date" : "4092599349000",
    "bid" : "com.stress.test.record",
    "bvrs" : "2.6",
    "original_purchase_date_ms" : "1702788963000",
    "transaction_id" : "490001573188129",
    "purchase_date_pst" : "2023-12-16 20:56:02 America/Los_Angeles",
    "expires_date_formatted_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
    "original_purchase_date" : "2023-12-17 04:56:03 Etc/GMT",
    "purchase_date_ms" : "1702788962000",
    "unique_vendor_identifier" : "6D75F9E7-4D75-4571-A941-AA77B9390E0F",
    "quantity" : "1",
    "purchase_date" : "2023-12-17 04:56:02 Etc/GMT",
    "product_id" : "com.stress.test.record.yearly",
    "unique_identifier" : "00008110-001E55801481801E",
    "original_transaction_id" : "490001573188129",
    "subscription_group_identifier" : "21387202",
    "original_purchase_date_pst" : "2023-12-16 20:56:03 America/Los_Angeles",
    "item_id" : "6466164764",
    "in_app_ownership_type" : "PURCHASED",
    "web_order_line_item_id" : "490000738239649",
    "version_external_identifier" : "862232726",
    "is_in_intro_offer_period" : "false",
    "is_trial_period" : "true"
  },
  "latest_receipt" : "chxm1023"
};

$done({body: JSON.stringify(chxm1023)});
