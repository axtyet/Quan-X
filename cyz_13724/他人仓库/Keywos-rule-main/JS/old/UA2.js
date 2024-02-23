/*
夸克
Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/16C50 Quark/604.1 T7/10.3 SearchCraft/2.6.3 (Baidu; P1 8.0.0)

百度
Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 SearchCraft/3.9.0 (Baidu; P2 16.3)

必应ai
Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/110.0.1587.54 Version/16.0 Mobile/15E148 Safari/604.1$2  

兼容mac 和ios

#!name=Bing Edge UA 来自小白脸

[MITM]
hostname = %APPEND% *.bing.com, bing.com

[Script]
bing-edge-ua = type=http-request,pattern=^http(s)?:\/\/(?:.*\.)?bing\.com,script-path=useragent.js,requires-body=false

// let url = $request.url;
// if (url.includes("amdc/mobileDispatch")) {
// let headers = $request.headers,
// userAgent = headers["User-Agent"] || headers["user-agent"];
// $done(userAgent.includes("AMap") || userAgent.includes("Cainiao") ? undefined : {});
// }

// const url = $request.url;
// const header = $request.headers;
// let ua = header["User-Agent"] || header["user-agent"];
// if (url.includes("/amdc/mobileDispatch")) {
//   if (ua.includes("AMapiPhone") || ua.includes("Cainiao")) {
//     $done({ status: "HTTP/1.1 404 Not Found" });
//     return;}}
// $done({});

*/
const headers = $request.headers;

   delete headers["user-agent"];
   delete headers["sec-ch-ua-full-version"];
   delete headers["sec-ch-ua-full-version-list"];
   let ua = $environment.system === 'iOS' ?'iPhone':'Macintosh';
   

   headers['User-Agent'] = `Mozilla/5.0 (${ua}; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41`;
  headers['sec-ch-ua'] = '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"'
  headers['sec-ch-ua-mobile'] = '?0'
  headers['sec-ch-ua-platform'] = 'macOS'

   $done({ headers });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
