var body = $response.body;

try {
    var obj = JSON.parse(body);

    if (obj.data && obj.data.level && obj.data.level.key === 0) {
        obj.data.level = {
            "key": 16,
            "text": "博士后"
        };
    }

    $done({ body: JSON.stringify(obj) });
} catch (error) {
    $done();
}
