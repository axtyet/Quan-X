//感谢微博@卜卜口提供API，感谢我的朋友LMW和YQJ提供帮助，我很小白，脚本很简单，但写了好久（捂脸）。人生中利用JSBox写下的第一个脚本哈哈哈哈哈！果然有需求才是学习的第一动力～
var W = $clipboard.text

    $http.request({
     method: "POST",
     url: "https://lab.magiconch.com/api/nbnhhsh/guess",
     header:{
       Host: "lab.magiconch.com"
     },
     body: {
       text: W,
     },
     handler: function(resp) {
       var data = resp.data
       var value = data[0].trans
       $push.schedule({
         title:"您所查询的"+W+"意思为",
         body: value
       })
     }
   })


//var Search = new RegExp(/[\u4e00-\u9fa5/]+/)
//    var str=JSON.stringify(data)
//    console.log(str)
//    const newstr = str.replace(new RegExp("\",\"","gm")," ")
//    console.log(newstr)
//    var w = Search.exec(newstr)
//    console.log(w)











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
