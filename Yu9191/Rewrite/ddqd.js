/*

滴答 7.0.21

[rewrite_local]
https://dida365.com/api/v2/user/status url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/ddqd.js

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
