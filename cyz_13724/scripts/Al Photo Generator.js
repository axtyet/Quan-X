// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Al Photo Generator.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/Al Photo Generator.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/Al Photo Generator.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/Al Photo Generator.stoverride

/*
项目名称： Al Photo Generator-Collart AI
项目作者： David
下载地址： https://apps.apple.com/us/app/ai-photo-generator-collart-ai/id1561940699?l=en-GB
使用说明： 要激活高级版，请单击底部的“助手”，然后单击“释放您的 Nicegram 福利”，最后单击底部的“开始”。完成此操作后，Premium 应该已解锁
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https:\/\/iap\.etm\.tech\/receipts url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/Al Photo Generator.js

[mitm]
hostname = hostname = iap.etm.tech

*/
var objc = JSON.parse($response.body);
objc = {
  "entitlements": [
    {
      "redeem": {},
      "expires_date_ms": 3859786074000,
      "purchase_date_ms": 1655289297000,
      "product_identifier": "SpeedTest_RemoveAd_1_Year_20181015",
      "is_in_intro_offer_period": false,
      "environment": "Production",
      "auto_renew": true,
      "is_in_trial_period": false,
      "entitlement_id": "premium"
    }
  ],
  "is_valid": true
};

$done({ body: JSON.stringify(objc) });