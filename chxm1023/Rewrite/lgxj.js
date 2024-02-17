/*************************************

项目名称：日杂相机，Fomz相机
下载地址：https://t.cn/A6KMxlLF
下载地址：https://t.cn/A6KMxOrR
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！！

**************************************

[rewrite_local]
^https:\/\/.*\.imendon\.com\/v2\/purchase\/vip\/verification url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/lgxj.js

[mitm]
hostname = *.imendon.com

*************************************/


var chxm1023 = JSON.parse($response.body);chxm1023.data.isValid = 1;$done({body : JSON.stringify(chxm1023)});
