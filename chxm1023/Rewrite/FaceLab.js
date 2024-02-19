/*************************************

项目名称：FaceLab
下载地址：https://t.cn/A6YSUpWY
更新日期：2024-02-19
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/subscription-api\.lyrebirdstudio\.net\/subscriptions\/apple\/(verify|status|decode-apple-receipt) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/FaceLab.js

[mitm]
hostname = subscription-api.lyrebirdstudio.net

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "data" : {
    "app_id" : "com.lyrebirdstudio.facelab",
    "quantity" : 1,
    "start_date" : 1708187889000,
    "end_date" : 4092599349000,
    "created_at" : 1708187892597,
    "user_id" : "A59BD623FE0349588C87C655BAA880B1",
    "type" : "Auto-Renewable Subscription",
    "main_status_code" : 3.1000000000000001,
    "mmp_id" : "1707723056548-8345046",
    "sub_status_name" : "TRIAL",
    "app_platform" : "IOS",
    "product_id" : "com.lyrebirdstudio.facelab.iap.subscription.weekly7a",
    "invoice_token" : "490001637717255",
    "updated_at" : 1708187892597,
    "status_name" : "ACTIVE_AUTO_REN_ON",
    "ownership_type" : "PURCHASED",
    "country" : "HK"
  }
};

$done({body : JSON.stringify(chxm1023)});