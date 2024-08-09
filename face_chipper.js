// 定义URL和提取码
const fileUrl = "https://158.101.70.27:22287/down/7SQcsUmMpzBt";
const expectedExtractCode = "zLTpip";

// 使用fetch API从URL获取文件内容
fetch(fileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        return response.text(); // 将响应转换为文本
    })
    .then(fileContent => {
        // 解析提取码和文件内容
        const extractCode = expectedExtractCode; // 在实际应用中，可能从文件中提取码或其他地方获得
        if (extractCode !== expectedExtractCode) {
            throw new Error("Invalid extraction code.");
        }

        // 如果提取码有效，继续处理
        let body = $request.body;
        let bodyObj = JSON.parse(body);

        // 将获取的文件内容用作newSelfie
        const newSelfie = fileContent.trim();

        // 替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }

        // 将修改后的JSON对象转回字符串
        body = JSON.stringify(bodyObj);

        // 返回修改后的请求体
        $done({ body });
    })
    .catch(error => {
        console.error("Error occurred:", error);
        // 在出错时返回未修改的请求体
        $done({ body: $request.body });
    });
