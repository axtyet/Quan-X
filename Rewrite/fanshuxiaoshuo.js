/*************************************

项目名称：番薯小说-解锁VIP
下载地址：https://t.cn/A6CX524j
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]

^https:\/\/ggs\.manmeng168\.com url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/fanshuxiaoshuo.js

[mitm]

hostname = ggs.manmeng168.com

*************************************/


body = $response.body.replace(/\"vip":\w+/g, '\"vip":true').replace(/\"vip_end_time":\d+/g, '\"vip_end_time":4092599349000');

$done({body});
