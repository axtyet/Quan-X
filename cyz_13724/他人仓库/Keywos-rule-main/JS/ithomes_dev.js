const isLoon =typeof $loon !== 'undefined'
let lbt=true, zd=true
if (isLoon){
	lbt = $persistentStore.read("去除轮播图") === "开启";
    zd = $persistentStore.read("去除置顶") === "开启";
}
let i = JSON.parse($response.body);
if(lbt){
    i.data.list = i.data.list.filter(function(item) {
    return item.feedType !== 10002;  //轮播
    });
}
if(zd){
    i.data.list = i.data.list.filter(function(item) {
    return item.feedType !== 10003;  //置顶
    });
}
i.data.list = i.data.list.filter(item => {
  return item.feedType !== 10000 || (item.feedContent.smallTags[0]?.text === null || !item.feedContent.smallTags[0].text.includes("广告"));
});

$done({body: JSON.stringify(i)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
