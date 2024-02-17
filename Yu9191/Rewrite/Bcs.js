/*
编程狮 
3.14.1
[rewrite_local]
^https:\/\/appapi\.w3cschool\.cn\/api\/myapp\/(isLogin|getLevel|getMyMedal|getMyCertificate) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Bcs.js
[mitm]
hostname = appapi.w3cschool.cn
*/
var body = $response.body;
var url = $request.url;
//个人中心
if (url.indexOf('isLogin') != -1) {
    var obj = JSON.parse(body);
    obj.uid = "8888888";
    obj.nickname = "Baby";
    obj.birthday = "1998-12-26";
    obj.utype = "10";
    obj.viptype = "2";
    obj.viplevel = "11";
    obj.vipexpire = "2024-12-26 00:00:00";
    obj.locked = "999";//锁定天数
    obj.tipexp = "1";
    obj.iossurplus = "88.88";
    obj.surplus = "88.88";
    body = JSON.stringify(obj);

}//等级
if (url.indexOf('getLevel') != -1) {
    var obj = JSON.parse(body);
    obj.data.level = "999999";
    obj.data.exp = "99999999";//经验值
    body = JSON.stringify(obj);

}//勋章
if (url.indexOf('getMyMedal') != -1) {
    body = body.replace(/"ischeck":0/g, '"ischeck":1');
//证书
} else if (url.indexOf('getMyCertificate') != -1) {
    body = body.replace(/"ismember":0/g, '"ismember":1');
    
}

$done({ body });
//by ios151
