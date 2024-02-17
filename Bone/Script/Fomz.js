/*

Fomz：https://apps.apple.com/app/id1615744942

[rewrite_local]
^https:\/\/fz68resapi\.imendon\.com\/v2\/purchase\/vip\/verification url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Bone/Script/Fomz.js

[MITM]
hostname = fz68resapi.imendon.com

*/
var guding = JSON.parse($response.body);
guding.data = {
    "isValid": 1,
    "expiredTs": 0
}
$done({ body: JSON.stringify(guding) });
