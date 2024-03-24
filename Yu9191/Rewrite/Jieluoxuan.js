/*
解螺旋
解锁会员权益

[rewrite_local]

^https:\/\/app\.helixlife\.cn\/api\/v1\/(user\/(users\/profile|overviews)|edu\/(trainings|courses)) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Jieluoxuan.js

[mitm]
hostname = app.helixlife.cn
*/

var body = $response.body;


body = body.replace(/("is_free"\s*:\s*)false/g, '$1true');

body = body.replace(/("is_protection"\s*:\s*)false/g, '$1true');

body = body.replace(/("is_professional"\s*:\s*)false/g, '$1true');
//me
body = body.replace(/("nickname"\s*:\s*)"[^"]+"/g, '$1"Baby"');


body = body.replace(/("is_real_auth"\s*:\s*)false/g, '$1true');

body = body.replace(/("is_star"\s*:\s*)false/g, '$1true');


$done({ body: body });





