#哔哩哔哩去广告+ 1080P高码率（转载来自墨鱼）

# BiliBili_哔哩哔哩_屏蔽直播间商品广告浮窗
^https?:\/\/api\.live\.bilibili\.com\/xlive\/e-commerce-interface\/v\d\/ecommerce-user\/get_shopping_info\? url reject-dict

# BiliBili_哔哩哔哩_屏蔽广告浮窗
^https?:\/\/api\.bilibili\.com\/pgc\/activity\/deliver\/material\/receive url reject-dict

# BiliBili_哔哩哔哩_屏蔽IP请求
^https?:\/\/app\.bilibili\.com\/x\/resource\/ip url reject

# BiliBili_哔哩哔哩_屏蔽DefaultWord
^https?:\/\/app\.bilibili\.com\/bilibili\.app\.interface\.v1\.Search\/Default url reject

# BiliBili_哔哩哔哩_屏蔽首页右上活动[卸载重装]
^https?:\/\/app\.bilibili\.com\/x\/resource\/top\/activity url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_启动时开启直连模式[自行启用]
;^https?:\/\/app\.bilibili\.com\/x\/resource\/domain url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_startup_direct.js

# BiliBili_哔哩哔哩_繁体CC字幕转中文简体[自行启用]
;^https?:\/\/i.\.hdslb\.com\/bfs\/subtitle\/.+\.json$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_cc.js

# BiliBili_哔哩哔哩_观影页面去广告
^https?:\/\/api\.(bilibili|biliapi)\.(com|net)\/pgc\/page\/cinema\/tab\? url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_应用开屏去广告@bm7
^https://app.bilibili.com/x/v2/splash/show url reject-dict

# BiliBili_哔哩哔哩_应用开屏广告预加载@yjqiang
^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/list url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_去除统一设置的皮肤
^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_1080P高码率+4K画质(番剧和影视除外)
^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\? url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_热搜发现
^https://app.bilibili.com/x/v2/search/square url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_Defaultword
^https://app.bilibili.com/x/v2/search/defaultwords url reject-dict

# BiliBili_哔哩哔哩_Material_Ad
^https?:\/\/api\.bilibili\.com\/x\/vip\/ads\/material\/report url reject-dict

# BiliBili_哔哩哔哩_小卡片广告
^https://api.bilibili.com/pgc/season/player/cards url reject-dict

# BiliBili_哔哩哔哩_去除动态中的话题
^https?:\/\/api\.vc\.bilibili\.com\/topic_svr\/v1\/topic_svr url reject-dict

# BiliBili_哔哩哔哩_漫画去广告
^https?:\/\/manga\.bilibili\.com\/twirp\/comic\.v\d\.Comic\/(Flash|ListFlash) url reject-dict

# BiliBili_哔哩哔哩_推荐去广告
^https?:\/\/app\.bilibili\.com\/x\/v2\/feed\/index url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_追番去广告
^https?:\/\/api\.(bilibili|biliapi)\.(com|net)\/pgc\/page\/bangumi url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_直播去广告
^https?:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_标签页处理
^https?:\/\/app\.bilibili\.com\/x\/resource\/show\/tab url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_我的页面处理
^https?:\/\/app\.bilibili\.com\/x\/v2\/account\/mine url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili_json.js

# BiliBili_哔哩哔哩_Proto去广告
^https:\/\/app\.bilibili\.com\/bilibili\.app\.(view\.v1\.View\/View|dynamic\.v2\.Dynamic\/DynAll)$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Bilibili/bilibili-proto.js

hostname = app.bilibili.com,api.live.bilibili.com,api.vc.bilibili.com, api.bilibili.com, manga.bilibili.com, grpc.biliapi.net,api.biliapi.net, -broadcast.chat.bilibili.com, -*cdn*.biliapi.net, -*tracker*.biliapi.net
