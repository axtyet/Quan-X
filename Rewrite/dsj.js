/*************************************

项目名称：电视家
下载地址：https://t.cn/A6KxaEw8
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http[s]?:\/\/(share\.dianshihome\.com\/api\/user\/base\/info|123\.56\.125\.184\/api\/.+\/user\/info|api\.gaoqingdianshi\.com\/api\/ad\/mobile\/config) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/dsj.js

[mitm]
hostname = share.dianshihome.com, api.gaoqingdianshi.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.sex = 1;
chxm1023.data.activeProduct = 2;
chxm1023.data.isTopLevel = true;
chxm1023.data.equityTime = 4092599349000;
chxm1023.data.pActiveTime = 4092599349000;
chxm1023.data.adEquityTime = 4092599349000;
chxm1023.data.mine = [];
chxm1023.data.homePopWindow = [];
chxm1023.data.homeVipOperate= [];

$done({body : JSON.stringify(chxm1023)});