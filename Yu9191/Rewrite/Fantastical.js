/*
Fantastical Calendar
2023.12.230
[rewrite_local]
^https:\/\/api\.flexibits\.com\/v1\/account\/details\/\? url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Fantastical.js
[mitm]
hostname = api.flexibits.com
*/
var obj = JSON.parse($response.body);
obj.subscription = {
"is_canceled": false,
"autorenew": true,
"started_at": "2099-09-30T08:19:17.000000Z",
"trial": true,
"subscription_type": "AppStore",
"invoice_status": "reconciled",
"uuid": "2354493d-a364-465f-8712-c560f5caaa37",
"is_expired": false,
"expiration": "2099-12-09T09:09:09.000000Z",
"interval": 1
};
obj.team.kind = "family";  
obj.repeat_trial_available = false;
$done({body: JSON.stringify(obj)});
//by ios151
