var headers = $request.headers;
var authorization = headers['Authorization'];

if (authorization) {
    $notify("ChipperCash Auth", "Authorization Token Found", authorization);
} else {
    $notify("ChipperCash Auth", "Authorization Token Not Found", "The request did not contain an Authorization header.");
}

// Pass the request along without modification
$done({headers});
