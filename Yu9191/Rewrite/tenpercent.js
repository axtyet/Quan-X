/*
Ten Percent 7.0.1(美区)
time：2023-12-24
[rewrite_local]
^https:\/\/api\.changecollective\.com\/api\/v3\/user url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/tenpercent.js
[mitm]
hostname = api.changecollective.com
*/
let Q = JSON.parse($response.body);
Q.user.eligible_for_trial = false;
Q.user.ubscription_period = "P1Y"; 
Q.user.expiration_date = "12\/31\/2099, 05:00:59 PM UTC"; 
Q.user.admin = true;
Q.user.subscription_in_trial = true;
Q.user.plan_description = "1 year";
Q.user.experience_level = "Occasionally";
Q.user.subscription_end_date = "12\/31\/2099, 05:00:59 PM UTC";
Q.user.subscription_is_auto_renewing = true;
Q.user.purchaser = true;
Q.user.subscription_source = "Apple";
$done({body: JSON.stringify(Q)});
