/*

熊掌记2.0.10：https://apps.apple.com/cn/app/%E7%86%8A%E6%8E%8C%E8%AE%B0-markdown-%E7%AC%94%E8%AE%B0%E8%BD%AF%E4%BB%B6/id1016366447

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xiongzhangji.js

[MITM]
hostname = buy.itunes.apple.com

*/



var baby = { 
    "receipt": { 
      "receipt_type": "Production", 
      "bundle_id": "https://t.me/ios151", 
      "in_app": [ 
        { 
          "quantity": "1", 
          "purchase_date_ms": "666666666666666", 
          "transaction_id": "666666666666666", 
          "original_transaction_id": "666666666666666", 
          "product_id": "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis", 
          "in_app_ownership_type": "PURCHASED", 
          "original_purchase_date_ms": "666666666666666" 
        } 
      ], 
      "application_version": "6", 
      "original_purchase_date_ms": "666666666666666", 
      "original_application_version": "6" 
    }, 
    "environment": "Production", 
    "pending_renewal_info": [ 
      { 
        "product_id": "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis", 
        "auto_renew_status": "1" 
      } 
    ], 
    "status": 0, 
    "latest_receipt_info": [ 
      { 
        "quantity": "1", 
        "purchase_date_ms": "666666666666666", 
        "expires_date": "9999-09-09 08:08:08 Etc\/GMT", 
        "expires_date_pst": "9999-09-09 08:08:08 America\/Los_Angeles", 
        "is_in_intro_offer_period": "false", 
        "transaction_id": "666666666666666", 
        "is_trial_period": "false", 
        "original_transaction_id": "666666666666666", 
        "product_id": "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis", 
        "original_purchase_date_ms": "666666666666666", 
        "expires_date_ms": "148204937166000" 
      } 
    ] 
};
$done({ body: JSON.stringify(baby) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
