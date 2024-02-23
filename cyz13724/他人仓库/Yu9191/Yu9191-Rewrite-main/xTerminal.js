/* 
1软件：‎xTerminal
2软件：色采
1下载：https://apps.apple.com/cn/app/xterminal-ssh-terminal-shell/id1544728400
2下载：https://apps.apple.com/app/id1439521846
功能：解锁pro


[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/‎xTerminal.js


[mitm]
hostname = buy.itunes.apple.com

*/
var lovebaby = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 1544728400,
    "receipt_creation_date": "2023-08-08 15:21:15 Etc/GMT",
    "bundle_id": "com.septudio.SSHClientLite",
    "original_purchase_date": "2023-08-08 15:21:15 Etc/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1691508073000",
        "expires_date": "2093-08-11 15:21:13 Etc/GMT",
        "expires_date_pst": "2093-08-11 08:21:13 America/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "transaction_id": "190001678979391",
        "is_trial_period": "true",
        "original_transaction_id": "190001678979391",
        "purchase_date": "2023-08-08 15:21:13 Etc/GMT",
        "product_id": "xterminal.pro2",
        "original_purchase_date_pst": "2023-08-08 08:21:14 America/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1691508074000",
        "web_order_line_item_id": "190000756628820",
        "expires_date_ms": "1691767273000",
        "purchase_date_pst": "2023-08-08 08:21:13 America/Los_Angeles",
        "original_purchase_date": "2023-08-08 15:21:14 Etc/GMT"
      }
    ],
    "adam_id": 1544728400,
    "receipt_creation_date_pst": "2023-08-08 08:21:15 America/Los_Angeles",
    "request_date": "2023-08-08 15:21:19 Etc/GMT",
    "request_date_pst": "2023-08-08 08:21:19 America/Los_Angeles",
    "version_external_identifier": 854046885,
    "request_date_ms": "1691508079779",
    "original_purchase_date_pst": "2023-08-08 08:21:15 America/Los_Angeles",
    "application_version": "186",
    "original_purchase_date_ms": "1691508075000",
    "receipt_creation_date_ms": "1691508075000",
    "original_application_version": "186",
    "download_id": null
  },
  "pending_renewal_info": [
    {
      "product_id": "xterminal.pro2",
      "original_transaction_id": "190001678979391",
      "auto_renew_product_id": "xterminal.pro2",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1691508073000",
      "expires_date": "2093-08-11 15:21:13 Etc/GMT",
      "expires_date_pst": "2093-08-11 08:21:13 America/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "190001678979391",
      "is_trial_period": "true",
      "original_transaction_id": "190001678979391",
      "purchase_date": "2023-08-08 15:21:13 Etc/GMT",
      "product_id": "xterminal.pro2",
      "original_purchase_date_pst": "2023-08-08 08:21:14 America/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "20871436",
      "original_purchase_date_ms": "1691508074000",
      "web_order_line_item_id": "190000756628820",
      "expires_date_ms": "1691767273000",
      "purchase_date_pst": "2023-08-08 08:21:13 America/Los_Angeles",
      "original_purchase_date": "2023-08-08 15:21:14 Etc/GMT"
    }
  ]
};

$done({ body: JSON.stringify(lovebaby) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
