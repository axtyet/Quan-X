/*
[rewrite_local]
# 我的界面及活动按钮？
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/(v1\/assembly\/toolbar|v3\/user\/getaccountpage) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Qidian_my.js
# 我的界面内测推广
^http[s]?:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/bookshelf\/refresh url reject-200
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/adv\/getadvlistbatch url reject
#书架置顶推广(保留签到移除花哨背景)
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v1\/bookshelf\/getTopOperation url reject-dict
#发现上面的图标屏蔽
^https:\/\/magev6\.if\.qidian\.com\/argus\/api\/v2\/adv\/getadvlistbatch url reject-dict
[mitm] 
hostname = magev6.if.qidian.com
*/


if ($request.url.includes("argus/api/v3/user/getaccountpage")) {
  var Q = JSON.parse($response.body);
  Q.Data.BenefitButtonList = [];//福利中心
  Q.Data.FunctionButtonList = [];//我发布的
  Q.Data.BottomButtonList = [];//帮助与客服
  Q.Data.AccountBalance.Hints = [];
  Q.Data.Member = null;
  $done({body : JSON.stringify(Q)});
} else if ($request.url.includes("argus/api/v1/assembly/toolbar")) {
  var Q = JSON.parse($response.body);
  Q.Data.Toolbar.Adv = {};
  $done({body : JSON.stringify(Q)});
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
