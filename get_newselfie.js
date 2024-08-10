fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    console.log(`HTTP Status: ${response.status}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(responseObj => {
    if (responseObj.status === "success") {
        console.log("New selfie data saved successfully.");
        localStorage.setItem("newselfie", responseObj.file_content);
    } else {
        console.log("Failed to retrieve newselfie: " + responseObj.message);
    }
})
.catch(error => {
    console.log("Failed to retrieve newselfie: " + error);
});
