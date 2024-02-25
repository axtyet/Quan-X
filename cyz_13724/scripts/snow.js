// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/snow.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/snow.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/snow.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/snow.stoverride

/*
项目名称： SNOW-Ai写真
项目作者： David
下载地址： https://apps.apple.com/us/app/snow-ai-profile/id1022267439?l=en-GB
使用说明： 
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https:\/\/user-snow-api\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/snow.js

[mitm]
hostname = *.snow.me
*/
var objc = JSON.parse($response.body);

objc = {
  "result": {
    "products": [
      {
        "id": 4,
        "productId": "com.campmobile.snow.subscribe.oneyear",
        "storeType": "APPLE",
        "title": "apple - year",
        "sale": true,
        "isPromotion": false,
        "createdAt": 1708883213000,
        "packageName": "com.campmobile.snow"
      }
    ],
    "activated": true
  }
};

$done({ body: JSON.stringify(objc)});