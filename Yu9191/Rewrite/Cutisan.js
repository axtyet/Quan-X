/*
cutisan 壁纸

[rewrite_local]
^https:\/\/cutisanapi\.imuuzi\.com\/api\/(Home\/index|Index\/index) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/Cutisan.js

[mitm]
hostname = cutisanapi.imuuzi.com

*/

var url = $request.url;

if (url.indexOf("https://cutisanapi.imuuzi.com/api/Home/index") !== -1) {
    
    var obj = JSON.parse($response.body);

    // 遍历每个数组
    for (var i = 0; i < obj.data.length; i++) {
     //如果是空属性
        if (obj.data[i].download_url === "") {
            // 用 "thumb_url" 的值来填充
            obj.data[i].download_url = obj.data[i].thumb_url;
        }
        if (obj.data[i].open !== 1) {
					
            obj.data[i].open = 1;
        }
    }

    $done({body: JSON.stringify(obj)});
} else if (url.indexOf("https://cutisanapi.imuuzi.com/api/Index/index") !== -1) {
 
    let obj = JSON.parse($response.body);
    obj.data.sex = 1;
    obj.data.type = 2;
    obj.data.expire_time = 6707091199;
    $done({body: JSON.stringify(obj)});
} else {
    $done({});
}

