/*
幕布
终身会员

[rewrite_local]
https://api2.mubu.com/v3/api/user/current_user url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/mubu.js

[mitm] 
hostname = api2.mubu.com
*/

var body = $response.body.replace(/vipEndDate":"\d+"/g,'vipEndDate":"99991111"')
.replace(/level":\d+/g,'level":2')

$done({ body });
