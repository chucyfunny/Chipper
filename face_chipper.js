let body = $request.body;
console.log("Original Request Body: " + body);

let bodyObj = JSON.parse(body);

// 获取新的 selfie 数据
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
        if (data.status === "success" && data.file_content) {
            console.log("New selfie data fetched successfully.");
            return data.file_content;
        } else {
            console.error("Failed to fetch new selfie data: " + data.message);
            return null;
        }
    } catch (error) {
        console.error("Error fetching new selfie data: " + error);
        return null;
    }
};

// 主函数
const main = async () => {
    const newSelfie = await getNewSelfie();
    console.log("Fetched New Selfie: " + newSelfie);

    if (newSelfie && bodyObj.selfie) {
        bodyObj.selfie = newSelfie;
        console.log("Selfie data replaced.");
    } else {
        console.log("No selfie data replacement occurred.");
    }

    // 将修改后的 JSON 对象转回字符串
    body = JSON.stringify(bodyObj);
    console.log("Modified Request Body: " + body);

    // 返回修改后的请求体
    $done({ body });
};

// 执行主函数
main();
