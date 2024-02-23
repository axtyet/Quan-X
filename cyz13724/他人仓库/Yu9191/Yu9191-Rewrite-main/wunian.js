/*************************************

项目名称：五年
软件版本：3.17.25
使用说明：需要登录
下载地址：https://is.gd/4pEVhV
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/wunian.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var anni = JSON.parse($response.body);

anni = {
"receipt" : {
    "original_purchase_date_ms" : "1669275302000",
    "bundle_id" : "com.sugarmo.ScrollClip",
    "original_application_version" : "3206",
    "application_version" : "3206",
    "receipt_type" : "Production",
    "in_app" : [
      {
        "product_id" : "com.sugarmo.ScrollClip.pro",
        "quantity" : "1",
        "purchase_date_ms" : "1655267400000",
        "transaction_id" : "66666666666666",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1655267400000",
        "original_transaction_id" : "300001282466542"
      }
    ]
  },
  "environment" : "Production",
  "status" : 0,
  "latest_receipt_info" : [
    {
      "product_id" : "com.diary.vipautomonth",
      "quantity" : "1",
      "purchase_date_ms" : "1655265600000",
      "expires_date_pst" : "2099-12-31 12:00:00 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "expires_date" : "2099-12-31 12:00:00 Etc/GMT",
      "transaction_id" : "66666666666666",
      "original_purchase_date_ms" : "1688386974000",
      "is_trial_period" : "false",
      "expires_date_ms" : "4102372800000",
      "original_transaction_id" : "540001260447637"
    }
  ],
  "pending_renewal_info" : [
    {
      "auto_renew_status" : "1",
      "product_id" : "com.diary.vipautomonth"
    }
  ]
};

$done({body : JSON.stringify(anni)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
