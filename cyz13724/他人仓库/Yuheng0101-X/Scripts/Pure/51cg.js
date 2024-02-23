let { body } = $response
if (/html>/.test(body)) {
    body = body.replace(/<head>/, `<head><style type="text/css">.post-card-ads{display:none!important;}</style>`)
    let dom = new DOMParser()
        , document = dom.parseFromString(body, 'text/html')
    document.getElementById('index')
        .querySelectorAll('article')
        .forEach((item) => {
            if (!item.querySelector('.post-card-info').textContent.trim() || item.querySelector('.post-card-ads')) {
                item.remove()
            }
        })
    body = document.documentElement.outerHTML
}
$done({ body })











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
