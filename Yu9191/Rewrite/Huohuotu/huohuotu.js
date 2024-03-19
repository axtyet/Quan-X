/**
 *  火火兔的文章解锁接口
 *  Token获取自己抓包https://api.cloud.alilo.com.cn/api/v4/user-activation/trigger-excitation
 *  Id也在请求体里面 如果你观看次数过多可以选择在https://api.cloud.alilo.com.cn/api/v4/user-activation/check-sowing 这个URL的请求和请求体获取ck，用户，文章id是一样的
 */

// 设置激励最大次数
const allowedAttempts = 40;
// 文章id albumid填到这里
const myAlbumId = "8888"; //例
// 用户id userId填到这里
const myUserId = 6;//例


// 这个一般不会变
const myToken = "eyJ8";//填写到""里面 举例
// 一般只需要填写一次
const myCookie = "UM_dist792";//填写到""里面 举例



// 准备请求的数据
const url = `https://api.cloud.alilo.com.cn/api/v4/user-activation/trigger-excitation`;
const method = `POST`;
const headers = {
    'Accept-Encoding' : `gzip, deflate, br`,
    'Cookie' : myCookie,
    'Connection' : `keep-alive`,
    'Content-Type' : `application/json`,
    'Accept' : `*/*`,
    'Host' : `api.cloud.alilo.com.cn`,
    'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Html5Plus/1.0 (Immersed/20) uni-app`,
    'version' : `5.2.006`,
    'token' : myToken,
    'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
};
function prepareBody(userId, albumId) {
    return `{"policyId":20,"userId":${userId},"albumId":"${albumId}","pricingId":2,"resType":40,"platform":20,"openId":"","channelId":102}`;
}

// 发送请求的函数
function sendRequest(attempt) {
    console.log(`Sending request ${attempt}...`);
    const myRequest = {
        url: url,
        method: method,
        headers: headers,
        body: prepareBody(myUserId, myAlbumId)
    };
    $task.fetch(myRequest).then(response => {
        console.log(`Response ${attempt}: ${response.statusCode} \n\n ${JSON.stringify(JSON.parse(response.body), null, 2)}`);
        if (attempt < allowedAttempts) {
            // 继续发送下一次请求
            sendRequest(attempt + 1);
        } else {
            console.log(`All ${allowedAttempts} requests sent.`);
            $done();
        }
    }, reason => {
        console.log(`Error ${attempt}: ${reason.error}`);
        if (attempt < allowedAttempts) {
            // 继续发送下一次请求
            sendRequest(attempt + 1);
        } else {
            console.log(`All ${allowedAttempts} requests sent.`);
            $done();
        }
    });
}

// 开始发送第一次请求
sendRequest(1);
