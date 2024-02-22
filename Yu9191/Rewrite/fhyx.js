/*
凤凰易学
解锁会员 及全课程 资源
[rewrite_local]

https:\/\/app\.fhestudy\.com\/(collection\/getCatalogAndResource\.do|collection\/getVideoResource\.do|collection\/getTeachingOrCourseDetail\.do|system\/getCheckOutInfo\.do|textbooks\/getTextBookInCourse\.do|user\/getUserInfo\.do|home\/getHomeData\.do) url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/fhyx.js

[mitm] 

hostname = app.fhestudy.com
*/
let body = $response.body;
let obj = JSON.parse(body);
let url = $request.url;

if (/https:\/\/app\.fhestudy\.com\/home\/getHomeData\.do/.test(url)) {
    // 首页图片
    if (obj.data.topBannerList && obj.data.topBannerList.length > 0) {
        obj.data.topBannerList[0].jumpUrl = "https://t.me/chxm1023";
        obj.data.topBannerList[0].bannerName = "Baby邀请您加入叮当猫TG频道";
        obj.data.topBannerList[0].pictureUrl = "https://raw.githubusercontent.com/Yu9191/-/main/babylogo2.png";
        body = JSON.stringify(obj);
    }
} else if (url === "https://app.fhestudy.com/user/getUserInfo.do") {
    // 会员
    obj.data.name = "baby";
    obj.data.rightsType = 1;
    obj.data.rightsStartTime = "2024-09-29";
    obj.data.schoolName = "叮当猫大学";
    obj.data.rightsEndTime = "2099-09-09";
    body = JSON.stringify(obj); 
} else if (/https:\/\/app\.fhestudy\.com\/(collection\/getCatalogAndResource\.do|collection\/getVideoResource\.do|collection\/getTeachingOrCourseDetail\.do|system\/getCheckOutInfo\.do|textbooks\/getTextBookInCourse\.do)/.test(url)) {
    // 课程及资源
    body = body.replace(/"lastStudyFlag":\s*false/g, '"lastStudyFlag": true')
               .replace(/"resourceFreeType":\s*2/g, '"resourceFreeType": 1')
               .replace(/"freeType":\s*4/g, '"freeType": 1')
               .replace(/"price":\s*"\d+"/g, '"price": "0"')
               .replace(/"priceRMB":\s*"\d+"/g, '"priceRMB": "0"')
               .replace(/"balance":\s*"0"/g, '"balance": "9999"')
               .replace(/"isFree":\s*\d+/g, '"isFree": 0')
               .replace(/"hasRight":\s*false/g, '"hasRight": true');
}

$done({ body });
