使用说明：解锁会员权限,过期完整版视频,如果你觉得获取视频打扰到您,您可以手动屏蔽这条重写！原视频解锁可以试看85%

[rewrite_local]

#解锁会员开关
^https://lp-api.xiongmaoboshi.com/lp-api/ns url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/xiongmaoboshibaike.js
#获取完整视频
^https:\/\/lp-vid\.xiongmaoboshi\.com\/.*\.m3u8$ url script-request-header https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/m3u8/xiongmaoboshibaike.js

[mitm] 

hostname = lp-vid.xiongmaoboshi.com, lp-api.xiongmaoboshi.com