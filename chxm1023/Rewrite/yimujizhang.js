/*************************************

项目名称：一木记账
下载地址：https://t.cn/A6YRLuSR
更新日期：2024-03-03
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/yimuapp\.com:8082\/bookkeeping\/user\/getUserInfoById url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/yimujizhang.js

[mitm]
hostname = yimuapp.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.result.vipTime = 4092599349000;  //会员到期时间，可删除
chxm1023.result.vipType = 2;  //永久会员

$done({body : JSON.stringify(chxm1023)});
