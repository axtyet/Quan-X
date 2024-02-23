$input.text({
  type: $kbType.text,
  placeholder: $clipboard.text,
  handler: function (item) {
    if (item.length == 0) {
      item = $clipboard.text;
    }
    var text = item.replace(/\s/g, "");
    var totalCount = text.length;
    var checkReg = /^[a-zA-Z()]+$/;
    if (checkReg.test(text) == false) {
      $ui.alert({
        title: "氨基酸判断",
        message: "内容为空或输入非氨基酸序列"
      });
    } else {
      var acidCount = 0;
      var baseCount = 0;
      var aminoacid = "";
      var acidReg = /(D|E)/;
      var baseReg = /(R|K|H)/;
      for (var i = 0; i < text.length; ++i) {
        var character = text.charAt(i);
        if (acidReg.test(character)) {
          ++acidCount;
        }
        if (baseReg.test(character)) {
          ++baseCount;
        }
        var num = baseCount - acidCount;
        if (num > 0) {
          aminoacid = "氨基比羧基多：" + num + "个";
        } else {
          aminoacid = "羧基比氨基多：" + -num + "个";
        }
      }
      var message = "";
      message += "氨基酸总计: " + totalCount + "个\n";
      message += "酸性氨基酸: " + acidCount + "个\n";
      message += "碱性氨基酸: " + baseCount + "个\n";
      message += aminoacid;
      $ui.alert({
        title: "氨基酸判断",
        message: message
      });
    }
  }
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
