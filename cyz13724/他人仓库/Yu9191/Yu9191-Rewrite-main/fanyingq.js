/*

凡音钢琴 

[rewrite_local]
https://gzfanyin.com/api/ums/getMember url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/fanyingq.js

[mitm] 
hostname = gzfanyin.com
*/


let obj = JSON.parse($response.body);
   
    obj.data.vipEndDate = "2999-12-12 00:00:00";  
    obj.data.vnickName = "叼毛安妮2";  
    obj.data.ifFollow = true; 
    obj.data.isPartner = true; 
  obj.data.vipGrade = 1; 
    $done({
        body: JSON.stringify(obj)
    });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
