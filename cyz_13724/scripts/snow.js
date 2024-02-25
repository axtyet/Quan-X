// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/snow.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/snow.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/snow.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/snow.stoverride

/*
项目名称： SNOW-Ai写真  +  EPIK AI 两个软件
项目作者： David
下载地址： https://apps.apple.com/us/app/snow-ai-profile/id1022267439?l=en-GB
使用说明： 
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https:\/\/user-snow-api\.snow\.me\/v1\/purchase\/subscription\/subscriber\/status$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/snow.js

[mitm]
hostname = *.snow.me
*/
if ($response.body !== 'undefined') {
  var mgmdev = JSON.parse($response.body);
  const url = $request.url;
  var ids;
  var packageName;

  if (url.indexOf('EPIK') !== -1) {
    ids = "com.snowcorp.epik.subscribe.plan.oneyear";
    packageName = "com.snowcorp.epik";
  } else if (url.indexOf('SNOW') !== -1) {
    ids = "com.campmobile.snow.subscribe.oneyear";
    packageName = "com.snowcorp.snow";
  }

  mgmdev["result"]["products"].forEach(product => {
    product.productId = ids;
  });

  mgmdev["result"]["activated"] = true;

  $done({ body: JSON.stringify(mgmdev) });
}