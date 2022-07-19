import React, { useEffect, useState } from "react";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest, graphConfig } from "./authConfig";
import { ProfileData } from "./components/ProfileData";
import { callMsGraphGet } from "./graph";
import "./App.css";

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState(null);

  function requestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphGet(graphConfig.graphMeEndpoint, response.accessToken).then(
          (response) => {
            setProfile(response);
          }
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraphGet(
            graphConfig.graphMeEndpoint,
            response.accessToken
          ).then((response) => setProfile(response));
        });
      });
  }

  function requestEvents() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphGet(
          graphConfig.graphCalendarEndpoint,
          response.accessToken
        ).then((response) => {
          setEvents(response);
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraphGet(
            graphConfig.graphCalendarEndpoint,
            response.accessToken
          ).then((response) => {
            setEvents(response);
          });
        });
      });
  }

  useEffect(() => {
    requestProfileData();
    requestEvents();
  }, []);

  return events ? (
    <ProfileData
      profile={profile}
      events={events}
      requestEvents={requestEvents}
    />
  ) : (
    ""
  );
}

function App() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate></UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default App;
