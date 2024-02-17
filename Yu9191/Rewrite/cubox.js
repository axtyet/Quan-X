/*
cubox 
2023.12.19

[rewrite_local]
^https:\/\/cubox\.pro\/c\/api\/userInfo url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/cubox.js




[mitm]
hostname = cubox.pro

*/
let obj = JSON.parse($response.body);

obj.data.level = 1;
obj.data.expireTime = "2099-09-12T23:50:23+08:00";
obj.data.isExpire = false;
obj.data.active = true;
obj.data.payTime = 1660006006;

$done({
  body: JSON.stringify(obj)
});
