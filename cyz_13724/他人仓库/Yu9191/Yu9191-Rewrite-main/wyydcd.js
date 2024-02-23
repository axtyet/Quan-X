/*

项目名称：网易有道词典
使用声明：仅供参考，禁转载与售卖！


[rewrite_local]
^https:\/\/dict\.youdao\.com\/vip\/user\/status url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/wyydcd.js
# 翻译   广告均由 安妮 分享 
^https:\/\/dict\.youdao\.com\/course\/tab\/translateTab url reject-dict

# 听读训练  
^https:\/\/dict\.youdao\.com\/homepage\/tile url reject-dict

# 首次查词弹窗
^https:\/\/api-overmind\.youdao\.com\/openapi\/get\/luna\/dict\/dict-mobile\/prod\/dictCommonConfig url reject-dict

# 首页弹窗
^https:\/\/cdke\.youdao\.com\/course3\/recommend\/dict\/startup url reject-dict

# 搜索预想
^https:\/\/dict\.youdao\.com\/commonsearch url reject-dict

# 会员优惠券弹窗
^https:\/\/dict\.youdao\.com\/vip\/activity\/couponinfo url reject-dict

# 首页左上角福利中心
^https:\/\/dict\.youdao\.com\/dictusertask\/system url reject-dict

# 会员界面横幅广告
^https:\/\/dictvip-business\.youdao\.com\/home\/ad url reject-dict

[mitm]
hostname = dict.youdao.com, business.youdao.com, api-overmind.youdao.com, cdke.youdao.com


*/

var body = JSON.parse($response.body);

body.vip = true;
body.svip = true;
body.expire = 101966821994000
body.svipExpire = 101966821994000

$done({ body: JSON.stringify(body) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
