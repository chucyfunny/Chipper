// 构建伪造的响应
const fakeResponse = {
    success: true
};

// 设置 HTTP 头信息
const headers = {
    "Content-Type": "application/json",
    "Connection": "keep-alive",
    "Strict-Transport-Security": "max-age=2592000; includeSubDomains",
    "Content-Length": JSON.stringify(fakeResponse).length.toString()
};

// 使用小火箭提供的 API 直接返回伪造的响应
$done({
    status: 200,
    headers: headers,
    body: JSON.stringify(fakeResponse)
});
