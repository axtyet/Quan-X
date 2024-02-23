const CHECK_URL = 'mb3admin.com/admin/service/registration/validateDevice'

const url = $request.url
const isCheckUrl = (url) => url.includes(CHECK_URL)

if (isCheckUrl(url) && $response.status != 200) {
  const unlock = {
    cacheExpirationDays: 999,
    resultCode: 'GOOD',
    message: 'Device Valid'
  }

  const status = 200
  const headers = $response.headers
  const body = JSON.stringify(unlock)

  $done({ status, headers, body })
} else {
  $done({})
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
