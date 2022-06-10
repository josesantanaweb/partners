import React, { useContext, useState } from "react";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  PreviewAltCard,
} from "../../components/Component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { findUpper } from "../../utils/Utils";
import { useForm } from "react-hook-form";
import { AdviserContext } from "./AdviserContext";
import AdvisersServices from "../../services/AdvisersServices";

const AdviserList = () => {
  const { contextData } = useContext(AdviserContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [birthDate, setBirthDate] = useState(new Date());
  const [editBirthDate, setEditBirthDate] = useState(new Date());

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  const getAdvisers = async (filter) => {
    try {
      const advisers = await AdvisersServices.getAdvisers(filter);
      setData(advisers.data);
    } catch (error) {}
  };

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    mobilePhone: "",
    landlinePhone: "",
    observation: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [sm, updateSm] = useState(false);

  const { errors, register, handleSubmit } = useForm();

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      lastName: "",
      email: "",
      password: "",
      mobilePhone: "",
      landlinePhone: "",
      observation: "",
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, paternalLastName, email, password, mobilePhone, observation } = submitData;
    let submittedData = {
      name: name,
      paternalLastName: paternalLastName,
      email: email,
      password: password,
      observation: observation,
      mobilePhone: mobilePhone,
      birthDate: birthDate,
    };
    try {
      await AdvisersServices.addAdviser(submittedData);
      resetForm();
      getAdvisers();
      setModal({ edit: false }, { add: false });
      setErrorMessage("");
    } catch (error) {
      if (error.response.data.message === "This advisor already exists") {
        setErrorMessage("Asesor ya existe");
      }
    }
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, paternalLastName, mobilePhone, observation, landlinePhone } = submitData;
    let submittedData = {
      name: name,
      paternalLastName: paternalLastName,
      mobilePhone: mobilePhone,
      landlinePhone: landlinePhone,
      observation: observation,
      birthDate: editBirthDate,
    };

    try {
      await AdvisersServices.editAdviser(editData.id, submittedData);
      resetForm();
      getAdvisers();
      setModal({ edit: false }, { add: false });
      setErrorMessage("");
    } catch (error) {
      if (error.response.data.message === "you do not have the necessary permits") {
        setErrorMessage("No tienes permisos para editar");
      }
    }
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
    setEditBirthDate(new Date(data.birthDate));
  };

  // Function to change to delete property for an item
  const deleteUser = async (id) => {
    try {
      await AdvisersServices.deleteAdviser(id);
      getAdvisers();
    } catch (error) {}
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onFilter = (e) => {
    if (e.target.value.length > 1) {
      getAdvisers(e.target.value);
    } else {
      getAdvisers("");
    }
  };

  return (
    <React.Fragment>
      <Head title="Asesores"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Asesores
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {data.length} asesores</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <input className="form-control" onChange={onFilter} placeholder="Buscar" />
                    </li>
                    <li className="nk-block-tools-opt">
                      <a href={`${process.env.REACT_APP_API_URL}/export-information/advisors`}>
                        <Button color="primary" type="button">
                          <Icon name="printer" className="mr-1"></Icon>
                          Exportar
                        </Button>
                      </a>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Asesor
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow>
                <span className="sub-text">#</span>
              </DataTableRow>
              <DataTableRow size="xs">
                <span className="sub-text">Asesor</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Telefono</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Estado</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text"></span>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow>
                      <span>{item.id}</span>
                    </DataTableRow>
                    <DataTableRow size="xs">
                      <div className="user-card">
                        <UserAvatar theme="purple" text={findUpper(item.name)}></UserAvatar>
                        <div className="user-info">
                          <span className="tb-lead">
                            {item.name} {item.paternalLastName} <span className="dot dot-success d-md-none ml-1"></span>
                          </span>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{item.mobilePhone}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className={`tb-status text-success`}>{item.status.name}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        <li className="nk-tb-action-hidden" onClick={() => onEditClick(item.id, item)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"edit" + 1}
                            icon="edit-alt-fill"
                            direction="top"
                            text="Edit"
                          />
                        </li>
                        <li className="nk-tb-action-hidden" onClick={() => deleteUser(item.id)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"delete" + 1}
                            icon="trash-fill"
                            direction="top"
                            text="Delete"
                          />
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>

          <PreviewAltCard>
            {currentItems.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">Sin Registros</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Agregar Asesor</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Asesor ya existe
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Apellido</label>
                      <input
                        className="form-control"
                        type="text"
                        name="paternalLastName"
                        defaultValue={formData.paternalLastName}
                        placeholder="Ingresa apellido"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.paternalLastName && <span className="invalid">{errors.paternalLastName.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Correo electronico</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Ingresa apellido"
                        ref={register({
                          required: "Este campo es requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Contrasena</label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        defaultValue={formData.email}
                        placeholder="Ingresa contrasena"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.password && <span className="invalid">{errors.password.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Telefono</label>
                      <input
                        className="form-control"
                        type="text"
                        name="mobilePhone"
                        defaultValue={formData.mobilePhone}
                        placeholder="Ingresa telefono"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Telefono 2</label>
                      <input
                        className="form-control"
                        type="text"
                        name="landlinePhone"
                        defaultValue={formData.landlinePhone}
                        placeholder="Ingresa telefono"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Fecha de nacimiento</label>
                      <DatePicker
                        selected={birthDate}
                        className="form-control"
                        onChange={(date) => setBirthDate(date)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Observacion</label>
                      <textarea
                        className="form-control"
                        name="observation"
                        placeholder="Ingresa Observacion"
                        cols="30"
                        rows="10"
                        defaultValue={formData.observation}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Usuario
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                            setErrorMessage("");
                          }}
                          className="link link-light"
                        >
                          Cancelar
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Actualizar Asesor</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    No tienes permisos para editar
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={editData?.name}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Apellido</label>
                      <input
                        className="form-control"
                        type="text"
                        name="paternalLastName"
                        defaultValue={editData?.paternalLastName}
                        placeholder="Ingresa apellido"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.paternalLastName && <span className="invalid">{errors.paternalLastName.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Telefono</label>
                      <input
                        className="form-control"
                        type="text"
                        name="mobilePhone"
                        defaultValue={editData?.mobilePhone}
                        placeholder="Ingresa telefono"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Telefono 2</label>
                      <input
                        className="form-control"
                        type="text"
                        name="landlinePhone"
                        defaultValue={editData?.landlinePhone}
                        placeholder="Ingresa telefono 2"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Fecha de nacimiento</label>
                      <DatePicker
                        selected={editBirthDate}
                        className="form-control"
                        defaultValue={editData?.birthDate}
                        onChange={(date) => setEditBirthDate(date)}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Observacion</label>
                      <textarea
                        className="form-control"
                        name="observation"
                        placeholder="Ingresa Observacion"
                        cols="30"
                        rows="10"
                        defaultValue={editData?.observation}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Asesor
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                            setErrorMessage("");
                          }}
                          className="link link-light"
                        >
                          Cancelar
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default AdviserList;
