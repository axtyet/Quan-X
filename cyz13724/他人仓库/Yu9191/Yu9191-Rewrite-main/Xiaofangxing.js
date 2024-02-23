/******************************
消费行  https://t.cn/A6OsSXGV
作者三个软件
@ios151
*******************

[rewrite_local]
https://www.xfx119.com/ksVRExamSystem/validityTerm? url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/Xiaofangxing.js



[mitm]
hostname = www.xfx119.com

*******************************/

var B = JSON.parse($response.body);
var ksDirectionMatch = $request.url.match(/&ksDirection=(\d+)/);
var ksDirection = ksDirectionMatch ? parseInt(ksDirectionMatch[1]) : null;
if (ksDirection === 1 || ksDirection === 2) {
  B["userDirection"] = ksDirection;
}

B = {
  ...B,
  "llkcValidityDays": 4102415999,
  "tkValidityDays": 4102415999,
  "validityDays": 4102415999,
  "fgjxjvValidityDays": 4102415999,
  "studySubsystem": "2099-12-31 23:59:59"
};

$done({ body: JSON.stringify(B) });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
