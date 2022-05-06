import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import CalenderApp from "../../../components/partials/calender/Calender";
import DatePicker from "react-datepicker";
import { Modal, ModalBody, FormGroup, ModalHeader, Button } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  Icon,
  PreviewAltCard,
  Row,
  RSelect,
} from "../../../components/Component";
import { events } from "../../../components/partials/calender/CalenderData";
import { useForm } from "react-hook-form";
import { setDateForPicker } from "../../../utils/Utils";
import MettingServices from "../../../services/MettingServices";

const Metting = () => {
  const [modal, setModal] = useState(false);
  const [mockEvents, updateEvent] = useState(events);
  const [mettings, setMettings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [dates, setDates] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    endDate: new Date(),
  });
  const [theme, settheme] = useState("");
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getMettings();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories !== undefined) {
      categoriesOptionsData();
    }
  }, [categories]);

  const getMettings = async () => {
    try {
      const mettings = await MettingServices.getMettings();
      setMettings(mettings.data);
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const categories = await MettingServices.getCategories();
      setCategories(categories);
    } catch (error) {}
  };

  const categoriesOptionsData = () => {
    const categoriesOptionsData = categories?.map((item) => ({ label: item.name, value: item.id }));
    setCategoriesOptions(categoriesOptionsData);
  };

  const onCategoriesChange = (value) => {
    setCategoryId(value.value);
  };

  const { errors, register, handleSubmit } = useForm();

  const handleFormSubmit = async (formData) => {
    let newEvent = {
      title: formData.title,
      start: setDateForPicker(dates.startDate),
      end: setDateForPicker(dates.endDate),
      description: formData.description,
      categoryId: categoryId,
    };
    try {
      await MettingServices.addMetting(newEvent);
      getMettings();
    } catch (error) {}
    toggle();
  };

  const editEvent = async (formData) => {
    let newEvents = mockEvents;
    const index = newEvents.findIndex((item) => item.id === formData.id);
    events[index] = formData;
    console.log(events[index]);
    try {
      await MettingServices.editMetting(events[index].id, events[index]);
      getMettings();
    } catch (error) {}
  };

  const deleteEvent = async (id) => {
    let filteredEvents = mockEvents.filter((item) => item.id !== id);
    updateEvent(filteredEvents);
    try {
      await MettingServices.deleteMetting(id);
      getMettings();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head title="Calender" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Agenda</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="primary" onClick={toggle}>
                <Icon name="plus" />
                <span>Agregar evento</span>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <PreviewAltCard>
            <CalenderApp
              events={mettings}
              onDelete={deleteEvent}
              onEdit={editEvent}
              categoriesOptions={categoriesOptions}
              onCategoriesChange={onCategoriesChange}
            />
          </PreviewAltCard>
        </Block>
      </Content>
      <Modal isOpen={modal} toggle={toggle} className="modal-md">
        <ModalHeader toggle={toggle}>Agregar evento</ModalHeader>
        <ModalBody>
          <form className="form-validate is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="gx-4 gy-3">
              <Col size="12">
                <FormGroup>
                  <label className="form-label" htmlFor="event-title">
                    Titulo de evento
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="event-title"
                      name="title"
                      className="form-control"
                      ref={register({ required: true })}
                    />
                    {errors.title && <p className="invalid">Este campo es requerido</p>}
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
                          selected={dates.startDate}
                          onChange={(date) => setDates({ ...dates, startDate: date })}
                          className="form-control date-picker"
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
                          selected={dates.endDate}
                          onChange={(date) => setDates({ ...dates, endDate: date })}
                          className="form-control date-picker"
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
                    Descripcion de evento
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control"
                      id="event-description"
                      name="description"
                      ref={register({ required: true })}
                    ></textarea>

                    {errors.description && <p className="invalid">Este campo es requerido</p>}
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
                      Agregar evento
                    </Button>
                  </li>
                  <li>
                    <Button color="danger" className="btn-dim" onClick={toggle}>
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
export default Metting;
