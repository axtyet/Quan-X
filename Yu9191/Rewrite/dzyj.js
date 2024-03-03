/*
地震预警
[rewrite_local]
#课程题库
https://mobile-new.chinaeew.cn/v1/user/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/dzyj.js

[mitm] 

hostname = mobile-new.chinaeew.cn
*/


let obj = JSON.parse($response.body);
obj.data.isLoyalUser = true;
$done({
    body: JSON.stringify(obj)
});
