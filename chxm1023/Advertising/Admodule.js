/*************************************

项目名称：通用去广告模块
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

*************************************/


var body=$response.body;body=body.replace(/\"excitationAd":"\d+"/g,'\"excitationAd":"0"');body=body.replace(/\"Ad":"\d+"/g,'\"Ad":"0"');body=body.replace(/\"ad":\w+/g,'\"ad":false');body=body.replace(/\"ads":[.*?]/g,'\"ads":[]');body=body.replace(/\"AdId":".*?"/g,'\"AdId":""');body=body.replace(/\"adid":".*?"/g,'\"adid":""');body=body.replace(/\"videoAdId":".*?"/g,'\"videoAdId":""');body=body.replace(/\"listAdId":".*?"/g,'\"listAdId":""');body=body.replace(/\"interstitialAdId":".*?"/g,'\"interstitialAdId":""');body=body.replace(/\"detailAd":\d+/g,'\"detailAd":0');body=body.replace(/\"fr_videp_if":".*?"/g,'\"fr_videp_if":"0"');body=body.replace(/\"isbuy":\d+/g,'\"isbuy":0');body=body.replace(/\"islock":\d+/g,'\"islock":0');body=body.replace(/\"price":\d+/g,'\"price":0');body=body.replace(/\"download_price":\d+/g,'\"download_price":0');body=body.replace(/\"showAd":\d+/g,'\"showAd":0');$done({body});
