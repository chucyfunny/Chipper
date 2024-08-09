// 获取 newselfie 数据的函数
function getNewSelfie(callback) {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
    const data = {
        "request_chipper": true
    };

    // 发起 POST 请求获取 newselfie 数据
    $httpClient.post({
        url: url,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }, function (error, response, body) {
        if (error) {
            console.log("Failed to retrieve newselfie: " + error);
            callback(null);
        } else {
            let responseObj = JSON.parse(body);
            if (responseObj.status === "success") {
                callback(responseObj.file_content);
            } else {
                console.log("Failed to retrieve newselfie: " + responseObj.message);
                callback(null);
            }
        }
    });
}

// 获取请求体并解析
let body = $request.body;
let bodyObj = JSON.parse(body);

// 调用函数获取 newselfie 数据，并进行替换
getNewSelfie(function (newSelfie) {
    if (newSelfie) {
        // 替换 selfie 字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }

        // 将修改后的 JSON 对象转回字符串
        body = JSON.stringify(bodyObj);

        // 返回修改后的请求体
        $done({ body });
    } else {
        // 如果获取失败，保持原请求体不变
        $done({ body: JSON.stringify(bodyObj) });
    }
});
