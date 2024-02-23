// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/MimoPro.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/MimoPro.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/MimoPro.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/MimoPro.stoverride

/*
项目名称： Mimo
项目作者： David
下载地址： https://apps.apple.com/us/app/coding-programming-mimo/id1133960732?l=en-GB
使用说明： 先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。You need to create account first
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
https://api.getmimo.com/v1/subscriptions url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/MimoPro.js

[mitm]
hostname = api.getmimo.com
*/

var obj = JSON.parse($response.body);

obj = {
  "isActive": true,
  "source": "ios",
  "status": "active",
  "trialEndAt": "2099-09-09T09:09:09+00:00",
  "subscriptions": [
    {
      "isActive": true,
      "source": "ios",
      "status": "active",
      "trialEndAt": "2099-09-09T09:09:09+00:00",
      "interval": "yearly",
      "intervalCount": 1,
      "activeUntil": "2099-09-09T09:09:09+00:00",
      "createdAt": "2024-02-12T10:04:09+00:00",
      "clientSecret": "",
      "canceledAt": "2024-02-12T09:25:22.380735+00:00"
    }
  ],
  "interval": "yearly",
  "intervalCount": 1,
  "activeUntil": "2099-09-09T09:09:09+00:00",
  "createdAt": "2024-02-12T10:04:09+00:00",
  "clientSecret": "",
  "canceledAt": "2024-02-12T09:25:22.380735+00:00"
}
$done({body: JSON.stringify(obj)});
