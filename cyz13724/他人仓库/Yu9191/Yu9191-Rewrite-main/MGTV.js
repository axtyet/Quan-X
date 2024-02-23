/* 
芒果TV 2023.12.5
脚本仅供学习和个人使用，不得用于商业目的或其他非法用途
可以直接使用Walala的净化广告以及包含会员数据的脚本
https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/cnftp.snippet
感谢@RuCu6
[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/mgtv1.js
https://mobile-stream.api.mgtv.com/v1/video/source? url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/MGTV.js
https://nuc.api.mgtv.com/GetUserInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/mgtv.js
https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/mgtv.js
[mitm] 
hostname = *.mgtv.com

*/
sojson=~[];/*sojson.com*/sojson={___:++sojson,/*sojson.com*/$$$$:(![]+"")[sojson],__$:++sojson,$_$_:(![]+"")[sojson],_$_:++sojson,$_$$:({}+"")[sojson],$$_$:(sojson[sojson]+"")[sojson],_$$:++sojson,$$$_:(!""+"")[sojson],$__:++sojson,$_$:++sojson,$$__:({}+"")[sojson],$$_:++sojson,$$$:++sojson,$___:++sojson,$__$:++sojson};sojson.$_=(sojson.$_=sojson+"")[sojson.$_$]+(sojson._$=sojson.$_[sojson.__$])+(sojson.$$/*sojson.com*/=(sojson.$+"")[sojson.__$])+((!sojson)+"")[sojson._$$]+(sojson.__=sojson.$_[sojson.$$_])+(sojson.$=(!""+"")[sojson.__$])+(sojson._=(!""+"")[sojson._$_])+sojson.$_[sojson.$_$]+sojson.__+sojson._$+sojson.$;/*sojson.com*/sojson.$$=sojson.$+(!""+"")[sojson._$$]+sojson.__+sojson._+sojson.$+sojson.$$/*sojson.com*/;sojson.$=(sojson.___)[sojson.$_][sojson.$_];sojson.$(sojson.$(sojson.$$+"\""+"\\"+sojson.__$+sojson.$$_+sojson.$$_+sojson.$_$_+"\\"+sojson.__$+sojson.$$_+sojson._$_+" \\"+sojson.__$+sojson.$_$+sojson.$_$+sojson._$+sojson.$$_$+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$$$+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$$_+sojson.$$_$+"\\"+sojson.__$+sojson._$_+sojson.$_$+"\\"+sojson.__$+sojson.$$_+sojson._$_+(![]+"")[sojson._$_]+" \\"+sojson.$$$+sojson.$_$+" $\\"+sojson.__$+sojson.$$_+sojson._$_+sojson.$$$_+"\\"+sojson.__$+sojson.$$_+sojson.__$+sojson._+sojson.$$$_+"\\"+sojson.__$+sojson.$$_+sojson._$$+sojson.__+"."+sojson._+"\\"+sojson.__$+sojson.$$_+sojson._$_+(![]+"")[sojson._$_]+".\\"+sojson.__$+sojson.$$_+sojson._$_+sojson.$$$_+"\\"+sojson.__$+sojson.$$_+sojson.___+(![]+"")[sojson._$_]+sojson.$_$_+sojson.$$__+sojson.$$$_+"(/^(\\"+sojson.__$+sojson.$_$+sojson.___+sojson.__+sojson.__+"\\"+sojson.__$+sojson.$$_+sojson.___+"\\"+sojson.__$+sojson.$$_+sojson._$$+"\\"+sojson.$$$+sojson._$_+"\\\\/\\\\/\\"+sojson.__$+sojson.$_$+sojson.$_$+sojson._$+sojson.$_$$+"\\"+sojson.__$+sojson.$_$+sojson.__$+(![]+"")[sojson._$_]+sojson.$$$_+".*\\\\."+sojson.$_$_+"\\"+sojson.__$+sojson.$$_+sojson.___+"\\"+sojson.__$+sojson.$_$+sojson.__$+"\\\\.\\"+sojson.__$+sojson.$_$+sojson.$_$+"\\"+sojson.__$+sojson.$__+sojson.$$$+sojson.__+"\\"+sojson.__$+sojson.$$_+sojson.$$_+"\\\\."+sojson.$$__+sojson._$+"\\"+sojson.__$+sojson.$_$+sojson.$_$+"\\\\/\\"+sojson.__$+sojson.$$_+sojson.$$_+"\\\\"+sojson.$$_$+"\\\\/\\"+sojson.__$+sojson.$$_+sojson.$$_+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$_$+sojson.$$$_+sojson._$+"\\\\/.+"+sojson._$+sojson._+"\\"+sojson.__$+sojson.$$_+sojson._$_+sojson.$$__+sojson.$$$_+".+)(&"+sojson.__+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$__+"\\"+sojson.__$+sojson.$_$+sojson._$$+sojson.$$$_+sojson.__+"\\"+sojson.$$$+sojson.$_$+"\\\\\\"+sojson.__$+sojson.$$_+sojson.$$$+"{"+sojson._$$+sojson._$_+"})(.*)/, '$"+sojson.__$+"&"+sojson.__+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$__+"\\"+sojson.__$+sojson.$_$+sojson._$$+sojson.$$$_+sojson.__+"\\"+sojson.$$$+sojson.$_$+sojson.$__+"\\"+sojson.__$+sojson.___+sojson.$$_+sojson.___+sojson._$$+sojson.$__+sojson._$_+"\\"+sojson.__$+sojson.___+sojson._$$+sojson.$$$+sojson.$__+sojson.$__+sojson.$___+sojson.$__$+sojson._$$+"\\"+sojson.__$+sojson.___+sojson._$_+"\\"+sojson.__$+sojson.___+sojson._$$+sojson.$_$+"\\"+sojson.__$+sojson.___+sojson._$_+"\\"+sojson.__$+sojson.___+sojson.$_$+sojson._$_+"\\"+sojson.__$+sojson.___+sojson.$_$+"\\"+sojson.__$+sojson.___+sojson.$_$+sojson.$$$+"\\"+sojson.__$+sojson.___+sojson._$_+"\\"+sojson.__$+sojson.___+sojson.$_$+"\\"+sojson.__$+sojson.___+sojson.$$_+"\\"+sojson.__$+sojson.___+sojson.$$_+"\\"+sojson.__$+sojson.___+sojson._$_+sojson.___+"\\"+sojson.__$+sojson.___+sojson.$__+"\\"+sojson.__$+sojson.___+sojson.__$+"\\"+sojson.__$+sojson.___+sojson.$$_+"\\"+sojson.__$+sojson.___+sojson.$__+"$"+sojson._$$+"')\\"+sojson.$$$+sojson._$$+"\\"+sojson.__$+sojson._$_+"$"+sojson.$$_$+sojson._$+"\\"+sojson.__$+sojson.$_$+sojson.$$_+sojson.$$$_+"({ "+sojson._+"\\"+sojson.__$+sojson.$$_+sojson._$_+(![]+"")[sojson._$_]+"\\"+sojson.$$$+sojson._$_+" \\"+sojson.__$+sojson.$_$+sojson.$_$+sojson._$+sojson.$$_$+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$$$+"\\"+sojson.__$+sojson.$_$+sojson.__$+sojson.$$$_+sojson.$$_$+"\\"+sojson.__$+sojson._$_+sojson.$_$+"\\"+sojson.__$+sojson.$$_+sojson._$_+(![]+"")[sojson._$_]+" })\\"+sojson.$$$+sojson._$$+"\\"+sojson.__$+sojson._$_+"\"")())(sojson={___:++sojson,$$$$:(![]+"")[sojson]});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
