/***********************************

> 应用名称：TVRemote&ScreenMirrorVIP
> 软件版本：1.23、1.3.1
> 脚本作者：ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-03-22
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 解锁步骤：https://t.me/ddgksf2021/5439
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# > TVRemote&ScreenMirror☆解锁会员权限（2024-03-22）@ddgksf2013
^https?:\/\/api\.adapty\.io\/api\/v\d\/sdk\/in-apps\/apple\/receipt\/validate url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/ddgksf2013/MOYU/TVRemote.js

[mitm] 

hostname=api.adapty.io

***********************************/


let obj=JSON.parse($response.body);var idd1="",idd2="";"com.universal.remotetv"==obj.data.attributes.apple_validation_result.receipt.bundle_id?(idd1="com.universal.remotetv",idd2="remotetv.weekly.02"):(idd1="tv.screen.mirroring",idd2="tv.screen.week.01");var ddgksf2013={data:{type:"adapty_inapps_apple_receipt_validation_result",id:"bb32657f-c306-4cd5-8419-324f33be1336",attributes:{app_id:"53b2b65d-b1fb-4ba5-ae07-4bb4a8c74415",profile_id:"bb32657f-c306-4cd5-8419-324f33be1336",apple_validation_result:{environment:"Production",receipt:{receipt_type:"Production",app_item_id:1591238748,receipt_creation_date:"2024-03-22 10:18:11 Etc/GMT",bundle_id:idd1,original_purchase_date:"2024-02-24 05:40:25 Etc/GMT",in_app:[{quantity:"1",purchase_date_ms:"1711102689000",expires_date:"2099-03-25 10:18:09 Etc/GMT",expires_date_pst:"2099-03-25 03:18:09 America/Los_Angeles",is_in_intro_offer_period:"false",transaction_id:"300001781049164",is_trial_period:"true",original_transaction_id:"300001781049164",purchase_date:"2024-03-22 10:18:09 Etc/GMT",product_id:idd2,original_purchase_date_pst:"2024-03-22 03:18:10 America/Los_Angeles",in_app_ownership_type:"PURCHASED",original_purchase_date_ms:"1711102690000",web_order_line_item_id:"300000850090702",expires_date_ms:"4711361889000",purchase_date_pst:"2024-03-22 03:18:09 America/Los_Angeles",original_purchase_date:"2024-03-22 10:18:10 Etc/GMT"}],adam_id:1591238748,receipt_creation_date_pst:"2024-03-22 03:18:11 America/Los_Angeles",request_date:"2024-03-22 10:19:49 Etc/GMT",request_date_pst:"2024-03-22 03:19:49 America/Los_Angeles",version_external_identifier:861674818,request_date_ms:"1711102789671",original_purchase_date_pst:"2024-02-23 21:40:25 America/Los_Angeles",application_version:"5",original_purchase_date_ms:"1708753225000",receipt_creation_date_ms:"1711102691000",original_application_version:"1",download_id:0x6fbdfb45f35df80},pending_renewal_info:[{product_id:"remotetv.weekly.02",original_transaction_id:"300001781049164",auto_renew_product_id:"remotetv.weekly.02",auto_renew_status:"1"}],status:0,latest_receipt_info:[{quantity:"1",purchase_date_ms:"1711102689000",expires_date:"2099-03-25 10:18:09 Etc/GMT",expires_date_pst:"2099-03-25 03:18:09 America/Los_Angeles",is_in_intro_offer_period:"false",transaction_id:"300001781049164",is_trial_period:"true",original_transaction_id:"300001781049164",purchase_date:"2024-03-22 10:18:09 Etc/GMT",product_id:idd2,original_purchase_date_pst:"2024-03-22 03:18:10 America/Los_Angeles",in_app_ownership_type:"PURCHASED",subscription_group_identifier:"20896860",original_purchase_date_ms:"1711102690000",web_order_line_item_id:"300000850090702",expires_date_ms:"4711361889000",purchase_date_pst:"2024-03-22 03:18:09 America/Los_Angeles",original_purchase_date:"2024-03-22 10:18:10 Etc/GMT"}],latest_receipt:""},segment_hash:"ef46db3751d8e999",timestamp:1711102789736,promotional_offer_eligibility:!1,non_subscriptions:null,custom_attributes:{},customer_user_id:"979408FF-6B6E-4FD2-A4CA-2CE231A82A9E",introductory_offer_eligibility:!1,subscriptions:{idd2:{vendor_transaction_id:"300001781049164",offer_id:null,billing_issue_detected_at:null,is_lifetime:!1,store:"app_store",vendor_product_id:idd2,vendor_original_transaction_id:"300001781049164",will_renew:!0,renewed_at:"2099-03-22T10:18:09.000000+0000",cancellation_reason:null,active_promotional_offer_id:null,active_promotional_offer_type:null,unsubscribed_at:null,is_active:!0,activated_at:"2024-03-22T10:18:10.000000+0000",is_refund:!1,is_in_grace_period:!1,active_introductory_offer_type:"free_trial",expires_at:"2099-03-25T10:18:09.000000+0000",starts_at:null,is_sandbox:!1}},total_revenue_usd:0,paid_access_levels:{premium:{id:"premium",is_lifetime:!1,vendor_product_id:idd2,active_promotional_offer_type:null,cancellation_reason:null,billing_issue_detected_at:null,unsubscribed_at:null,expires_at:"2099-03-25T10:18:09.000000+0000",will_renew:!0,is_active:!0,offer_id:null,is_in_grace_period:!1,activated_at:"2024-03-22T10:18:10.000000+0000",active_promotional_offer_id:null,renewed_at:"2099-03-22T10:18:09.000000+0000",is_refund:!1,active_introductory_offer_type:"free_trial",store:"app_store",starts_at:null}}}}};$done({body:JSON.stringify(ddgksf2013)});
