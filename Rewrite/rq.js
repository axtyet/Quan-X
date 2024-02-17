/*************************************

项目名称：如期
下载地址：https://t.cn/A6KVkB2y
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/www\.freshhome\.top url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/rq.js

[mitm]
hostname = www.freshhome.top

*************************************/


body = $response.body.replace(/\"isVip":"\d+"/g, '\"isVip":"1"').replace(/\"vipType":\w+/g, '\"vipType":true').replace(/\"vipEndTime":(.*?)/g, '\"vipEndTime":4092599350000');

$done({body});
