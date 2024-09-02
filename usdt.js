// 获取请求的URL和头部
const url = $request.url || $http.url;
const headers = $request.headers || $http.headers;

console.log("Script is running"); // 用于确认脚本是否被触发

// 检查是否是目标URL
if (url.includes("/pin/validate")) {
    const authorizationToken = headers['Authorization'];

    if (authorizationToken) {
        // 记录 Token
        console.log("ChipperCash Token: " + authorizationToken);
    } else {
        console.log("ChipperCash Token: 未找到");
    }
}

// 继续请求
$done({});
