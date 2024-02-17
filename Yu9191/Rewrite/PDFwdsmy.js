/*
PDF文档扫描仪 2.8.9

[rewrite_local]
https://device.rsjxzl.com/api/v2/subscription/info url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/PDFwdsmy.js

[mitm]
hostname = device.rsjxzl.com

*/

$done({
  body: JSON.stringify({
    success: true,
    data: {
      status: 1,
      hash: null,
      statusAutoRenew: 1,
      endTime: 9993142066,
      now: 1702882976,
      productItem: "com.ios.scanner.yearly.cn",
      gateway: 2,
      trial: 1,
      productGroup: 1,
      startTime: 1702882866
    }
  })
});
