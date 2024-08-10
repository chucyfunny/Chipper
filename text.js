// Quantumult X 使用的脚本格式
const url = "https://mpfacetxt.myngn.top/getChipperContent.php";
const method = "POST";
const headers = {
    "Content-Type": "application/json"
};
const body = JSON.stringify({
    request_chipper: true
});

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    const data = JSON.parse(response.body);
    if (data.status === "success") {
        // 文件内容获取成功，显示通知
        $notify("成功", "获取文件内容成功", data.file_content);
    } else {
        // 发生错误，显示错误信息
        $notify("错误", "获取文件失败", data.message);
    }
}, reason => {
    // 请求失败，显示请求失败的信息
    $notify("请求失败", "无法连接到服务器", reason.error);
});

$done();
