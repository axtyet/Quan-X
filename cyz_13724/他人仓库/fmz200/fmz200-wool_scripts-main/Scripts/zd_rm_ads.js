let newData = [];
let body = JSON.parse($response.body);
body.data.forEach(item => {
  if (item.posterStandName != "首页-弹窗广告") {
    console.log("海报名称:" + item.posterStandName);
    newData.push(item);
  }
});
body.data = newData;
$done({body: JSON.stringify(body)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
