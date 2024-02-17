/****************************

#!name = 微信读书(登录后禁用此插件)
#!desc = 共享会员权益，一人付费，全员享受
#!openUrl = 若会员过期可遵循自愿原则自行续费
#!author = 影子
#!homepage = https://napi.ltd/
#!icon = https://file.napi.ltd/Static/Image/WXDuShu.png





[Rewrite]
^https://i\.weread\.qq\.com/login url 307 https://napi.ltd/WXDuShuLogin
^https://i\.weread\.qq\.com/login 307 https://napi.ltd/WXDuShuLogin

#[Script]
#http-response ^https://napi\.ltd/WXDuShuLogin script-path=https://napi.ltd/script/Worker/WXDuShu.js, requires-body=true, timeout=60, tag=微信读书, img-url=https://file.napi.ltd/Static/Image/WXDuShu.png

[Mitm]
hostname = i.weread.qq.com, napi.ltd
****************************/





const obj = {
	"openId": "onb3MjlDBL4gHUVnYF27oz99y1u8",
	"config" : {
		"scheme" : "weread://home?tab=1"
	},
	"wxAccessToken": "72_iea9pF174aATDsKC7oBUKiqXRS4K9QOEbm_xfvxupVI9z3ybG3luCvb9ei08W9KqdGiK_AecwXvmEuCHHMC2qs1f3P7HxDZB5wP6cJNpYN4",
	"vid": 554505481,
	"firstLogin": 0,
	"refreshToken": "onb3MjlDBL4gHUVnYF27oz99y1u8@4hRs3g0SSZqQx0egRcaX5AAA",
	"skey": "kIgvwFVs",
	"accessToken": "kIgvwFVs",
	"userAgreement": 0,
	"user": {
		"name": "请关闭插件后重启本软件",
		"avatar": "https://res.weread.qq.com/wravatar/WV0004-l5dLHOQYRapfqLnd_WYnWd9/0"
	}
}


Body = JSON.stringify(obj)
$done({body: Body})
