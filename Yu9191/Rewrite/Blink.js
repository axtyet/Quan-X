/*
Blink头像 1.3.6

[rewrite_local]

https:\/\/api-blink-app\.17gwx\.com\/blink\/(user\/vip_info|i2i\/free_check) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Blink.js

[mitm]
hostname = api-blink-app.17gwx.com
*/

let body = $response.body;
let url = $request.url;

if (url.includes("https://api-blink-app.17gwx.com/blink/user/vip_info")) {
    let obj = JSON.parse(body);
    obj.data.vip_info.status = 1;
    obj.data.vip_info.sub_title = "欢迎加入叮当猫频道 TG@Chxm1023";
    obj.is_encrypt = true;
    body = JSON.stringify(obj);
} else if (url.includes("https://api-blink-app.17gwx.com/blink/i2i/free_check")) {
    let obj = JSON.parse(body);
    obj.data.is_ok = true;
    obj.data.not_vip = false;
    obj.is_encrypt = true;
    body = JSON.stringify(obj);
}

$done({ body });
