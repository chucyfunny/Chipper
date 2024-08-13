

var headers = $request.headers;
var authorization = headers['Authorization'];

if (authorization) {
    // Define the base URL and chains
    var baseURL = "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=";
    var chains = ["ETHEREUM", "POLYGON", "SOLANA_MAINNET_BETA", "TRON"];
    var results = [];

    // Function to handle requests and notify the user
    function fetchAddress(chain) {
        var url = baseURL + chain;
        var requestHeaders = {
            'Authorization': authorization,
            'Content-Type': 'application/json'
        };

        // Make the request to get the deposit address
        $task.fetch({ url: url, headers: requestHeaders }).then(response => {
            if (response.statusCode === 200) {
                var address = JSON.parse(response.body).address;
                results.push(`${chain}: ${address}`);
            } else {
                results.push(`${chain}: Failed to retrieve address`);
            }

            // Notify user with the results when all requests are complete
            if (results.length === chains.length) {
                $notify("USDT Deposit Addresses", "Here are your deposit addresses:", results.join("\n"));
            }
        }, reason => {
            results.push(`${chain}: Request failed`);
            if (results.length === chains.length) {
                $notify("USDT Deposit Addresses", "Here are your deposit addresses:", results.join("\n"));
            }
        });
    }

    // Loop through each chain to get the deposit address
    chains.forEach(fetchAddress);

} else {
    $notify("ChipperCash Auth", "Authorization Token Not Found", "The request did not contain an Authorization header.");
}

// Pass the request along without modification
$done({headers});
