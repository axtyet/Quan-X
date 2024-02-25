/*
 妙音弟子规 每日经典 围棋 记忆卡 成语故事
 解锁全部付费课程
tip：如果您搬运借鉴请备注来源 虽然简单 毕竟花费时间啦
[rewrite_local]
#课程题库
https://gx\.miaoyin\.cn/(dailySentence/token/selectAllDailySentenceList|discipleGauge/token/findDiscipleGaugeList|exiconNew/user/exiconInfo|courseIdiom/token/findCourseIdiomList) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/myheji.js

[mitm] 

hostname = gx.miaoyin.cn
*/
var body = $response.body;

body = body.replace(/("isUnlock"\s*:\s*)\d+/g, '$1"1"');

body = body.replace(/("isComplete"\s*:\s*)false/g, '$1true');//是否完成学习
body = body.replace(/("isBuy"\s*:\s*)false/g, '$1true');
body = body.replace(/("isUnlock"\s*:\s*)false/g, '$1true');
body = body.replace(/("isBuy"\s*:\s*)0/g, '$11');

$done({ body });

