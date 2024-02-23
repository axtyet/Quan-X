
/*
项目名称：训记6.11.07
下载地址：商店
脚本作者：@ios151
使用说明：仅供学习 禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖禁止售卖
特别说明：8.8号最新版修复bug,由于相关人员警告,不再更新
[rewrite_local]
^https:\/\/xunji\.gxzckj\.com\/(whole_user_info_v4|after310\/ios) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xunjibody.js
[mitm]
hostname = xunji.gxzckj.com

*/








var { url } = $request, { body } = $response;
// 解锁
if (/whole_user_info_v3/.test(url)) {
  var ios151 = {
    "success": true,
    "res": {
      "en_data": "U2FsdGVkX19gcWG1tthzSMRCyS//FXFGt+rrqW+ZotmPvJQWqGx8u4ozdXc3VSLR/v1YrO41N5TKQPzix96VNTPs3P+5DJNPxFcKI7HVQ9iYCsipIOf2aT7YJ7ZXPtI6RHD973BcZRZLMLJ/chdQDN3UMd3ve+ssE9v2TWnrWUCNabYsiCL4k2uhzpVxshjEguMXtP/wkMHdgXEZ9IyzfqtncgZlXrg4h5gm38J9ho9qmpy8XCP3YoCEykY0zQekqVX8SGHobRakObmT/ZSCGrL79/vcm9RtT4pDtCaUTnbE9OtnNv9O1mbifo3CDibsJtJJMX09VYCQ44HjKmcyjA==",
      "_userid": "1690881024140"
    }
  },
    ios151Body = JSON.stringify(ios151);
  $done({
    "body": ios151Body
  });
  // 屏蔽更新
} else if (/after310\/ios/.test(url)) {
  $done({
    body: JSON.stringify({
      "success": true,
      "res": {
        "version": 0,
        "list": [
        ]
      }
    })
  })
} else {
  $done({ body })











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
