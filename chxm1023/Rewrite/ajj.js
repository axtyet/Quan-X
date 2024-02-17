/*************************************

项目名称：爱剪辑
下载地址：https://t.cn/A6KKPMgP
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https?:\/\/api\.open\.loveclip\.site\/UserInfo\/(UserPersonalCoreAsync|GetUserDetail) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/ajj.js

[mitm]

hostname = api.open.loveclip.site

*************************************/


const urla = "/UserInfo/UserPersonalCoreAsync";
const urlb = "/UserInfo/GetUserDetail";
var body = $response.body;

if ($request.url.indexOf(urla) != -1){
let chxm1023 = JSON.parse(body);
chxm1023.data.IsVip = true;
chxm1023.data.VipLevel = "1";
chxm1023.data.VipExpire = "2099-09-09 09:09:09";
body = JSON.stringify(chxm1023);}



if ($request.url.indexOf(urlb) != -1){
let chxm1023 = JSON.parse(body);
chxm1023.data.IsVip = true;
chxm1023.data.VipLevel = "1";
chxm1023.data.VipExpire = "2099-09-09 09:09:09";
body = JSON.stringify(chxm1023);}

$done({body});
