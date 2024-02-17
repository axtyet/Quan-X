/*

朝暮计划 
2024.1.22

[rewrite_local]
#朝暮计划
^https:\/\/app\.zomoplan\.com\/zhaoMuPlan\/user\/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/zhaomujihua.js
[mitm]
hostname = app.zomoplan.com

*/
var body = $response.body;
body = body.replace(/\"vipStatus\":0/, "\"vipStatus\":1");
body = body.replace(/\"vipType\":0/, "\"vipType\":1");
body = body.replace(/\"vipEndTime\":\"\"/, "\"vipEndTime\":\"2099-09-09\"");
//vipInfoDesc = "您已开通永久会员";
body = body.replace(/\"vipInfoDesc\":\"\"/, "\"vipInfoDesc\":\"您已开通永久会员\"");
$done({ body });
