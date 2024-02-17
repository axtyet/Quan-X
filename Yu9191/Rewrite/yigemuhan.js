/*
一个木函 1.80.6

[rewrite_local]


https://uapi.woobx.cn/user/profile url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yigemuhan.js

[mitm] 

hostname = uapi.woobx.cn

**/


let gid = JSON.parse($response.body);

gid.data.userInfo.gid = 3;

$done({body:JSON.stringify(gid)});