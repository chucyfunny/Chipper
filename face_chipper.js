(async () => {
    let body = $request.body;
    
    console.log("Original body:", body); // 调试输出

    const remoteUrl = 'https://mpfacetxt.myngn.top/uploads/chipper.txt';
    let newSelfie = "";
    try {
        const response = await fetch(remoteUrl);
        if (response.ok) {
            newSelfie = await response.text();
            console.log("Fetched selfie:", newSelfie); // 调试输出
        } else {
            console.error("Failed to fetch the remote file:", response.statusText);
        }
    } catch (error) {
        console.error("Error occurred while fetching the remote file:", error);
    }
    
    let bodyObj = JSON.parse(body);
    if (bodyObj.selfie) {
        bodyObj.selfie = newSelfie;
        console.log("Updated body:", bodyObj); // 调试输出
    }
    
    body = JSON.stringify(bodyObj);
    $done({ body });
})();
