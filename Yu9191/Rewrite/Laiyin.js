/*
来音智能陪练

[rewrite_local]

^https:\/\/.*api\.quthing\.com\/(.+\/vip|vip|student|user|ai|appearance|background|rest) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Laiyin.js

[mitm]
hostname = partner-ai-api.quthing.com
*/
var body = $response.body;

// 修改属性值
body = body
    .replace(/"trialPeriod":\w+/g, '"trialPeriod":true')
    .replace(/"trial":\w+/g, '"trial":true')
    .replace(/"buttonTip":"(.*?)"/g, '"buttonTip":"已解锁"')
    .replace(/"newButtonTitle":"(.*?)"/g, '"newButtonTitle":"已解锁会员"')
    .replace(/"buttonTitle":"(.*?)"/g, '"buttonTitle":"已解锁会员"')
    .replace(/"vipMessage":"(.*?)"/g, '"vipMessage":"终身会员"')
    .replace(/"cnButtonTip":"(.*?)"/g, '"cnButtonTip":"已解锁会员"')
    .replace(/"vipHighlight":"(.*?)"/g, '"vipHighlight":""')
    .replace(/"trialDays":"(.*?)"/g, '"trialDays":"99999"')
    .replace(/"vipType":\d+/g, '"vipType":3')
    .replace(/"seniorVipType":\d+/g, '"seniorVipType":3')
    .replace(/"courseVipType":\d+/g, '"courseVipType":3')
    .replace(/"validVip":\w+/g, '"validVip":true')
    .replace(/"validSeniorVip":\w+/g, '"validSeniorVip":true')
    .replace(/"validCourseVip":\w+/g, '"validCourseVip":true')
    .replace(/"canEnterCourseIfOldVip":\w+/g, '"canEnterCourseIfOldVip":true')
    .replace(/"unlocked":false/g, '"unlocked":true')
    .replace(/"vipFree":\w+/g, '"vipFree":false')
    .replace(/"cost":\d+/g, '"cost":0')
    .replace(/"expireTime":\d+/g, '"expireTime":4092599349000')
    .replace(/"seniorExpireTime":\d+/g, '"seniorExpireTime":4092599349000')
    .replace(/"courseVipExpireTime":\d+/g, '"courseVipExpireTime":4092599349000')
    .replace(/"expiredDays":\d+/g, '"expiredDays":999999')
    .replace(/"status":\d+/g, '"status":1')
    .replace(/"vipCount":\d+/g, '"vipCount":999999')
    .replace(/"showText":".*?"/g, '"showText":"2099.9.9到期"')
    .replace(/"lastBuySkuName":".*?"/g, '"lastBuySkuName":"partnertrainingai_year_vip"');

$done({ body: body });

