/*

FIMO：https://apps.apple.com/app/id1454219307

[rewrite_local]
^https?:\/\/server\.zbisq\.com\/fimo-user\/user url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Bone/Script/FIMO.js

[MITM]
hostname = server.zbisq.com

*/
var guding = JSON.parse($response.body);
guding.subscribe = {
    "valid": true,
    "forever": 1,
    "endTime": 148204937166000
  };
$done({ body: JSON.stringify(guding) });
