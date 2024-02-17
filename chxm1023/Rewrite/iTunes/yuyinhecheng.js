/*************************************

项目名称：语音合成
下载地址：https://t.cn/A6WQcD2x
更新日期：2023-11-14
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/iTunes/yuyinhecheng.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "status" : 0,
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1622772469,
    "receipt_creation_date" : "2023-11-13 17:49:21 Etc/GMT",
    "bundle_id" : "com.qingxiu.synthesizer",
    "original_purchase_date" : "2023-11-13 17:45:23 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1694250549000",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "490001314520000",
        "is_trial_period" : "false",
        "original_transaction_id" : "490001314520000",
        "purchase_date" : "2023-09-09 09:09:09 Etc/GMT",
        "product_id" : "com.qingxiu.synthesizer.mon",
        "original_purchase_date_pst" : "2023-09-09 02:09:10 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1694250550000",
        "web_order_line_item_id" : "490000123456789",
        "expires_date_ms" : "4092599349000",
        "purchase_date_pst" : "2023-09-09 02:09:09 America/Los_Angeles",
        "original_purchase_date" : "2023-09-09 09:09:10 Etc/GMT"
      }
    ],
    "adam_id" : 1622772469,
    "receipt_creation_date_pst" : "2023-11-13 09:49:21 America/Los_Angeles",
    "request_date" : "2023-11-13 17:53:18 Etc/GMT",
    "request_date_pst" : "2023-11-13 09:53:18 America/Los_Angeles",
    "version_external_identifier" : 858127592,
    "request_date_ms" : "1699897998158",
    "original_purchase_date_pst" : "2023-11-13 09:45:23 America/Los_Angeles",
    "application_version" : "1",
    "original_purchase_date_ms" : "1699897523000",
    "receipt_creation_date_ms" : "1699897761000",
    "original_application_version" : "1",
    "download_id" : 502951567056124100
  },
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1694250549000",
      "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
      "expires_date_pst" : "2099-09-09 06:06:06 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "490001314520000",
      "is_trial_period" : "false",
      "original_transaction_id" : "490001314520000",
      "purchase_date" : "2023-09-09 09:09:09 Etc/GMT",
      "product_id" : "com.qingxiu.synthesizer.mon",
      "original_purchase_date_pst" : "2023-09-09 02:09:10 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "original_purchase_date_ms" : "1694250550000",
      "web_order_line_item_id" : "490000123456789",
      "expires_date_ms" : "4092599349000",
      "purchase_date_pst" : "2023-09-09 02:09:09 America/Los_Angeles",
      "original_purchase_date" : "2023-09-09 09:09:10 Etc/GMT"
    }
  ],
  "latest_receipt" : "chxm1023",
  "environment" : "Production",
  "pending_renewal_info" : [
    {
      "product_id" : "com.qingxiu.synthesizer.mon",
      "original_transaction_id" : "490001314520000",
      "auto_renew_product_id" : "com.qingxiu.synthesizer.mon",
      "auto_renew_status" : "1"
    }
  ],
  "warning" : "仅供学习，禁止转载或售卖",
  "Telegram" : "https://t.me/chxm1023"
};

$done({body: JSON.stringify(chxm1023)});
