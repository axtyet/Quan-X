/*************************************

项目名称：Koan-提问日记
下载地址：https://t.cn/A6O55spC
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/koan\.bopulab\.cn\/(user\/getBriefByUserIdV3|payment\/iosIap\/receipt) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/koan.js

[mitm]
hostname = koan.bopulab.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data["memberCategory"] = 1;
chxm1023.data["memberExpiredAt"] = "4092599349000";

$done({body : JSON.stringify(chxm1023)});
