import express from "express";

let router = express.Router();

router.get("/upload", (request, response) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${process.env.CLOUD_FLARE_API_KEY}`
  );
  myHeaders.append(
    "Cookie",
    "__cfruid=946c71b0304fc831a5a4b5a1dc04433983865e37-1692286482; __cflb=0H28vgHxwvgAQtjUGUFqYFDiSDreGJnUpUybFmzPXgy"
  );

  const formdata = new FormData();
  // formdata.append("requireSignedURLs", "true");
  formdata.append("metadata", '{"key":"value"}');

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_FLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      response.json({
        id: result.result.id,
        url: result.result.uploadURL,
      });
    })
    .catch((error) => console.log("error", error));
});

export default router;
