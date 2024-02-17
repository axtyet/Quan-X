/*
名称：Fotoz
下载：https://t.cn/A60EJZOq

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes/fotoz.js

[mitm]
hostname = buy.itunes.apple.com

*/


var baby = JSON.parse($response.body);

baby = {
  "status" : 0,
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1090640183,
    "receipt_creation_date" : "2023-06-06 16:06:26 Etc/GMT",
    "bundle_id" : "com.kiddy.fotoz",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1686065612000",
        "transaction_id" : "490001314520000",
        "is_trial_period" : "false",
        "original_transaction_id" : "490001314520000",
        "purchase_date" : "2023-06-06 16:06:06 Etc/GMT",
        "product_id" : "com.kiddy.fotoz.ipa.pro",
        "original_purchase_date_pst" : "2023-06-06 06:06:07 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1686065613000",
        "purchase_date_pst" : "2023-06-06 06:06:06 America/Los_Angeles",
        "original_purchase_date" : "2023-06-06 16:06:07 Etc/GMT"
      }
    ],
    "original_purchase_date" : "2023-06-06 16:00:00 Etc/GMT",
    "adam_id" : 1090640183,
    "receipt_creation_date_pst" : "2023-06-06 06:06:26 America/Los_Angeles",
    "request_date" : "2023-06-06 16:06:27 Etc/GMT",
    "request_date_pst" : "2023-06-06 06:06:27 America/Los_Angeles",
    "version_external_identifier" : 888888888,
    "request_date_ms" : "1686065635000",
    "original_purchase_date_pst" : "2023-06-06 06:00:00 America/Los_Angeles",
    "application_version" : "274",
    "original_purchase_date_ms" : "1686065430000",
    "receipt_creation_date_ms" : "1686065634000",
    "original_application_version" : "245",
    "download_id" : 666666666666666600
  },
  "Author" : "baby",
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1686065612000",
      "transaction_id" : "490001314520000",
      "is_trial_period" : "false",
      "original_transaction_id" : "490001314520000",
      "purchase_date" : "2023-06-06 16:06:06 Etc/GMT",
      "product_id" : "com.kiddy.fotoz.ipa.pro",
      "original_purchase_date_pst" : "2023-06-06 06:06:07 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "original_purchase_date_ms" : "1686065613000",
      "purchase_date_pst" : "2023-06-06 06:06:06 America/Los_Angeles",
      "original_purchase_date" : "2023-06-06 16:06:07 Etc/GMT"
    }
  ],
  "latest_receipt" : "chxm1023",
  "environment" : "Production",
  "pending_renewal_info" : [
    {
      "product_id" : "com.kiddy.fotoz.ipa.pro",
      "original_transaction_id" : "490001314520000",
      "auto_renew_product_id" : "com.kiddy.fotoz.ipa.pro",
      "auto_renew_status" : "1"
    }
  ],
  "warning" : "仅供学习，禁止转载或售卖",
};

$done({body : JSON.stringify(baby)});
