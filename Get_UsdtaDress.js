var headers = $request.headers;
var authorization = headers['Authorization'];

if (authorization) {

    var chains = {
        "ETHEREUM": "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=ETHEREUM",
        "POLYGON": "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=POLYGON",
        "SOLANA_MAINNET_BETA": "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=SOLANA_MAINNET_BETA",
        "TRON": "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=TRON"
    };

    var results = [];

    // Function to handle requests and notify the user
    function fetchAddress(chain, url) {
        var requestHeaders = {
            'Authorization': authorization,
            'Content-Type': 'application/json'
        };

        // 发起GET请求以获取存款地址
        $task.fetch({ url: url, headers: requestHeaders }).then(response => {
            if (response.statusCode === 200) {
                var address = JSON.parse(response.body).address;
                results.push(`${chain}: ${address}`);
            } else {
                results.push(`${chain}: Failed to retrieve address`);
            }

            // 当所有请求完成后，通知用户所有结果
            if (results.length === Object.keys(chains).length) {
                $notify("USDT Deposit Addresses", "Here are your deposit addresses:", results.join("\n"));
            }
        }, reason => {
            results.push(`${chain}: Request failed`);
            if (results.length === Object.keys(chains).length) {
                $notify("USDT Deposit Addresses", "Here are your deposit addresses:", results.join("\n"));
            }
        });
    }

    // 循环遍历每个链并发起请求
    for (var chain in chains) {
        fetchAddress(chain, chains[chain]);
    }

} else {
    $notify("ChipperCash Auth", "Authorization Token Not Found", "The request did not contain an Authorization header.");
}

// 让请求正常通过
$done({headers});
