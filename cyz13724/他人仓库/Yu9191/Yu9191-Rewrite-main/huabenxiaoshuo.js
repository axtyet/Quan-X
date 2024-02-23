/*

话本小说


[rewrite_local]
https://user.ihuaben.com/api/userinfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/huabenxiaoshuo.js


[mitm] 
hostname = user.ihuaben.com
*/

let obj = JSON.parse($response.body);
    
  
    obj.nickName = "我是叼毛安妮";  

    obj.memberEndTime = "2099-09-09 00:29:59";  
  
    obj.testGroup = "D";
  
    obj.isMember = true;

  
    $done({
        body: JSON.stringify(obj)
    });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
