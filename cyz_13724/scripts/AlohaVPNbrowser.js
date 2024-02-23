// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/AlohaVPNbrowser.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/AlohaVPNbrowser.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/AlohaVPNbrowser.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/AlohaVPNbrowser.stoverride

/*
项目名称： Aloha Browser VPN: Surf internet with more privacy
项目作者： David
下载地址： https://apps.apple.com/app/id1105317682
使用说明： You need to crate free account first and use the script
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
https://api.alohaprofile.com/v1/profile_info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/AlohaVPNbrowser.js

[mitm]
hostname = api.alohaprofile.com
*/

var body = $response.body;
var obj = JSON.parse(body);

obj.profile.is_premium = true,
obj.profile.end_of_premium = 4000639265,
obj.profile._end_of_premium = "2096-09-09 17:07:45"

body = JSON.stringify(obj);
$done({body});
