//rucu6
const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("nbpresentation.protocol.homepage.get.cn")) {
  if (obj.data.result) {
    let list = obj.data.result.dataList;
    if (list) {
      list = list.filter((i) => {
        // 顶部图标
        if (i.type.includes("icons_scroll_unable")) {
          if (i.bizData.items) {
            const item = [
              "bgxq", // 包裹星球
              "cngy", // 免费领水果
              "cngreen", // 绿色家园
              "gjjf", // 裹酱积分
              "ljjq", // 领寄件券
              "ttlhb" // 天天领红包
            ];
            i.bizData.items = i.bizData.items.filter(
              (ii) => !item.includes(ii.key)
            );
          }
        } else if (i.type.includes("big_banner_area")) {
          // 新人福利
          return false;
        } else {
          return true;
        }
        list.forEach((i) => {
          i.bizData.items.forEach((ii) => {
            ii.rightIcon = null;
            ii.bubbleText = null;
          });
        });
      });
    }
  }
} else if (url.includes("guoguo.nbnetflow.ads.show.cn")) {
  // 底部标签页
  if (obj.data.result) {
    obj.data.result = obj.data.result.filter(
      (i) =>
        !(
          i?.materialContentMapper?.group_id?.includes("entertainment") ||
          (i?.materialContentMapper?.bgImg &&
            i?.materialContentMapper?.advRecGmtModifiedTime)
        )
    );
  }
} else if (url.includes("guoguo.nbnetflow.ads.mshow.cn")) {
  if (obj.data) {
    // 1316 头部banner
    // 1332 我的页面横版图片
    const item = ["1316", "1332"];
    for (let i of item) {
      if (obj.data?.[i]) {
        delete obj.data[i];
      }
    }
  }
}

$done({ body: JSON.stringify(obj) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
