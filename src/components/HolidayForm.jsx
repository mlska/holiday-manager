import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

import { loginRequest, graphConfig } from "../authConfig";
import { callMsGraphPost } from "../graph";

import { useMsal } from "@azure/msal-react";

const HolidayForm = ({ profile, requestEvents, events }) => {
  const { instance, accounts } = useMsal();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleResetInputs();
    setValidateMessage("");
  };

  const handleResetInputs = () => {
    setLocalization("");
    setDate([today, tomorrow]);
    setRadioValue(types[0]);
    setCheckedOne(true);
    setCheckedTwo(true);
    setCheckedThree(true);
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [date, setDate] = useState([today, tomorrow]);

  const [localization, setLocalization] = useState("");
  const handleLocalization = (event) => setLocalization(event.target.value);

  const types = [
    "Wypoczynkowy",
    "Okolicznościowy",
    "Rehabilitacyjny",
    "Opiekuńczy",
    "Szkoleniowy",
  ];

  const [radioValue, setRadioValue] = useState(types[0]);

  const handleOnChange = (event) => {
    setRadioValue(event.target.value);
  };

  const TypesComponent = types.map((type) => (
    <Form.Check
      key={`radio-${type}`}
      type="radio"
      name="types"
      label={type}
      value={type}
      onChange={handleOnChange}
      checked={radioValue === type}
    />
  ));
  const verifiedDomain =
    profile.mail.substring(profile.mail.indexOf("@") + 1) ===
    process.env.REACT_APP_DOMAIN;

  const attendees = [
    {
      name: profile.givenName + " " + profile.surname,
      mail: profile.mail,
    },
  ];

  if (verifiedDomain) {
    attendees.push(...JSON.parse(process.env.REACT_APP_ATTENDEES));
  }

  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(true);
  const [checkedThree, setCheckedThree] = useState(true);

  const handleOnChangeOne = () => {
    setCheckedOne(!checkedOne);
  };
  const handleOnChangeTwo = () => {
    setCheckedTwo((prevState) => !prevState);
  };
  const handleOnChangeThree = () => {
    setCheckedThree((prevState) => !prevState);
  };

  const AttendeesComponent = attendees.map(
    (attendee, index) =>
      index > 0 && (
        <Form.Check
          key={`radio-${index}`}
          type="checkbox"
          label={attendee.name}
          checked={
            (index === 1 && checkedOne) ||
            (index === 2 && checkedTwo) ||
            (index === 3 && checkedThree)
          }
          value={
            (index === 1 && checkedOne) ||
            (index === 2 && checkedTwo) ||
            (index === 3 && checkedThree)
          }
          onChange={
            (index === 1 && handleOnChangeOne) ||
            (index === 2 && handleOnChangeTwo) ||
            (index === 3 && handleOnChangeThree)
          }
        />
      )
  );

  const messages = {
    success: "Utworzono nowy urlop",
    error: "Błąd wysyłania urlopu",
  };

  const [validateMessage, setValidateMessage] = useState("");

  const ValidateMessageComponent =
    validateMessage.length === messages.success.length ? (
      <p className="mt-4 mb-0 text-success">{validateMessage}</p>
    ) : (
      <p className="mt-4 mb-0 text-danger">{validateMessage}</p>
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    const startDate = date[0].toISOString().slice(0, 10);
    let end = date[1];
    end.setDate(date[1].getDate() + 1);

    const endDate = end.toISOString().slice(0, 10);

    const data = {
      initials: `${profile.givenName[0]}${profile.surname[0]}`,
      type: radioValue,
      start: startDate,
      end: endDate,
      location: localization,
      attendees: [
        {
          name: attendees[0].name,
          mail: attendees[0].mail,
        },
        {
          name: checkedOne && attendees[1].name,
          mail: checkedOne && attendees[1].mail,
        },
        {
          name: checkedTwo && attendees[2].name,
          mail: checkedTwo && attendees[2].mail,
        },
        {
          name: checkedThree && attendees[3].name,
          mail: checkedThree && attendees[3].mail,
        },
      ],
    };
    let isOverlapping = false;

    events.forEach((event) => {
      const start = event.start.dateTime.slice(0, 10);
      const end = event.end.dateTime.slice(0, 10);
      console.log(event);
      if (end >= data.start && start <= data.end) {
        console.log("konflikt urlopu");
        isOverlapping = true;
        return;
      }
    });

    if (isOverlapping) {
      setValidateMessage("Masz już urlop w tym okresie");
    } else {
      const request = {
        ...loginRequest,
        account: accounts[0],
      };

      instance
        .acquireTokenSilent(request)
        .then((response) =>
          callMsGraphPost(
            graphConfig.graphEventEndPoint,
            response.accessToken,
            data
          ).then((response) => {
            setValidateMessage(messages.success);
            handleResetInputs();
            setTimeout(() => {
              setShow(false);
              requestEvents();
            }, 3000);
          })
        )
        .catch((e) => {
          setValidateMessage(messages.error);
          console.log(e);
        });
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="d-block mx-auto mb-4 btn-lg"
      >
        Dodaj urlop
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nowy urlop</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="d-flex row w-100 justify-items-center gap-2">
              <label>
                Data
                <DateRangePicker
                  className="d-block"
                  value={date}
                  onChange={setDate}
                  format={"dd-MM-yyyy"}
                  isoWeek={true}
                  character={" ~ "}
                />
              </label>
              <label>
                Lokaliacja
                <input
                  type="text"
                  onChange={handleLocalization}
                  value={localization}
                  className="d-block"
                />
              </label>
              <div>
                <div className="mb-1">Rodzaj</div>
                {TypesComponent}
              </div>
              <div>
                <div className="mb-1">Wyślij do</div>
                {AttendeesComponent}
              </div>
            </div>
            {ValidateMessageComponent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button variant="primary" type="submit">
              Potwierdź
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default HolidayForm;
