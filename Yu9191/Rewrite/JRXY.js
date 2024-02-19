/*
今日香烟 5.9.0
需登录 然后 点开会员服务
显示会员以后 关闭脚本保留本地缓存

[rewrite_local]

https://smk.xiao51.com/index.php url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/JRXY.js
[mitm]
hostname = smk.xiao51.com
*/


var url = $request.url;
if (url.includes("a=vip_status_1")) {
    var body = $response.body;
    try {
        var objc = JSON.parse(body);
        objc.data.button_name = "";
        objc.data.notice = "lovebabyforever";
        objc.data.notice_buyout = "lovebabyforever";
        objc.data.expired = 0;
        objc.data.vipType = "4";
        
        objc.data.currentPayIndex = 4;
        objc.data.coinVipPermanent = 45;
        objc.code = "0";
        body = JSON.stringify(objc);
    } catch (e) {
        console.log("解析响应体失败: " + e.message);
    }
    $done({ body });
} else {
    $done({});
}