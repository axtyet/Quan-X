/*
泡泡钢琴解锁课程
会员功能无法

[rewrite_local]


https:\/\/c\.abcpiano\.cn\/(pianoCourse\/units|pianoCourse\/lessons|pianoCourse\/playProgress|practice\/stavePlay|pianist|practice\/home) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/paopaogq.js

[mitm] 

hostname = c.abcpiano.cn
*/

var body = $response.body;

// 购买
body = body.replace(/"isBought":\s*false/g, '"isBought": true');

// 用户中心
body = body.replace(/"is_vip":\s*false/g, '"is_vip": true');
body = body.replace(/"first_play":\s*0/g, '"first_play": 1');
body = body.replace(/"vip_expire":\s*""/g, '"vip_expire": "2099-09-09"');
body = body.replace(/"play_days":\s*0/g, '"play_days": 999');
body = body.replace(/"vip_level":\s*-1/g, '"vip_level": 1');
body = body.replace(/"vip_type":\s*0/g, '"vip_type": 1');

// 课程
body = body.replace(/"showFreeTip":\s*false/g, '"showFreeTip": true');
body = body.replace(/"lock":\s*true/g, '"lock": false');
body = body.replace(/"islock":\s*true/g, '"islock": false');
body = body.replace(/"unLock":\s*false/g, '"unLock": true');
body = body.replace(/"finished":\s*true/g, '"finished": false');
body = body.replace(/"showPlayStar":\s*true/g, '"showPlayStar": false');

$done({ body });
