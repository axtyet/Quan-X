/*
项目名称：悄悄朋友圈
TG:@ios151 2023.8.30.0.24



[rewrite_local]
^http?:\/\/qqpyqapi\.app\.xinmaicard\.com\/user\/auth_userinfo.*? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/pyq.js


[mitm]
hostname = qqpyqapi.app.xinmaicard.com

*******************************/
var body=$response.body;
body = body.replace(/vip_status\":0/g,'vip_status":2');
body = body.replace(/vip_expire_time\":".*?"/g,'vip_expire_time":"2999年01月01日到期"');
$done(body);
