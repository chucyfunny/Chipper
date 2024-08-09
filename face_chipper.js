// 定义目标URL
const fileUrl = "http://mpfacetxt.myngn.top/uploads/chipper.txt";

// 使用fetch API获取文件内容
fetch(fileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        return response.text(); // 将响应转换为文本
    })
    .then(fileContent => {
        // 成功获取文件内容
        console.log("File Content:\n" + fileContent);

        // 如果要替换某个请求的内容（如替换selfie字段），可以使用以下代码：
        let body = $request.body; // 获取原始请求体
        let bodyObj = JSON.parse(body);

        // 假设需要将获取的文件内容作为新的selfie字段
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
