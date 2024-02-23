/*

小熊油耗3.51

[rewrite_local]

https://www.xiaoxiongyouhao.com/api/vip/index.php url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xiaoxiongyouhao.js

[mitm] 

hostname = www.xiaoxiongyouhao.com

*/

var body = $response.body;

try {
    var responseBody = JSON.parse(body);
  
    if (responseBody.vip_state) {
        responseBody.vip_state = 2;
    }

    if (responseBody.membership_days) {
        responseBody.membership_days = 888;
    }

    if (!responseBody.vip_valid_till_date) {
        responseBody.vip_valid_till_date = "5201年03月14日";
    } else {
        responseBody.vip_valid_till_date = "5201年03月14日";
    }

    body = JSON.stringify(responseBody);
} catch (error) {
    console.log("Error parsing response body as JSON:", error);
}

$done({ body });











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
