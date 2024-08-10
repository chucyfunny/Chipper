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
        console.log("File content:", data.file_content); // 你可以使用 $notify 来显示通知
        $notify("文件内容获取成功", "", data.file_content); // 显示通知
    } else {
        console.error("Error:", data.message);
        $notify("文件内容获取失败", "", data.message); // 显示错误通知
    }
}, reason => {
    console.error("请求失败:", reason.error);
    $notify("请求失败", "", reason.error); // 请求失败时的通知
});

$done();
