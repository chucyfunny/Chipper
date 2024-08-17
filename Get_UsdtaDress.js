
const url = $request.url;
const headers = $request.headers;

// 检查是否是目标URL
if (url.includes("/pin/validate")) {
    const authorizationToken = headers['Authorization'];

    if (authorizationToken) {
        // 显示通知
        $notify("ChipperCash Token", "Authorization Token:", authorizationToken);
    } else {
        $notify("ChipperCash Token", "Authorization Token:", "未找到");
    }
}

$done({headers: headers});
