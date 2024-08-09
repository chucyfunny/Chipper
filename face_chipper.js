let body = $request.body;
let bodyObj = JSON.parse(body);

// 发起请求以获取chipper.txt的内容
const url = "https://mpfacetxt.myngn.top/getChipperContent.php"; // 替换为你的实际URL

$task.fetch({ url: url, method: "GET" }).then(response => {
    let data = response.body;
    let responseObj = JSON.parse(data);
    if (responseObj.status === "success") {
        // 获取chipper.txt的内容
        const newSelfie = responseObj.content;

        // 替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }

        // 将修改后的JSON对象转回字符串
        body = JSON.stringify(bodyObj);
    } else {
        console.log("Failed to fetch chipper.txt content: " + responseObj.message);
    }

    // 返回修改后的请求体
    $done({ body });
}).catch(error => {
    console.log("Failed to fetch chipper.txt content: " + error);
    $done({ body }); // 如果请求失败，直接返回原始body
});
