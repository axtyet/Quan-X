let obj = JSON.parse($response.body);
    

  
  obj.data.roles = [
      {
        "role_name": "会员用户",
        "level_code": "LEVEL_LIFETIME",
        "role_code": "LEVEL_LIFETIME",
        "icon": null,
        "level_name": "会员用户",
        "ended_at": "2099-12-25 22:34:09"
      }
    ];
  
    $done({
        body: JSON.stringify(obj)
    });