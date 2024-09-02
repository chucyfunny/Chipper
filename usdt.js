console.log("Script started"); // 确认脚本已启动

const url = $request.url;
const headers = $request.headers;

console.log("Request URL: " + url); // 输出请求的URL

// 检查是否是目标URL
if (url.includes("/pin/validate")) {
    console.log("Target URL matched"); // 确认URL匹配

    const authorizationToken = headers['Authorization'];

    if (authorizationToken) {
        // 显示通知或记录Token
        console.log("ChipperCash Token: " + authorizationToken); // 记录 Token
    } else {
        console.log("Authorization Token not found"); // 如果未找到Token
    }
} else {
    console.log("URL does not match /pin/validate"); // 如果URL不匹配
}

// 继续请求，不做修改
$done({headers: headers});
