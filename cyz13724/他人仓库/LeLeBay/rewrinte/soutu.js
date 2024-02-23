/*************************************

项目功能：搜图神器 解锁VIP(先登录)
下载地址：https://t.cn/A6ogWd6z
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用方法：请先登录账号，再开脚本。

**************************************

[rewrite_local]
^http:\/\/wallpaper\.soutushenqi\.com\/api\/.+\/account\/token url script-response-body https://raw.githubusercontent.com/LeLeBay/rewrinte/main/soutu.js

[mitm]
hostname = wallpaper.soutushenqi.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.vipPastDueTime = 4092599350000;
chxm1023.data.vipLabel = "高级用户";
chxm1023.data.vipLabelLevel = 4;
chxm1023.data.vipType = 1;
chxm1023.data.pcVipType = 1;
chxm1023.data.pcVipPastDueTime = 4092599349000;
chxm1023.data.vitalityVipPastDueTime = 4092599349000;
chxm1023.data.vitalityPcVipPastDueTime = 4092599349000;

$done({body : JSON.stringify(chxm1023)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
