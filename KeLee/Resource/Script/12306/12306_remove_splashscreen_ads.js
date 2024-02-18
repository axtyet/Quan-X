/*
引用地址https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/12306.js
*/
// 2024-02-18 23:25:38

let body;
let obj = JSON.parse($response.body);

if (obj.placementNo === "0007") {
  body =
    '{"code":"00","materialsList":[{"billMaterialsId":"255","filePath":"h","creativeType":1}],"advertParam":{"skipTime":1}}';
} else if (obj.placementNo === "G0054") {
  body = '{"code":"00","materialsList":[]}';
} else {
  body = '{"code":"00","message":"无广告返回"}';
}

$done({ body });