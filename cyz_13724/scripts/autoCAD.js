// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/autoCAD.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/autoCAD.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/autoCAD.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/autoCAD.stoverride

/*
项目名称： AutoCAD
项目作者： David
下载地址： https://apps.apple.com/us/app/autocad/id393149734?l=en-GB
使用说明： 
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https:\/\/app\.autocad360\.com\/entitlements\/v2\/me\/status url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/autoCAD.js

[mitm]
hostname = app.autocad360.com

*/
var obj = JSON.parse($response.body);

obj = {
  "status": "ADSK_GRANTED_USERS_AUTODESK_EDUCATION_BUNDLE",
  "is_legacy_subscriber": true,
  "features": [
    "MyDesignStorage",
    "svc0000020",
    "svc0000087",
    "svc0000089",
    "svc0002664",
    "svc0003000"
  ],
  "is_trial": false,
  "is_authorized": true,
  "type": "ADSK_GRANTED_USERS_AUTODESK_EDUCATION_BUNDLE",
  "start_sec": 1709105997,
  "subscribed": true,
  "is_mobile_store_subscriber": true,
  "subscriptions": [],
  "expiry_sec": 4080428400,
  "is_edu_account": true,
  "recheck_sec": 1709218539
};

$done({ body: JSON.stringify(obj) });