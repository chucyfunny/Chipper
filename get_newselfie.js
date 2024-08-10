(function () {
    // 确保变量 url 已正确定义
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
    const data = {
        "request_chipper": true
    };

    // 发起 HTTP POST 请求获取 newselfie 数据
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log(`HTTP Status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseObj => {
        if (responseObj.status === "success") {
            console.log("New selfie data saved successfully.");
            // 存储 newselfie 数据，可以使用持久化存储
            localStorage.setItem("newselfie", responseObj.file_content);
        } else {
            console.log("Failed to retrieve newselfie: " + responseObj.message);
        }
    })
    .catch(error => {
        console.log("Failed to retrieve newselfie: " + error);
    })
    .finally(() => {
        // 确保脚本结束时调用 $done
        $done({});
    });
})();
