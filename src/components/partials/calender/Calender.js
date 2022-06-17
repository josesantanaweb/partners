import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import DatePicker from "react-datepicker";
import { Popover, PopoverHeader, PopoverBody, ModalHeader, Modal, ModalBody, FormGroup, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Row, RSelect } from "../../Component";
import { setDateForPicker } from "../../../utils/Utils";
import moment from "moment";
import "moment/locale/es";

const CalenderApp = ({ events, onDelete, onEdit, categoriesOptions }) => {
  const [modalState, updateModal] = useState(false);
  const [mockEvents, updateEvents] = useState(events);
  const [event, updateEvent] = useState({});
  const [edit, updateEditModal] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [dates, setDates] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    updateEvents(events);
  }, [events]);

  const { errors, register, handleSubmit } = useForm();

  const handleFormSubmit = (formData) => {
    let newEvent = {};
    newEvent = {
      id: event.id,
      title: formData.title,
      start: event.start,
      end: event.end,
      description: formData.description,
      categoryId: categoryId,
    };
    onEdit(newEvent);
    toggleEdit();
  };

  const toggle = () => {
    updateModal(!modalState);
  };

  const toggleEdit = () => {
    updateEditModal(!edit);
  };

  const onCategoriesChange = (value) => {
    setCategoryId(value.value);
  };

  const handleEventClick = (info) => {
    const event = events.find((item) => item.id === Number(info.event._def.publicId));
    updateEvent(event);
    toggle();
  };

  return (
    <React.Fragment>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
        events={mockEvents}
        eventClick={(info) => handleEventClick(info)}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title prev,next",
          center: null,
          right: "today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        themeSystem="bootstrap"
        height={800}
        contentHeight={780}
        aspectRatio={3}
        editable={true}
        droppable={true}
      />

      <Modal isOpen={modalState} toggle={toggle} className="modal-md">
        <ModalHeader className={event && event.className} toggle={toggle}>
          {event && event.title}
        </ModalHeader>
        <ModalBody>
          <Row className="gy-3 py-1">
            <Col sm="6">
              <h6 className="overline-title">Inicio</h6>
              <p id="preview-event-start">{event && moment(event.start).format("Do MMMM YYYY")}</p>
            </Col>
            <Col sm="6" id="preview-event-end-check">
              <h6 className="overline-title">Final</h6>
              <p id="preview-event-end">{event && moment(event.end).format("Do MMMM YYYY")}</p>
            </Col>
            <Col sm="10" id="preview-event-description-check">
              <h6 className="overline-title">Descripcion</h6>
              <p id="preview-event-description">{event && event.description}</p>
            </Col>
          </Row>
          <ul className="d-flex justify-content-between gx-4 mt-3">
            <li>
              <Button
                color="primary"
                onClick={() => {
                  toggle();
                  toggleEdit();
                }}
              >
                Editar Evento
              </Button>
            </li>
            <li>
              <Button
                color="danger"
                className="btn-dim"
                onClick={() => {
                  toggle();
                  // onDelete(event && event.id);
                }}
              >
                Borrar
              </Button>
            </li>
          </ul>
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>Editar Evento</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <label className="form-label" htmlFor="event-title">
                    Titulo de Evento
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="event-title"
                      name="title"
                      className="form-control"
                      ref={register()}
                      defaultValue={event.title}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <label className="form-label">Inicio</label>
                  <Row className="gx-2">
                    <div className="w-55">
                      <div className="form-control-wrap">
                        <DatePicker
                          selected={new Date(event.start)}
                          onChange={(date) => updateEvent({ ...event, start: setDateForPicker(date) })}
                          className="form-control date-picker"
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                    <div className="w-45">
                      <div className="form-control-wrap has-timepicker">
                        <DatePicker
                          selected={dates.startTime}
                          onChange={(date) => setDates({ ...dates, startTime: date })}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control date-picker"
                        />
                      </div>
                    </div>
                  </Row>
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <label className="form-label">Final</label>
                  <Row className="gx-2">
                    <div className="w-55">
                      <div className="form-control-wrap">
                        <DatePicker
                          selected={new Date(event.end)}
                          onChange={(date) => updateEvent({ ...event, end: setDateForPicker(date) })}
                          className="form-control date-picker"
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                    <div className="w-45">
                      <div className="form-control-wrap has-timepicker">
                        <DatePicker
                          selected={dates.endTime}
                          onChange={(date) => setDates({ ...dates, endTime: date })}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control date-picker"
                        />
                      </div>
                    </div>
                  </Row>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <label className="form-label" htmlFor="event-description">
                    Descripcion de Evento
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      id="event-description"
                      name="description"
                      ref={register()}
                      defaultValue={event.description}
                    ></textarea>
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <label className="form-label">Categoria</label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={categoriesOptions}
                      defaultValue={{
                        value: 1,
                        label: "Reunion Presencial",
                      }}
                      onChange={onCategoriesChange}
                      //ref={register({ required: true })}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <ul className="d-flex justify-content-between gx-4 mt-1">
                  <li>
                    <Button type="submit" color="primary">
                      Editar Evento
                    </Button>
                  </li>
                  <li>
                    <Button color="danger" className="btn-dim" onClick={toggleEdit}>
                      Cancelar
                    </Button>
                  </li>
                </ul>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CalenderApp;
