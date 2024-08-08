const https = require('https');

// 获取用户在request-body替换选项中填选的imgur图片ID
const imgurId = $request.body.imgurId;

// 检查用户是否提供了有效的imgur图片ID
if (!imgurId || imgurId.length === 0) {
    console.error("Invalid or missing Imgur ID.");
    $done({});
    return;
}

// 拼接完整的imgur图片链接
const imgurUrl = `https://imgur.com/${imgurId}.jpg`;

// 从Imgur抓取图片并转换为Base64
function fetchImgurImageBase64(url, callback) {
    https.get(url, (res) => {
        let data = [];

        res.on('data', (chunk) => {
            data.push(chunk);
        });

        res.on('end', () => {
            const buffer = Buffer.concat(data);
            const base64Image = buffer.toString('base64');
            callback(base64Image);
        });
    }).on('error', (err) => {
        console.error('Error fetching image:', err);
        callback(null);
    });
}

// 原始请求体
let body = $request.body;

// 将请求体解析为JSON对象
let bodyObj = JSON.parse(body);

// 抓取并替换selfie
fetchImgurImageBase64(imgurUrl, (newSelfie) => {
    if (newSelfie && bodyObj.selfie) {
        // 添加Base64格式头部
        bodyObj.selfie = `data:image/jpeg;base64,${newSelfie}`;
    }

    // 将修改后的JSON对象转回字符串
    body = JSON.stringify(bodyObj);

    // 返回修改后的请求体
    $done({ body });
});
