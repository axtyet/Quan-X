/*

Faceswap funny Face replace 1.4.1
‎AI-powered Face Swap. Dreams Come True!

**************************************

[rewrite_local]
^https?:\/\/api\.apphud\.com\/v1\/subscriptions url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Faceswap.js

[mitm]
hostname = api.apphud.com

*/


var Q = JSON.parse($response.body);

Q = {
  "data" : {
    "results" : {
      "locale" : "zh_CN",
      "id" : "12fa6796-3be2-4e8e-b484-ee6def62554d",
      "created_at" : "2022-11-25T13:07:24.057Z",
      "subscriptions" : [
        {
          "id" : "f05cb9d3-6d5d-4b93-92ef-9c3794890f23",
          "unit" : "day",
          "group_id" : "90f0f427",
          "autorenew_enabled" : false,
          "expires_at" : null,
          "in_retry_billing" : false,
          "introductory_activated" : false,
          "cancelled_at" : null,
          "platform" : "ios",
          "product_id" : "com.tm.replica.lifetime",
          "retries_count" : 0,
          "started_at" : "2022-11-25T13:10:34.000Z",
          "local" : false,
          "next_check_at" : "2023-11-13T08:12:39.075Z",
          "kind" : "nonrenewable",
          "units_count" : 1,
          "environment" : "production",
          "status" : "regular"
        }
      ],
      "user_id" : "F5FDFBE8-13FA-45C4-88C7-CCB63E599223",
      "currency" : {
        "id" : "a5604c08-9833-4d8b-a677-f31e7717d8e5",
        "country_code" : "CN",
        "code" : "CNY"
      },
      "devices" : [

      ]
    },
    "meta" : null
  },
  "errors" : null
};

$done({body : JSON.stringify(Q)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
