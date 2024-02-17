/*************************************

项目名称：小时尚 解锁VIP
下载地址：https://t.cn/A6Xr4Kjn
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]

^https?:\/\/kongque\.twan\.cn\/index.+\/admin\/appberrycustomer.+ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/xiaoshishang.js

[mitm]

hostname = kongque.twan.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "berry" : 3,
  "isValid" : 2,
  "berryEnd" : "2099-09-09 09:09:09"
};

$done({body : JSON.stringify(chxm1023)});
