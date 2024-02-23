/*
壁纸 4.5.3

[rewrite_local]


^https?:\/\/leancloud\.emotionwp\.com\/.+\/classes\/wpf_accoun url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/bizhi.js

[mitm] 

hostname = leancloud.emotionwp.com

**/

var chxm1023 = JSON.parse($response.body);

chxm1023.results = [
  {
    ...lovebaby.results,
    "updatedAt": "2023-11-17T23:52:58.783Z",
    "vipEndTime": 4092599349,
    "sex": "1",
    "isSVIP": 1,
    "userId": "A66666666_B6666666666666-C66",
    "loginType": 1,
    "nickName": "叮当猫の分享频道",
    "isVIP": 1,
    "headImageUrl": "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png",
    "objectId": "6666fcda5a17e66bd666c666",
    "createdAt": "2023-11-17T23:52:58.783Z",
    "coin": 0
  }
];

$done({ body: JSON.stringify(chxm1023) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
