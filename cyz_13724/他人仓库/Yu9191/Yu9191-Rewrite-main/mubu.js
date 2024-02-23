/*
幕布
终身会员

[rewrite_local]
https://api2.mubu.com/v3/api/user/current_user url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/mubu.js

[mitm] 
hostname = api2.mubu.com
*/

var body = $response.body.replace(/vipEndDate":"\d+"/g,'vipEndDate":"99991111"')
.replace(/level":\d+/g,'level":2')

$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
