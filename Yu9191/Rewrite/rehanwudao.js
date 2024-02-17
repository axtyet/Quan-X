/*
热汗舞蹈

1.22.3

解锁vip权益 课程

[rewrite_local]


http://dancefit.dailyyogac.com/dancefit url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/rehanwudao.js


**/

var url = $request.url;
var body = $response.body;

if (url.indexOf("user/common/info") != -1) {
    let obj = JSON.parse($response.body);
obj.result.is_first_buy = true;
obj.result.member_duration.is_valid = true;
obj.result.equity_duration = [
      {
        "is_valid": true,
        "start_time": 999,
        "equity_type": 1,
        "end_time": 99999999999
      }
    ];
obj.result.member_duration.end_time = 9999191919;
//obj.result.equity_duration.end_time = 9999191919;

obj.result.login_type = 3;
//obj.result.permanently_vip = 3;
$done({ body: JSON.stringify(obj) });
} else if (url.indexOf("dancefit") != -1) {
   //vip权限
    body = body.replace(/is_vip":true/g, 'is_vip":false');
}
$done({ body });