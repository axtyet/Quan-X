/***********************************

> 网站名称：🔞PornHub
> 脚本功能：网站净化|去广告
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2023-03-05
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载、售卖
          ⚠️⚠️⚠️
		  
    
[rewrite_local]

^https:\/\/(cn|www)\.pornhub\.com\/_xa\/ads url reject-dict
^https?:/\/(cn|www)\.pornhub\.com\/($|(view|video).*$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/Scripts/pornhub.js

[mitm] 

hostname = *.pornhub.com

***********************************/











var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ddgksf2013/Html/pornhub.css" type="text/css">');
$done({ body });
