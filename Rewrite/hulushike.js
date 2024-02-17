/*************************************

项目名称：葫芦时刻-电子杂志
下载地址：https://t.cn/A6WmsPMe
更新日期：2023-11-19
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api-search\.hulusaas\.com\/api\/user\/.* url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/hulushike.js

[mitm]
hostname = api-search.hulusaas.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.result.memberDate = "4092599349";
chxm1023.result.validTime = "2099-09-09";
chxm1023.result.payType = 3;
chxm1023.result.hasPayItem = 1;

$done({body : JSON.stringify(chxm1023)});
