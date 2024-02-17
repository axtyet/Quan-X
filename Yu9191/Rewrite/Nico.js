/*
Nico 多元人格交友
8.15.0

[rewrite_local]
#会员
https://data.inicoapp.com/api/2.0/publicUser/detail? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Nico.js
#恋爱测试 解锁权限
https://data.inicoapp.com/api/v4/testQuestions/getTestById url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Nico.js
#好物推荐
https://data.inicoapp.com/api/v4/clientConfig/mallBannerConfig url reject-200
#推广图片
https://data.inicoapp.com/api/v4/personalActivity/getAppAc? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Nico.js
[mitm]
hostname = data.inicoapp.com

*/

let obj = JSON.parse($response.body);
const url = $request.url;

// 会员
if (url.includes('/publicUser/detail')) {
  // obj.data.userInfo.nickName = "叼毛安妮";
  obj.data.userInfo.vipInfo.vipStatus = {
  "vipSDL": 1,
  "isSvipSDL": true,
  "isVipSDL": true,
  "svipYDL": 1,
  "isSvipYDL": true,
  "isSvipDL": true,
  "vipYDL": 1,
  "isVipDL": true,
  "svipSDL": 1,
  "vipDL": 1,
  "svipDL": 1,
  "isVipYDL": true
};
  obj.data.userInfo.vip = 1;
}

// 恋爱测试
if (url.includes('/testQuestions/getTestById')) {
  obj.data.hasResult = true;
  obj.data.isPay = false;
  obj.data.records.forEach(record => {
    record.user.isOpenLive.status = true;
  });
}

// 测试题 
if (url.includes('/personalActivity/getAppAc')) {
  // 只保留测试题，去除情趣广告
  obj.data = obj.data.filter(item => item.type === 1);
  // 只保留测试题,去除跳转淘宝URL及图片
  obj.data.forEach(item => {
    item.items = item.items.filter(subItem => subItem.corner === "测试题");
  });
}

$done({
  body: JSON.stringify(obj)
});
