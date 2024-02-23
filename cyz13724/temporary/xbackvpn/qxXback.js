// Quantumult X引用地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/qxXback.js

/*
项目名称：XbackVPN
项目作者：David&Levi
下载地址：https://apps.apple.com/app/id1659638467
使用说明：必须创建一个免费账号，不建议使用appleid注册。
操作说明：抓包抓取类似于https://client-alphant.xback.io/alphant/api/member/getInfo?deviceCode=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx,找到该地址的响应体(response body),点击json查看(json viewer),将newToken双引号的内容复制出来备用。若你使用boxjs网页则点击我的-数据查看器-输入key为xbackvpn_token并点击view将得到的newToken粘贴进来保存。若使用boxjs管理快捷指令也可以操作。
使用声明：⚠️仅供参考，🈲️转载与售卖！


[rewrite_local]

^https:\/\/client-alphant\.xback\.io\/alphant\/api\/member\/getInfo\?.*$ url script-response-body https://raw.githubusercontent.com/czy13724/Quantumult-X/main/temporary/xbackvpn/qxXback.js

[mitm]
hostname = client-alphant.xback.io
*/


let objc = JSON.parse($response.body);

// 使用 BoxJS 获取并设置 newToken
objc.data.newToken = $prefs.valueForKey('xbackvpn_token') || objc.data.newToken;

objc.code = "SUCCESS";
objc.success = true;
objc.data.expireUnix = 4000103307;
objc.data.appleSub = "apple_pay";
objc.data.id = "4";
objc.data.productNo = "com.xback.subscription.1year";
objc.data.limited_offer = false;
objc.data.duration = 366;
objc.data.type = "yearly";
objc.data.isEnable = true;
objc.data.desc = "Yearly";
objc.data.vipNo = "1";
objc.data.duration = 99999999;
objc.data.paypalSub = "";
objc.data.isPaySinceRegister = true;
objc.msg = "success";
objc.requestId = "2f2bfc10df558190db386c141b24d1a1";

$done({ body: JSON.stringify(objc) });
