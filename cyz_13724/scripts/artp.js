// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/artp.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/artp.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/artp.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/artp.stoverride

/*
项目名称： 傲软投屏
项目作者： David
下载地址： https://apps.apple.com/us/app/apowermirror-screen-mirroring/id1244625890?l=en-GB
使用说明： 
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https:\/\/gw\.aoscdn\.com\/base\/vip\/v2\/vips$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/artp.js

[mitm]
hostname = gw.aoscdn.com
*/
var objc = JSON.parse($response.body);
objc = {
  "status": 200,
  "message": "success",
  "data": {
    "group_expired_at": 4096438798,
    "is_subscribe": 1,
    "max_devices": 5,
    "owner": 77785770,
    "period_type": "Yearly",
    "candy_expired_at": 4096438798,
    "pending": 0,
    "remained_seconds": 9999999999,
    "limit": 0,
    "expired_at": 4096438798,
    "candy": 9999999999,
    "ai_quota": 999999999,
    "license_type": "vip",
    "quota": 9999999999,
  "selected": 1,
  "product_desc": "Flash sale",
    "vip_quantity": 6,
  "enable": 1,
    "status": 1,
    "coin": 9999999999
  }
}
$done({ body: JSON.stringify(objc)});