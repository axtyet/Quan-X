/**
虫虫吉他 2.3.0

[rewrite_local]

http://cc.lzjoy.com url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ccjt.js

*/

let obj = JSON.parse($response.body);

if ($request.url.includes("http://cc.lzjoy.com/?urlparam=common/user/GetVip") || $request.url.includes("http://cc.lzjoy.com/?urlparam=pad/opern/detail")) {
    obj.list.is_buy = "1";
    obj.list.is_vip = "1";
    obj.list.has_buy = "1";
    obj.list.expire_date = "2099-09-09";
} else if ($request.url.includes("http://cc.lzjoy.com/?urlparam=pad/course/getCourseDetailForSingleOpern")) {
    obj.list.is_buy = "1";
    obj.list.is_vip = "1";
    obj.list.info.has_pay = "1";
}

$done({ body: JSON.stringify(obj) });
