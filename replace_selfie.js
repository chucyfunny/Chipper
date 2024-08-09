// 脚本2：替换 selfie 并发送请求
(function () {
    let body = $request.body;
    let bodyObj = JSON.parse(body);

    // 从 localStorage 中读取 newselfie 数据
    let newSelfie = $persistentStore.read("newselfie");

    if (newSelfie) {
        // 替换 selfie 字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }
    } else {
        console.log("No newselfie data found in storage.");
    }

    // 将修改后的 JSON 对象转回字符串
    body = JSON.stringify(bodyObj);

    // 返回修改后的请求体
    $done({ body });
})();
