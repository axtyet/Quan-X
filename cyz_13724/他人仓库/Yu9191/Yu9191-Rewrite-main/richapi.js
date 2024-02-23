/*

消防设施操作员题小宝
书记员题小宝
‎军队文职题小宝-军队文职考试刷题平台
2023.12.6

[rewrite_local]
^http:\/\/richapi\.yestiku\.com\/api\/(identity\/listData|questionset\/getInfo) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/richapi.js

*/

var body = $response.body;
body = body.replace(/"expire_time":\s*".*?"/, '"expire_time": "2999-12-12"');
body = body.replace(/"buy_number":\s*0/, '"buy_number": 1');
body = body.replace(/"has":\s*0/, '"has": 1');
$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
