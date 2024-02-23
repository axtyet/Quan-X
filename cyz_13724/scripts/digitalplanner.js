// Quantumult X引用地址： https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/digitalplanner.js
// Surge/Shadowrocket 模块地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Surge/digitalplanner.sgmodule
// Loon 插件地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Loon/digitalplanner.plugin
// Stash 覆写地址： https://raw.githubusercontent.com/czy13724/Quantumult-X/main/Stash/digitalplanner.stoverride

/*
项目名称： digitalplanner
项目作者： Levi
下载地址： https://apps.apple.com/app/id1632352471
使用说明： 先开脚本再打开软件，未成功尝试恢复购买，下载地址请访问script-path链接获取。
使用声明： 仅供个人参考学习交流，勿用于其它用途

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/cyz_13724/scripts/digitalplanner.js

[mitm]
hostname = buy.itunes.apple.com
*/

var Levi = JSON.parse($response.body);
Levi= {
    "environment": "Production",
    "receipt": {
        "receipt_type": "Production",
        "adam_id": 1632352471,
        "app_item_id": 1632352471,
        "bundle_id": "com.softwings.DigitalPlanner",
        "application_version": "137",
        "download_id": 503176157593425000,
        "version_external_identifier": 861895945,
        "receipt_creation_date": "2024-02-01 12:46:06 Etc/GMT",
        "receipt_creation_date_ms": "1706791566000",
        "receipt_creation_date_pst": "2024-02-01 04:46:06 America/Los_Angeles",
        "request_date": "2024-02-01 12:46:08 Etc/GMT",
        "request_date_ms": "1706791568849",
        "request_date_pst": "2024-02-01 04:46:08 America/Los_Angeles",
        "original_purchase_date": "2024-02-01 01:48:07 Etc/GMT",
        "original_purchase_date_ms": "1706752087000",
        "original_purchase_date_pst": "2024-01-31 17:48:07 America/Los_Angeles",
        "original_application_version": "137",
        "in_app": [
            {
                "quantity": "1",
                "product_id": "com.softwings.DigitalPlanner.2months",
                "transaction_id": "320001708141986",
                "original_transaction_id": "320001708141986",
                "purchase_date": "2024-02-01 12:46:05 Etc/GMT",
                "purchase_date_ms": "1706791565000",
                "purchase_date_pst": "2024-02-01 04:46:05 America/Los_Angeles",
                "original_purchase_date": "2024-02-01 12:46:06 Etc/GMT",
                "original_purchase_date_ms": "1706791566000",
                "original_purchase_date_pst": "2024-02-01 04:46:06 America/Los_Angeles",
                "expires_date": "2099-03-01 08:34:11 Etc/GMT",
                "expires_date_ms": "4076008451000",
                "expires_date_pst": "2099-03-01 00:34:11 America/Los_Angeles",
                "web_order_line_item_id": "320000795858074",
                "is_trial_period": "true",
                "is_in_intro_offer_period": "false",
                "in_app_ownership_type": "PURCHASED"
            }
        ]
    },
    "latest_receipt_info": [
        {
            "quantity": "1",
            "product_id": "com.softwings.DigitalPlanner.2months",
            "transaction_id": "320001708141986",
            "original_transaction_id": "320001708141986",
            "purchase_date": "2024-02-01 12:46:05 Etc/GMT",
            "purchase_date_ms": "1706791565000",
            "purchase_date_pst": "2024-02-01 04:46:05 America/Los_Angeles",
            "original_purchase_date": "2024-02-01 12:46:06 Etc/GMT",
            "original_purchase_date_ms": "1706791566000",
            "original_purchase_date_pst": "2024-02-01 04:46:06 America/Los_Angeles",
            "expires_date": "2099-03-01 08:34:11 Etc/GMT",
            "expires_date_ms": "4076008451000",
            "expires_date_pst": "2099-03-01 00:34:11 America/Los_Angeles",
            "web_order_line_item_id": "320000795858074",
            "is_trial_period": "true",
            "is_in_intro_offer_period": "false",
            "in_app_ownership_type": "PURCHASED",
            "subscription_group_identifier": "20973421"
        }
    ],
    "latest_receipt": "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",
    "pending_renewal_info": [
        {
            "auto_renew_product_id": "com.softwings.DigitalPlanner.2months",
            "product_id": "com.softwings.DigitalPlanner.2months",
            "original_transaction_id": "320001708141986",
            "auto_renew_status": "1"
        }
    ],
    "status": 0
};
$done({body: JSON.stringify(Levi)});
