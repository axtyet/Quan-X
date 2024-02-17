/*************************************

项目名称：云听 全国电台/有声听书
下载地址：https://t.cn/A6ouQ21g
版本支持：7.0.35
更新日期：2024-02-11
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
(^https?:\/\/(ytmsout|ytapi|getway)\.radio\.cn|60\.205\.171\.165)\/(contentBiz|publish|rights|(user|ytsrv\/srv)\/(appUser|webPage)\/getUserInfo|app.+) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/yunting.js

[mitm]
hostname = *.radio.cn, 60.205.171.165

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);
const js = /(ytmsout|ytapi|getway)/;
const ad = /publish\/recScreen\/getLoadPage/;
const user1 = /user\/(appUser|webPage)\/getUserInfo/;
const user2 = /ytsrv\/srv\/appUser\/getUserInfo/;
const vip = /rights\/userRights\/memberCenterRightsDetail/;
const hf = /publish\/layout\/queryLayoutPageByPo/;

//解锁VIP/付费/下载
if(js.test($request.url)){
  body = body.replace(/\"needPay":\d+/g, '\"needPay":0');
  body = body.replace(/\"songVirtualPrice":\d+/g,'\"songVirtualPrice":0');
  body = body.replace(/\"songNeedPay":\d+/g, '\"songNeedPay":0');
  body = body.replace(/\"enableStatus":\d+/g, '\"enableStatus":1');
  body = body.replace(/\"price":\d+/g, '\"price":0');
  body = body.replace(/\"priceUnit":\d+/g, '\"priceUnit":0');
  body = body.replace(/\"orderSpeedRightFlag":\w+/g,'\"orderSpeedRightFlag":true');
  body = body.replace(/\"userBuyAlbumFlag":\w+/g,'\"userBuyAlbumFlag":true');
  body = body.replace(/\"userBuySingleFlag":\w+/g, '\"userBuySingleFlag":true');
  body = body.replace(/\"userBuyOutAlbumFlag":\w+/g,'\"userBuyOutAlbumFlag":true');
  body = body.replace(/\"singlePlayFlag":\w+/g, '\"singlePlayFlag":true');
  body = body.replace(/\"singleDownloadFlag":\w+/g, '\"singleDownloadFlag":true');
  body = body.replace(/\"auditionFlag":\w+/g, '\"auditionFlag":true');
  body = body.replace(/\"auditionFlag":\d+/g, '\"auditionFlag":1');
  body = body.replace(/\"recBubbleVo":{[^}]*}/g, '\"recBubbleVo":null');
  body = body.replace(/"banner":\[[^\]]*\]/g, '"banner":[]');
  body = body.replace(/\"url":".*?"/g, '\"url":null');
}

//开屏/弹窗处理
if(ad.test($request.url)){
  body = body.replace(/{.*?}$/g, '\{}');
}

//用户信息
if(user1.test($request.url)){
  chxm1023.data = {
    ...chxm1023.data,
    "userName" : "叮当猫",
    "vipFlag" : 1,
    "nickName" : "叮当猫",
    "icon" : "http://yunting-bj-radio-client.oss-cn-beijing.aliyuncs.com/25010%2Fsc_upload%2F202301%2F22%2F09%2F4eL7lc2023012209974.JPEG",
    "vipExpireTime" : 4092599349000
  };
  chxm1023.data.memberMarkVo = {
    ...chxm1023.data.memberMarkVo,
    "signActiveImg" : "https://ytmedia.radio.cn/CCYT%2F2023%2F01%2F06%2F1672991809upc7cd442706edf9cd097eab02ddbc0fe7.png",
    "foreColorVal" : "#292421",
    "markText" : "VIP身份",
    "packageId" : "1002",
    "fitVersion" : "1",
    "packageActiveFlag" : true,
    "packageName" : "VIP",
    "backGroundColorVal" : "#F0FFFF"
  };
  body = JSON.stringify(chxm1023);
}

if(user2.test($request.url)){
  chxm1023.object.baseInfo = {
    "isVip" : 1,
    "vipTime" : "2099-09-09",
    "nickName" : "叮当猫",
    "userIcon" : "http://yunting-bj-radio-client.oss-cn-beijing.aliyuncs.com/25010%2Fsc_upload%2F202301%2F22%2F09%2F4eL7lc2023012209974.JPEG"
  };
  body = JSON.stringify(chxm1023);
}

//VIP面板时间
if(vip.test($request.url)){
  chxm1023.data.userPackageExpireVo =  {
    "endTime" : "2099-09-09 09:09:09",
    "startTime" : "2023-07-20 00:00:00"
  };
  body = JSON.stringify(chxm1023);
}

//处理横幅
if(hf.test($request.url)){
  chxm1023.data.data = chxm1023.data.data.filter(item => {
    const isTitleMismatch = item.plateVo && item.plateVo.plateContentList &&  !item.plateVo.plateContentList.some(  content => content.title === "一分钟看懂VIP vs 付费"  );
    const isLayoutMismatch = item.layoutName && item.layoutName !== "VIP频道banner（16:9）" &&  item.layoutName !== "频道banner-VIP" &&  item.layoutName !== "Banner（16:9）" &&  item.layoutName !== "banner";
    return isTitleMismatch && isLayoutMismatch;
  });
  body = JSON.stringify(chxm1023);
}

$done({body});