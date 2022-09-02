export function callMsGraphGet(endPoint, accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  const response = fetch(endPoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
}

export function callMsGraphPatch(endPoint, accessToken) {
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

  const response = fetch(endPoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
}

export function callMsGraphPost(endPoint, accessToken, data) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append(
    "Content-Type",
    "application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false"
  );

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      subject: `Urlop ${data.initials}`,
      body: {
        contentType: "text",
        content: data.type,
      },
      start: {
        dateTime: data.start,
        timeZone: "Europe/Warsaw",
      },
      end: {
        dateTime: data.end,
        timeZone: "Europe/Warsaw",
      },
      location: {
        displayName: data.location,
      },
      showAs: "oof",
      isAllDay: true,
      attendees: data.attendees.map((attendee) => ({
        emailAddress: {
          address: attendee.mail,
          name: attendee.name,
        },
        type: "required",
      })),
    }),
  };

  const response = fetch(endPoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
}

export function callMsGraphDelete(endPoint, accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "DELETE",
    headers: headers,
  };

  const response = fetch(endPoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
}
