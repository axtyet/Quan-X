/***********************************

> 应用名称：GoodNotes6
> 软件版本：6.0.1
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 解锁说明：解锁高级会员权限
> 更新时间：2023-08-11
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# ～GoodNotes6☆解锁会员权限（2023-08-11）@ddgksf2013
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/(receipts$|subscribers\/[^/]+$) url script-echo-response https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/GoodNotesProCrack.js
^https:\/\/isi\.csan\.goodnotes\.com\/.+\/subscribers\/[^/]+/(offerings|attributes)$ url request-header (\r\n)X-RevenueCat-ETag:.+(\r\n) request-header $1X-RevenueCat-ETag:$2

[mitm] 

hostname=isi.csan.goodnotes.com

***********************************/






















var ddgksf2013={
    "request_date_ms":1691760087616,
    "request_date":"2023-08-11T13:21:27Z",
    "subscriber":{
        "non_subscriptions":{
            "com.goodnotes6.one_time_unlock":[
                {
                    "is_sandbox":false,
                    "ownership_type":"PURCHASED",
                    "id":"46ab585dbc",
                    "original_purchase_date":"2022-11-10T23:58:09Z",
                    "store_transaction_id":"300001271068792",
                    "purchase_date":"2023-08-10T23:58:09Z",
                    "store":"app_store"
                }
            ]
        },
        "first_seen":"2023-08-09T13:55:38Z",
        "original_application_version":"1578030.383984727",
        "other_purchases":{
            "com.goodnotes6.one_time_unlock":{
                "purchase_date":"2023-08-10T23:58:09Z"
            }
        },
        "management_url":null,
        "subscriptions":{

        },
        "entitlements":{
            "apple_access":{
                "grace_period_expires_date":null,
                "purchase_date":"2023-08-10T14:16:41Z",
                "product_identifier":"com.goodnotes6.one_time_unlock",
                "expires_date":null
            }
        },
        "original_purchase_date":"2022-04-05T10:43:53Z",
        "original_app_user_id":"1d6316b8-aab7-4c1f-9dee-df471814b03e",
        "last_seen":"2023-08-11T13:18:22Z",
		"Warning":"本脚本仅供学习交流使用，禁止转载售卖"
    }
};
$done({body:JSON.stringify(ddgksf2013)});
