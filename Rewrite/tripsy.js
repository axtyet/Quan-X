/*************************************

项目名称：Tripsy-旅行规划者
下载地址：https://t.cn/A60jMYum
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/firstclass\.tripsy\.app\/api\/.+\/receipt\/update url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/tripsy.js

[mitm]
hostname = firstclass.tripsy.app

*************************************/


if ($response.body != 'undefined'){var chxm1023 = JSON.parse($response.body);chxm1023 = {"is_premium":true,"expiration_intent":0,"is_trial":true,"subscription":"premium.yearly.29.99.v4","expiration_date":"2099-09-09T09:09:09Z","is_introductory_offer":false,"is_in_billing_retry_period":false};$done({body:JSON.stringify(chxm1023)})};$done();