/****************************************

项目功能：小红书去开屏广告、瀑布流广告、启动广告
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*****************************************

[rewrite_local]

^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/system_service\/splash_config url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/xiaohongshu.js
^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/homefeed\? url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/xiaohongshu.js
^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/system_service\/config\? url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/xiaohongshu.js
^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/search\/hot_list url response-body items":\[.+\] response-body items":[]
^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/search\/trending url response-body queries":\[.+\] response-body queries":[]
^https?:\/\/www\.xiaohongshu\.com\/api\/sns\/v\d\/tag\/ads_engage url reject-dict
^https?:\/\/www\.xiaohongshu\.com\/api\/sns\/v\d\/ads\/apple\/record url reject-dict
^https?:\/\/www\.xiaohongshu\.com\/api\/sns\/v\d\/ads\/resource url reject-dict
^https?:\/\/referee\.xiaohongshu\.com\/v\d\/stateReport url reject-dict
^https?:\/\/pages\.xiaohongshu\.com\/data\/native\/matrix_switches url reject-dict
^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/user\/teenager\/status url reject-dict

[mitm]

hostname = *.xiaohongshu.com

****************************************/

if (/^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/system_service\/splash_config/.test($request.url)) {
    var obj = JSON.parse($response.body);
    obj.data.ads_groups.forEach((item) => {
        item.start_time = "2208963661";
        item.end_time = "2209050061";
        item.ads.forEach((i) => {
            i.start_time = "2208963661";
            i.end_time = "2209050061";
        });
    });
    $done({
        body: JSON.stringify(obj),
    });
}
if (/^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/homefeed\?/.test($request.url)) {
    var obj = JSON.parse($response.body);
    obj.data = Object.values(obj.data).filter((item) => !item.is_ads);
    $done({
        body: JSON.stringify(obj),
    });
}
if (/^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v\d\/system_service\/config\?/.test($request.url)) {
    var obj = JSON.parse($response.body);
    //obj.data.tabbar.tabs = Object.values(obj.data.tabbar.tabs).filter((item) => !item.title == "购买");
    delete obj.data.store;
    delete obj.data.splash;
    delete obj.data.loading_img;
    $done({
        body: JSON.stringify(obj),
    });
}
