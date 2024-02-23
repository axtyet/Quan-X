/******************************
🧚🏻‍♂️项目名称：央视频 
🧚🏻‍♂️脚本作者：ios151
🧚🏻‍♂️特别说明：解锁[电视]内会员 如果登录提示错误的话 手动屏蔽
🧚🏻‍♂️软件版本: 2.8.5 无需登录 2023.9.29
🧚🏻‍♂️注意事项：仅供学习 请勿传播售卖
***************************

[rewrite_local]

^http:\/\/playvv\.ysp\.cctv\.cn\/playvinfo\?.+$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/yangshipin.js
#如果登录提示错误的话 手动屏蔽下面这条302
&guid=\w+&app_version=([\d\.]+)&spadseg=(\d)&userid=(|\d+) url 302 &guid=f066be2cdf1c4f4893eb818de454313a&app_version=$1&spadseg=$2&vuserid=209027229
# 解锁[电视]内会员 如果登录提示错误的话 手动屏蔽下面这条
^https:\/\/liveinfo\.ysp\.cctv\.cn\/ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/yangshipin.js
#^https:\/\/m\.yangshipin\.cn\/static\/\w/\w+\/index\.html$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/yangshipin.js
# > 央视频 去广告 据说解锁1080 自测
^https?:\/\/cdn\.cmgadx\.com\/sdk\/pool\/.+\.json url reject-dict


[mitm]
hostname = playvv.ysp.cctv.cn, cdn.cmgadx.com

*******************************/
var version_='jsjiami.com.v7';function _0x5c68(_0x5b4934,_0xda8af7){const _0x19e504=_0x19e5();return _0x5c68=function(_0x5c6880,_0x473ebe){_0x5c6880=_0x5c6880-0x122;let _0x4bf980=_0x19e504[_0x5c6880];if(_0x5c68['kmKpHJ']===undefined){var _0x428d83=function(_0x3b296b){const _0x11f52b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2816fa='',_0xb882a3='';for(let _0x2d021a=0x0,_0x1e3443,_0x5ceb3c,_0x20adeb=0x0;_0x5ceb3c=_0x3b296b['charAt'](_0x20adeb++);~_0x5ceb3c&&(_0x1e3443=_0x2d021a%0x4?_0x1e3443*0x40+_0x5ceb3c:_0x5ceb3c,_0x2d021a++%0x4)?_0x2816fa+=String['fromCharCode'](0xff&_0x1e3443>>(-0x2*_0x2d021a&0x6)):0x0){_0x5ceb3c=_0x11f52b['indexOf'](_0x5ceb3c);}for(let _0x41ad20=0x0,_0xd98a47=_0x2816fa['length'];_0x41ad20<_0xd98a47;_0x41ad20++){_0xb882a3+='%'+('00'+_0x2816fa['charCodeAt'](_0x41ad20)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0xb882a3);};const _0x2eed27=function(_0x46a4f0,_0xc68562){let _0x4a0d82=[],_0x56c2ac=0x0,_0x17f939,_0x5623c5='';_0x46a4f0=_0x428d83(_0x46a4f0);let _0x2e11e1;for(_0x2e11e1=0x0;_0x2e11e1<0x100;_0x2e11e1++){_0x4a0d82[_0x2e11e1]=_0x2e11e1;}for(_0x2e11e1=0x0;_0x2e11e1<0x100;_0x2e11e1++){_0x56c2ac=(_0x56c2ac+_0x4a0d82[_0x2e11e1]+_0xc68562['charCodeAt'](_0x2e11e1%_0xc68562['length']))%0x100,_0x17f939=_0x4a0d82[_0x2e11e1],_0x4a0d82[_0x2e11e1]=_0x4a0d82[_0x56c2ac],_0x4a0d82[_0x56c2ac]=_0x17f939;}_0x2e11e1=0x0,_0x56c2ac=0x0;for(let _0x24e315=0x0;_0x24e315<_0x46a4f0['length'];_0x24e315++){_0x2e11e1=(_0x2e11e1+0x1)%0x100,_0x56c2ac=(_0x56c2ac+_0x4a0d82[_0x2e11e1])%0x100,_0x17f939=_0x4a0d82[_0x2e11e1],_0x4a0d82[_0x2e11e1]=_0x4a0d82[_0x56c2ac],_0x4a0d82[_0x56c2ac]=_0x17f939,_0x5623c5+=String['fromCharCode'](_0x46a4f0['charCodeAt'](_0x24e315)^_0x4a0d82[(_0x4a0d82[_0x2e11e1]+_0x4a0d82[_0x56c2ac])%0x100]);}return _0x5623c5;};_0x5c68['YXSWPm']=_0x2eed27,_0x5b4934=arguments,_0x5c68['kmKpHJ']=!![];}const _0x4beaac=_0x19e504[0x0],_0x50a219=_0x5c6880+_0x4beaac,_0x2d2ff1=_0x5b4934[_0x50a219];return!_0x2d2ff1?(_0x5c68['EgyqDy']===undefined&&(_0x5c68['EgyqDy']=!![]),_0x4bf980=_0x5c68['YXSWPm'](_0x4bf980,_0x473ebe),_0x5b4934[_0x50a219]=_0x4bf980):_0x4bf980=_0x2d2ff1,_0x4bf980;},_0x5c68(_0x5b4934,_0xda8af7);}const _0xa481ae=_0x5c68;(function(_0x2964dd,_0x4e10ee,_0x4340bb,_0x1ea1ed,_0x3ce946,_0x33d3a3,_0x136d02){return _0x2964dd=_0x2964dd>>0x8,_0x33d3a3='hs',_0x136d02='hs',function(_0x2a3f57,_0x4869d3,_0xcd27f1,_0x2c6f16,_0x9eca86){const _0x1da875=_0x5c68;_0x2c6f16='tfi',_0x33d3a3=_0x2c6f16+_0x33d3a3,_0x9eca86='up',_0x136d02+=_0x9eca86,_0x33d3a3=_0xcd27f1(_0x33d3a3),_0x136d02=_0xcd27f1(_0x136d02),_0xcd27f1=0x0;const _0x2f4679=_0x2a3f57();while(!![]&&--_0x1ea1ed+_0x4869d3){try{_0x2c6f16=parseInt(_0x1da875(0x12b,'g5OS'))/0x1+-parseInt(_0x1da875(0x12e,'@LwG'))/0x2+-parseInt(_0x1da875(0x122,'an#0'))/0x3*(parseInt(_0x1da875(0x126,'%80T'))/0x4)+-parseInt(_0x1da875(0x123,'lJjq'))/0x5*(parseInt(_0x1da875(0x12a,'ZL@u'))/0x6)+parseInt(_0x1da875(0x129,'%80T'))/0x7*(-parseInt(_0x1da875(0x125,'Q3&c'))/0x8)+-parseInt(_0x1da875(0x135,'I5Rf'))/0x9+-parseInt(_0x1da875(0x130,'PKUg'))/0xa*(-parseInt(_0x1da875(0x128,'Qv0o'))/0xb);}catch(_0x17ed42){_0x2c6f16=_0xcd27f1;}finally{_0x9eca86=_0x2f4679[_0x33d3a3]();if(_0x2964dd<=_0x1ea1ed)_0xcd27f1?_0x3ce946?_0x2c6f16=_0x9eca86:_0x3ce946=_0x9eca86:_0xcd27f1=_0x9eca86;else{if(_0xcd27f1==_0x3ce946['replace'](/[DWtPbxrIFHJdCpUwYEgSO=]/g,'')){if(_0x2c6f16===_0x4869d3){_0x2f4679['un'+_0x33d3a3](_0x9eca86);break;}_0x2f4679[_0x136d02](_0x9eca86);}}}}}(_0x4340bb,_0x4e10ee,function(_0x4247f0,_0x10157a,_0x156f52,_0x40c835,_0x2d17af,_0x3625ce,_0x30a2cc){return _0x10157a='\x73\x70\x6c\x69\x74',_0x4247f0=arguments[0x0],_0x4247f0=_0x4247f0[_0x10157a](''),_0x156f52='\x72\x65\x76\x65\x72\x73\x65',_0x4247f0=_0x4247f0[_0x156f52]('\x76'),_0x40c835='\x6a\x6f\x69\x6e',(0x1406f7,_0x4247f0[_0x40c835](''));});}(0xbd00,0x1f267,_0x19e5,0xbf),_0x19e5)&&(version_=_0x19e5);let headers=$request[_0xa481ae(0x12d,'YXkP')];function _0x19e5(){const _0x196dfb=(function(){return[version_,'DEOjCgsWwjgiFpxadmWit.YIcWUPorm.HvSW7bJr==','W5T5WRmif8koWPKhW5vsW6FdKa','rCk8WO5XF8k+fNlcPYu5WQ8','WPKQg8opxaaxW5e','rHmgWQFdRchcPci7','W6eXfSocW6FcMmkHW4m','zCovWRbxyqBcN8kLW7FcG8kqWOhcHa'].concat((function(){return['rHuoW5NcPrFcOG8eWR/dNq','jmoCaa1lWRxcI8oB','uKvFfmkyWPZdI2RdQ8ocW4e','tbemW5pcPN/cOJ8NWOddGvq','W4FcOxldV8k3W7KW','bColB8oVWPtdGSkaWRisW5xdSH4','WQ7dGmkGWOBcUI5lW5e','WROoWP7dNXCwWQGK'].concat((function(){return['nCkSWOmGBCkRlSoRWOjfva','WOCjW6pdNmksEfPrw8kpWPG','WQddT2uFW74Okmosew4','WR9ZbSocW7NcHmoyWRdcQbOQrSo+tLyOn8o+WRdcThnlWR7dM091rbODemoms0FdGConWPtcU8kkhGfeWPeqWQOIWRqBjSoNmmonW7r6WQBdSCoREmkHDCkZC8oYW7bRW6pdQCkZW4WDW4rIuCo5W7yNjSoJW6SUg8kjWPn4uh/cNSobW4pcPdlcKSkwvSk3W5LMigvNfgNcSbFcQmkRe8kiW6v5WOxcTSknWQyyoseDf8o0xwpcHNags8klWRFdQxy1WQ4rdLGdWQfGt8kFzh1Gf8oIadnzh8kjbH3cQ8ocWQ7dUCkNWOOgWQddLCo+W5XUWP9PpSoMAZZdJCo7W4/dOh5aW4GApXb7sL/dLmoaWPNdGxOeamkEBZZdTsfmW41+q0ldTL1fW4bbtCkUoCo9hvxcPcOtEmkcWQD5WPZcUuRdVSkMWOPevCkDoxldJclcIgZdOqZdLmotwHBdNCoTW6ZcQgVdNHNcHMJdLwDduwtdU8obW5PzoSk8shu+ACoJb23dPmo4WP0lW5S6lLhdIrtcPCkCxCkNWPyUfSkPbf0GlSo5W5RcLmkIoCoXi3xcVxNdSK08CWuZbNTeWPeTqmkvW4JdH8oeW47cLmkyW5NdIb/dMtCmW7DKW63dNwilWORdJKldOmoFAcOFW6RdNSkJwgldGHJcJKTKkq0cW6JdGrNcMeddLCkuWQKTW7RcGbFcGLNdV8kukCo4mwLPWOapWQddILOHA1GIB8oDgSorwcXXsZtcIamjlSkqu8ovWP4vAmkMlupcJmo6WOveW68dcmoqWP7dHf7dICk/WQaRdSkQWODOW7hdHMpcSSoIEGvxiKhdRvhdLSoPmSo9fZzrqmklW7qGpmkFqZNcIJHqWP8BW6ddGGlcSvOvAvdcS0v/fqZdRCotW4fvoSotb3BdUwLaWQXvqCkOn2vDW75gyJpcM2dcPCkQW48xcteoW7ftWPGxCSkvWQtcLcddJ2VcHvXeD8ogaCkzW6OgvCo4u8kpWRpcTvSOWOHrWO0okCo9xGb8WQBdT8kYW7pdISkgwbqNy1pdQLXMWQxdGICvWOlcH8kHWQFcQfSzW5VcQ8k7WOvWqa3dNZ3cSbxdHSk2W5xcKeJdImocWR3dNfvtyuRdUtVdNCk9WOVcL17dI8kcdLmBWP/cRWWvWQBdH8ojWPRdOZPdW40oWODHWRvnW5FcKCoHW67dVIRcOINcH8kHnYNcKYhcGCo4W6raWQhdNJ/dM8kAWRpdRmoGW6FdH8oCWPWsWQiwdmkoWR9LWRNcQComC3uuWOJdSSkaWP0KW5BdHmojdI8fg8oph34VchPvWPFcV2CWWQ3dG8oQqSoQW4JcHCoNx8kAW4hdJmojWP3dQH5nBSocWQpdUZmhACoAW5aCWOVcR8oXW6xdVCkBWPixWRWVhY7cTK/dG8oPW6GHEmkczmoeW6KsWONcI8khW4hcI0lcVCoFFM3dKsldLmk1lmoeWRJcS8kZWRldT8k4kSkvW5aeWQaBWRqZESoxqXezWOWVqmo2jCo4WReMWROWWQ0ZWR7dT8ohyKhcR8kVWRhdVfyniuRcVW/cU2xdPCkeWO5LoCkVW6flC8kIWQ/dUCohbb0urSkQWOxdS2NdMCk7WPKUWOpcR8kutmk5W4jxw8kzW7HiW4imjgFcP8o9W75KW5TeW7jrWQXtW6VcVgz7s0tcUCodWOrquCkrW6G+WPddI8kxWRHsWRbSWONcVwBcGSkjoSkVhSouW5tdT8k9WRBdMez4qKOHW7uoD8kHDITcWQWrf8oRqHb0tGVcPsZcLmkkqmolWPJdTZKWWQBcPqrOWRVdKSo/BmomoN5Za8orW4a5uGddVCkNWPKlhqHCWPL3sLNcP8kgW6LrWP03rCoTWPRcOHBdNHvOlIW6nM7cUZO5iCogxer/dSkGW6uSW6rtWQHLW7dcU8osWPPjWOrobXhdGmkAW6hdK8ofd2DDCSk+brpcOSkfWQDgiGv7WQzrW6VdMgBdQSkdm8odWOhdTmkFWRboW6fWWOBcJmowfxH8xZuqW4G1WRjQACkFW4lcPNn2WO4aWRGZlYDrWOddImokW6GqWPaNmqTeWRxcNfjLWQjFAgbzW6KSgSoqWQvRWRZdUaezse0+pCk+jmkHWQ3cQSkAW5tcSxjOWPVdHmkHhSkDiCodweRcIe7cGgJcK8kvW5XxsmoxW6hcHge','W5pdNSkUgSo3W6JdTSoHu8k5hwO','kgVcJmolWOPzW4HU','WPJdTLVdMmoOW6lcJ8kcW45T'];}()));}()));}());_0x19e5=function(){return _0x196dfb;};return _0x19e5();};headers['Cookie']=_0xa481ae(0x134,'hu!a'),$done({'headers':headers});var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
