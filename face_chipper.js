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

            // 你可以在这里处理 chipperContent，更新请求体
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
