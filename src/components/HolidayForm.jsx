import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

const HolidayForm = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [date, setDate] = useState([today, tomorrow]);
  const [localization, setLocalization] = useState("");

  const [show, setShow] = useState(false);

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
                style={{ zIndex: 1100 }}
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
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
              />
              <label class="btn btn-outline-primary" for="btnradio1">
                Radio 1
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="btnradio2">
                Radio 2
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio3"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="btnradio3">
                Radio 3
              </label>
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
