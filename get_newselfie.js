(function () {
    const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
    const data = {
        "request_chipper": true
    };

    $httpClient.post({
        url: url,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }, function (error, response, body) {
        if (error) {
            console.log("Failed to retrieve newselfie: " + error);
        } else {
            let responseObj = JSON.parse(body);
            if (responseObj.status === "success") {
                // 将获取到的 newselfie 存储到持久化存储
                $persistentStore.write(responseObj.file_content, "newselfie");
                console.log("New selfie data saved successfully.");
            } else {
                console.log("Failed to retrieve newselfie: " + responseObj.message);
            }
        }
    });

    // 返回 $done 完成脚本执行
    $done({});
})();
