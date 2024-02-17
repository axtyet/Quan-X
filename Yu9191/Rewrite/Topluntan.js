/*
Top论坛
课程全解锁
仅测试Surge

[rewrite_local]


https://super.toppps.com/app-api/v1/toppps/(live/getLiveSpaceDetailsV2|products) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Topluntan.js

[mitm] 

hostname = super.toppps.com
*/

var body = $response.body;
var url = $request.url;

if (url.indexOf("https://super.toppps.com/app-api/v1/toppps/live/getLiveSpaceDetailsV2") !== -1) {
    // 空中课堂定制课程
    body = body.replace(/"tryRights":\s*false/g, '"tryRights": true')
               .replace(/"leftTryTime":\s*\d+/g, '"leftTryTime": 9000000')
               .replace(/"pdfRights":\s*false/g, '"pdfRights": true');

    var pdfUrlMatch = body.match(/"pdfList":\s*\["([^"]+)"/);
    if (pdfUrlMatch && pdfUrlMatch.length > 1) {
        var pdfListEncoded = pdfUrlMatch[1];
        var pdfListDecoded = decodeURIComponent(pdfListEncoded);
        
        // 检查是否为 Quantumult X 环境
        if ('undefined' !== typeof $task) {
            // 在 Quantumult X 环境下使用 $notify() 函数进行通知
            $notify("PDF 下载链接", "", pdfListDecoded);
        } else {
            // 在 Surge 环境下使用 $notification.post() 函数进行通知
            $notification.post("PDF 下载链接", "", pdfListDecoded);
        }
    }
} else if (url.indexOf("https://super.toppps.com/app-api/v1/toppps/products") !== -1) {
    // 空中课堂普通课程
    var pdfUrlMatch = body.match(/"pdfUrl":\s*"([^"]+)"/);
    if (pdfUrlMatch && pdfUrlMatch.length > 1) {
        var pdfUrlEncoded = pdfUrlMatch[1];
        var pdfUrlDecoded = decodeURIComponent(pdfUrlEncoded);
        
        // 检查是否为 Quantumult X 环境
        if ('undefined' !== typeof $task) {
            // 在 Quantumult X 环境下使用 $notify() 函数进行通知
            $notify("PDF 下载链接", "", pdfUrlDecoded);
        } else {
            // 在 Surge 环境下使用 $notification.post() 函数进行通知
            $notification.post("PDF 下载链接", "", pdfUrlDecoded);
        }
    }

    body = body.replace(/"pdfFree":\s*\d+/g, '"pdfFree": 1')
               .replace(/"videoFree":\s*\d+/g, '"videoFree": 1')
               .replace(/"videoDownload":\s*\d+/g, '"videoDownload": 1')
               .replace(/"audioFree":\s*\d+/g, '"audioFree": 1')
               .replace(/"videoFileSize":\s*\d+/g, '"videoFileSize": 1');
}

$done({ body });

