// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/FTzhongwenwang.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/FTzhongwenwang.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/FTzhongwenwang.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/FTzhongwenwang.stoverride

/*
FT中文网 外区
特别说明：微信登录
@ios151
可以搭配快捷指令使用@leepyer
地址：https://www.icloud.com/shortcuts/652791ed6b8d45fb8f6ff4f43e525405获取文章内容
加上这个参数?webview=ftcapp就能返回全文
***********************
[rewrite_local]
^https:\/\/dqbam2jv6gg9m\.cloudfront\.net\/index\.php\/jsapi\/paywall url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/FTzhongwenwang.js
[mitm] 
hostname = dqbam2jv6gg9m.cloudfront.net
*/

var baby = JSON.parse($response.body);

baby = {
  "paywall": 0,
  "premium": 1,
  "expire": "4092599349",
  "standard": 1,
  "v": 2099,
  "campaign_code": "",
  "latest_duration": "yearly",
  "addon": 0
};

$done({ body: JSON.stringify(baby) });
