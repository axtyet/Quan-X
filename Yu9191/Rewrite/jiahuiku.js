/*
家惠库
解锁全课程
直播回放 特训营未解锁

[rewrite_local]


https://prodapi\.jiahuiku\.cn/api/content/v1/(kpoint/initSelectedKpoints|app/getKpointList|kpoint/appendKpoints|seminar/annex/getSeminarKpointListBySeminarId|seminar/annex/getSeminarCourseAnnexListBySeminarId) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/jiahuiku.js

[mitm] 

hostname = prodapi.jiahuiku.cn
*/
var body = $response.body;

body = body.replace(/("audioContentStatus":\s*)false|("whetherFree":\s*)1|("whetherLook":\s*)0/g, function(match, p1, p2, p3) {
    if (p1 !== undefined) return p1 + "true";
    if (p2 !== undefined) return p2 + "0";
    if (p3 !== undefined) return p3 + "1";
});

body = body.replace(/"whetherDownload":\s*1/g, '"whetherDownload":0');

$done({ body });




