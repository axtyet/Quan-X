/*

禅记：https://apps.apple.com/cn/app/zenjournal-stress-free-journal/id1399816360

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/chanji.js

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
          "product_id": "zen_pro", 
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
        "product_id": "zen_pro", 
        "auto_renew_status": "1" 
      } 
    ], 
    "status": 0, 
    "latest_receipt_info": [ 
      { 
        "quantity": "1", 
        "purchase_date_ms": "666666666666666", 
        "expires_date": "6666-06-06 06:06:06 Etc\/GMT", 
        "expires_date_pst": "6666-06-06 06:06:06 America\/Los_Angeles", 
        "is_in_intro_offer_period": "false", 
        "transaction_id": "666666666666666", 
        "is_trial_period": "false", 
        "original_transaction_id": "666666666666666", 
        "product_id": "zen_pro", 
        "original_purchase_date_ms": "666666666666666", 
        "expires_date_ms": "148204937166000" 
      } 
    ] 
};
$done({ body: JSON.stringify(baby) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
