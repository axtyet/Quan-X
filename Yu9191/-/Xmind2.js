/*

名称：Xmind-思维导图 解锁VIP2024
地址：https://t.cn/AipCL5zE
作者：ios151
说明：先登录Xmind账号在恢复购买


[rewrite_local]
^https?://www.xmind.cn/_res/devices url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Xmind2.js

[mitm]
hostname = www.xmind.cn

*/


var baby = JSON.parse($response.body);

baby = {
  "license" : {
    "status" : "sub",
    "expireTime" : 101966821994000
  },
  "_code" : 200,
  "raw_data" : "bKnTeMMu/TJ86ZFoUqG+sfKC1nitD8b/NaUT93UBc0woo0BF5uBVYXsHUQJkQxLHGlZCbdnKaKzZ4iljM9xddkyMycpUbAtDoywnr4RNzxqXY20pDM0Bdgm+HssaS1RworH8aaaf0IYnnGplxIuqMyT9107PrenF0MBUIaKU9Cw="
};

$done({body : JSON.stringify(baby)});
