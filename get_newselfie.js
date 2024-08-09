(function () {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
    const data = {
        "request_chipper": true
    };

    // 使用 fetch 代替 $httpClient
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseObj => {
        if (responseObj.status === "success") {
            // 将获取到的 newselfie 存储到持久化存储
            // 例如使用 localStorage 替代 $persistentStore
            localStorage.setItem("newselfie", responseObj.file_content);
            console.log("New selfie data saved successfully.");
        } else {
            console.log("Failed to retrieve newselfie: " + responseObj.message);
        }
    })
    .catch(error => {
        console.log("Failed to retrieve newselfie: " + error);
    });
        $done 
    // 返回 $done 完成脚本执行
    // 注意：在浏览器环境下可能不需要 $done
})();
