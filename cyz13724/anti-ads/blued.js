# blued男同软件去广告
# author: Sliverkiss

[rewrite_local]
//主页推荐直播 
https://social.blued.cn/users/recommend url reject-dict

//未登录时个人界面广告
^https:\/\/social\.blued\.cn\/users\/no_auth\/benefit url reject-dict

//登录后个人界面广告 
^https:\/\/social\.blued\.cn\/users\/.+\/more\/ios\?v=2 url script-response-body https://raw.githubusercontent.com/czy13724/Quantumult-X/main/anti-ads/blued.js

[mitm]
hostname=social.blued.cn

//blued脚本内容 
let levi = JSON.parse($response.body);
levi.data[0].banner={};
levi.data[0].service=[];
levi.data[0].healthy={};
levi.data[0].healthy_banner=[];
levi.data[0].emotions=[];
$done({
  body: JSON.stringify(levi)
});
