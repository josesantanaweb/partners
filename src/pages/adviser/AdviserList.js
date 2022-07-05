import React, { useContext, useState } from "react";
import { FormGroup, Modal, ModalBody, Form, Alert, NavItem, NavLink, TabContent, TabPane, Nav } from "reactstrap";
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
import classnames from "classnames";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { findUpper } from "../../utils/Utils";
import { useForm } from "react-hook-form";
import { AdviserContext } from "./AdviserContext";
import AdvisersServices from "../../services/AdvisersServices";
import Swal from "sweetalert2";
registerLocale("es", es);

const AdviserList = () => {
  const { contextData } = useContext(AdviserContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [addActiveTab, setAddActiveTab] = useState("1");
  const [editData, setEditData] = useState();
  const [birthDate, setBirthDate] = useState(new Date());
  const [editBirthDate, setEditBirthDate] = useState(new Date());

  const [rutIssueDate, setRutIssueDate] = useState(new Date());
  const [rutExpirationDate, setRutExpirationDate] = useState(new Date());

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
  // const deleteUser = async (id) => {
  //   try {
  //     await AdvisersServices.deleteAdviser(id);
  //     getAdvisers();
  //   } catch (error) {
  //     throw new Error("Error deleting record!");
  //   }
  // };

  // Function to change to delete property for an item
  const deleteUser = (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary m-1",
          cancelButton: "btn btn-light m-1",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Estás seguro?",
          text: "Se eliminará el registor seleccionado!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          getAdvisers();
          if (result.isConfirmed) {
            AdvisersServices.deleteAdviser(id);
            getAdvisers();
            swalWithBootstrapButtons.fire("Eliminado!", "El registro ha sido elimindo exitosamente!.", "success");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Acción cancelada", "El registro está seguro!", "error");
          }
        });
    } catch (error) {
      throw new Error("Error deleting record!");
    }
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
              <DataTableRow className="text-center">
                <span className="sub-text">#</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span className="sub-text">Asesor</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span className="sub-text">Telefono</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span className="sub-text">Estado</span>
              </DataTableRow>
              <DataTableRow className="text-center">
                <span className="sub-text">Acción</span>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow className="text-center">
                      <span>{item.id}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <div className="user-card pl-5">
                        <UserAvatar theme="purple" text={findUpper(item.name)}></UserAvatar>
                        <div className="user-info">
                          <span className="tb-lead">
                            {item.name} {item.paternalLastName} <span className="dot dot-success d-md-none ml-1"></span>
                          </span>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.mobilePhone || "9 99999999"}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span className={`tb-status text-success`}>{item.status.name}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        <li className="nk-tb-action" onClick={() => onEditClick(item.id, item)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"edit" + 1}
                            icon="edit-alt-fill"
                            direction="top"
                            text="Editar"
                          />
                        </li>
                        <li className="nk-tb-action" onClick={() => deleteUser(item.id)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"delete" + 1}
                            icon="trash-fill"
                            direction="top"
                            text="Eliminar"
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

        <Modal isOpen={modal.add} toggle={() => setModal({ add: true })} className="modal-dialog-centered" size="lg">
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
              <Nav tabs>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTab === "1" })}
                    onClick={() => setAddActiveTab("1")}
                  >
                    Informacion Principal
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTab === "2" })}
                    onClick={() => setAddActiveTab("2")}
                  >
                    Documentos
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={addActiveTab}>
                <TabPane tabId="1">
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
                          {errors.paternalLastName && (
                            <span className="invalid">{errors.paternalLastName.message}</span>
                          )}
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
                            dateFormat="dd/MM/yyyy"
                            locale="es"
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
                </TabPane>
                <TabPane tabId="2">
                  <div className="mt-4 table-scroll">
                    <Form className="row gy-4">
                      <Col md="4">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="menuItems"
                            className="custom-control-input form-control"
                            id="certificado"
                          />
                          <label className="custom-control-label" htmlFor="certificado">
                            ¿Tiene Certificado?
                          </label>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="menuItems"
                            className="custom-control-input form-control"
                            id="certificado"
                          />
                          <label className="custom-control-label" htmlFor="certificado">
                            ¿Tiene Titulo de Estudios?
                          </label>
                        </div>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Indique la Carrera de Estudio</label>
                          <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Ingresa carrera de estudio"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Duracion en Semestres</label>
                          <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Ingresa duracion en semestres"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Contacto de Urgencia</label>
                          <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Ingresa contacto de urgencia"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Clinica o hospital para Urgencias</label>
                          <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Ingresa clinica o hospital para urgencias"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <h6>Subir Documentos</h6>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Cedula Frontal</label>
                          <input className="form-control" type="file" name="description" />
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Cedula Posterior</label>
                          <input className="form-control" type="file" name="description" />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de emisión</label>
                          <DatePicker
                            selected={rutIssueDate}
                            className="form-control"
                            onChange={(date) => {
                              setRutIssueDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de expiracion</label>
                          <DatePicker
                            selected={rutExpirationDate}
                            className="form-control"
                            onChange={(date) => {
                              setRutExpirationDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <label className="form-label">Certificado CAMV</label>
                          <input className="form-control" type="file" name="description" />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de Ingreso</label>
                          <DatePicker
                            selected={rutIssueDate}
                            className="form-control"
                            onChange={(date) => {
                              setRutIssueDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de expiracion</label>
                          <DatePicker
                            selected={rutExpirationDate}
                            className="form-control"
                            onChange={(date) => {
                              setRutExpirationDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <label className="form-label">Cerficado de Estudios</label>
                          <input className="form-control" type="file" name="description" />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de Ingreso</label>
                          <DatePicker
                            selected={rutIssueDate}
                            className="form-control"
                            onChange={(date) => {
                              setRutIssueDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de expiracion</label>
                          <DatePicker
                            selected={rutExpirationDate}
                            className="form-control"
                            onChange={(date) => {
                              setRutExpirationDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
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
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: true })} className="modal-dialog-centered" size="lg">
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
                        dateFormat="dd/MM/yyyy"
                        locale="es"
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
