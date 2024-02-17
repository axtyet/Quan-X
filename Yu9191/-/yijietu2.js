/*
原：骨钉
易截图2：https://apps.apple.com/app/id1633186528

[rewrite_local]
^https?:\/\/(jietu6|1jietu|superjietu)\.com\/apiv2\/user url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/yijietu2.js

[MITM]
hostname = superjietu.com, jietu6.com, 1jietu.com

*/
var guding = JSON.parse($response.body);
guding.info.group_id = "3";
guding.info.vip = "1";
guding.info.group = "无耻的破解会员";
guding.info.nickname = "Baby";
$done({ body: JSON.stringify(guding) });
