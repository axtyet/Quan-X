/*************************************

项目名称：随手写
下载地址：https://t.cn/A6OUT4Qn
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/www\.kkmop\.com\/vipMsg1 url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/suishouxie.js

[mitm]
hostname = www.kkmop.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.resultMsg = JSON.stringify({ ...JSON.parse(chxm1023.resultMsg), vip: true, vipDays: 4092599349,  vipDateTo: "2099-09-09T09:09:09Z",  viptime: "2099-09-09T09:09:09Z" });

$done({ body: JSON.stringify(chxm1023)});
