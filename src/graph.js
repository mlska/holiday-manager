export async function callMsGraphGet(endPoint, accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(endPoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function callMsGraphPatch(endPoint, accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append(
    "Content-Type",
    "application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false"
  );

  const options = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      body: {
        contentType: "text",
        content: "ok",
      },
    }),
  };

  console.log(options);

  return fetch(endPoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
