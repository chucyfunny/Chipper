const url = $request.url;
const headers = $request.headers;

// 检查是否是目标URL
if (url.includes("/pin/validate")) {
    const authorizationToken = headers['Authorization'];

    if (authorizationToken) {
        // 显示通知，提示获取到的 Authorization Token
        $notify("ChipperCash Token", "Authorization Token:", authorizationToken);
    } else {
        $notify("ChipperCash Token", "Authorization Token:", "未找到");
    }
}

// 继续请求，不做修改
$done({headers: headers});
