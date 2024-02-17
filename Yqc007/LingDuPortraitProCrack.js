/*
 *
 *
脚本功能：绅士摄影解锁会员
软件版本：3.0
下载地址：http://t.cn/A6JhXCBH
脚本作者：Hausd0rff
更新时间：2021.12.31
电报频道：https://t.me/yqc_123
问题反馈：https://t.me/yqc_007
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

# > 绅士摄影解锁会员
^https?:\/\/appa\.lingdu2019\.cn\/api\/(my_home\/\w{9}|portrait\/\w{15,23}|iport/luffy/api/\w{7}/\w{9}|send\/\w{18})$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yqc007/LingDuPortraitProCrack.js

[mitm] 

hostname = appa.lingdu2019.cn
*
*
*/


var body = $response.body;
var urlq = $request.url;
var objc = JSON.parse(body);

const hmvc = '/my_home/check_vip';
const user = '/my_home/my_detail';
const hlma = '/luffy/api/my_home';
const dlsc = '/check_login_status';
const xzvk = '/portrait/video_detail';
const xzge = '/portrait/new_goods_detail';
const xzhd = '/portrait/new_goods_middle';

//  Check Vip Status

if (urlq.indexOf(hmvc) != -1) {
    objc = {
      "xiezhen_vip": 1,
      "video_vip": 1,
      "status": "20000",
      "type": "success"
    };
    body = JSON.stringify(objc);
}

//  Check User Detail

if (urlq.indexOf(user) != -1) {
    objc = {
      "status": "20000",
      "type": "success",
      "my_detail": [{
        "user_id": "666666",
        "nick_name": "浥轻尘𝐶𝑟𝑎𝑐𝑘",
        "user_img": "image\/default\/FB9A7498351847139BB1D3A33E1ECCA5-6-2.png",
        "background_img": "image\/default\/27099F8AD57A40DB95DEEFF4CB276125-6-2.png",
        "phone_number": "18811900112",
        "signature": "已破解🎃",
        "is_vip": 1
      }],
      "star_fans": {
        "star_count": "999",
        "fans_count": "999"
      }
    };
    body = JSON.stringify(objc);
}

//  Check User Status

if (urlq.indexOf(hlma) != -1) {
    objc = {
      "status": "20000",
      "type": "success"
    };
    body = JSON.stringify(objc);
}

//  Check Login Status

if (urlq.indexOf(dlsc) != -1) {
    objc = {
      "is_login": 1,
      "status": "20000",
      "type": "success"
    };
    body = JSON.stringify(objc);
}

//  Videos Play Power

if (urlq.indexOf(xzvk) != -1) {
    objc["is_read"] = 1;
    body = JSON.stringify(objc);
}

//  Photos Download Power

if (urlq.indexOf(xzhd) != -1) {
    objc["is_read"] = 1;
    objc["is_down"] = 1;
    body = JSON.stringify(objc);
}

//  Photos Read Power & Batch Download Button

/*** 

The prerequisite for the batch download button to be turned on is that the status of the download permission is turned on

***/

if (urlq.indexOf(xzge) != -1) {
    objc["is_read"] = 1;
    objc["is_down"] = 1;
    objc["is_all_down"] = 1;
    body = JSON.stringify(objc);
}

$done({ body });

// If it prompts that the permissions are insufficient, please clear the cache and re-enter the application.

// This cracking script is for learning and reference only, please do not use it for any commercial purposes! 

// By the way, I forgot to say the most important thing is to hope everyone "Happy New Year 🎉🎉🎉!".
