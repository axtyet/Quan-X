/*************************************

项目名称：Grammarly-移动输入法
下载地址：https://t.cn/A6jLxORj
更新日期：2024-01-18
脚本作者：@David_Hex01
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.grammarly\.com\/(api\/v\d\/subscription|v\d\/user\/oranonymous) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/Grammarly.js

[mitm]
hostname = *.grammarly.com

*************************************/


let vip = JSON.parse($response.body);

vip.isPremium = true;
vip.description = "1-year Grammarly Subscription";
vip.title = "Annual";
vip.type =  "Premium";
vip.freemium = false;
vip.grammarlyEdu = true;
vip.free = false;
vip.institutionProofit = true;
vip.Proofit = true;
vip.isAppleSubscription = true;
vip.plagiarismOn = true;
vip.institutionProofit = true;

$done({body:JSON.stringify(vip)});
