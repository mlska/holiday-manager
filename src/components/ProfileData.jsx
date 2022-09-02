import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import generateHolidayApplication from "../generateHolidayApplication";
import { useMsal } from "@azure/msal-react";
import { loginRequest, graphConfig } from "../authConfig";
import { callMsGraphPatch, callMsGraphDelete } from "../graph";
import HolidayForm from "./HolidayForm";

export const ProfileData = (props) => {
  const { instance, accounts } = useMsal();

  const profile = props.profile;
  const events = props.events.value;

  events.sort(function (a, b) {
    return new Date(b.start.dateTime) - new Date(a.start.dateTime);
  });

  const [stats, setStats] = useState({
    daysTaken: 0,
    notPrintedApps: 0,
  });

  function patchEvent(eventID) {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphPatch(
          `${graphConfig.graphEventEndPoint}${eventID}`,
          response.accessToken
        ).then((response) => props.requestEvents());
      })
      .catch((e) => console.log("patching error"));
  }

  function deleteEvent(eventID) {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphDelete(
          `${graphConfig.graphEventEndPoint}${eventID}`,
          response.accessToken
        ).then((response) => props.requestEvents());
      })
      .catch((e) => console.log("delete error"));
  }

  const holidays = events.map((event, index) => {
    const startDate = event.start.dateTime.slice(0, 10);
    let endDate = new Date(event.end.dateTime);
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    const timeDiff = endDateTime - startDateTime;
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const isPrinted = event.bodyPreview === "ok";
    const printDate = new Date().toISOString().slice(0, 10);
    const year = new Date().getFullYear();
    let confirmedBy = "";

    endDate.setDate(endDate.getDate());
    endDate = endDate.toISOString().slice(0, 10);

    event.attendees.forEach((attendent) => {
      if (attendent.status.response === "accepted") {
        confirmedBy = confirmedBy + attendent.emailAddress.name.slice(16) + " ";
      }
    });

    const handleHolidayApplication = () => {
      const data = {
        name: profile.givenName,
        surname: profile.surname,
        location: "Wrocław",
        signDate: printDate,
        startDate: startDate,
        endDate: endDate,
        year: year,
      };
      generateHolidayApplication(data);
      patchEvent(event.id);
    };

    const handleDeleteEvent = () => {
      deleteEvent(event.id);
      props.requestEvents();
      console.log("deleted event");
    };

    return (
      <Card
        style={{ marginBottom: "2rem" }}
        key={index}
        days={days}
        isprinted={Number(isPrinted)}
      >
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Urlop numer {index + 1}</h5>
          <Button
            className="btn btn-close bg-transparent"
            onClick={handleDeleteEvent}
          ></Button>
        </Card.Header>
        <Card.Body>
          {/* <Card.Text> */}
          <div>
            Ilość dni: <strong>{days}</strong>
          </div>
          <div>
            Od: <strong>{startDate}</strong>
          </div>
          <div>
            Do: <strong>{endDate}</strong>
          </div>
          <div>
            Lokalizacja: <strong>{event.location.displayName}</strong>
          </div>
          <div>
            Zatwierdzony przez: <strong>{confirmedBy}</strong>
          </div>
          <div className="d-flex justify-content-between">
            {isPrinted ? (
              <Button className="btn btn-secondary btn-lg px-4 my-3" disabled>
                Wniosek wydrukowany
              </Button>
            ) : (
              <Button
                className="btn btn-primary btn-lg px-4 my-3"
                onClick={handleHolidayApplication}
              >
                Drukuj wniosek
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  });

  const calculateStats = () => {
    setStats({
      daysTaken: 0,
      notPrintedApps: 0,
    });

    holidays.forEach((holiday) => {
      setStats((prevState) => ({
        daysTaken: prevState.daysTaken + holiday.props.days,
        notPrintedApps: !holiday.props.isprinted
          ? prevState.notPrintedApps + 1
          : prevState.notPrintedApps,
      }));
    });
  };

  useEffect(() => {
    calculateStats();
  }, [events]);

  return (
    <>
      <div id="profile">
        {props?.profile && (
          <>
            <div className="px-4 py-2 my-2 text-center">
              <h1 className="display-5 fw-bold">
                Witaj {profile.displayName} !
              </h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-2">
                  Masz zaległych <strong>{stats.notPrintedApps}</strong>{" "}
                  wniosków do wydrukowania
                </p>
                <p className="lead mb-2">
                  Byłeś w tym roku: <strong>{stats.daysTaken}</strong> dni na
                  urlopie.
                </p>
                <p className="lead mb-2">
                  Pozostało do wykorzystania{" "}
                  <strong>{26 - stats.daysTaken}</strong> dni.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <HolidayForm
        profile={profile}
        requestEvents={props.requestEvents}
        events={events}
      />
      {holidays}
    </>
  );
};
