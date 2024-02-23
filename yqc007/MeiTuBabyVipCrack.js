/******************************

脚本功能：蛋啵解锁永久会员
软件版本：1.1.900
下载地址：http://t.cn/A6o99BUZ
脚本作者：Hausd0rff
更新时间：2022-11-28
电报频道：https://t.me/yqc_123
问题反馈：https://t.me/yqc_777
使用声明：⚠️仅供学习交流，🈲️商业用途

*******************************

[rewrite_local]
# > 蛋啵解锁永久会员
^https?:\/\/api-sub\.meitu\.com\/v2\/user\/vip_info_by_group\.json url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/yqc007/MeiTuBabyVipCrack.js

[mitm] 
hostname = api-sub.meitu.com

*******************************/

var __Oxf292e=["\x62\x6F\x64\x79","\x70\x61\x72\x73\x65","\x64\x61\x74\x61","\u7EED\u671F","\u666E\u901A\u4F1A\u5458","\u86CB\u5575\u666E\u901A\u4F1A\u5458","\x73\x74\x72\x69\x6E\x67\x69\x66\x79"];var body=$response[__Oxf292e[0x0]],objc=JSON[__Oxf292e[0x1]](body);objc[__Oxf292e[0x2]]={'active_sub_type':0x2,'account_type':0x2,'sub_type_name':__Oxf292e[0x3],'trial_period_invalid_time':0x3a4298fa6418,'current_order_invalid_time':0x3a4298fa6418,'active_order_id':0x6155ae24bf884400,'limit_type':0x0,'active_sub_type_name':__Oxf292e[0x3],'use_vip':!![],'have_valid_contract':!![],'derive_type_name':__Oxf292e[0x4],'derive_type':0x1,'in_trial_period':!![],'is_vip':!![],'membership':{'id':0x9,'display_name':__Oxf292e[0x5],'level':0x1,'level_name':__Oxf292e[0x4]},'sub_type':0x2,'account_id':0xaaca26fa,'invalid_time':0x3a4298fa6418,'valid_time':0x183269a747b,'active_product_id':0x0,'active_promotion_status':0x2,'show_renew_flag':!![]},body=JSON[__Oxf292e[0x6]](objc),$done({'body':body});
