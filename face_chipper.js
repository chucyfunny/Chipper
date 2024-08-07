// Face replacement script for Quantumult X

const fetchImageAsBase64 = async (imageUrl) => {
  return new Promise((resolve, reject) => {
    const imageRequest = {
      url: imageUrl,
      method: 'GET',
      headers: {
        'Accept': 'image/png'
      },
      responseType: 'arraybuffer' // Ensure we receive raw binary data
    };

    $task.fetch(imageRequest).then(response => {
      if (response.statusCode === 200) {
        const base64 = $buffer.from(response.body).toString('base64');
        resolve(`data:image/png;base64,${base64}`);
      } else {
        reject('Image download failed');
      }
    }, reason => {
      reject(reason.error);
    });
  });
};

(async () => {
  try {
    const requestBody = JSON.parse($request.body);

    // Specify the image URL
    const imageUrl = 'https://imgur.com/bG34xvc'; // 你提供的图片链接

    // Fetch and encode the image as Base64
    const newSelfieBase64 = await fetchImageAsBase64(imageUrl);

    // Replace the selfie with the new one
    requestBody.selfie = newSelfieBase64;

    // Return the modified request body
    $done({ body: JSON.stringify(requestBody) });
  } catch (error) {
    console.log(`Error: ${error}`);
    $done({});
  }
})();
