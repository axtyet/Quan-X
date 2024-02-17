/****************************************

项目功能：酷安去好物推荐
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*****************************************

^https:\/\/api\.coolapk\.com\/v6\/feed\/detail.* url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/KA.js

hostname=api.coolapk.com

****************************************/


let obj = JSON.parse($response.body);

delete obj.data.include_goods
$done({body: JSON.stringify(obj)});
