/*
 *
 *
脚本功能：答岸Master解锁会员
软件版本：1.1.13
下载地址：http://t.cn/A6xDsZFU
脚本作者：Hausd0rff
更新时间：2021.11.23
电报频道：https://t.me/yqc_123
问题反馈：https://t.me/yqc_007
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

# 答岸Master解锁会员
^https?:\/\/123\.57\.195\.48\/api\/(Usercent|teach)er\/get(User|TeacherDetail)Info\?token=.+$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yqc007/DaZMasterProCrack.js

[mitm] 

hostname = 123.57.195.48
*
*
*/


var body = $response.body;
var urlq = $request.url;
var objc = JSON.parse(body);

const svip = '/getUserInfo';
const play = '/getTeacherDetailInfo';

if (urlq.indexOf(play) != -1) {
    objc.data["is_vip"] = 2;
    body = JSON.stringify(objc);
}

if (urlq.indexOf(svip) != -1) {
    objc.data["is_vip"] = 2;
    objc.data["vip_expire_time"] = "32495476149";
    objc.data["vip_expire_date"] = "2999-09-28";
    objc.data["username"] = "浥轻尘𝐶𝑟𝑎𝑐𝑘";
    objc.data["avatar"] = "http://dazclassbucket.oss-cn-beijing.aliyuncs.com/uploads/20211226/dfdd41c833cf30f5244f363e9a0ceb61.png";
    body = JSON.stringify(objc);
}

$done({ body });
