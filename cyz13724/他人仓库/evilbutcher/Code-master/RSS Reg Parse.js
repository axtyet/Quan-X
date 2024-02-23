function parsehtmlrss(str, title, items, urls, covers) {
  var text = JSON.stringify(str);
  //title表达式
  var alltitle = /channel\>(\\\S.*?|)\<title\>(\<\!\[CDATA\[.*?\]|.*?)\>/;
  //括号表达式
  var getbracket = /CDATA\[.*?]/;
  //箭头表达式
  var getarrow = /title\>.*?\</;
  //获取title
  var pretitle = text.match(alltitle);
  //检测括号
  var kuotitle = pretitle[0].match(getbracket);
  //检测箭头
  var jiantitle = pretitle[0].match(getarrow);
  title.splice(0);
  if (kuotitle != null) {
    title.push(kuotitle[0].slice(6, -1));
  } else {
    title.push(jiantitle[0].slice(6, -1));
  }
  //item表达式
  var content = /item\>.*?\<\/item/g;
  var detail = text.match(content);
  for (var i = 0; i < detail.length; i++) {
    //subtitle表达式
    var subtitle = /title\>(\<\!\[CDATA\[.*?\]|.*?)\>\</;
    //description表达式
    var allwords = /description\>(\<\!\[CDATA\[.*?\]|\S.*?)\>\</;
    //openurl的link表达式
    var allurls = /link\>http.*?\</;
    //mediaurl的link表达式
    var allcovers = /img src=(\\\"|\S).*?(jpg|png|&#34)/;
    //筛选http
    var getcovers = /http.*?(jpg|png|&#34)/;
    //获取subtitle
    var presubtitle = detail[i].match(subtitle);
    if (presubtitle != null) {
      //检测括号
      var postsubtitle = presubtitle[0].match(getbracket);
      if (postsubtitle != null) {
        var finalsubtitle = postsubtitle[0].slice(6, -1);
      } else {
        finalsubtitle = presubtitle[0].slice(6, -9);
      }
      //获取description
      var prewords = detail[i].match(allwords);
      //检测括号
      var postwords = prewords[0].match(getbracket);
      if (postwords != null) {
        var getwords = postwords[0].slice(6, -1);
      } else {
        getwords = "未获取";
      }
      var finalwords = getwords
        .replace(new RegExp(/\\n/, "gm"), "")
        .replace(new RegExp(/\<.*?\>/, "gm"), "");
      if (finalwords.length != 0) {
        var item = finalsubtitle + "\n🔍详情  " + finalwords;
        items.push(item);
      } else {
        var item = finalsubtitle + "\n🔍详情  暂无";
        items.push(item);
      }
      var preurls = detail[i].match(allurls);
      var posturls = preurls[0].slice(5, -1);
      urls.push(posturls);
      var precovers = detail[i].match(allcovers);
      if (precovers != null) {
        var postcovers = precovers[0].match(getcovers);
        covers.push(postcovers[0]);
      } else {
        covers.push(
          "https://raw.githubusercontent.com/58xinian/icon/master/hot.png"
        );
      }
    } else {
      continue;
    }
  }
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
