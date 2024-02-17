/*
音基考级宝 1.2.3
解锁全题库 会员权益

[rewrite_local]


https://music.hjyywh.com/api/Exam. url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/yjkjb.js

[mitm] 

hostname = music.hjyywh.com
*/
var body = $response.body;
var url = $request.url;

if (url.indexOf('https://music.hjyywh.com/api/Exam.index/checkExamLockState') !== -1) {
    let obj = {
        "code": 1,
        "data": {
            "msg": "",
            "code": 1
        },
        "isReload": 1,
        "msg": "成功",
        "url": "",
        "count": 0
    };
    $done({ body: JSON.stringify(obj), status: 200 });
} else {
    body = body.replace(/"isLock":\s*true/g, '"isLock": false');
    $done({ body });
}
