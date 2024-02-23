/*

软件：iscreen
下载地址：https://is.gd/ktU5t2
说明：解锁会员


[rewrite_local]

^http[s]?:\/\/cs.kuso.xyz\/configs url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/iscreen.js

[mitm] 

hostname = cs.kuso.xyz

*/
var ios151 = JSON.parse($response.body);
ios151.data.FeedBanner = "3333";
ios151.data.IsandBannerAd = 0;
ios151.data.noAds = 1;
ios151.data.lang = "zh";
ios151.data.review_pop_interval = 300;
ios151.data.country = "cn";
ios151.data.lockscreen_noVip = "0,1";
ios151.data.SplashInter = 300;
ios151.data.pic_lock_count = 50;
ios151.data.showOurApp = 1;
ios151.data.main_pop_ad_interval = 0;
ios151.data.launchAd = 0;
ios151.data.FeedAd = 0;
ios151.data.BannerAd = 0;
ios151.data.vipPopupType = 3;
ios151.data.ai_painting = 1;
ios151.data.ai_painting_wp = 1;
ios151.data.activityUpdateTime = 1687959242;
ios151.data.rewardAd = 0;
ios151.data.Hudong_Interval = 900;
ios151.data.ThemeFeedAd = 4;
ios151.data.showRing = 1;
var modifiedBody = JSON.stringify(ios151);
$done({ body: modifiedBody });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
