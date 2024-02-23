/*

滴答 7.0.21

[rewrite_local]
https://dida365.com/api/v2/user/status url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/ddqd.js

[mitm] 
hostname = dida365.com
*/

    let obj = JSON.parse($response.body);
    
    
    //obj.username = "我是叼毛安妮";  

    obj.proEndDate = "5201-01-01T00:00:00.000+0000";  
  
    obj.pro = true;
  
  obj.teamPro = true;
  
    $done({
        body: JSON.stringify(obj)
    });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
