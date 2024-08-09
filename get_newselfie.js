// 脚本1：获取 newselfie 并存储
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
                // 将获取到的 newselfie 存储到 localStorage
                $persistentStore.write(responseObj.file_content, "newselfie");
                console.log("New selfie data saved successfully.");
            } else {
                console.log("Failed to retrieve newselfie: " + responseObj.message);
            }
        }
    });
})();
