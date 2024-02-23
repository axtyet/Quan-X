/*

项目名称：订阅通
下载地址：商店
脚本作者：@ios151本人付费token
使用声明：仅供参考，禁止转载与售卖！
Surprise：Js未加密


[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/dingyuetong.js


[mitm]
hostname = buy.itunes.apple.com

*/

var responseData = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 1577082754,
    "receipt_creation_date": "2023-07-29 07:36:22 Etc/GMT",
    "bundle_id": "com.touchbits.subscriptions",
    "original_purchase_date": "2023-07-24 14:01:30 Etc/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1690613606000",
        "expires_date": "2024-07-29 06:53:26 Etc/GMT",
        "expires_date_pst": "2024-07-28 23:53:26 America/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "transaction_id": "190001666778930",
        "is_trial_period": "false",
        "original_transaction_id": "190001666778930",
        "purchase_date": "2023-07-29 06:53:26 Etc/GMT",
        "product_id": "com.touchbits.subscriptions.iap.pro.yearly",
        "original_purchase_date_pst": "2023-07-28 23:53:29 America/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1690613609000",
        "web_order_line_item_id": "190000751016527",
        "expires_date_ms": "1722236006000",
        "purchase_date_pst": "2023-07-28 23:53:26 America/Los_Angeles",
        "original_purchase_date": "2023-07-29 06:53:29 Etc/GMT"
      }
    ],
    "adam_id": 1577082754,
    "receipt_creation_date_pst": "2023-07-29 00:36:22 America/Los_Angeles",
    "request_date": "2023-07-29 07:36:32 Etc/GMT",
    "request_date_pst": "2023-07-29 00:36:32 America/Los_Angeles",
    "version_external_identifier": 858620309,
    "request_date_ms": "1690616192621",
    "original_purchase_date_pst": "2023-07-24 07:01:30 America/Los_Angeles",
    "application_version": "683",
    "original_purchase_date_ms": "1690207290000",
    "receipt_creation_date_ms": "1690616182000",
    "original_application_version": "683",
    "download_id": 502634037727760771
  },
  "pending_renewal_info": [
    {
      "product_id": "com.touchbits.subscriptions.iap.pro.yearly",
      "original_transaction_id": "190001666778930",
      "auto_renew_product_id": "com.touchbits.subscriptions.iap.pro.yearly",
      "auto_renew_status": "0"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1690613606000",
      "expires_date": "2024-07-29 06:53:26 Etc/GMT",
      "expires_date_pst": "2024-07-28 23:53:26 America/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "190001666778930",
      "is_trial_period": "false",
      "original_transaction_id": "190001666778930",
      "purchase_date": "2023-07-29 06:53:26 Etc/GMT",
      "product_id": "com.touchbits.subscriptions.iap.pro.yearly",
      "original_purchase_date_pst": "2023-07-28 23:53:29 America/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "21196764",
      "original_purchase_date_ms": "1690613609000",
      "web_order_line_item_id": "190000751016527",
      "expires_date_ms": "1722236006000",
      "purchase_date_pst": "2023-07-28 23:53:26 America/Los_Angeles",
      "original_purchase_date": "2023-07-29 06:53:29 Etc/GMT"
    }
  ],
  //"latest_receipt": "YOUR_LATEST_RECEIPT_DATA_HERE"
};

$done({
  body: JSON.stringify(responseData)
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
