/*************************************

项目名称：Boring Day 壁纸
下载地址：https://t.cn/A6WUmTgo
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/boringday\.api\.neuronlabs\.art\/v\d\/(order\/(premium|restore)|my\/info) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/boring.js

[mitm]
hostname = boringday.api.neuronlabs.art

*************************************/


var chxm1023 = JSON.parse($response.body);

if ($request.url.indexOf('restore') != -1){
  chxm1023.retData = {
    "expiredAt" : 4092599349000,
    "productID" : "com.neuronlabs.id108",
    "orderNo" : "490000123456789",
    "isSubscribe" : true
  };
}

if ($request.url.indexOf('premium') != -1){
  chxm1023.retData = [
    {
      "isSubscribe" : true,
      "productID" : "com.neuronlabs.id108"
    }
  ];
}

if ($request.url.indexOf('info') != -1){
  chxm1023.retData.isVIP = true;
  chxm1023.retData.expiresAt = 4092599349000;
}

$done({body : JSON.stringify(chxm1023)});
