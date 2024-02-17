/****************************************

项目名称：顺丰
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*****************************************

[rewrite_local]

https://ccsp-egmas.sf-express.com/cx-app-base/base/app/ad/queryInfoFlow url script-response-body https://raw.githubusercontent.com/axtyet/ios/main/Advertising/shunfeng_json.js

[mitm]

hostname = ccsp-egmas.sf-express.com

****************************************/

if ($request.url.indexOf("app/ad/queryInfoFlow") != -1) {
    var chxm1023 = JSON.parse($response.body);
    chxm1023.obj = Object.values(chxm1023.obj).filter((item) => item.adverId==2833);
    $done({
        body: JSON.stringify(chxm1023),
    });
}
