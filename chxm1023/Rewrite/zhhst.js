/*************************************

项目名称：字画幻术图
下载地址：https://t.cn/A6OK0wQh
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.zihuaai\.com\/v\d\/users url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/zhhst.js

[mitm]
hostname = api.zihuaai.com

*************************************/


var body = $response.body;

body = body.replace(/\"isVip":\d+/g, '\"isVip":1');
body = body.replace(/\"vipExpired":\d+/g, '\"vipExpired":4092599349000');

$done({body});
