const urlMapping = {
  'http://sdk.alibaba.com.ailbaba.me/dsx.php/v6/top_notice': 'https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json',
  'http://sdk.alibaba.com.ailbaba.me/dsx.php/v6/search_hot': 'https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json',
  'http://sdk.alibaba.com.ailbaba.me/dsx.php/v6/app_config': 'https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json'
};

$task.fetch(urlMapping[$request.url], {}).then(response => {
  const status = response.status;
  const headers = response.headers;
  const body = response.body;

  $done({
    response: {
      status: status,
      headers: headers,
      body: body
    }
  });
}, reason => {
  console.log('Request failed:', reason);
  $done();
});
