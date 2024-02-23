/*************************************

项目名称：来音钢琴
软件版本：4.3.0
下载地址：https://is.gd/1LiXln
脚本作者：安妮
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https:\/\/piano-api\.quthing\.com\/vip\/state\/v2 url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/lygq.js

[mitm]
hostname = piano-api.quthing.com


*************************************/
var version_='jsjiami.com.v7';function a(){var s=(function(){return[version_,'nfVjfJxsEQjfhiaRmi.kRcMJwom.HFv7OqJUFnMh==','WR7cNwXoWQZdJ34','WQhcK2ZcLq','rNVcQCo9BSkaWPe6qspcG8oMiG','W4PrgvC','AsJdKmou','W65bW4qso17cSW','qSo6WRvK','lIKTB14RFriGWQ3dOSoO','AcVcJCkvA8oVfq','rmoCWPtdJG','WO3dVI/cOZu5WRu','WRv9dSkYWOT6WPZdPWZdNmo8WOjVCa','WQhdH8o1W40OW5hcGW','WO7dPdRcMa','W5FcHmoNkv5IW4ddSmo8W7/dSCk2EG','WQiZW7mVW7ddOceqbGFdGG','d8kyWRxcVq','WOCwsXqmWQOQsL12geDm','AMj9lq','WQKqWOXJBqddPahdI8ouWQW','W5a4W6NdGW'].concat((function(){return['aSkqhGddT3bAWONcOc4n','WQe6W64RW4m','zmoLW5PiFsZcHmo9wdXuefG','WRu6W6G5','u8oOWQr3','W4ZcIg4t','WPLngSkP','W47dHdeOW5be','bSk7W6qIACkUDdxdQfGwW5C4','WPdcMCosr3mtuwnUWRVdKYNcNG','CMddOmkwF05vWP4','W6jOWQ1OWPdcUMKxdYpdLZNdNq','bZ7dVCk6','W5Tdceq','CCo3v8khhJPVWOzKW6G','DXddV8k1A1jf','qx7cQCo4BSkbWP0axXpcVSodeG','W4JdLIdcGa','fIZdRmkP','qSourLtcRrilWPBcVZiKWOm3','WRtcISorxLXghrZdU8k0WODhvNJdK0K','AxHOhabNybW','W6TCW4yYo1/cTv/cIG'].concat((function(){return['WRpcM2JcVCozWP1l','vSo/WPVdL8oXt8kMyJNcMCoyW7i','ySo0q8oAkCkuWQ4','zmoNWQqMlLVdQmoo','q8osWPxdNwuhWRDTWQhcMvxcRua','WRJdPa48WOZdS17cUhxdTW','lMjMFCkScCkMW5VdISki','WRv9dSkYWOT/WPddUq','WR44W5JcKq','xmksWQvZW4xdJc4N','qCoxqW7dULDqWQpcQa','WRhcHSopFL1snW','dColWOruW4FdRa0gWQCnDmoCy8kBW6xdVmowzXzIwmoQ','WRBdU3X5zmoaBNCiWQ9ZW7OQ','dCofWP9JW5RdVt4DWPqNECoEECkmW4NdJSoWzHC','yCo8qSkC','xGrfWR03WOtdRCoMWQO0sHtdPW','5AYV5AES6kwU6zAR77YZ5yA96lAb5O2X5l2V','AZhcMmkU','jCk/BCk0cbLVWRC','DL3cPseEkHK'];}()));}()));}());a=function(){return s;};return a();};var r=b;function b(c,d){var e=a();return b=function(f,g){f=f-0x68;var h=e[f];if(b['kEKNoJ']===undefined){var i=function(n){var o='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var p='',q='';for(var r=0x0,s,t,u=0x0;t=n['charAt'](u++);~t&&(s=r%0x4?s*0x40+t:t,r++%0x4)?p+=String['fromCharCode'](0xff&s>>(-0x2*r&0x6)):0x0){t=o['indexOf'](t);}for(var v=0x0,w=p['length'];v<w;v++){q+='%'+('00'+p['charCodeAt'](v)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(q);};var m=function(n,o){var p=[],q=0x0,r,t='';n=i(n);var u;for(u=0x0;u<0x100;u++){p[u]=u;}for(u=0x0;u<0x100;u++){q=(q+p[u]+o['charCodeAt'](u%o['length']))%0x100,r=p[u],p[u]=p[q],p[q]=r;}u=0x0,q=0x0;for(var v=0x0;v<n['length'];v++){u=(u+0x1)%0x100,q=(q+p[u])%0x100,r=p[u],p[u]=p[q],p[q]=r,t+=String['fromCharCode'](n['charCodeAt'](v)^p[(p[u]+p[q])%0x100]);}return t;};b['XTTtir']=m,c=arguments,b['kEKNoJ']=!![];}var j=e[0x0],k=f+j,l=c[k];return!l?(b['BpbJWf']===undefined&&(b['BpbJWf']=!![]),h=b['XTTtir'](h,g),c[k]=h):h=l,h;},b(c,d);}(function(c,d,e,f,g,h,i){return c=c>>0x5,h='hs',i='hs',function(j,k,l,m,n){var q=b;m='tfi',h=m+h,n='up',i+=n,h=l(h),i=l(i),l=0x0;var o=j();while(!![]&&--f+k){try{m=-parseInt(q(0x8f,'B^#y'))/0x1*(parseInt(q(0x93,'CA@A'))/0x2)+parseInt(q(0xa5,'#Fgj'))/0x3*(parseInt(q(0x92,'V4Y3'))/0x4)+-parseInt(q(0x96,']T@N'))/0x5+-parseInt(q(0x7d,'r2]v'))/0x6*(-parseInt(q(0x9e,'L@Jf'))/0x7)+-parseInt(q(0xa0,'j4oV'))/0x8+parseInt(q(0x74,'td8N'))/0x9+-parseInt(q(0x9c,'SX8)'))/0xa*(-parseInt(q(0x6b,'6mmP'))/0xb);}catch(p){m=l;}finally{n=o[h]();if(c<=f)l?g?m=n:g=n:l=n;else{if(l==g['replace'](/[fqUHOJhxEnkVMQRFw=]/g,'')){if(m===k){o['un'+h](n);break;}o[i](n);}}}}}(e,d,function(j,k,l,m,n,o,p){return k='\x73\x70\x6c\x69\x74',j=arguments[0x0],j=j[k](''),l='\x72\x65\x76\x65\x72\x73\x65',j=j[l]('\x76'),m='\x6a\x6f\x69\x6e',(0x13c856,j[m](''));});}(0x1880,0x4a73c,a,0xc6),a)&&(version_=a);var body=JSON[r(0x73,'r2]v')]($response[r(0x71,'OPxu')]);body['data'][r(0x78,'Lj%5')][r(0xa8,'VBrc')][r(0x80,'SX8)')]=0x3bb27108610,body[r(0x91,'dLKo')]['user'][r(0xa6,'VhG4')][r(0x86,'7olU')]=0x3bb27108610,body[r(0x84,'j4oV')]['user']['vipInfo'][r(0x68,'eETv')]=!![],body[r(0x7f,'r#r2')][r(0x9b,'VhG4')][r(0x69,'RO9V')][r(0x6c,'r2]v')]=![],body['data'][r(0x7e,'j4oV')]['vipInfo'][r(0x95,'V4Y3')]=!![],body[r(0x76,'TyQ#')][r(0xa4,'TyQ#')]['vipInfo'][r(0x72,'CA@A')]=![],body[r(0x76,'TyQ#')][r(0x98,'SX8)')][r(0xa3,'IyI2')][r(0x7b,'R#3a')]=0x3,body[r(0x84,'j4oV')]['user'][r(0x89,']xvy')]['validCourseVip']=!![],body['data']['user'][r(0x8b,'*C(r')][r(0x87,'#Fgj')]=0xbaf03,body[r(0xa2,'Xgb*')]['user'][r(0x94,'7olU')][r(0x90,'eETv')]=!![],body[r(0x75,'r2]v')][r(0x77,'KSuP')]['vipInfo']['vipType']=0x3,body[r(0x83,'a(R3')][r(0x6f,'#Fgj')][r(0x9d,'7U!I')][r(0x8d,'VMB*')]=0x3,body[r(0x9f,']xvy')]['user']['vipInfo'][r(0x97,'V4Y3')]=0x3bb27108610,body[r(0xa7,'VMB*')][r(0xa1,'r#r2')][r(0x79,'0BP3')]=r(0x70,'IyI2'),body['data'][r(0x6a,'VBrc')][r(0x6d,'I32R')]=r(0x9a,'AGKZ'),$done({'body':JSON[r(0x88,'IyI2')](body)});var version_ = 'jsjiami.com.v7';











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
