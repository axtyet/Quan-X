var body = $response.body;
var url = $request.url;

if (url.includes("/user/profile")) {
    body = body.replace(/"equity_txt":\s*".*?"/, '"equity_txt": "畅听卡有效期至 2099-09-09"');
    body = body.replace(/"vip_expire_date":\s*".*?"/, '"vip_expire_date": "2099-09-09"');
} else if (url.includes("/v2/reader/section-detail")) {
    body = body.replace(/"equity_txt":\s*".*?"/, '"equity_txt": "免费脚本,7天更新一次,点击加入作者频道"');
    body = body.replace(/"equity_txt_url":\s*".*?"/, '"equity_txt_url": "https://t.me/chxm1023"');
}

$done({ body });
