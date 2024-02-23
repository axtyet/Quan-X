// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/camera360.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/camera360.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/camera360.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/camera360.stoverride

/*
项目名称： camera360
项目作者： David
下载地址： https://apps.apple.com/appid443354861
使用说明： 开脚本再开软件，未成功恢复购买。如使用非qx请使用上述链接或通过script-hub自行转换。下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，禁止用于商业用途。

[rewrite_local]
https:\/\/(?:cdn-bm\.camera360\.com\/api\/iap\/check-receipt|phototask-api\.360in\.com\/user\/profile|cdn-bm\.camera360\.com\/api\/pay\/recovery) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/camera360.js    

[mitm]
hostname = *.camera360.com
*/

var obj = JSON.parse($response.body);
obj=
{
  "status": 200,
  "data": {
    "sandbox": 1,
    "purchaseTime": 1991682188,
    "giftVip": 0,
    "productId": "VIP_yearly_29.99",
    "appleVip": 1,
    "expireTime": 50005328520,
    "operationVip": 1,
    "errorCode": 0
  },
  "message": "ok",
  "exetime": "1572056389212-1672531199999",
  "serverTime": 1893451191.3622
};
$done({body: JSON.stringify(obj)});