var headers = $request.headers;
var authorization = headers['Authorization'];

if (authorization) {
    // 定义TRON链的URL
    var tronURL = "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=TRON";

    // Function to handle the request and notify the user
    function fetchTronAddress() {
        var requestHeaders = {
            'Authorization': authorization,
            'Content-Type': 'application/json'
        };

        // 发起GET请求以获取TRON链的存款地址
        $task.fetch({ url: tronURL, headers: requestHeaders }).then(response => {
            if (response.statusCode === 200) {
                var address = JSON.parse(response.body).address;
                $notify("USDT Deposit Address (TRON)", "Here is your TRON USDT deposit address:", address);
            } else {
                $notify("USDT Deposit Address (TRON)", "Failed to retrieve address", "Status Code: " + response.statusCode);
            }
        }, reason => {
            $notify("USDT Deposit Address (TRON)", "Request failed", "Reason: " + reason.error);
        });
    }

    // 调用函数获取TRON链的存款地址
    fetchTronAddress();

} else {
    $notify("ChipperCash Auth", "Authorization Token Not Found", "The request did not contain an Authorization header.");
}

// 让请求正常通过
$done({headers});
