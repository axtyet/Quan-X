/*************************************

项目名称：TimeTree日历
下载地址：https://t.cn/A60Me2oT
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.timetreeapp\.com\/.+\/user\/.+ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/TimeTree.js

[mitm]
hostname = api.timetreeapp.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "user_subscription" : {
    "current_subscription" : {
      "status" : 1,
      "subscription_token" : "490001314520000",
      "auto_renewal" : true,
      "cancelled" : false,
      "platform" : 1,
      "platform_status" : "ACTIVE",
      "expire_at" : 4092599349000,
      "plan" : 1,
      "in_trial" : true
    },
    "trial_used" : true,
    "user_id" : 66666666,
    "uuid" : "00000000-a001-b002-c003-d00000000004"
  }
};

$done({body : JSON.stringify(chxm1023)});
