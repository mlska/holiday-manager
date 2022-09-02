export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_AUTHORITY,
    redirectUri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mlska.github.io/holiday-manager/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Calendars.ReadWrite"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphCalendarEndpoint:
    "https://graph.microsoft.com/v1.0/me/events?$select=attendees,subject,bodyPreview,organizer,start,end,location&$filter=startsWith(subject,'urlop') and start/dateTime ge '2022-01-01' and end/dateTime le '2022-12-31'&top=50",
  graphEventEndPoint: "https://graph.microsoft.com/v1.0/me/events/",
};
