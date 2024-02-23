// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/nicegram.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/nicegram.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/nicegram.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/nicegram.stoverride

/*
项目名称： nicegram
项目作者： David
下载地址： https://apps.apple.com/us/app/nicegram-ai-chat-for-telegram/id1608870673?l=en-GB
使用说明： 先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
https://nicegram.cloud/api/v6/telegram/auth|user|info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/nicegram.js

[mitm]
hostname = nicegram.cloud
*/
var body = $response.body;

body = body.replace(/"store_subscription":false/g, '"store_subscription":true');
body = body.replace(/"lifetime_subscription":false/g,'"lifetime_subscription":true');
body = body.replace(/"subscription":false/g,'"subscription":true');


$done({ body });