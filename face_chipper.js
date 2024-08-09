// 使用圈X的$task.fetch API进行异步请求
let body = $request.body;

const remoteUrl = 'https://mpfacetxt.myngn.top/uploads/chipper.txt';

$task.fetch({
    url: remoteUrl,
    method: 'GET'
}).then(response => {
    if (response.statusCode === 200) {
        let newSelfie = response.body.trim(); // 获取到的远程文件内容，并去除可能的空白字符

        console.log("Fetched selfie content:", newSelfie); // 输出获取到的内容

        let bodyObj = JSON.parse(body);

        // 替换selfie字段
        if (bodyObj.selfie) {
            bodyObj.selfie = newSelfie;
            console.log("Updated selfie field in body:", bodyObj.selfie); // 输出更新后的selfie字段
        }

        // 将修改后的JSON对象转回字符串
        body = JSON.stringify(bodyObj);

        console.log("Final updated body:", body); // 输出最终的请求体内容

        // 返回修改后的请求体
        $done({ body });
    } else {
        console.error(`Failed to fetch remote content: ${response.statusCode}`);
        $done({ body }); // 如果请求失败，返回原始body
    }
}).catch(error => {
    console.error(`Error occurred while fetching remote content: ${error}`);
    $done({ body }); // 如果发生错误，返回原始body
});
