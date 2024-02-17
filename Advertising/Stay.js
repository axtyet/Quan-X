/***********************************

应用名称：Stay去除仓库广告
脚本作者：Cuttlefish
            
[rewrite_local]

^https?:\/\/api\.shenyin\.name\/stay-fork\/browse\/featured$ url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/Stay.js

[mitm]

hostname = api.shenyin.name

***********************************/

let chxm1023 = JSON.parse($response.body);
if (chxm1023.biz) {
    chxm1023.biz = Object.values(chxm1023.biz).filter(item => !(item["type"]=="promoted"));
}
$done({ body: JSON.stringify(chxm1023) });
