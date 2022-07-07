import React, { useEffect, useContext, useState, useRef } from "react";
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
  RSelect,
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
import CountriesServices from "../../services/CountriesServices";

import Swal from "sweetalert2";
registerLocale("es", es);

const AdviserList = () => {
  const { contextData } = useContext(AdviserContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [addActiveTab, setAddActiveTab] = useState("1");
  const [editData, setEditData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [sm, updateSm] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const [birthDate, setBirthDate] = useState(new Date());
  const [editBirthDate, setEditBirthDate] = useState(new Date());
  const [identificationDocumentIssueDate, setIdentificationDocumentIssueDate] = useState(new Date());
  const [identificationDocumentExpirationDate, setIdentificationDocumentExpirationDate] = useState(new Date());
  const [CAMVCertificateIssueDate, setCAMVCertificateIssueDate] = useState(new Date());
  const [CAMVCertificateExpirationDate, setCAMVCertificateExpirationDate] = useState(new Date());
  const [studyCertificateIssueDate, setStudyCertificateIssueDate] = useState(new Date());
  const [studyCertificateExpirationDate, setStudyCertificateExpirationDate] = useState(new Date());

  const [countries, setCountries] = useState([]);
  const [countriesOptions, setCountriesOptions] = useState(countries);
  const [cities, setCities] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState(cities);

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  const getCountries = async () => {
    try {
      const countries = await CountriesServices.getCountries();
      const countriesData = await countries.data.map((country) => ({
        label: country?.name,
        value: country?.id,
      }));
      setCountries(countriesData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsCountriesChange = (optionValue) => {
    setCountriesOptions(optionValue);
  };

  countries.find((item) => item.id == countriesOptions.value);

  useEffect(() => {
    getCountries();
    if (countriesOptions.value) {
      return countries.find((item) => item.value == countriesOptions.value);
    }
  }, [countriesOptions.value]);

  const getCities = async () => {
    try {
      const cities = await CountriesServices.getCities();
      const citiesData = await cities.data.map((city) => ({
        label: city?.name,
        value: city?.id,
      }));
      setCities(citiesData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsCitiesChange = (optionValue) => {
    setCitiesOptions(optionValue);
  };
  // function to find document type
  cities.find((item) => item.id == citiesOptions.value);

  useEffect(() => {
    getCountries();
    if (citiesOptions.value) {
      return cities.find((item) => item.value == citiesOptions.value);
    }
  }, [citiesOptions.value]);

  const getAdvisers = async (filter) => {
    try {
      const advisers = await AdvisersServices.getAdvisers(filter);
      const advisersData = advisers.data((adviser) => adviser);
      setData(advisersData);
    } catch (error) {}
  };

  useEffect(() => {
    getAdvisers();
  }, []);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getCities();
  }, []);

  const citiesOptionsData = () => {
    const citiesOptionsData = cities?.map((item) => ({ name: item.name, value: item.id }));
    setCitiesOptions(citiesOptionsData);
  };

  const [formData, setFormData] = useState({
    name: "",
    paternalLastName: "",
    sex: "",
    mobilePhone: "",
    landlinePhone: "",
    birthDate: birthDate,
    observation: "",
    email: "",
    password: "",
    countryId: "",
    stateId: "",
    detailedAddress: "",
    haveCertificate: true,
    hasAnEducationalDegree: true,
    courseOfStudy: "",
    durationInSemesters: "",
    emergencyContact: "",
    clinicForEmergency: "",
    frontIdentificationDocumentFile: "",
    backSideIdentificationDocumentFile: "",
    identificationDocumentIssueDate: identificationDocumentIssueDate,
    identificationDocumentExpirationDate: identificationDocumentExpirationDate,
    CAMVCertificate: "",
    CAMVCertificateIssueDate: CAMVCertificateIssueDate,
    CAMVCertificateExpirationDate: CAMVCertificateExpirationDate,
    studyCertificate: "",
    studyCertificateIssueDate: studyCertificateIssueDate,
    studyCertificateExpirationDate: studyCertificateIssueDate,
    rut: "",
  });

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      paternalLastName: "",
      sex: "",
      mobilePhone: "",
      landlinePhone: "",
      birthDate: "",
      observation: "",
      email: "",
      password: "",
      countryId: "",
      stateId: "",
      detailedAddress: "",
      haveCertificate: true,
      hasAnEducationalDegree: true,
      courseOfStudy: "",
      durationInSemesters: "",
      emergencyContact: "",
      clinicForEmergency: "",
      frontIdentificationDocumentFile: "",
      backSideIdentificationDocumentFile: "",
      identificationDocumentIssueDate: "",
      identificationDocumentExpirationDate: "",
      CAMVCertificate: "",
      CAMVCertificateIssueDate: "",
      CAMVCertificateExpirationDate: "",
      studyCertificate: "",
      studyCertificateIssueDate: "",
      studyCertificateExpirationDate: "",
      rut: "",
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit funcion to add a new item
  const onFormSubmit = async (submitData) => {
    const {
      name,
      paternalLastName,
      sex,
      mobilePhone,
      landlinePhone,
      observation,
      email,
      password,
      detailedAddress,
      haveCertificate,
      hasAnEducationalDegree,
      courseOfStudy,
      durationInSemesters,
      emergencyContact,
      clinicForEmergency,
      frontIdentificationDocumentFile,
      backSideIdentificationDocumentFile,
      CAMVCertificate,
      studyCertificate,
      rut,
    } = submitData;
    let submittedData = {
      name: name,
      paternalLastName: paternalLastName,
      sex: sex,
      mobilePhone: mobilePhone,
      landlinePhone: landlinePhone,
      birthDate: birthDate,
      observation: observation,
      email: email,
      password: password,
      countryId: countriesOptions?.value,
      stateId: citiesOptions?.value,
      detailedAddress: detailedAddress,
      haveCertificate: false,
      hasAnEducationalDegree: false,
      courseOfStudy: courseOfStudy,
      durationInSemesters: durationInSemesters,
      emergencyContact: emergencyContact,
      clinicForEmergency: clinicForEmergency,
      frontIdentificationDocumentFile: frontIdentificationDocumentFile,
      backSideIdentificationDocumentFile: backSideIdentificationDocumentFile,
      identificationDocumentIssueDate: identificationDocumentIssueDate,
      identificationDocumentExpirationDate: identificationDocumentExpirationDate,
      CAMVCertificate: CAMVCertificate,
      CAMVCertificateIssueDate: CAMVCertificateIssueDate,
      CAMVCertificateExpirationDate: CAMVCertificateExpirationDate,
      studyCertificate: studyCertificate,
      studyCertificateIssueDate: studyCertificateIssueDate,
      studyCertificateExpirationDate: studyCertificateExpirationDate,
      rut: rut,
    };
    try {
      const formData = new FormData();
      let object = {};

      formData.append("name", name); //✅
      formData.append("paternalLastName", paternalLastName); //✅
      formData.append("sex", sex); //✅
      formData.append("mobilePhone", mobilePhone); //✅
      formData.append("landlinePhone", landlinePhone); //✅
      formData.append("birthDate", birthDate); //✅
      formData.append("observation", observation); //✅
      formData.append("email", email); //✅
      formData.append("password", password); //✅
      formData.append("countryId", countriesOptions?.value); //✅
      formData.append("stateId", citiesOptions?.value); //✅
      formData.append("detailedAddress", detailedAddress); //✅
      formData.append("haveCertificate", false); //✅
      formData.append("hasAnEducationalDegree", false); //✅
      formData.append("courseOfStudy", courseOfStudy); //✅
      formData.append("durationInSemesters", durationInSemesters); //✅
      formData.append("emergencyContact", emergencyContact); //✅
      formData.append("clinicForEmergency", clinicForEmergency); //✅
      formData.append("frontIdentificationDocumentFile", frontIdentificationDocumentFile[0].name); //✅
      formData.append("backSideIdentificationDocumentFile", backSideIdentificationDocumentFile[0].name); //✅
      formData.append("identificationDocumentIssueDate", identificationDocumentIssueDate); //✅
      formData.append("identificationDocumentExpirationDate", identificationDocumentExpirationDate); //✅
      formData.append("CAMVCertificate", CAMVCertificate[0].name); //✅
      formData.append("CAMVCertificateIssueDate", CAMVCertificateIssueDate); //✅
      formData.append("CAMVCertificateExpirationDate", CAMVCertificateExpirationDate); //✅
      formData.append("studyCertificate", studyCertificate[0].name); //✅
      formData.append("studyCertificateIssueDate", studyCertificateIssueDate); //✅
      formData.append("studyCertificateExpirationDate", studyCertificateExpirationDate); //✅
      formData.append("rut", rut); //✅

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));
      console.log(json);

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
                    <DataTableRow>
                      <div className="user-card d-flex align-items-center justify-content-center">
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
            <div className="p-2 table-records modal-scroll">
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
                      <Col md="12">
                        <FormGroup className="border-bottom pb-1">
                          <h6>Información básica</h6>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Rut</label>
                          <input
                            className="form-control"
                            type="text"
                            name="rut"
                            defaultValue={formData?.rut}
                            placeholder="Ingresa rut"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.name && <span className="invalid">{errors.name.message}</span>}
                          <small className="text-primary">Sin puntos ni guón</small>
                        </FormGroup>
                      </Col>
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
                          <label className="form-label">Correo electrónico</label>
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
                          <label className="form-label">Contraseña</label>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            defaultValue={formData.email}
                            placeholder="Ingresa contraseña"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.password && <span className="invalid">{errors.password.message}</span>}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Teléfono</label>
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
                          <label className="form-label">Teléfono 2</label>
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
                          {/* <DatePicker
                            selected={birthDate}
                            className="form-control"
                            onChange={(date) => setBirthDate(date)}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          /> */}
                          <input
                            className="form-control"
                            type="date"
                            name="accountOpeningDate"
                            defaultValue={formData?.birthDate}
                            ref={register()}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Sexo</label>
                          <input
                            className="form-control"
                            type="text"
                            name="sex"
                            defaultValue={formData.sex}
                            placeholder="Ingresa letra"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.sex && <span className="invalid">{errors.sex.message}</span>}
                          <small className="text-primary">Ingresa (M): Masculino, (F): Femenino, (O): Otro</small>
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup className="border-bottom pb-1">
                          <h6>Información residencial</h6>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">País</label>
                          <RSelect
                            value={countriesOptions}
                            options={countries}
                            onChange={onOptionsCountriesChange}
                            defautlValue={formData?.countryId}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Ciudad</label>
                          <RSelect
                            value={citiesOptions}
                            options={cities}
                            onChange={onOptionsCitiesChange}
                            defautlValue={formData?.stateId}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <label className="form-label">Dirección</label>
                          <input
                            className="form-control"
                            type="text"
                            name="detailedAddress"
                            defaultValue={formData.detailedAddress}
                            placeholder="Ingresa address"
                            ref={register()}
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
                            <NavItem className="bg-primary rounded">
                              <NavLink
                                style={{ color: "white", fontWeight: "bold" }}
                                tag="a"
                                href="#tab"
                                // tabId="2"
                                className={classnames({ active: addActiveTab === "2" })}
                                onClick={() => setAddActiveTab("2")}
                              >
                                Siguiente
                              </NavLink>
                            </NavItem>
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
                  <div className="mt-4">
                    <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                      <Col md="12">
                        <FormGroup className="border-bottom pb-1">
                          <h6>Información Académica y Universitaria</h6>
                        </FormGroup>
                      </Col>

                      {/* <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            id="certificado"
                            type="checkbox"
                            name="haveCertificate"
                            value={formData?.haveCertificate}
                            defaultChecked={false}
                            className="custom-control-input form-control"
                            placeholder="certificateA"
                            {...register("certificateA")}
                          />

                          <label className="custom-control-label" htmlFor="certificado">
                            ¿Tiene Certificado?
                          </label>
                        </div>
                      </Col> */}

                      {/* CX */}
                      {/* ! Prueba */}
                      {/* <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            placeholder="haveCertificate"
                            name="haveCertificate"
                            {...register("haveCertificate", {})}
                            defaultChecked={formData?.haveCertificate}
                            defautlValue={formData?.haveCertificate}
                          />
                        </div>

                        <label className="custom-control-label" htmlFor="haveCertificate">
                          ¿Tiene Certificado de estudios?
                        </label>
                      </Col> */}
                      {/* Prueba */}

                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            id="hasCertificate"
                            type="checkbox"
                            name="haveCertificate"
                            value={formData?.haveCertificate}
                            defaultChecked={formData?.hasAnEducationalDegree}
                            defautlValue={formData?.hasAnEducationalDegree}
                            className="custom-control-input form-control"
                            placeholder="certificateA"
                            {...register("certificateA")}
                          />
                          <label className="custom-control-label" htmlFor="hasCertificate">
                            ¿Tiene Certificado de estudios?
                          </label>
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="custom-control custom-checkbox">
                          <input
                            id="hasAnEducationalDegree"
                            type="checkbox"
                            name="haveCertificate"
                            value={formData?.haveCertificate}
                            defaultChecked={formData?.hasAnEducationalDegree}
                            defautlValue={formData?.hasAnEducationalDegree}
                            className="custom-control-input form-control"
                            placeholder="certificateA"
                            {...register("certificateA")}
                          />
                          <label className="custom-control-label" htmlFor="hasAnEducationalDegree">
                            ¿Tiene Certificado de estudios?
                          </label>
                        </div>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Indique la Carrera de Estudió</label>
                          <input
                            className="form-control"
                            type="text"
                            name="courseOfStudy"
                            defaultValue={formData?.courseOfStudy}
                            placeholder="Nombre de la carrera"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.courseOfStudy && <span className="invalid">{errors.courseOfStudy.message}</span>}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Duración en semestres</label>
                          <input
                            className="form-control"
                            type="text"
                            name="durationInSemesters"
                            defaultValue={formData?.durationInSemesters}
                            placeholder="Ingrese tiempo de duaración"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.durationInSemesters && (
                            <span className="invalid">{errors.durationInSemesters.message}</span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup className="border-bottom pb-1 pt-2">
                          <h6>Información de Emergencias</h6>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Contacto de Emergencia</label>
                          <input
                            className="form-control"
                            type="text"
                            name="emergencyContact"
                            defaultValue={formData.emergencyContact}
                            placeholder="Ingrese contacto"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.emergencyContact && (
                            <span className="invalid">{errors.emergencyContact.message}</span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup>
                          <label className="form-label">Clínica o Centro de emergencias</label>
                          <input
                            className="form-control"
                            type="text"
                            name="clinicForEmergency"
                            defaultValue={formData.clinicForEmergency}
                            placeholder="Ingrese clínica u hospital"
                            ref={register({ required: "Este campo es requerido" })}
                          />
                          {errors.clinicForEmergency && (
                            <span className="invalid">{errors.clinicForEmergency.message}</span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup className="border-bottom pb-1 pt-2">
                          <h6>Adjuntar documentos</h6>
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <Col md="12">
                          <FormGroup>
                            <label className="form-label">Cédula (Parte Frontal)</label>
                            <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                              <label className="file-input__label" htmlFor="file-input">
                                <input
                                  type="file"
                                  className="bg-light border-0"
                                  name="frontIdentificationDocumentFile"
                                  defaultValue={formData?.frontIdentificationDocumentFile}
                                  ref={register()}
                                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                                />
                              </label>
                            </div>
                          </FormGroup>
                        </Col>

                        <Col md="12" className="pt-2">
                          <FormGroup>
                            <label className="form-label">Cédula (Parte Posterior)</label>
                            <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                              <label className="file-input__label" htmlFor="file-input">
                                <input
                                  type="file"
                                  className="bg-light border-0"
                                  name="backSideIdentificationDocumentFile"
                                  defaultValue={formData?.backSideIdentificationDocumentFile}
                                  ref={register()}
                                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                                />
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de emisión (cédula)</label>
                          {/* <DatePicker
                            selected={identificationDocumentIssueDate}
                            className="form-control"
                            onChange={(date) => {
                              setIdentificationDocumentIssueDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          /> */}
                          <input
                            className="form-control"
                            type="date"
                            name="accountOpeningDate"
                            defaultValue={formData?.identificationDocumentIssueDate}
                            ref={register()}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de expiracion (cédula)</label>
                          {/* <DatePicker
                            selected={identificationDocumentExpirationDate}
                            className="form-control"
                            onChange={(date) => {
                              setIdentificationDocumentExpirationDate(date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="es"
                          /> */}
                          <input
                            className="form-control"
                            type="date"
                            name="accountOpeningDate"
                            defaultValue={formData?.identificationDocumentIssueDate}
                            ref={register()}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup className="border-bottom pb-1">
                          <h6>Mis Certificados</h6>
                        </FormGroup>
                      </Col>

                      <Col md="12" className="pt-2">
                        <FormGroup>
                          <label className="form-label">Certificado CAMV</label>
                          <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                            <label className="file-input__label" htmlFor="file-input">
                              <input
                                type="file"
                                className="bg-light border-0"
                                name="CAMVCertificate"
                                defaultValue={formData?.CAMVCertificate}
                                ref={register()}
                                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                              />
                            </label>
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de Ingreso (CAMV)</label>
                          <DatePicker
                            selected={CAMVCertificateIssueDate}
                            className="form-control"
                            onChange={(date) => {
                              setCAMVCertificateIssueDate(date);
                            }}
                            // dateFormat="dd/MM/yyyy"
                            dateFormat="MM/dd/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de expiración (CAMV)</label>
                          <DatePicker
                            selected={CAMVCertificateExpirationDate}
                            className="form-control"
                            onChange={(date) => {
                              setCAMVCertificateExpirationDate(date);
                            }}
                            // dateFormat="dd/MM/yyyy"
                            dateFormat="MM/dd/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="12" className="pt-2">
                        <FormGroup>
                          <label className="form-label">Certificado de estudios</label>
                          <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                            <label className="file-input__label" htmlFor="file-input">
                              <input
                                type="file"
                                className="bg-light border-0"
                                name="studyCertificate"
                                defaultValue={formData?.studyCertificate}
                                ref={register()}
                                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                              />
                            </label>
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de Ingreso</label>
                          <DatePicker
                            selected={studyCertificateIssueDate}
                            className="form-control"
                            onChange={(date) => {
                              setStudyCertificateIssueDate(date);
                            }}
                            // dateFormat="dd/MM/yyyy"
                            dateFormat="MM/dd/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" className="mb-4">
                        <FormGroup>
                          <label className="form-label">Fecha de Expiración</label>
                          <DatePicker
                            selected={studyCertificateExpirationDate}
                            className="form-control"
                            onChange={(date) => {
                              setStudyCertificateExpirationDate(date);
                            }}
                            // dateFormat="dd/MM/yyyy"
                            dateFormat="MM/dd/yyyy"
                            locale="es"
                          />
                        </FormGroup>
                      </Col>

                      {/* <Col md="6" className="mb-4">
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
                      </Col> */}

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
            <div className="p-2 table-records modal-scroll">
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
                        // dateFormat="dd/MM/yyyy"
                        dateFormat="MM/dd/yyyy"
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
