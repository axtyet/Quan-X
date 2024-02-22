/*
凤凰书苑

[rewrite_local]
#会员
http:\/\/app.ppmbook.com\/(system\/getVipInfo\.do|user\/getMyCenterVo\.do) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/fhsy.js
#开屏广告
^http:\/\/app\.ppmbook\.com\/home\/getCurrentAdvertisement\.do$ url reject

[mitm] 

hostname = app.ppmbook.com
*/

let obj = JSON.parse($response.body);

if ($request.url === "http://app.ppmbook.com/system/getVipInfo.do") {
    obj.data.jkValidDate = "2099-02-22 21:27:01";//
    obj.data.kidValidDate = "2099-02-22 21:27:01";//
    obj.data.isVip = true;//
    obj.data.ylValidDate = "2099-02-22 21:27:01";
    obj.data.ylVip = true;//
    obj.data.miGuVip = true;//
    obj.data.dzValidDate = "2099-02-22 21:27:01";//
    obj.data.validDate = "2099-02-22 21:27:01";//
    obj.data.isKidVip = true;//
    obj.data.jkVip = true//
} 
else if ($request.url === "http://app.ppmbook.com/user/getMyCenterVo.do") {
    obj.data.nickName = "baby";//
    obj.data.dzValidDate = "2099-02-22 21:27:01";//
    obj.data.jkVip = true;//
    obj.data.isVip = true;//
    obj.data.kidValidDate = "2099-02-22 21:27:01";//
    obj.data.jkValidDate = "2099-02-22 21:27:01";//
    obj.data.miGu = true;//
    obj.data.miGuValidDate = "2099-02-22 21:27:01";//
    obj.data.isKidVip = true;//
    obj.data.ylVip = true;//
    obj.data.validDate = "2099-02-22 21:27:01";//
    obj.data.isDzCard = true;//
    obj.data.ylValidDate = "2099-02-22 21:27:01";//
}

$done({ body: JSON.stringify(obj), status: 200 });
