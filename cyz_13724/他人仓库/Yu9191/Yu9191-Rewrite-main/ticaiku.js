/**

脚本名称: #小程序://题材库/7lJ9vMf43M3tnZd

解锁会员



[rewrite_local]


^https:\/\/miniapp\.guniuniu\.com\/api\/mini-app\/user$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/ticaiku.js

[mitm] 

hostname = miniapp.guniuniu.com



*/




    let obj = JSON.parse($response.body);
    
    // 不能删
    obj.data.nickName = "我是叼毛安妮";  

    obj.data.vipTime = "2099-09-09 02:20:13";                 

    $done({
        body: JSON.stringify(obj)
    });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
