/*
主题 壁纸大全 4.1.7

[rewrite_local]
http://wallpaper-zz.laoyinnianhua.com/api/visitors url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/bzdq.js

[mitm]
hostname = wallpaper-zz.laoyinnianhua.com

*/

let obj = JSON.parse($response.body);
//obj.data.identity.nickname = "叼毛安妮";
obj.data.identity.vip_expire_time = 9702807406;
obj.data.identity.vip_period_type = 1;
obj.data.identity.vip = 1;
$done({
  body: JSON.stringify(obj)
});
