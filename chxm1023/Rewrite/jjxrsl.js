/*************************************

项目名称：经济学人·商论
下载地址：https://t.cn/A60bUTVl
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.hummingbird\.businessreview\.global\/api\/subscriptions\/get_active url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/jjxrsl.js

[mitm]
hostname = api.hummingbird.businessreview.global

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "subscription_type" : "Paid",
  "account_member_since" : "Jul 17th, 2023",
  "subscriptions" : [
    {
      "id" : "",
      "store_product_id" : "GBR Yearly SO-0920",
      "state" : "paid",
      "active" : true,
      "subscription_data" : "{&#34;stripe_event_id&#34;:&#34;&#34;,&#34;charge_id&#34;:&#34;&#34;}",
      "payment_type" : "alipay",
      "stripe_event_id" : "",
      "amount" : 29900,
      "source" : "web-alipay",
      "created_date" : {
        "$date" : {
          "$numberLong" : "1666666666666"
        }
      },
      "purchase_date" : {
        "sec" : "1666666666"
      },
      "platform" : "web",
      "charge_id" : "",
      "renewal_flag" : true,
      "payment_frequency" : "GBR Yearly SO-0920",
      "account" : {
        "$id" : {
          "$oid" : ""
        },
        "$ref" : "accounts"
      },
      "expiration_date" : {
        "sec" : "4092599349"
      }
    }
  ],
  "error" : false
};

$done({body : JSON.stringify(chxm1023)});
