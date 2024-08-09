let body = $request.body;
let bodyObj = JSON.parse(body);

// 同步获取新的 selfie 数据
const getNewSelfieSync = () => {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
    const requestBody = JSON.stringify({
        "request_chipper": true
    });

    const response = $httpClient.post({
        url: url,
        headers: {
            "Content-Type": "application/json"
        },
        body: requestBody,
        timeout: 5000 // 设定一个超时时间，以防止长时间等待
    }, (error, response, data) => {
        if (error) {
            console.error("Failed to fetch new selfie data:", error);
            return null;
        }
        const responseData = JSON.parse(data);
        if (responseData.status === "success" && responseData.file_content) {
            return responseData.file_content;
        } else {
            console.error("Failed to fetch new selfie data:", responseData.message);
            return null;
        }
    });
    return response;
};

// 获取并替换 selfie 数据
const newSelfie = getNewSelfieSync();
if (newSelfie && bodyObj.selfie) {
    bodyObj.selfie = newSelfie;
}

// 将修改后的 JSON 对象转回字符串
body = JSON.stringify(bodyObj);

// 返回修改后的请求体
$done({ body });
