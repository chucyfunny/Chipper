const url = $request.url;
const headers = $request.headers;

function getAuthorizationToken() {
    if (url.includes("/pin/validate")) {
        const authorizationToken = headers['Authorization'];

        if (authorizationToken) {
            // 使用console.log显示Token
            console.log("ChipperCash Token: " + authorizationToken);
        } else {
            console.log("ChipperCash Token: 未找到");
        }
    }
}

getAuthorizationToken();

// 继续请求，不做修改
$done({headers: headers});
