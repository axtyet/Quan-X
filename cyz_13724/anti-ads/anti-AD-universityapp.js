# 智趣校园，胖乖生活，pu校园，超级课程表去广告
# author：BlueSodaYY
  
^https?:\/\/discardrp\.umetrip\.com\/gateway\/api\/umetrip\/native url reject-200
https://kde.qq.com/getAds url reject-200
http:\/\/118\.178\.168\.156:8091\/allOne\.php?ad_name=main_splash_ios&pk=com\.zhibo8\.tenyears&duration_type=0&ad_config_ver=4&vip_entry_ab_test=1 url reject
https:\/\/wx3\.sinaimg\.cn\/orj480\/008tFsGTly1hbzl49w1lkj30zk0k0762\.jpg url reject-dict
https:\/\/bootpreload\.uve\.weibo\.com\/v1\/ad\/preload url reject-dict
^https:\/\/mbmodule-openapi\.paas\.cmbchina\.com\/graphic\/v2\/module\/graphic url reject-dict
^https:\/\/img\.meituan\.net\/dpmobile\/.+93241\.png url reject-dict
^http:\/\/home\.umetrip\.com\/gateway\/api\/umetrip\/native url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.film\.mtopadvertiseapi\.queryloadingbanner url reject-dict
^http:\/\/ad\.myfriday\.cn\/d\/json\/1\.1 url reject-dict
^http:\/\/course\.myfriday\.cn:80\/Base\/courseSchedule\/getCourseTips url reject-dict
^http:\/\/120.55.151.61:80\/Base\/courseSchedule\/getCourseTips url reject-dict
^http:\/\/182.92.244.70\/d\/json\/1\.1 url reject-dict
^https:\/\/midc\.cdn-static\.abchina\.com\.cn\/distributecenterimg\/file\/download\/bdfb4 url reject-dict
^https:\/\/image\.uczzd\.cn\/\?id=12251019770259702966 url reject-dict
^https:\/\/cdn\.1rtb\.com\/sources\/system_logo\/am\.png url reject-dict
^https:\/\/s3plus\.meituan\.net\/v1\/mss_5017c592a8a946d2a54eb62a76ba299c\/nebulafile\/6acb1b99b801d9829599f07f5548bd2e url reject-dict
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/yzqnw.js
^https:\/\/sdk\.1rtb\.net\/sdk\/req_ad\?sdk_version=2\.2\.1\.0&device_os=iOS&accept_ad_type=4&app_id=107522&pid=1039665&sdk_version_code=2020100 url reject-dict
^https:\/\/image\.uczzd\.cn\/\?id=1932387156848598083 url reject-dict
^https:\/\/pocketuni\.net\/\?app=api&mod=Message&act=adList url reject-dict
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.common\.getTimestamp\/* url reject-dict
^https:\/\/qemyapi\.qiekj\.com\/item_category\/list url reject-dict
^https:\/\/userapi\.qiekj\.com\/slot\/get url reject-dict
^https:\/\/qemyapi\.qiekj\.com\/api\/item_list url reject-dict
^https:\/\/userapi\.qiekj\.com\/task\/list url reject-dict
^https:\/\/userapi\.qiekj\.com\/task\/taskBubble url reject-dict
^https:\/\/userapi\.qiekj\.com\/appTitle\/get url reject-dict


hostname =kde.qq.com, -consumer.fcbox.com, -*huami.com, -weather-data.apple.com, -*amemv.com, -*snssdk.com, -www.google.com,m.zhibo8.com，wx3.sinaimg.cn，bootpreload.uve.weibo.com，api.weibo.cn，mbmodule-openapi.paas.cmbchina.com,meituan.net,home.umetrip.com,acs.m.taobao.com,myfirday.cn,120.55.151.61:80,182.92.244.70,midc.cdn-static.abchina.com.cn,image.uczzd.cn,cdn.1rtb.com,s3plus.meituan.net,buy.itunes.apple.com,sdk.1rtb.net,image.uczzd.cn,pocketuni.net,acs.m.taobao.com,qemyapi.qiekj.com,userapi.qiekj.com
