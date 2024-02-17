/*

simply piano 


[rewrite_local]
#simply piano
^https:\/\/alicdn\.joytunescn\.com\/server\/asla\/accounts\/accountAuthenticate url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/simplypiano.js
[mitm]
hostname = alicdn.joytunescn.com

#小火箭本地模块 
#[Script]
# Simply Piano
#simply piano = type=http-response,pattern=^https:\/\/alicdn\.joytunescn\.com\/server\/asla\/accounts\/accountAuthenticate,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/simplypiano.js,script-update-interval=0
#[MITM]
#hostname = %APPEND% alicdn.joytunescn.com

*/
var urlPattern = /^https:\/\/alicdn\.joytunescn\.com\/server\/asla\/accounts\/accountAuthenticate/;
//递归函数，用于将对象中的所有false替换为true
function replaceFalseWithTrue(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        replaceFalseWithTrue(obj[key]);
      } else if (obj[key] === false) {
        obj[key] = true;
      }
    }
  }
}

var body = $response.body;
//个人会员显示
if (urlPattern.test($request.url)) {
  body = body.replace(/membershipInfo":{.*?}/g, `membershipInfo":{
    "membershipDescription" : "高级会员",
    "familyIapID" : "com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle_family",
    "membershipTier" : "premium_home",
    "profilesAccess" : "FAMILY",
    "planDuration" : "oneyear",
    "membershipType" : "JOYTUNESBUNDLE",
    "daysRemaining" : 366,
    "autoRenewable" : 1,
    "dateStarted" : "2023-10-14",
    "isTrialPeriod" : 0,
    "currentIapID" : "com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle",
    "upgradeIapID" : null,
    "daysPassed" : 70,
    "dateExpire" : "2024-12-23",
    "isAutoRenew" : false
  }`);
  body = body.replace(/isPremium":w+/g, 'isPremium":true');
  body = body.replace(/isFamily":w+/g, 'isFamily":true');
} else {
  var obj = JSON.parse(body);
  replaceFalseWithTrue(obj);
  body = JSON.stringify(obj);
}

$done({ body });
