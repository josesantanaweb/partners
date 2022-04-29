import React, { useContext, useState, useEffect } from "react";
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
  PaginationComponent,
  Button,
  UserAvatar,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  PreviewAltCard,
  RSelect,
} from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm, useFieldArray } from "react-hook-form";
import { CustomersContext } from "./CustomersContext";
import CustomersServices from "../../services/CustomersServices";
import CountriesServices from "../../services/CountriesServices";

const CustomersListJuridico = () => {
  const { contextData } = useContext(CustomersContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState();
  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);

  const [modal, setModal] = useState({
    edit: false,
    add: false,
    document: false,
  });

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (countries !== undefined) {
      countriesOptionsData();
    }
  }, [countries]);

  useEffect(() => {
    if (cities !== undefined) {
      citiesOptionsData();
    }
  }, [cities]);

  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomers();
      setData(customers?.data);
    } catch (error) {}
  };

  const getCountries = async () => {
    try {
      const countries = await CountriesServices.getCountries();
      setCountries(countries.data);
    } catch (error) {}
  };

  const getCities = async () => {
    try {
      const cities = await CountriesServices.getCities(countryId);
      setCities(cities.data);
    } catch (error) {}
  };

  const countriesOptionsData = () => {
    const countriesOptionsData = countries?.map((item) => ({ label: item.name, value: item.id }));
    setCountriesOptions(countriesOptionsData);
  };

  const citiesOptionsData = () => {
    const citiesOptionsData = cities?.map((item) => ({ label: item.name, value: item.id }));
    setCitiesOptions(citiesOptionsData);
  };

  const [formData, setFormData] = useState({
    typeId: 2,
    companyName: "",
    giro: "",
    email: "",
    phone: "",
    singleTaxRole: "",
    observations: "",
    address: {
      countryId: 1,
      stateId: 1,
      communne: "",
    },
    antecedentsLegalRepresentative: {
      names: "",
      paternalLastName: "",
      isapre: "",
      afp: "",
      nationality: "",
      zipCode: "",
      email: "",
      rut: "",
      phone: "",
    },
    jointDebtor: {
      names: "",
      paternalLastName: "",
      rut: "",
      nationality: "",
      numberOfChildren: 1,
      typeOfDocument: "",
      employmentSituation: "",
    },
    currentAccountData: {
      bankName: "",
      accountType: "",
      sucursalAddress: "",
      accountNumber: "",
      accountOpeningDate: "",
    },
    beneficiaries: [
      {
        names: "",
        paternalLastName: "",
        email: "",
        percentage: "",
      },
    ],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [sm, updateSm] = useState(false);

  const { errors, register, control, handleSubmit } = useForm();
  const {
    fields: beneficiariesFields,
    append: appendBeneficiaries,
    remove: removeBeneficiaries,
  } = useFieldArray({ control, name: "beneficiaries", defaultValue: { names: "" } });

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      companyName: "",
      giro: "",
      typeId: 2,
      email: "",
      phone: "",
      singleTaxRole: "",
      observations: "",
      address: {
        countryId: 1,
        stateId: 1,
        communne: "",
      },
      antecedentsLegalRepresentative: {
        names: "",
        paternalLastName: "",
        isapre: "",
        afp: "",
        nationality: "",
        zipCode: "",
        email: "",
        rut: "",
        phone: "",
      },
      jointDebtor: {
        names: "",
        paternalLastName: "",
        rut: "",
        nationality: "",
        numberOfChildren: 1,
        typeOfDocument: "",
        employmentSituation: "",
      },
      currentAccountData: {
        bankName: "",
        accountType: "",
        sucursalAddress: "",
        accountNumber: "",
        accountOpeningDate: "",
      },
      beneficiaries: [],
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
    resetForm();
  };

  const onCountriesChange = (value) => {
    setCountryId(value.value);
    getCities();
  };
  const onCitiesChange = (value) => {
    setCityId(value.value);
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { companyName, giro, email, phone, singleTaxRole, observations, address } = submitData;
    let submittedData = {
      typeId: 2,
      companyName,
      giro,
      email,
      phone,
      singleTaxRole,
      observations,
      address: {
        countryId: countryId,
        stateId: cityId,
        communne: address.communne,
      },
    };
    try {
      await CustomersServices.addCustomer(submittedData);
      resetForm();
      getCustomers();
      setModal({ edit: false }, { add: false }, { document: false });
    } catch (error) {
      if (error.response.data.message === "This customer already exists") {
        setErrorMessage("Usuario ya existe");
      }
    }
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { companyName, giro, email, phone, singleTaxRole, observations } = submitData;
    let submittedData = {
      companyName: companyName,
      giro: giro,
      email: email,
      phone: phone,
      singleTaxRole: singleTaxRole,
      observations: observations,
    };

    try {
      await CustomersServices.editCustomer(editData.id, submittedData);
      resetForm();
      getCustomers();
      setModal({ edit: false }, { add: false }, { document: false });
    } catch (error) {}
  };

  // submit function to update a new item
  const onDocumentSubmit = async (submitData) => {
    const { antecedentsLegalRepresentative, jointDebtor, currentAccountData, beneficiaries, beneficiariesEdited } =
      submitData;

    if (beneficiariesEdited) {
      let submittedDataEdited = {
        antecedentsLegalRepresentative: antecedentsLegalRepresentative,
        jointDebtor: jointDebtor,
        currentAccountData: currentAccountData,
        beneficiaries: [...beneficiariesEdited],
      };
      try {
        await CustomersServices.editCustomer(editData.id, submittedDataEdited);
        resetForm();
        getCustomers();
        setModal({ edit: false }, { add: false }, { document: false });
      } catch (error) {}
    } else {
      let submittedData = {
        antecedentsLegalRepresentative: antecedentsLegalRepresentative,
        jointDebtor: jointDebtor,
        currentAccountData: currentAccountData,
        beneficiaries: beneficiaries,
      };
      try {
        await CustomersServices.editCustomer(editData.id, submittedData);
        resetForm();
        getCustomers();
        setModal({ edit: false }, { add: false }, { document: false });
      } catch (error) {}
    }
    console.log("submitData", submitData);
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
  };

  // function that loads the want to editted data
  const onDocumentClick = (id, data) => {
    setModal({ document: true }, { add: false }, { edit: false });
    setEditData(data);
    console.log(data);
  };

  // Function to change to delete property for an item
  const deleteUser = async (id) => {
    try {
      await CustomersServices.deleteCustomer(id);
      getCustomers();
    } catch (error) {}
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const filterCustomers = currentItems.filter((item) => item.type.id === 2);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddBeneficiarios = () => {
    appendBeneficiaries({
      names: "",
      paternalLastName: "",
      email: "",
      percentage: "",
    });
  };

  return (
    <React.Fragment>
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Clientes Juridicos
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {filterCustomers.length} clientes</p>
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
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Cliente
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="container-fluid overflow-auto scrollbar-fluid">
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow>
                  <span className="sub-text">#</span>
                </DataTableRow>
                <DataTableRow size="xs">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Tipo</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Codeudor</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Antecedentes Repr. Legal</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text"></span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {filterCustomers.length > 0
                ? filterCustomers.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow>
                        <span>{item.id}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          {item.companyName && (
                            <UserAvatar theme="purple" text={findUpper(item?.companyName)}></UserAvatar>
                          )}
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.companyName}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-info">{item.type?.name}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.jointDebtor?.names} {item.jointDebtor?.paternalLastName}{" "}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.jointDebtor?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.antecedentsLegalRepresentative?.names}{" "}
                              {item.antecedentsLegalRepresentative?.paternalLastName}{" "}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.antecedentsLegalRepresentative?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action-hidden" onClick={() => onDocumentClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"file" + 1}
                              icon="file-fill"
                              direction="top"
                              text="Edit"
                            />
                          </li>
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
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </PreviewAltCard>
          </div>
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
              <h5 className="title">Agregar Cliente</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Cliente ya existe
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Nombre de empresa</label>
                      <input
                        className="form-control"
                        type="text"
                        name="companyName"
                        defaultValue={formData.companyName}
                        placeholder="Ingresa Nombre de empresa"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.companyName && <span className="invalid">{errors.companyName.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Giro</label>
                      <input
                        className="form-control"
                        type="text"
                        name="giro"
                        defaultValue={formData.giro}
                        placeholder="Ingresa giro"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.giro && <span className="invalid">{errors.giro.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Correo</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Ingresa apellido"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Telefono</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        defaultValue={formData.phone}
                        placeholder="Ingresa Telefono"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Tax Role</label>
                      <input
                        className="form-control"
                        type="text"
                        name="singleTaxRole"
                        defaultValue={formData.singleTaxRole}
                        placeholder="Ingresa Tax Role"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.singleTaxRole && <span className="invalid">{errors.singleTaxRole.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Obseraviones</label>
                      <input
                        className="form-control"
                        type="text"
                        name="observations"
                        defaultValue={formData.observations}
                        placeholder="Ingresa Obseraviones"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.observations && <span className="invalid">{errors.observations.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Pais</label>
                      <RSelect
                        isSearchable={false}
                        options={countriesOptions}
                        defaultValue={formData.address.countryId}
                        onChange={onCountriesChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Ciudad</label>
                      <RSelect
                        isSearchable={false}
                        options={citiesOptions}
                        defaultValue={formData.address.stateId}
                        onChange={onCitiesChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Comuna</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address.communne"
                        defaultValue={formData.address.communne}
                        placeholder="Ingresa Comuna"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Cliente
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
              <h5 className="title">Actualizar Cliente</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Nombrede Empresa</label>
                      <input
                        className="form-control"
                        type="text"
                        name="companyName"
                        defaultValue={editData?.companyName}
                        placeholder="Ingresa nombre de empresa"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Giro</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={editData?.giro}
                        placeholder="Ingresa Giro"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Correo electronico</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={editData?.email}
                        placeholder="Ingresa Correo electronico"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Telefono</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        defaultValue={editData?.phone}
                        placeholder="Ingresa Telefono"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Rol Unico</label>
                      <input
                        className="form-control"
                        type="text"
                        name="singleTaxRole"
                        defaultValue={editData?.singleTaxRole}
                        placeholder="Ingresa Rol Unico"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Obseraviones</label>
                      <input
                        className="form-control"
                        type="text"
                        name="observations"
                        defaultValue={editData?.observations}
                        placeholder="Ingresa Obseraviones"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Cliente
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
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

        <Modal
          isOpen={modal.document}
          toggle={() => setModal({ document: false })}
          className="modal-dialog-centered"
          size="lg"
        >
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
              <h5 className="title">Actualizar Cliente</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onDocumentSubmit)}>
                  <>
                    <Col size="12">
                      <b>Antecedentes representante legal</b>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Nombre</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.names"
                          defaultValue={editData?.antecedentsLegalRepresentative?.names}
                          placeholder="Ingresa Nombre"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Apellido</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.paternalLastName"
                          defaultValue={editData?.antecedentsLegalRepresentative?.paternalLastName}
                          placeholder="Ingresa Apellido"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Isapre</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.isapre"
                          defaultValue={editData?.antecedentsLegalRepresentative?.isapre}
                          placeholder="Ingresa Isapre"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Afp</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.afp"
                          defaultValue={editData?.antecedentsLegalRepresentative?.afp}
                          placeholder="Ingresa Afp"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Nacionalidad</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.nationality"
                          defaultValue={editData?.antecedentsLegalRepresentative?.nationality}
                          placeholder="Ingresa Nacionalidad"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Codigo Postal</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.zipCode"
                          defaultValue={editData?.antecedentsLegalRepresentative?.zipCode}
                          placeholder="Ingresa Codigo Postal"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Correo electronico</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.email"
                          defaultValue={editData?.antecedentsLegalRepresentative?.email}
                          placeholder="Ingresa Correo electronico"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">RUT</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.rut"
                          defaultValue={editData?.antecedentsLegalRepresentative?.rut}
                          placeholder="Ingresa RUT"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Telefono</label>
                        <input
                          className="form-control"
                          type="text"
                          name="antecedentsLegalRepresentative.phone"
                          defaultValue={editData?.antecedentsLegalRepresentative?.phone}
                          placeholder="Ingresa Telefono"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>
                  </>

                  <>
                    <Col size="12">
                      <b>Deudor Solidario</b>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Nombre</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.names"
                          defaultValue={editData?.jointDebtor?.names}
                          placeholder="Ingresa Nombre"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Apellido</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.paternalLastName"
                          defaultValue={editData?.jointDebtor?.paternalLastName}
                          placeholder="Ingresa Apellido"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">RUT</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.rut"
                          defaultValue={editData?.jointDebtor?.rut}
                          placeholder="Ingresa rut"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Nacionalidad</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.nationality"
                          defaultValue={editData?.jointDebtor?.nationality}
                          placeholder="Ingresa Nacionalidad"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">N de Hijos</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.numberOfChildren"
                          defaultValue={editData?.jointDebtor?.numberOfChildren}
                          placeholder="Ingresa N de Hijos"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Tipo de documento</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.typeOfDocument"
                          defaultValue={editData?.jointDebtor?.typeOfDocument}
                          placeholder="Ingresa Tipo de documento"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Situacion</label>
                        <input
                          className="form-control"
                          type="text"
                          name="jointDebtor.employmentSituation"
                          defaultValue={editData?.jointDebtor?.employmentSituation}
                          placeholder="Ingresa Situacion de empreado"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Correo</label>
                        <input
                          className="form-control"
                          type="email"
                          name="jointDebtor.email"
                          defaultValue={editData?.jointDebtor?.email}
                          placeholder="Ingresa Correo"
                          ref={register({ required: "Este campo es requerido" })}
                        />
                      </FormGroup>
                    </Col>
                  </>

                  <>
                    <Col size="12">
                      <b>Datos de cuenta</b>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Nombre del banco</label>
                        <input
                          className="form-control"
                          type="text"
                          name="currentAccountData.bankName"
                          defaultValue={editData?.accountBankInfo?.bankName}
                          placeholder="Ingresa Nombre del banco"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Tipo de cuenta</label>
                        <input
                          className="form-control"
                          type="text"
                          name="currentAccountData.accountType"
                          defaultValue={editData?.accountBankInfo?.accountType}
                          placeholder="Ingresa Tipo de cuenta"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Direccion</label>
                        <input
                          className="form-control"
                          type="text"
                          name="currentAccountData.sucursalAddress"
                          defaultValue={editData?.accountBankInfo?.sucursalAddress}
                          placeholder="Ingresa Direccion"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Numero de cuenta</label>
                        <input
                          className="form-control"
                          type="text"
                          name="currentAccountData.accountNumber"
                          defaultValue={editData?.accountBankInfo?.accountNumber}
                          placeholder="Ingresa Numero de cuenta"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>
                  </>

                  <>
                    <Col md="12">
                      <b>Beneficiarios</b>
                      <Button type="button" color="primary" className="btn-icon ml-2" onClick={handleAddBeneficiarios}>
                        <Icon name="plus"></Icon>
                      </Button>
                    </Col>
                    {editData?.beneficiaries.map((item, i) => (
                      <span key={i} className="form-grid-beneficiaries">
                        <input
                          type="hidden"
                          defaultValue={editData?.beneficiaries[i].id}
                          ref={register()}
                          name={`beneficiariesEdited[${i}].id`}
                        />
                        <div>
                          <FormGroup>
                            <label className="form-label">Nombre</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`beneficiariesEdited[${i}].names`}
                              defaultValue={editData?.beneficiaries[i].names}
                              placeholder="Ingresa Nombre"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Apellido</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`beneficiariesEdited[${i}].paternalLastName`}
                              defaultValue={editData?.beneficiaries[i].paternalLastName}
                              placeholder="Ingresa Apellido"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Email</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`beneficiariesEdited[${i}].email`}
                              placeholder="Ingresa Email"
                              defaultValue={editData?.beneficiaries[i].email}
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Porcentaje</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`beneficiariesEdited[${i}].percentage`}
                              defaultValue={editData?.beneficiaries[i].percentage}
                              placeholder="Ingresa Porcentaje"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <Button
                          type="button"
                          color="danger"
                          className="btn-icon ml-2 delete-btn"
                          onClick={() => removeBeneficiaries(i)}
                        >
                          <Icon name="minus"></Icon>
                        </Button>
                      </span>
                    ))}
                    {beneficiariesFields &&
                      beneficiariesFields.map((item, i) => (
                        <span key={i} className="form-grid-beneficiaries">
                          <div>
                            <FormGroup>
                              <label className="form-label">Nombre</label>
                              <input
                                className="form-control"
                                type="text"
                                name={`beneficiaries[${i}].names`}
                                placeholder="Ingresa Nombre"
                                ref={register()}
                              />
                            </FormGroup>
                          </div>
                          <div>
                            <FormGroup>
                              <label className="form-label">Apellido</label>
                              <input
                                className="form-control"
                                type="text"
                                name={`beneficiaries[${i}].paternalLastName`}
                                placeholder="Ingresa Apellido"
                                ref={register()}
                              />
                            </FormGroup>
                          </div>
                          <div>
                            <FormGroup>
                              <label className="form-label">Email</label>
                              <input
                                className="form-control"
                                type="text"
                                name={`beneficiaries[${i}].email`}
                                placeholder="Ingresa Email"
                                ref={register()}
                              />
                            </FormGroup>
                          </div>
                          <div>
                            <FormGroup>
                              <label className="form-label">Porcentaje</label>
                              <input
                                className="form-control"
                                type="text"
                                name={`beneficiaries[${i}].percentage`}
                                placeholder="Ingresa Porcentaje"
                                ref={register()}
                              />
                            </FormGroup>
                          </div>
                          <Button
                            type="button"
                            color="danger"
                            className="btn-icon ml-2 delete-btn"
                            onClick={() => removeBeneficiaries(i)}
                          >
                            <Icon name="minus"></Icon>
                          </Button>
                        </span>
                      ))}
                  </>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Cliente
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
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

export default CustomersListJuridico;
