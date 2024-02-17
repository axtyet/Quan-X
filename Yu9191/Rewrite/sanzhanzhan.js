/*************************************

项目名称：三站站棋版助手
下载地址：微信小程序 记得重新进入
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
https://jk.dmzgame.com/users/info url script-echo-response https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/sanzhanzhan.js


[mitm]
hostname = jk.dmzgame.com

*************************************/
var body = JSON.parse($response.body);

body.vip = 2,
body.vip_due_time = "2023-08-25 18:26:30"

$done({ body: JSON.stringify(body) }); 
