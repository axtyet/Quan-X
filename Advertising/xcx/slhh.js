/*************************************

项目名称：搜罗好货
下载地址：#小程序://搜罗好货/Rt7Kuvpe4GLPjaD
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.i3zh\.com\/wp-json\/watch-life-net\/.+\/(options|posts) url script-response-body https://raw.githubusercontent.com/chxm1023/Advertising/main/xcx/slhh.js

[mitm]
hostname = www.i3zh.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

chxm1023.listAdId = "";
chxm1023.videoAdId = "";
chxm1023.interstitialAdId = "";
chxm1023.excitationAd = "0";
chxm1023.detailAd = "0";

$done({body : JSON.stringify(chxm1023)});
