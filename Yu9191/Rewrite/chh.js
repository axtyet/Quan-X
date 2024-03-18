/*

创合汇
会员全课程

[rewrite_local]


https:\/\/(xcxapi\.chuanghehui\.com\/app\/publicCourse\/detail|api\.chuanghehui\.com\/api\/cli\/member\/home|api\.chuanghehui\.com\/api\/cli\/post|api\.chuanghehui\.com\/api\/cli\/member\/my) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/chh.js
https://api.chuanghehui.com/api/cli/post url 302 https://t.me/chxm1023
[mitm] 

hostname = *.chuanghehui.com
*/
var Baby = $response.body;
var urlRegex = /https:\/\/(xcxapi\.chuanghehui\.com\/app\/publicCourse\/detail|api\.chuanghehui\.com\/api\/cli\/member\/home|api\.chuanghehui\.com\/api\/cli\/post|api\.chuanghehui\.com\/api\/cli\/member\/my)/;

if (urlRegex.test($request.url)) {
    if ($request.url.includes("api.chuanghehui.com/api/cli/member/my")) {
        let obj = JSON.parse(Baby);
        obj.data.show_alumnu = 1;
        obj.data.my_point = 9999;
        obj.data.member_id = 1;
        obj.data.invitation_status = 1;
        obj.data.name = "Baby至尊会员卡";
        obj.data.binding_status = 1;
				obj.data.max_point = "欢迎加入叮当猫TG频道@chxm1023";
        Baby = JSON.stringify(obj);
    } else {
        if (/https:\/\/api\.chuanghehui\.com\/api\/cli\/post/g.test($request.url)) {
            Baby = Baby.replace(/url:"https:\/\/www\.chuanghehui\.com\/custom\/[^?]+"/g, 'url:"https:\/\/t.me\/chxm1023"');
        } else {
            Baby = Baby.replace(/("last_watch_progress"\s*:\s*)\d+/g, '$11');
            Baby = Baby.replace(/("is_try_see"\s*:\s*)\d+/g, '$11');
            Baby = Baby.replace(/("is_member"\s*:\s*)false/g, '$1true');
            Baby = Baby.replace(/("is_member"\s*:\s*)\d+/g, '$11');
        }
    }
}

$done({ body: Baby });
