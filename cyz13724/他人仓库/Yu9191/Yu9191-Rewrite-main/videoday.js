/*
项目：videoday
功能：解锁pro


[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/videoday.js


[mitm]
hostname = buy.itunes.apple.com

*/

var lovebaby = JSON.parse($response.body);
lovebaby = {
  "environment": "Production",
  "pending_renewal_info": [
    {
      "product_id": "me.imgbase.videoday.profeaturesYearly",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1688386973000",
      "expires_date": "5201-03-14 00:00:00 Etc\/GMT",
      "expires_date_pst": "5201-03-14 00:00:00 America\/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "540001260447637",
      "is_trial_period": "false",
      "original_transaction_id": "540001260447637",
      "product_id": "me.imgbase.videoday.profeaturesYearly",
      "original_purchase_date_ms": "1688386974000",
      "expires_date_ms": "101966821994000"
    }
  ]
};
$done({ body: JSON.stringify(lovebaby) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
