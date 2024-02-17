/*************************************

项目名称：话本小说
下载地址：2023-12-15
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
https?:\/\/.*\.ihuaben\.com\/(api\/userinfo|book\/app\/(vipReadWaitSeconds|book)|function\/bookservice\/authorInfo) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/chxm1023/Rewrite/huabenxiaoshuo.js

[mitm]
hostname = *.ihuaben.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = /api\/userinfo/;
const yuedu = /book\/app\/vipReadWaitSeconds/;
const authorinfo = /function\/bookservice\/authorInfo/;
const book = /book\/app\/book/;

if(user.test($request.url)){
   chxm1023["isPaymentMember"] = true;
   chxm1023["isMember"] = true;
   chxm1023["testGroup"] = "D";
   chxm1023["isContractAuthor"] = true;
   chxm1023["memberEndTime"] = "2099-09-09 09:09:09";
   chxm1023["isRealNameCertification"] = true;
}

if(yuedu.test($request.url)){
   chxm1023.hpFee = 1;
   chxm1023.isDimeMemberExperinceAvailable = true;
}

if(authorinfo.test($request.url)){
   chxm1023.authorInfo["userStatus"] = 1;
   chxm1023.authorInfo["isMember"] = true;
}

if(book.test($request.url)){
   chxm1023.book.marks.isMember = true;
}

$done({body : JSON.stringify(chxm1023)});