var objc = JSON.parse($response.body);

    objc = {
  "couponCountUsed": 2,
  "checkInStatus": 0,
  "point": 0,
  "exp": 0,
  "subscriptionVip": {
    "userId": 708628,
    "beginTime": 1695099364799,
    "id": 184930,
    "endTime": 169522559900099,
    "createTimeFormat": "2023-09-19 12:56:04",
    "createTime": 1695099364799,
    "isActive": 1
  },
  "isVip": 1,
  "feedbackCount": 8888,
  "level": 88888,
  "waitPayOrder": 8,
  "subscription": null,
  "askEditorCardCount": 8,
  "couponCountAboutToExpire": 0,
  "info": "售后问题联系#QQ9912254",
  "msg": "success",
  "status": 1,
  "user": {
    "phone": "18888888888",
    "nick": "lovebabyforever",
    "hasBindPhone": 1,
    "id": 888888,
    "image": "",
    "avatarUrl": "https://raw.githubusercontent.com/Yu9191/-/main/A559C8EF-B4C6-4A94-8488-3D0BF36A6673.jpeg",
    "isOffical": null,
    "sex": 0,
    "pendantIconUrl": null
  }
}

$done({body : JSON.stringify(objc)});
