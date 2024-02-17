/*************************************

项目名称：Ai-Artify
下载地址：https://t.cn/A6jQDJke
更新日期：2024-02-01
脚本作者：@David_Hex01
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/app\.kqwl\.site\/api\/v\d\/user\/install url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/artify.js

[mitm]
hostname = app.kqwl.site

*************************************/


var body = $response.body;

body = body.replace(/\"isVip":\w+/g, '\"isVip": true');
body = body.replace(/\"vip":\w+/g, '\"vip": true');
body = body.replace(/\"vipExpireTime":\w+/g, '\"vipExpireTime": 4092599349000');

$done({body});