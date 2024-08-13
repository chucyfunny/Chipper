var headers = $request.headers;
var authorization = headers['Authorization'];

if (authorization) {
    // Define the base URL and chains
    var baseURL = "https://api.chippercash.com/v1/crypto/deposit/address?asset=USDT&chain=";
    var usdtChain = "TRON";
    var result = "";

    // Function to handle request and notify the user
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
                result = `${chain}: ${address}`;
            } else {
                result = `${chain}: Failed to retrieve address`;
            }

            // Notify user with the result
            $notify("USDT Deposit Address", "Here is your TRON USDT deposit address:", result);

        }, reason => {
            result = `${chain}: Request failed`;
            $notify("USDT Deposit Address", "Here is your TRON USDT deposit address:", result);
        });
    }

    // Fetch only the TRON chain address
    fetchAddress(usdtChain);

} else {
    $notify("ChipperCash Auth", "Authorization Token Not Found", "The request did not contain an Authorization header.");
}

// Pass the request along without modification
$done({headers});
