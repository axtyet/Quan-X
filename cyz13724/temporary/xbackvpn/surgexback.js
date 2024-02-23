/*
项目名称：XbackVPN
项目作者：David
下载地址：https://apps.apple.com/app/id1659638467
使用说明：必须创建一个免费账号，不建议使用appleid注册。
使用声明：⚠️仅供参考，🈲️转载与售卖！
使用平台: Surge（已测试）
操作添加说明：Surge用户请复制下方内容。在surge界面找到脚本栏(scripting)并点击脚本(script)，添加一个新的脚本。
填入脚本名称(XbackVPN)；脚本类型选择http response；URL输入网址(https://client-alphant.xback.io/alphant/api/member/getInfo)；打开Requires Body；划到底部点击编辑脚本，将下方内容粘贴进来进行保存。打开软件即可使用。
*/


var objc = JSON.parse($response.body);

// Extract x-token from request headers
var xToken = $request.headers["x-token"];

objc = {
  "code": "SUCCESS",
  "success": true,
  "data": {
    "expireUnix": 4000103307,
    "appleSub": "apple_pay",
    "id": "4",
    "productNo": "com.xback.subscription.1year",
    "limited_offer": false,
    "duration": 366,
    "type": "yearly",
    "newToken": xToken,
    "isEnable": true,
    "desc": "Yearly",
    "vipNo": "1",
    "duration": 99999999,
    "paypalSub": "",
    "isPaySinceRegister": true
  },
  "msg": "success",
  "requestId": "2f2bfc10df558190db386c141b24d1a1"
};

$done({ body: JSON.stringify(objc) });
