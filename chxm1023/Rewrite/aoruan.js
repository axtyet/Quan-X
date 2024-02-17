/*************************************

项目名称：傲软抠图
下载地址：https://t.cn/A6xBOE5d

项目名称：傲软扫描
下载地址：https://t.cn/A6o1jHWR

项目名称：傲软PDF转换
下载地址：https://t.cn/A6o1j588

项目名称：傲软PDF编辑
下载地址：https://t.cn/A6o1jCGU

项目名称：傲软投屏
下载地址：https://t.cn/A65nw9gx

项目名称：咖映
下载地址：https://t.cn/A6o1lsFL

项目名称：轻闪PDF
下载地址：https://t.cn/A6o1iiI2

项目名称：乃糖小组件
下载地址：https://t.cn/A6o1iMdP

项目名称：佐糖
下载地址：https://t.cn/A6o1iVTI

项目名称：佐糖照片修复
下载地址：https://t.cn/A6o1itzG

使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https?:\/\/.*\.aoscdn\.com\/base\/vip\/client\/authorizations url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/aoruan.js

[mitm] 

hostname = *.aoscdn.com

*************************************/

var chxm1023 = {
  "status" : 200,
  "message" : "success",
  "data" : {
    "expired_at" : 4092600296,
    "is_activated" : 1,
    "is_lifetime" : 1,
    "expire_time" : "2099-09-09 09:09:09",
    "device_id" : 600150864,
    "period_type" : "active",
    "remain_days" : 999999999,
    "product_id" : 963,
    "has_present" : 0,
    "allowed_device_count" : 1,
    "has_buy_extend" : 0,
    "will_expire" : 0,
    "license_type" : "premium",
    "begin_activated_time" : 1645798296,
    "durations" : 999999999,
    "vip_special" : 1
  }
}
$done({body: JSON.stringify(chxm1023)});
