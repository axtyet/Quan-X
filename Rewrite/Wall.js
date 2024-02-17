/*************************************

项目名称：Wallcraft-动态壁纸
下载地址：http://t.cn/A6iO7Eht
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https?:\/\/billing-ios\.wallpaperscraft\.com\/verify_receipt\/remove_ads$ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/Wall.js

[mitm] 

hostname = *.wallpaperscraft.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

chxm1023.items["all_time"] = {
    "type" : "nonconsumable",
    "is_active" : true
};

$done({body : JSON.stringify(chxm1023)});
