/*************************************

项目名称：网易蜗牛读书
下载地址：https://t.cn/A6NBBLeU
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/p\.du\.163\.com\/gain\/readtime\/info url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/wywnds.js

[mitm]
hostname = p.du.163.com

*************************************/


var body=$response.body;

chxm1023 = body.replace(/tradeEndTime\":\d+/g,'tradeEndTime":4092599349000');

$done(chxm1023);
