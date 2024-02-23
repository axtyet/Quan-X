# 万词王去广告
# author: Sliverkiss
****************************
[rewrite_local]
//移除开屏
 ^https:\/\/wanciwangdata\.oss-cn-beijing\.aliyuncs\.com\/startup\/resource\/content.+ url reject

//移除banner广告

^https:\/\/recite\.perfectlingo\.com\/api\/recite\/app-act\/act-list.+ url reject-dict

//移除底部广告

^https:\/\/recite\.perfectlingo\.com\/api\/recite\/content-recommend\/v1\/get-by-uid.+ url reject-dict

移除悬浮广告

^https:\/\/recite\.perfectlingo\.com\/api\/recite\/floating-window\/v1\/get-show.+ url reject-dict

[mitm]
hostname = wanciwangdata.oss-cn-beijing.aliyuncs.com,recite.perfectlingo.com
