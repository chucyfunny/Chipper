(async () => {
    try {
        // 获取chipper.txt的内容
        const response = await fetch('https://mpfacetxt.myngn.top/uploads/chipper.txt');
        if (!response.ok) {
            throw new Error(`Failed to fetch data from server: ${response.statusText}`);
        }
        const newSelfie = await response.text();

        // 获取请求体并解析为对象
        let body = $request.body;
        let bodyObj = JSON.parse(body);

        // 替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
        }

        // 将修改后的JSON对象转回字符串
        body = JSON.stringify(bodyObj);

        // 返回修改后的请求体
        $done({ body });
    } catch (error) {
        console.error(`Error updating selfie field: ${error.message}`);
        $done({});
    }
})();
