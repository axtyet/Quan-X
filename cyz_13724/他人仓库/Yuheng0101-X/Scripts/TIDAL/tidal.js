/******************************************
 * @name 𝐓𝐢𝐝𝐚𝐥
 * @channel https://t.me/yqc_123
 * @feedback https://t.me/yqc_777
 * @version 1.0.1
******************************************
## 脚本注明

    1. 本脚本仅供学习交流，禁止用于商业用途，违者后果自负。
    2. 转载脚本请注明来源，欢迎分享，拒绝倒卖，倒卖🐕必死🐎。
    3. 欢迎对本仓库(https://github.com/Yuheng0101/X)Star✅，但请不要Fork❌。

## 更新日志

### 20231103

    修复部分用户无法解锁的问题

### 20231031

    兼容Surge、Loon、Quantumult X等平台

## 脚本描述

    解锁 HiFi Plus 权限

## 使用方法

[Quantumult X](https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/TIDAL/tidal.snippet)

[Surge](https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/TIDAL/tidal.sgmodule)

[Loon](https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/TIDAL/tidal.plugin)

## 下载地址

    https://apps.apple.com/us/app/tidal-music-hifi-ad-free/id913943275

******************************************/
const $ = new Env(`𝐓𝐢𝐝𝐚𝐥`)
const isRequest = typeof $request != 'undefined'
const qs = $.isNode() ? require('querystring') : new querystring()
/*
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v7 ，更新了加密算法，缩减了体积;
 * 另外 jsjiami.com.v7 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v7 不能去掉，其他都没有任何绑定。
 * 誓死不会加入任何后门，JsJiami.com 加密的使命就是为了保护你们的Javascript 。
 */
var version_='jsjiami.com.v7';const _0x1278c9=_0x6eed;(function(_0x280734,_0x51541d,_0x5afbde,_0x11d33c,_0x21a84b,_0x148c98,_0x3b6f27){return _0x280734=_0x280734>>0x5,_0x148c98='hs',_0x3b6f27='hs',function(_0x5ee8cc,_0x253211,_0x55c39b,_0x1a8491,_0x3d92eb){const _0x30978c=_0x6eed;_0x1a8491='tfi',_0x148c98=_0x1a8491+_0x148c98,_0x3d92eb='up',_0x3b6f27+=_0x3d92eb,_0x148c98=_0x55c39b(_0x148c98),_0x3b6f27=_0x55c39b(_0x3b6f27),_0x55c39b=0x0;const _0x4d3cf9=_0x5ee8cc();while(!![]&&--_0x11d33c+_0x253211){try{_0x1a8491=-parseInt(_0x30978c(0x1b8,'resB'))/0x1*(-parseInt(_0x30978c(0x1a5,'i*rC'))/0x2)+parseInt(_0x30978c(0x1d7,'uH3O'))/0x3+parseInt(_0x30978c(0x1bb,'kJih'))/0x4*(-parseInt(_0x30978c(0x1de,'e5BL'))/0x5)+parseInt(_0x30978c(0x1aa,')8gC'))/0x6*(parseInt(_0x30978c(0x1d2,'m#(%'))/0x7)+parseInt(_0x30978c(0x1ce,'e5BL'))/0x8*(-parseInt(_0x30978c(0x1a7,'e5BL'))/0x9)+-parseInt(_0x30978c(0x1da,'SkW#'))/0xa+-parseInt(_0x30978c(0x1e0,'ObjX'))/0xb*(-parseInt(_0x30978c(0x1c0,'IBQp'))/0xc);}catch(_0x459d7c){_0x1a8491=_0x55c39b;}finally{_0x3d92eb=_0x4d3cf9[_0x148c98]();if(_0x280734<=_0x11d33c)_0x55c39b?_0x21a84b?_0x1a8491=_0x3d92eb:_0x21a84b=_0x3d92eb:_0x55c39b=_0x3d92eb;else{if(_0x55c39b==_0x21a84b['replace'](/[UhHYDPkTQqnFJEGdSALIMKb=]/g,'')){if(_0x1a8491===_0x253211){_0x4d3cf9['un'+_0x148c98](_0x3d92eb);break;}_0x4d3cf9[_0x3b6f27](_0x3d92eb);}}}}}(_0x5afbde,_0x51541d,function(_0x155155,_0x537354,_0x3864f1,_0x3cd5aa,_0xe6cd0a,_0x441671,_0x45deb4){return _0x537354='\x73\x70\x6c\x69\x74',_0x155155=arguments[0x0],_0x155155=_0x155155[_0x537354](''),_0x3864f1='\x72\x65\x76\x65\x72\x73\x65',_0x155155=_0x155155[_0x3864f1]('\x76'),_0x3cd5aa='\x6a\x6f\x69\x6e',(0x145ddb,_0x155155[_0x3cd5aa](''));});}(0x1860,0x7a30f,_0xeb1b,0xc5),_0xeb1b)&&(version_=_0x1278c9(0x1b7,'pf&k'));async function Main(){const _0x5556a5=_0x1278c9,_0x5336a1={'RsqFw':'audioquality=HI_RES&','ScXYW':_0x5556a5(0x1b9,'LjoE'),'TwlLu':_0x5556a5(0x1b5,'])!j'),'tDTqi':_0x5556a5(0x1e5,'8rMP'),'GRLyu':function(_0x447978,_0xb64645){return _0x447978&&_0xb64645;},'AnqaZ':'https://auth.tidal.com/v1/oauth2/token?countryCode=GB&deviceType=PHONE&locale=en','ZegVP':_0x5556a5(0x1c2,'uH3O'),'mWPiT':_0x5556a5(0x1cf,'QXP3'),'hKIlM':_0x5556a5(0x1b1,'GZPF'),'jQjIJ':'ios','FoFab':function(_0x4660db,_0x4f2895){return _0x4660db(_0x4f2895);},'EveaP':'TidalRauth','OVExi':function(_0x1b25c5){return _0x1b25c5();},'wxCQP':function(_0x52b383){return _0x52b383();},'YgIyB':function(_0xc00ea5,_0x3b32d9){return _0xc00ea5==_0x3b32d9;},'vdeac':'✅请求成功','ZEajT':function(_0x12125f,_0x31976e){return _0x12125f===_0x31976e;},'fDMsW':'❗️\x20Token失效,\x20重新登录ing~','UDofJ':function(_0x501738){return _0x501738();},'EEmJa':_0x5556a5(0x1dc,'y^uG'),'gJSQo':_0x5556a5(0x1c6,'m#(%')},_0x18caa9=async()=>{const _0x24ffc6=_0x5556a5,_0x370a5={'url':$request[_0x24ffc6(0x1ae,'i*rC')]['replace'](/audioquality=.*?&/,_0x5336a1[_0x24ffc6(0x1ac,'m#(%')]),'method':_0x5336a1[_0x24ffc6(0x1be,'2]OO')],'headers':{'Host':_0x5336a1[_0x24ffc6(0x1e7,'pf&k')],'Authorization':tidalToken,'X-Tidal-Token':X_TIDAL_TOKEN,'User-Agent':_0x5336a1[_0x24ffc6(0x1d5,'1y&h')]}};try{const _0x31f929=await Request(_0x370a5),{status:_0x8eaaa2,audioQuality:_0x149679,subStatus:_0x5093ed,userMessage:_0x1467d5}=_0x31f929;return _0x5336a1['GRLyu'](!_0x8eaaa2,_0x149679)?{'code':0xc8,'data':_0x31f929,'success':!0x0}:{'code':_0x5093ed,'message':codeTextMap[_0x5093ed]||_0x1467d5,'success':!0x1};}catch(_0x4d7cf8){throw _0x4d7cf8;}},_0x3a9c09=async()=>{const _0x33f894=_0x5556a5,_0x2664ad={'url':_0x5336a1[_0x33f894(0x19a,'*vkD')],'method':_0x5336a1[_0x33f894(0x1a4,'WC#g')],'headers':{'User-Agent':_0x33f894(0x1d4,'m#(%'),'Authorization':TIDAL_AUTH,'X-Tidal-Token':X_TIDAL_TOKEN},'body':qs[_0x33f894(0x1d6,'&g7h')]({'client_id':'1MV2MrP38hSCPnzi','scope':_0x5336a1[_0x33f894(0x1b3,'BKSr')],'grant_type':_0x33f894(0x1d3,'D9zy'),'refresh_token':TIDAL_REFRESH_TOKEN,'client_secret':_0x5336a1['hKIlM'],'appMode':_0x5336a1[_0x33f894(0x1d9,'83p3')]})};try{const _0xb5d9b3=await _0x5336a1['FoFab'](Request,_0x2664ad),{access_token:_0x313e43,token_type:_0x34462c}=_0xb5d9b3;if(!_0x313e43)throw _0x33f894(0x1dd,')8gC');tidalToken=_0x34462c+'\x20'+_0x313e43,console[_0x33f894(0x1e2,'qC1T')](_0x33f894(0x1b6,'SkW#')),$[_0x33f894(0x1a8,'8rMP')](tidalToken,_0x5336a1[_0x33f894(0x1e8,'kJih')]);}catch(_0x6039df){throw _0x6039df;}};!tidalToken&&await _0x5336a1[_0x5556a5(0x1af,'qC1T')](_0x3a9c09);const {code:_0xb86fe4,data:_0x37fa3a,message:_0x5496bd}=await _0x5336a1[_0x5556a5(0x19f,'uH3O')](_0x18caa9);if(_0x5336a1[_0x5556a5(0x1b2,'D9zy')](0xc8,_0xb86fe4))console[_0x5556a5(0x1c9,'D9zy')](_0x5336a1['vdeac']),response=_0x37fa3a;else{if(_0x5336a1[_0x5556a5(0x19c,'WC#g')](0x2afb,_0xb86fe4)){console[_0x5556a5(0x1a0,'8rMP')](_0x5336a1[_0x5556a5(0x19e,'8rMP')]),await _0x3a9c09();const {success:_0x42b51c,data:_0x16955a,message:_0x47ecc6}=await _0x5336a1[_0x5556a5(0x1db,'WC#g')](_0x18caa9);console[_0x5556a5(0x1a3,'BKSr')](_0x5336a1[_0x5556a5(0x1cc,'BKSr')]),!_0x42b51c&&$[_0x5556a5(0x1bd,'SkW#')]($['name'],_0x47ecc6,_0x5336a1[_0x5556a5(0x1d8,'ObjX')],_0x5336a1[_0x5556a5(0x1e3,'2]OO')]),response=_0x16955a;}else $['msg']($[_0x5556a5(0x1b0,'Ih6N')],_0x5496bd,_0x5556a5(0x1e6,'3Xll'),_0x5556a5(0x1ab,'WC#g'));}}const codeTextMap={0x2afb:_0x1278c9(0x1bc,')baK'),0x138b:'Tidal账号过期!'},X_TIDAL_TOKEN='1MV2MrP38hSCPnzi',TIDAL_AUTH='Bearer\x20eyJraWQiOiJ2OU1GbFhqWSIsImFsZyI6IkVTMjU2In0.eyJ0eXBlIjoibzJfYWNjZXNzIiwidWlkIjoxOTUxNDI4NTUsInNjb3BlIjoid19zdWIgcl91c3Igd191c3IiLCJnVmVyIjowLCJzVmVyIjowLCJjaWQiOjY3OTgsImN1ayI6IkQ2MTYyOEFFLUVGNjktNEE2Ri1BRUVGLUE4M0UwMDMyODU2RCIsImV4cCI6MTY5OTM0OTA4Niwic2lkIjoiODlmYTkyZjQtZjNhOC00MDY0LWE4YzktZjk1NjRlZWUzYzRhIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnRpZGFsLmNvbS92MSJ9.c9fuP6jSDDfO7NENXbE7ie1gJkNbeH_JAko0oi08Z9C6epBksYQMCgrYaHfLX9bRDrVtRnsBshJjuIRxtQWb9A',TIDAL_REFRESH_TOKEN=_0x1278c9(0x1cb,'IBQp');function _0xeb1b(){const _0x389532=(function(){return[version_,'hkjsSnjidMamqiP.GUScDoHkEmb.LJdvY7QIFTKA==','lKydW699W5DaAuy','WPBcJ8oVhCkoW6hdKSoOFW/dN8oT','WQ4tWQlcGbe','DNeTWPOz','WOFdVsuIWQnAbuHRW6FcHSkjgq','WP7dKmkabWS','5Bw45AwZ5PAAWQ4w5yw15RkH6Age6yofbCkclCoMW5b6W79Zj1NcIh9mWRhcKmofAmoKuCkiW4pcVEImL+wmNoAFTEAvGoIgOEACPW','6i6b5y+bW7TYWOjypSkfD8oYW5rzWRWY5AwF6lEm','W6OwW7VdItOdxfm','WPxcImoVh8klW6xcVCoVqJVdOCo4cG','W5nKW7RcItHXWRLAsa','WO3cU07cPmoKW5/dQqNdGW','Dqe4','tXpcIcez','W4empCoFCq','vxedzSkTWRbrWRtcP8koW6ZdPmoYz3BcKSouytxdIrFcImkFwaZdImkNbWC4meVdTCkFpH/dNcvO','5BsU5AsN5PwjpMRLHzpMSAdPOjBPGjNdKmkyWQ7cMJPYW6dcTaqDW7Huh8khWRaGlGBcKCk9ymks6iY75y2R5P2Z5PEE6isJ5P2E','W5BdNc7dVNC','WPT2nLKY','W4hdNHmSdW','W77cOCozfcVcQWqudW','WPhdKCkocXu','W7XkdtRcGq','z3Wkvmk2','W5tdGCkvFSoU','BvCG'].concat((function(){return['hSk5WQ4QkwH7','v3WBWR0mWRNdKCoECmoNn38','W7Gsfa','WPhdSCkinXe','WQv2W7RcTSoVWOlcNMHR','l1XOWQuoaCoEW6FdNG','W6KuWOFcLxLzug7cK8kiqIi','CL0Zq8kaW6Sf','CIieW6foWOfugb0','ah/dKepcHwGd','WQpdOmkBetldSKzretVdUCoRWO58DSolWODtx8o2','hmoXW5VdPCkq','WRml6zwG6k62W4G','W6uXWQa','vJGAWPCU','WOldKmo8W7S','W77dPJpdV8oWW5dcLatdU8kEuSkSkGhdOL7dL3z5W67cNmowDapcKYWvW6NcGLdcHCkIDbubWOq3xmkYW7ZcKc3dSCoH','wmoLW7ZcPb4','W7KQi8oYsa','wCoOW7ldV8kmWQuT','f8kSWQzGohnSjI1ZW5RdNSkB','4P605yUZ5PALzmo/dvrMu8oQWOtcLJZMI6lLIyu','W6JdMcJdM2pdGdBcM8oMW6xdUCk1WOuq','uhODW4v9W47dT8oauW','k8kwDq','W4RdKI/dRmkDW4XCWQhdQCkFnCoz','W6GWAWTwW4RdUNXCW7VdGCk0','WRSGW7uXa+wpHEAxNoI/J+AEKCoq'].concat((function(){return['W5ZcT3i','EZRcGYKH','WRJcGLCohwVdNmk8WQy','WORcVuSzW4ddSmkCkNldRCoIWQS','WPdcHmoT4P+u5Q6c5lQS5Q2K5lI+W4ddTahdRW','W7pdTSkfEW','WPVdUHZdRLdcJ8ky','n0eBW69YW51aivZcO8oXFWuR','W5tcSCoFAxm','jSo2W57dK8kuWR8HhmoJW5ddRvNdTmkSdCobgSkxWQhdLW','amk8rG','WRWQWPJdKfjtbW','BCoTW5i','WP/dVCklac3cMGGlex0','W57dSdbzWPNcN8kUd3ddOmoKWOe9oIldHwhdOq4iW5hcTvj0WQTTBJNdMMfDWQZcN8oFimkZCtTnWPaTi8kMWR3cHxZcUmkIaCkMWRxcUWLMWO3dTtqSCaFdO8kxW5JdMCoMhx/cMmkrW45LACkczCoBAv3dQSkIW7TSn8o8ECo8WQeyshWDEaDsCCojaZ5/ACkHffrhWPCCW5fdvanwnKBdTSkFWQVcPSkoW5qODCoJy8k7W60ZW4ygWQW+FK7dTCo2WQRcGmkSdmoOp8kWgCoQW61uWP5Nc8onu8kOWQRdPCkmbxRdIczUWRpcLSkzWP7cPrrkW5JcHmk0FCk2cCoamtrBW55xWPrVW5VdVSkAh8o/W7veWRhcISo4W4tdU8kPWQ97W6bfW6pcV3KfW63dSmoBhCkgwsnAWRpcTJZdG15SsbWJxsJdUSklbcu1W7BcVmouWQJdKCofcCkAWRDLW5i9DCk4urlcVCk3W7afW4pdTCo4W5/cIxDOFCoOmaZcV8oOlhWWWPi4W7lcSYvKBrhdNLOzWQdcHwxdP8oav8oqwSokWQ/cN8kvWRxdPIVcIHSnWPefW4JcQNRdS3dcGrbIWQi0WRNdNCo+W5DEoSo9sdjbwdZdVLtdKSosW7HwtmkDW4tcQ8kEofddScX0qCoLWPZcR8k4xCkWAcfkhSk4a0tcPGxdKmkYWOdcGhFcL8oeW6RcGghdSG3cOmoJgaKmcJDaWQzwWOy7WOpdGL3cHmoxW50asmoGdSk2EaFcKvVdJmkUF8oRxCkOcwr5vwBcKbrlWODNW47cGXJcT8kjw8o+v1VdGSo6wmo9imkmW5HEymoctCksW45sfSouaw7cTSkbW5JcPSoFWQ8SueTDt8kPpmodz2NcKwBcV1hcQqvVW4Pp','W6izfSo6FW','WRDZaK0dWPZdJW','W6OrWO3dIc4ku3BcUq','ts5BW6OZnMC1W6RcP8kPWQLDd8kzgmoM','ztKyW60','rdBcVa','EmkZWPpcK8osWRm3umoAWO/dPK/cIa','C8oNW5pcRZLiDuODrCkRcwu','gSolW67dOSkRWQO7a8kUW4/cOh/cNCkBgCowmSojW6hcJ3FdKCkewSoOWOjzW4VdQmkLWPddV8kgsvZcUd0uia','WR93tmk1WOi'];}()));}()));}());_0xeb1b=function(){return _0x389532;};return _0xeb1b();}function _0x6eed(_0x19036d,_0x5c33af){const _0xeb1bd5=_0xeb1b();return _0x6eed=function(_0x6eed11,_0x5d1977){_0x6eed11=_0x6eed11-0x19a;let _0x1a9aef=_0xeb1bd5[_0x6eed11];if(_0x6eed['yFeYZS']===undefined){var _0x1152ad=function(_0x21c42e){const _0x241dd9='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2912db='',_0x211854='';for(let _0xc81f73=0x0,_0x4ac5b4,_0x41f598,_0x20aa13=0x0;_0x41f598=_0x21c42e['charAt'](_0x20aa13++);~_0x41f598&&(_0x4ac5b4=_0xc81f73%0x4?_0x4ac5b4*0x40+_0x41f598:_0x41f598,_0xc81f73++%0x4)?_0x2912db+=String['fromCharCode'](0xff&_0x4ac5b4>>(-0x2*_0xc81f73&0x6)):0x0){_0x41f598=_0x241dd9['indexOf'](_0x41f598);}for(let _0x481c1d=0x0,_0x543596=_0x2912db['length'];_0x481c1d<_0x543596;_0x481c1d++){_0x211854+='%'+('00'+_0x2912db['charCodeAt'](_0x481c1d)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x211854);};const _0x575988=function(_0x1c0427,_0x415de2){let _0x204de1=[],_0x129557=0x0,_0x147340,_0x4b2045='';_0x1c0427=_0x1152ad(_0x1c0427);let _0x2c84e1;for(_0x2c84e1=0x0;_0x2c84e1<0x100;_0x2c84e1++){_0x204de1[_0x2c84e1]=_0x2c84e1;}for(_0x2c84e1=0x0;_0x2c84e1<0x100;_0x2c84e1++){_0x129557=(_0x129557+_0x204de1[_0x2c84e1]+_0x415de2['charCodeAt'](_0x2c84e1%_0x415de2['length']))%0x100,_0x147340=_0x204de1[_0x2c84e1],_0x204de1[_0x2c84e1]=_0x204de1[_0x129557],_0x204de1[_0x129557]=_0x147340;}_0x2c84e1=0x0,_0x129557=0x0;for(let _0x43a4e9=0x0;_0x43a4e9<_0x1c0427['length'];_0x43a4e9++){_0x2c84e1=(_0x2c84e1+0x1)%0x100,_0x129557=(_0x129557+_0x204de1[_0x2c84e1])%0x100,_0x147340=_0x204de1[_0x2c84e1],_0x204de1[_0x2c84e1]=_0x204de1[_0x129557],_0x204de1[_0x129557]=_0x147340,_0x4b2045+=String['fromCharCode'](_0x1c0427['charCodeAt'](_0x43a4e9)^_0x204de1[(_0x204de1[_0x2c84e1]+_0x204de1[_0x129557])%0x100]);}return _0x4b2045;};_0x6eed['GbNpmg']=_0x575988,_0x19036d=arguments,_0x6eed['yFeYZS']=!![];}const _0x362d1f=_0xeb1bd5[0x0],_0x461f23=_0x6eed11+_0x362d1f,_0x5c4a11=_0x19036d[_0x461f23];return!_0x5c4a11?(_0x6eed['wsCLVC']===undefined&&(_0x6eed['wsCLVC']=!![]),_0x1a9aef=_0x6eed['GbNpmg'](_0x1a9aef,_0x5d1977),_0x19036d[_0x461f23]=_0x1a9aef):_0x1a9aef=_0x5c4a11,_0x1a9aef;},_0x6eed(_0x19036d,_0x5c33af);};let tidalToken='',response={};(async()=>{const _0x42549d=_0x1278c9,_0x51f16c={'UqNDm':_0x42549d(0x1ca,'WC#g'),'MRHYG':'===请求数据中,\x20请稍等...===','PwVEJ':_0x42549d(0x1c1,'Go)Q')};tidalToken=$[_0x42549d(0x1b4,'7azs')](_0x51f16c[_0x42549d(0x1e4,'BKSr')])||'',console[_0x42549d(0x1c7,'LjoE')](_0x51f16c['MRHYG']),isRequest&&await Main(),console[_0x42549d(0x1d1,'2]OO')](_0x51f16c[_0x42549d(0x1c5,'!1ZU')]);})()[_0x1278c9(0x19d,'yV@4')](_0x5e0b1e=>$['log']('','❗️'+$['name']+_0x1278c9(0x1ad,'yV@4'),_0x5e0b1e))['finally'](()=>{const _0x566908=_0x1278c9,_0x5bf6b6={'MvWRC':'HTTP/1.1\x20200\x20OK'},_0x571b43=$[_0x566908(0x1cd,'kJih')]()?{'status':_0x5bf6b6['MvWRC'],'headers':$request[_0x566908(0x1a1,'])!j')],'body':JSON['stringify'](response)}:{'response':{'status':0xc8,'headers':$request[_0x566908(0x1c3,'rHBu')],'body':JSON[_0x566908(0x1a9,'Qq#I')](response)}};$[_0x566908(0x1d0,'Qq#I')](_0x571b43);});var version_ = 'jsjiami.com.v7';
// prettier-ignore
function Request(t){const o=t.hasOwnProperty("method")?t.method.toLocaleLowerCase():"get";if($.isNode()&&t.hasOwnProperty("use_proxy")&&t.use_proxy){require("dotenv").config();const o=process.env.PROXY_HOST||"127.0.0.1",n=process.env.PROXY_PORT||7890,e=require("tunnel"),i={https:e.httpsOverHttp({proxy:{host:o,port:1*n}})};Object.assign(t,{agent:i})}return new Promise((n,e)=>{$.http[o](t).then(o=>{var e=o.body;if(t.is_format||void 0===t.is_format)try{e=JSON.parse(e)}catch(t){}n(e)}).catch(t=>e(t))})}
// prettier-ignore
function querystring(){return new class{stringify(e,n,r,t){var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};return n=n||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(t){var a=encodeURIComponent(o(t))+r;return Array.isArray(e[t])?e[t].map(function(e){return a+encodeURIComponent(o(e))}).join(n):a+encodeURIComponent(o(e[t]))}).filter(Boolean).join(n):t?encodeURIComponent(o(t))+r+encodeURIComponent(o(e)):""}parse(e,n,r,t){function o(e,n){return Object.prototype.hasOwnProperty.call(e,n)}n=n||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(n);var u=1e3;t&&"number"==typeof t.maxKeys&&(u=t.maxKeys);var i=e.length;u>0&&i>u&&(i=u);for(var c=0;c<i;++c){var p,f,y,l,m=e[c].replace(s,"%20"),d=m.indexOf(r);d>=0?(p=m.substr(0,d),f=m.substr(d+1)):(p=m,f=""),y=decodeURIComponent(p),l=decodeURIComponent(f),o(a,y)?Array.isArray(a[y])?a[y].push(l):a[y]=[a[y],l]:a[y]=l}return a}}}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
