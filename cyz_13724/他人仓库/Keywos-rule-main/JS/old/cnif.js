var okk = JSON.parse($response.body);
  if (/cainiao\.nbpresentation\.protocol\.homepage\.get\.cn/.test(
    $request.url
  )) {
    // 首页 红点，闪烁图标，推广
    //ljjq 领寄件券
    //ttlhb 天天领红包
    //gjjf 裹酱积分
    //bgxq 包裹星球
    //cngreen 绿色家园
    //tcqs 同城取送
    //qydq 亲友代取
    const kkkey = ["gjjf", "bgxq", "cngreen", "ttlhb", "ljjq"];
    okk.data.result.dataList = okk.data.result.dataList.filter((item) => {
      if (item.type === "big_banner_area_v870") {
        return false; // "big_banner_area_v870" 新人福利
      }
      if (item.bizData.items) {
        item.bizData.items = item.bizData.items.filter((subItem) => {
          return !kkkey.includes(subItem.key); // 过滤掉 key 在 kkkey 中的子元素
        });
      }
      return true; //其他保留
    });
    // 遍历 items 数组
    okk.data.result.dataList.forEach((data) => {
      data.bizData.items.forEach((item) => {
        item.rightIcon = null;
        item.bubbleText = null;
      });
    });
  } if (/cainiao\.adkeyword/.test($request.url)) {
    // 搜索框下方今日好物推荐
    okk.data.result.adHotKeywords = [];
  } if (/cainiao\.guoguo\.nbnetflow\.ads\.index\.cn/.test($request.url)) {
    // 底部商品推广
    okk.data.result = [];
  }
   $done({ body: JSON.stringify(okk) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
