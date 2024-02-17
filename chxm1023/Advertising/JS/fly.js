var body = $response.body;
var chxm1023 = JSON.parse(body);

if (chxm1023.Variables.data.threaddetail) 
{
chxm1023.Variables.data.threaddetail.tagadv = "";
	chxm1023.Variables.data.threaddetail.threadapp_ad_video = [];
	chxm1023.Variables.data.threaddetail.pingyouadv = "";
	chxm1023.Variables.data.threaddetail.middleadv = "";
	chxm1023.Variables.data.threaddetail.bottomadv = "";
	chxm1023.Variables.data.threaddetail.appdetailadv = [];
}
//delete chxm1023.Variables.data.threaddetail.threadapp_ad_video;
//delete chxm1023.Variables.data.threaddetail.tagadv;
//delete chxm1023.Variables.data.threaddetail.middleadv;
//delete chxm1023.Variables.data.threaddetail.pingyouadv;
//delete chxm1023.Variables.data.threaddetail.bottomadv;
//delete chxm1023.Variables.data.threaddetail.appdetailadv;
	
$done({body: JSON.stringify(chxm1023)});
