/****************************************

[rewrite_local]

# 阿里云盘-优化首页display
^https?:\/\/api\.aliyundrive\.com\/apps\/v\d\/users\/apps\/widgets$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Advertising/alidrive.js

[mitm]

hostname = api.aliyundrive.com

****************************************/

let chxm1023 = JSON.parse($response.body);
if (chxm1023.result) {
    chxm1023.result = Object.values(chxm1023.result).filter(item => (item["appCode"]=="file" || item["appCode"]=="video"));
}
$done({ body: JSON.stringify(chxm1023)});
