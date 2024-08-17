var headers = $request.headers;
var authorization = headers['Authorization'];

if (authorization) {
    // 使用圈X的通知功能显示令牌
    $notify("Authorization Token", "Here is your token:", authorization);
} else {
    $notify("Authorization Token Not Found", "Error:", "The request did not contain an Authorization header.");
}

// 让请求正常通过
$done({headers});
