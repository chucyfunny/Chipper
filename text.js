// 定义要发送的POST数据
const postData = {
    request_chipper: true
};

// 发送POST请求
fetch('https://mpfacetxt.myngn.top/getChipperContent.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // 假设返回的是JSON格式的数据
})
.then(data => {
    if (data.status === "success") {
        console.log("File content:", data.file_content); // 打印文件内容
    } else {
        console.error("Error:", data.message); // 打印错误信息
    }
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
