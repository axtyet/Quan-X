/*************************************

项目名称：微信公众号底部广告
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http[s]?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad.+ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/wxgzhad.js

[mitm]
hostname = mp.weixin.qq.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

chxm1023.advertisement_num = 0;
chxm1023.advertisement_info = [];
delete chxm1023.appid;

$done({body : JSON.stringify(chxm1023)});
 
