/*
 *
 *
脚本功能：烘焙小屋解锁会员
软件版本：3.9.2
下载地址：http://t.cn/AipIBR88
脚本作者：Hausd0rff
更新时间：2021.11.10
电报频道：https://t.me/yqc_123
问题反馈：https://t.me/yqc_007
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

******************************

[rewrite_local]

# 烘焙小屋解锁会员
^https?:\/\/apiios_dq\.xiangha\.com\/v4\/(dish\/info|User\/getUserData)$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/yqc007/XiangHaBakeProCrack.js

[mitm] 

hostname = apiios_dq.xiangha.com
*
*
*/


var body = $response.body;
var urlq = $request.url;
var objc = JSON.parse(body);

const user = '/User/getUserData';
const dish = '/dish/info';

if (urlq.indexOf(user) != -1) {
    objc.data.data["nickName"] = "浥轻尘𝐶𝑟𝑎𝑐𝑘";
    objc.data.data["vip"] = {"is_vip":2,"vip_msg":"已破解🎃","is_open_vip":1};
    objc.data.data["headPortraitPath"] = "https:\/\/s3.cdn.xiangha.com\/imgs\/202009\/1214\/5f5c6d7919847.jpeg\/MHgw.webp";
    body = JSON.stringify(objc);
}

if (urlq.indexOf(dish) != -1) {
    var crack = objc.data.power;
    var yqcpj = Object.keys(crack);
    if (yqcpj.length != 0) {
        objc.data["power"] = {};
    }
    body = JSON.stringify(objc);
}

$done({body});
