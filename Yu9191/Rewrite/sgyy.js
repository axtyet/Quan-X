/*
傻瓜英语 2.0.51

[rewrite_local]
^https:\/\/sgyy\.easyenglish888\.com\/user\/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/sgyy.js

[mitm]
hostname = sgyy.easyenglish888.com

*/
let obj = JSON.parse($response.body);
obj.vip_type = 1;
obj.subscription = 198;
obj.vip = true;
obj.vip_end_date = "2099-12-31";
obj.stat_detail.segment_rank = "超凡大师";
obj.stat_detail.user_rank = 1;
$done({ body: JSON.stringify(obj) });
