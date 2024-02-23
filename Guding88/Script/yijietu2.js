/*

易截图2：https://apps.apple.com/app/id1633186528

[rewrite_local]
^https?:\/\/(jietu6|1jietu)\.com\/apiv2\/user url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Guding88/Script/yijietu2.js

[MITM]
hostname = jietu6.com, 1jietu.com

*/
var guding = JSON.parse($response.body);
guding.info.group_id = "3";
guding.info.vip = "1";
guding.info.group = "无耻的破解会员";
guding.info.nickname = "骨钉 https://t.me/Guding88";
$done({ body: JSON.stringify(guding) });
