/*************************************

项目名称：遥忘/薄荷壁纸
下载地址：https://t.cn/A6lK4Phk
下载地址：https://t.cn/A6NhuR3U
更新日期：2023-12-22
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.whalean\.com\/(poseidon-service\/api\/user|member\/userMemberHomePageV2|hestia-service\/api\/wpUser\/getUserInfo) url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Rewrite/yaowangbohe.js

[mitm]
hostname = *.whalean.com

*************************************/


var chxm1023 = JSON.parse($response.body);
//遥忘
const vipa = /member\/userMemberHomePageV2/;
const vipb = /poseidon-service\/api\/user/;

if(vipa.test($request.url)){
  chxm1023.data.memberInfos = [{
   ...chxm1023.data.memberInfos,
   isMember: 0,
   memberLevel: 1,
   permanent: true,
   bizType: 1
  }];
}

if(vipb.test($request.url)){
  chxm1023.data.userBaseResponse = {
   ...chxm1023.data.userBaseResponse,
   authState: 1,
   userType: 1,
   hasVip: 1,
   isMember: 0,
   memberLevel: 1,
   permanent: true
  };
}

//薄荷壁纸
const bohe = /hestia-service\/api\/wpUser\/getUserInfo/;

if(bohe.test($request.url)){
  chxm1023.data = {
   ...chxm1023.data,
   memberEndTime: 4092599349000,
   memberType: 1,
   isMember: 0
  };
  chxm1023.data.userAccount = {
   ...chxm1023.data.userAccount,
   memberEndTime: "2099-09-09 09:09:09",
   renewalMethod: 1,
   memberFirstTime: "2023-12-21 16:15:02"
  };
}

$done({body : JSON.stringify(chxm1023)});