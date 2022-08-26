import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

const HolidayForm = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [date, setDate] = useState([today, tomorrow]);
  const [localization, setLocalization] = useState("");

  const [show, setShow] = useState(false);

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

  const attendees = [
    {
      name: "Jakub Kamiński",
      mail: "jakub.kaminski@blue-robotics.pl",
    },
    {
      name: "Piotr Bieda",
      mail: "piotr.bieda@blue-robotics.pl",
    },
    {
      name: "Katarzyna Trzcińska",
      mail: "katarzyna.trzcinska@blue-robotics.pl",
    },
  ];

  const [checkBoxValue, setCheckBoxValue] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLocalization = (event) => setLocalization(event.target.value);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="d-block mx-auto mb-4"
      >
        Dodaj urlop
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nowy urlop</Modal.Title>
        </Modal.Header>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Potwierdź
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default HolidayForm;
