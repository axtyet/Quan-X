// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/TVRemote.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/TVRemote.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/TVRemote.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/TVRemote.stoverride

/*
项目名称： TVRemote
项目作者： David
下载地址： https://apps.apple.com/app/id1591238748
使用说明： 开脚本再开软件，未成功恢复购买。如使用非qx请使用上述链接或通过script-hub自行转换。下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，禁止用于商业用途。

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/TVRemote.js    

[mitm]
hostname = api.revenuecat.com
*/

let objc = {
    "request_date_ms": "173466406086",
     "request_date": "2024-01-01T:01:01",
     "subscriber": {
       "last_seen": "2024-01-01T:01:01",
       "original_application_version": "1",
    "first_seen": "2024-01-01T01:01:01Z",
       "subscriptions": {
         "remotetv.yearly.06": {
           "store": "app_store",
           "purchase_date": "2024-01-01T01:01:01Z",
           "ownership_type": "PURCHASED",
           "original_purchase_date": "2024-01-01T01:01:01Z",
           "is_sandbox": false,
           "expires_date": "2099-09-09T09:09:09Z"
         },
         "remotetv.weekly.05": {
           "store": "app_store",
           "purchase_date": "2024-01-01T01:01:01Z",
           "ownership_type": "PURCHASED",
           "original_purchase_date": "2024-01-01T01:01:01Z",
           "is_sandbox": false,
           "expires_date": "2099-09-09T09:09:09Z"
         }
       },
       "other_purchases": {},
       "management_url": "https://t.me/IPAs_Dd",
       "entitlements": {
         "Premium": {
           "ownership_type": "PURCHASED",
           "product_identifier": "remotetv.yearly.07",
           "is_sandbox": false,
           "expires_date": "2099-09-09T09:09:09Z",
           "original_purchase_date": "2024-01-01T01:01:01Z",
           "purchase_date": "2024-01-01T01:01:01Z",
           "store": "app_store"
         },
         "In-apps": {
           "ownership_type": "PURCHASED",
           "product_identifier": "remotetv.onetime.01",
           "is_sandbox": false,
           "expires_date": "2099-09-09T09:09:09Z",
           "original_purchase_date": "2024-01-01T01:01:01Z",
           "purchase_date": "2024-01-01T01:01:01Z",
           "store": "app_store"
         }
       }
     }
   };
   
   $done({body: JSON.stringify(objc)});   