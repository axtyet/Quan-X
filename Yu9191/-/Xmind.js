/*

名称：Xmind-思维导图 解锁VIP
地址：https://t.cn/AipCL5zE
作者：聪
说明：先登录Xmind账号在恢复购买


[rewrite_local]
^https?:\/\/www\.xmind\.(cn|net|app)\/.+\/devices url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Xmind.js

[mitm]
hostname = www.xmind.*

*/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "license" : {
    "status" : "sub",
    "expireTime" : 4092599349000
  },
  "_code" : 200,
  "raw_data" : "bKnTeMMu/TJ86ZFoUqG+sfKC1nitD8b/NaUT93UBc0woo0BF5uBVYXsHUQJkQxLHGlZCbdnKaKzZ4iljM9xddkyMycpUbAtDoywnr4RNzxqXY20pDM0Bdgm+HssaS1RworH8aaaf0IYnnGplxIuqMyT9107PrenF0MBUIaKU9Cw="
};

$done({body : JSON.stringify(chxm1023)});
