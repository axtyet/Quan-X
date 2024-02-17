/*************************************

项目名称：波点音乐
下载地址：https://t.cn/A6NLgAZW
更新日期：2023-12-11
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/bd-api\.kuwo\.cn\/api\/(ucenter\/users|play\/listening\/user|service\/(home\/index|banner\/myPage|advert\/watch)) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/bodian.js

[mitm]
hostname = bd-api.kuwo.cn

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);
const vipa = /api\/(ucenter\/users|play\/listening\/user)/;
const ad = /api\/service\/(home\/index|banner\/myPage)/;
const advert = /api\/service\/advert\/watch/;

if(vipa.test($request.url)){
  chxm1023.data.payInfo = {
      "expireDate" : 4092599349000,
      "isSigned" : 1,
      "lastPayType" : 1,
      "isVip" : 1
    };
  chxm1023.data.payRights = {
      "headPendant" : {
        "id" : 11,
        "name" : "音波",
        "pic" : "https://bodiancdn.kuwo.cn/file/bc92ceb2fb555e34246cdf4f558015ec.gif"
      }
    };
  chxm1023.data.isBind = 1;
  chxm1023.data.userInfo = {
   ...chxm1023.data.userInfo,
   "isVip" : 1,
   "authType" : 3,
   "headOuterImg" : "https://bodiancdn.kuwo.cn/file/bc92ceb2fb555e34246cdf4f558015ec.gif",
   "status" : 1
  };
}

if(ad.test($request.url)){
  chxm1023.data.bannerList = [];
  if (chxm1023.data.moduleList && chxm1023.data.moduleList.length > 0) {
   chxm1023.data.moduleList = chxm1023.data.moduleList.filter(item => item.name !== "轮播图" && item.name !== "波点实验室");
  };
}

if(advert.test($request.url)){
  chxm1023.data = {
    "mvGuide" : "看广告，解锁所有VIP歌曲\n解锁后可畅听%s",
    "expireTime" : 0,
    "mvDuration" : 0
  };
}

$done({body : JSON.stringify(chxm1023)});
