/*************************************

项目名称：DeepFaker
下载地址：https://t.cn/A6WuKDkR
更新日期：2023-11-19
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.deepfaker\.app\/api\/.* url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/DeepFaker.js

[mitm]
hostname = api.deepfaker.app

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.subscription_type = "PRO";
chxm1023.max_video_file_size = 990000000;
chxm1023.subscription_expiration_date = "2099-09-09T09:09:09Z";

$done({body : JSON.stringify(chxm1023)});
