var url = $request.url;if(url.includes('/user/sendVerifyCode')){
  console.log($response.body);
  var obj = JSON.parse($response.body);
  $notification.post('陈抟八字', '手机号：'+ obj.data.phoneNumber, '验证码：'+ obj.data.verifyCode)
  $done()
}
