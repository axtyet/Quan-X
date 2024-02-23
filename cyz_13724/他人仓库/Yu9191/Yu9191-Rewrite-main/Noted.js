/******************************

脚本名称: noted录音笔记软件
下载地址：商店3.86版本
脚本作者：ios151
更新时间：2023年9月17日 16:30
问题反馈：https://t.me/ios151
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/subscription-api\.notedapp\.io\/api\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Noted.js

[mitm] 

hostname = subscription-api.notedapp.io

*******************************/

var objc = JSON.parse($response.body);

    objc = {
  "status" : 0,
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1149425482,
    "receipt_creation_date" : "2023-09-17 07:48:36 Etc/GMT",
    "bundle_id" : "com.digitalworkroom.noted",
    "original_purchase_date" : "2023-09-17 07:47:49 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1694936914000",
        "expires_date" : "2023-09-24 07:48:34 Etc/GMT",
        "expires_date_pst" : "2023-09-24 00:48:34 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "410001674409606",
        "is_trial_period" : "true",
        "original_transaction_id" : "410001674409606",
        "purchase_date" : "2023-09-17 07:48:34 Etc/GMT",
        "product_id" : "com.digitalworkroom.noted.plus.lifetime",
        "original_purchase_date_pst" : "2023-09-17 00:48:35 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1694936915000",
        "web_order_line_item_id" : "410000782636307",
        "expires_date_ms" : "1695541714000",
        "purchase_date_pst" : "2023-09-17 00:48:34 America/Los_Angeles",
        "original_purchase_date" : "2023-09-17 07:48:35 Etc/GMT"
      }
    ],
    "adam_id" : 1149425482,
    "receipt_creation_date_pst" : "2023-09-17 00:48:36 America/Los_Angeles",
    "request_date" : "2023-09-17 07:48:38 Etc/GMT",
    "request_date_pst" : "2023-09-17 00:48:38 America/Los_Angeles",
    "version_external_identifier" : 859055955,
    "request_date_ms" : "1694936918973",
    "original_purchase_date_pst" : "2023-09-17 00:47:49 America/Los_Angeles",
    "application_version" : "729",
    "original_purchase_date_ms" : "1694936869000",
    "receipt_creation_date_ms" : "1694936916000",
    "original_application_version" : "729",
    "download_id" : 502789016799463230
  },
  "latest_receipt_info" : {
    "quantity" : "1",
    "purchase_date_ms" : "1694936914000",
    "expires_date" : "2023-09-24 07:48:34 Etc/GMT",
    "expires_date_pst" : "2023-09-24 00:48:34 America/Los_Angeles",
    "is_in_intro_offer_period" : "false",
    "transaction_id" : "410001674409606",
    "expires_date_formatted" : "2023-09-24 07:48:34 Etc/GMT",
    "is_trial_period" : "true",
    "original_transaction_id" : "410001674409606",
    "purchase_date" : "2023-09-17 07:48:34 Etc/GMT",
    "product_id" : "com.digitalworkroom.noted.plus.lifetime",
    "original_purchase_date_pst" : "2023-09-17 00:48:35 America/Los_Angeles",
    "in_app_ownership_type" : "PURCHASED",
    "subscription_group_identifier" : "20421642",
    "original_purchase_date_ms" : "1694936915000",
    "web_order_line_item_id" : "410000782636307",
    "expires_date_ms" : "1695541714000",
    "purchase_date_pst" : "2023-09-17 00:48:34 America/Los_Angeles",
    "original_purchase_date" : "2023-09-17 07:48:35 Etc/GMT"
  },
  "latest_receipt" : "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",
  "valid" : true,
  "environment" : "Production",
  "pending_renewal_info" : {
    "product_id" : "com.digitalworkroom.noted.plus.lifetime",
    "original_transaction_id" : "410001674409606",
    "is_in_billing_retry_period" : false,
    "auto_renew_product_id" : "com.digitalworkroom.noted.plus.lifetime",
    "auto_renew_status" : "1"
  },
  "hasFreeTrial" : true
}


$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
