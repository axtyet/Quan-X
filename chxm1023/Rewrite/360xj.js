/*************************************

项目名称：360相机
下载地址：https://t.cn/A6O2Vt0D
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.camera360\.com\/(api\/(order\/purchase|iap\/check-receipt)|v\d\/operational-positions) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/360xj.js

[mitm]
hostname = *.camera360.com

*************************************/


var chxm1023 = JSON.parse($response.body);

const vip1 = '/api/order/purchase';
const vip2 = '/api/iap/check-receipt';
const ad = '/operational-positions';

if ($request.url.indexOf(vip1) != -1){
  chxm1023["data"] = {
    "originalTransactionId" : "490001464780901",
    "errorCode" : 0,
    "purchaseTime" : 1662685749,
    "isTrialPeriod" : 1,
    "expireTime" : 4092599349,
    "sandbox" : 0
  };
}

if ($request.url.indexOf(vip2) != -1){
  chxm1023["data"] = {
    "sandbox" : 0,
    "purchaseTime" : 1662685749,
    "isTrialPeriod" : 1,
    "originalTransactionId" : "490001464780901",
    "appleExpireTime" : 4092599349,
    "productId" : "vip_yearly_3daysfree",
    "appleVip" : 1,
    "expireTime" : 4092599349,
    "giftVip" : 1,
    "operationVip" : 1,
    "errorCode" : 0
  };
}

if ($request.url.indexOf(ad) != -1){
  chxm1023.Boot = [];
}

$done({body : JSON.stringify(chxm1023)});
