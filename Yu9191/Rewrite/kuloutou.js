/***
[rewrite_local]
^http[s]?:\/\/rootless.yumingzhu.top url script-response-body https://raw.githubusercontent.com/axtyet/Quan-X/main/Yu9191/Rewrite/kuloutou.js
[mitm] 
hostname = rootless.yumingzhu.top

**/

var body = $response.body.replace(/.*./g,'{
  "result": 0,
  "content": "mMd+IBY0paACFYGz01y6VqZwfjadA+dYdShzg044vsBjU+v4hnb6M1FTLBIJX+O65XXac4usbpD538RwH6q+qyELfGcdyqNHDzD7Tq7pjosL+yeguEb9qDVa68GlubBblxQlDMvAd8DKFrrS1s5l9A=="
}')
$done({ body });