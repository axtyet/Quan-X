/*

阅己

[rewrite_local]
https://great.starsdsea.com:12502/zx/home/user/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yueji.js

[mitm] 

hostname = great.starsdsea.com:12502
#surge
[General]
force-http-engine-hosts = %APPEND% great.starsdsea.com:12502

*/
let obj = JSON.parse($response.body);
obj.data.isVip = true;
obj.data.userEndTime = 4092595200001;
obj.data.userNickName = "Baby";
obj.data.userPoints = 10000;//积分
$done({
    body: JSON.stringify(obj)
});
