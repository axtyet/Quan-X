/*************************************

项目名称：片羽集-照片日记(需试用)
下载地址：https://t.cn/A6WnDl4I
更新日期：2023-11-18
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/lentoapp\.com:8091\/getUserMemberShipInfo url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/iTunes/pianyuji.js
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/iTunes/pianyuji.js

[mitm]
hostname = lentoapp.com, buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vipa = '/getUserMemberShipInfo';
const vipb = '/verifyReceipt';


if ($request.url.indexOf(vipa) != -1){
  chxm1023.data = {
    "paytype" : 1,
    "expiretime" : "4092599349000"
  };
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023 =  {
    "status" : 0,
    "receipt" : {
      "receipt_type" : "Production",
      "app_item_id" : 6446111623,
      "receipt_creation_date" : "2023-11-17 18:13:54 Etc/GMT",
      "bundle_id" : "com.dylan.moment",
      "original_purchase_date" : "2023-11-17 17:53:57 Etc/GMT",
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
          "product_id" : "PYJMoment2",
          "original_purchase_date_pst" : "2023-09-09 02:09:10 America/Los_Angeles",
          "in_app_ownership_type" : "PURCHASED",
          "original_purchase_date_ms" : "1694250550000",
          "web_order_line_item_id" : "490000123456789",
          "expires_date_ms" : "4092599349000",
          "purchase_date_pst" : "2023-09-09 02:09:09 America/Los_Angeles",
          "original_purchase_date" : "2023-09-09 09:09:10 Etc/GMT"
        }
      ],
      "adam_id" : 6446111623,
      "receipt_creation_date_pst" : "2023-11-17 10:13:54 America/Los_Angeles",
      "request_date" : "2023-11-17 18:13:55 Etc/GMT",
      "request_date_pst" : "2023-11-17 10:13:55 America/Los_Angeles",
      "version_external_identifier" : 861436098,
      "request_date_ms" : "1700244835684",
      "original_purchase_date_pst" : "2023-11-17 09:53:57 America/Los_Angeles",
      "application_version" : "1.5.7",
      "original_purchase_date_ms" : "1700243637000",
      "receipt_creation_date_ms" : "1700244834000",
      "original_application_version" : "1.5.7",
      "download_id" : 502962907684909400
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
        "product_id" : "PYJMoment2",
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
        "product_id" : "PYJMoment2",
        "original_transaction_id" : "490001314520000",
        "auto_renew_product_id" : "PYJMoment2",
        "auto_renew_status" : "1"
      }
    ],
    "warning" : "仅供学习，禁止转载或售卖",
    "Telegram" : "https://t.me/chxm1023"
  };
}

$done({body : JSON.stringify(chxm1023)});