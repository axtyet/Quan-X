/*************************************

项目名称：虫虫吉他
下载地址：https://t.cn/A6loASg1
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/cc\.lzjoy\.com url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/ccjt.js

[mitm]
hostname = cc.lzjoy.com

*************************************/


var body = $response.body;

body = body.replace(/\"is_lifelong_vip":"\d+"+/g, '\"is_lifelong_vip":"1"');

body = body.replace(/\"is_buy":"\d+"+/g, '\"is_buy":"1"');

body = body.replace(/\"has_pay":"\d+"+/g, '\"has_pay":"1"');

body = body.replace(/\"has_buy":"\d+"/g, '\"has_buy":"1"');

body = body.replace(/\"support_num":"\d+"/g, '\"support_num":"1"');

body = body.replace(/\"is_hit":"\d+"/g, '\"is_hit":"1"');

body = body.replace(/\"is_pay":"\d+"/g, '\"is_pay":"0"');

body = body.replace(/\"is_vip":"\d+"+/g, '\"is_vip":"1"');

body = body.replace(/\"is_expire":"\d+"/g, '\"is_expire":"0"');

body = body.replace(/\"expire_date_1":"\d+"/g, '\"expire_date_1":"2099-09-09 09:09:09"');

body = body.replace(/\"user_balance":"\d+"/g, '\"user_balance":"1"');

body = body.replace(/\"vip_num":\d+/g, '\"vip_num":1');

body = body.replace(/\"vip_will_expire_year":"\d+"+/g, '\"vip_will_expire_year":"1"');

body = body.replace(/\"vip_expire_date":"(.*?)"/g, '\"vip_expire_date":"2099-09-09 09:09:09"');

body = body.replace(/\"expire_date":"(.*?)"/g, '\"expire_date":"2099-09-09 09:09:09"');

$done({body});