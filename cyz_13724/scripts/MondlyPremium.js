// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/MondlyPremium.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/MondlyPremium.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/MondlyPremium.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/MondlyPremium.stoverride

/*
项目名称： MondlyPremium
项目作者： David
下载地址： https://apps.apple.com/app/id987873536
使用说明： 开脚本再开软件，未成功恢复购买。如使用非qx请使用上述链接或通过script-hub自行转换。下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，禁止用于商业用途。

[rewrite_local]
^https:\/\/api\.mondlylanguages\.com\/v3\/ios\/user\/sync url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/MondlyPremium.js    

[mitm]
hostname = api.mondlylanguages.com
*/

$done({
    body: JSON.stringify({
      purchased_products: [{
        id: "12month_all_4_trial",
        role: "12month",
        expiration_date: 4079776553,
        is_from_current_platform: true,
        is_auto_renewing: true,
        is_grace_period: false,
        is_billing_retry_period: false,
        is_initial_purchase: false,
        is_upgraded: true,
        is_in_free_trial_period: false
      }],
      is_premium: true,
      pucharses: ["me"],
      subscriptions: { me: "2099-09-09 09:09:09" },
      subscription: { me: "2099-09-09 09:09:09" },
      parsed_transactions: ["394957530283285"]
    })
  });