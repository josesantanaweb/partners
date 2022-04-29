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
  const [beneficiaries, setBeneficiaries] = useState(0);
  const [partnersAntecedents, setPartnersAntecedents] = useState(1);

  const [modal, setModal] = useState({
    edit: false,
    add: false,
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
    partnersAntecedents: [
      {
        names: "",
        paternalLastName: "",
        email: "",
        isapre: "",
        afp: "",
        nationality: "",
        zipCode: "",
        percentageOfParticipation: "",
        rut: "",
        phone: "",
      },
    ],
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
  } = useFieldArray({ name: "beneficiaries", control });

  const {
    fields: partnersAntecedentsFields,
    append: appendPartnersAntecedents,
    remove: removePartnersAntecedents,
  } = useFieldArray({ name: "partnersAntecedents", control });

  useEffect(() => {
    // update field array when ticket number changed
    const newBeneficiaries = parseInt(beneficiaries || 1);
    const oldBeneficiaries = beneficiariesFields.length;
    if (newBeneficiaries > oldBeneficiaries) {
      // append tickets to field array
      for (let i = oldBeneficiaries; i < newBeneficiaries; i++) {
        appendBeneficiaries({
          names: "",
        });
      }
    } else {
      // remove tickets from field array
      for (let i = oldBeneficiaries; i > newBeneficiaries; i--) {
        removeBeneficiaries(i - 1);
      }
    }
  }, [beneficiaries]);

  useEffect(() => {
    // update field array when ticket number changed
    const newPartnersAntecedents = parseInt(partnersAntecedents || 1);
    const oldPartnersAntecedents = partnersAntecedentsFields.length;
    if (newPartnersAntecedents > oldPartnersAntecedents) {
      // append tickets to field array
      for (let i = oldPartnersAntecedents; i < newPartnersAntecedents; i++) {
        appendPartnersAntecedents({
          names: "",
        });
      }
    } else {
      // remove tickets from field array
      for (let i = oldPartnersAntecedents; i > newPartnersAntecedents; i--) {
        removePartnersAntecedents(i - 1);
      }
    }
  }, [partnersAntecedents]);

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
      partnersAntecedents: [
        {
          names: "",
          paternalLastName: "",
          email: "",
          isapre: "",
          afp: "",
          nationality: "",
          zipCode: "",
          percentageOfParticipation: "",
          rut: "",
          phone: "",
        },
      ],
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
    setModal({ edit: false, add: false });
    resetForm();
  };

  // customer type change
  // const onCustomerTypeChange = (value) => {
  //   setFormData({ ...formData, typeId: value.value });
  //   setTypeId(value.value);
  // };

  const onCountriesChange = (value) => {
    setCountryId(value.value);
    getCities();
  };
  const onCitiesChange = (value) => {
    setCityId(value.value);
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    console.log(submitData.beneficiaries);
    const {
      companyName,
      giro,
      email,
      phone,
      singleTaxRole,
      observations,
      address,
      antecedentsLegalRepresentative,
      partnersAntecedents,
      jointDebtor,
      currentAccountData,
      beneficiaries,
    } = submitData;
    let submittedData = {
      typeId: 2,
      companyName,
      giro,
      email,
      phone,
      singleTaxRole,
      observations,
      antecedentsLegalRepresentative: {
        names: antecedentsLegalRepresentative.names,
        paternalLastName: antecedentsLegalRepresentative.paternalLastName,
        isapre: antecedentsLegalRepresentative.isapre,
        afp: antecedentsLegalRepresentative.afp,
        nationality: antecedentsLegalRepresentative.nationality,
        zipCode: antecedentsLegalRepresentative.zipCode,
        email: antecedentsLegalRepresentative.email,
        rut: antecedentsLegalRepresentative.rut,
        phone: antecedentsLegalRepresentative.phone,
      },
      partnersAntecedents,
      address: {
        countryId: countryId,
        stateId: cityId,
        communne: address.communne,
      },
      jointDebtor: {
        names: jointDebtor.names,
        paternalLastName: jointDebtor.paternalLastName,
        rut: jointDebtor.rut,
        nationality: jointDebtor.nationality,
        numberOfChildren: Number(jointDebtor.numberOfChildren),
        typeOfDocument: jointDebtor.typeOfDocument,
        employmentSituation: jointDebtor.employmentSituation,
        email: jointDebtor.email,
      },
      currentAccountData: {
        bankName: currentAccountData.bankName,
        accountType: currentAccountData.accountType,
        sucursalAddress: currentAccountData.sucursalAddress,
        accountNumber: currentAccountData.accountNumber,
        accountOpeningDate: currentAccountData.accountOpeningDate,
      },
      beneficiaries,
    };
    console.log(submittedData);
    try {
      await CustomersServices.addCustomer(submittedData);
      resetForm();
      getCustomers();
      setModal({ edit: false }, { add: false });
      setBeneficiaries(0);
    } catch (error) {
      if (error.response.data.message === "This customer already exists") {
        setErrorMessage("Usuario ya existe");
      }
    }
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const {
      companyName,
      giro,
      email,
      phone,
      singleTaxRole,
      observations,
      antecedentsLegalRepresentative,
      jointDebtor,
      currentAccountData,
    } = submitData;
    const beneficiariesEdited = submitData.beneficiaries;
    let submittedData = {
      companyName: companyName,
      giro: giro,
      email: email,
      phone: phone,
      singleTaxRole: singleTaxRole,
      observations: observations,
      antecedentsLegalRepresentative: antecedentsLegalRepresentative,
      jointDebtor: jointDebtor,
      currentAccountData: currentAccountData,
      beneficiaries: [...beneficiariesEdited, ...beneficiaries],
    };

    console.log(beneficiaries);
    try {
      await CustomersServices.editCustomer(editData.id, submittedData);
      resetForm();
      getCustomers();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
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
    setBeneficiaries(beneficiaries + 1);
    console.log(beneficiaries);
  };

  const handleDeleteBeneficiarios = () => {
    if (beneficiaries > 0) {
      setBeneficiaries(beneficiaries - 1);
      console.log(beneficiaries);
    }
  };

  const handleAddPartnersAntecedents = () => {
    setPartnersAntecedents(partnersAntecedents + 1);
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
                        <span className="text-info">{item.type.name}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.jointDebtor.names} {item.jointDebtor.paternalLastName}{" "}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.jointDebtor.email}</span>
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
                          defaultValue={formData.antecedentsLegalRepresentative.names}
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
                          defaultValue={formData.antecedentsLegalRepresentative.paternalLastName}
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
                          defaultValue={formData.antecedentsLegalRepresentative.isapre}
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
                          defaultValue={formData.antecedentsLegalRepresentative.afp}
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
                          defaultValue={formData.antecedentsLegalRepresentative.nationality}
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
                          defaultValue={formData.antecedentsLegalRepresentative.zipCode}
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
                          defaultValue={formData.antecedentsLegalRepresentative.email}
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
                          defaultValue={formData.antecedentsLegalRepresentative.rut}
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
                          defaultValue={formData.antecedentsLegalRepresentative.phone}
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
                          defaultValue={formData.jointDebtor.names}
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
                          defaultValue={formData.jointDebtor.paternalLastName}
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
                          defaultValue={formData.jointDebtor.rut}
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
                          defaultValue={formData.jointDebtor.nationality}
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
                          defaultValue={formData.jointDebtor.numberOfChildren}
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
                          defaultValue={formData.jointDebtor.typeOfDocument}
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
                          defaultValue={formData.jointDebtor.employmentSituation}
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
                          defaultValue={formData.jointDebtor.email}
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
                          defaultValue={formData.currentAccountData.bankName}
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
                          defaultValue={formData.currentAccountData.accountType}
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
                          defaultValue={formData.currentAccountData.sucursalAddress}
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
                          defaultValue={formData.currentAccountData.accountNumber}
                          placeholder="Ingresa Numero de cuenta"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Fecha de apertura</label>
                        <input
                          className="form-control"
                          type="date"
                          name="currentAccountData.accountOpeningDate"
                          defaultValue={formData.currentAccountData.accountOpeningDate}
                          placeholder="Ingresa Fecha de apertura"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>
                  </>

                  <>
                    <Col md="12">
                      <b>Socios</b>
                      <Button
                        type="button"
                        color="primary"
                        className="btn-icon ml-2"
                        onClick={handleAddPartnersAntecedents}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                    </Col>
                    {partnersAntecedentsFields?.map((item, i) => (
                      <span key={i} className="form-grid">
                        <div>
                          <FormGroup>
                            <label className="form-label">Nombre</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].names`}
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
                              name={`partnersAntecedents[${i}].paternalLastName`}
                              placeholder="Ingresa Apellido"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Correo</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].email`}
                              placeholder="Ingresa Correo"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">RUT</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].rut`}
                              placeholder="Ingresa RUT"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Isapre</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].isapre`}
                              placeholder="Ingresa Isapre"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Afp</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].afp`}
                              placeholder="Ingresa Afp"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Nationalidad</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].nationality`}
                              placeholder="Ingresa Nationalidad"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Codigo Postal</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].zipCode`}
                              placeholder="Ingresa Codigo Postal"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup>
                            <label className="form-label">Telefono</label>
                            <input
                              className="form-control"
                              type="text"
                              name={`partnersAntecedents[${i}].phone`}
                              placeholder="Ingresa Telefono"
                              ref={register()}
                            />
                          </FormGroup>
                        </div>
                      </span>
                    ))}
                  </>

                  <>
                    <Col md="12">
                      <b>Beneficiarios</b>
                      <Button type="button" color="primary" className="btn-icon ml-2" onClick={handleAddBeneficiarios}>
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        className="btn-icon ml-2"
                        onClick={handleDeleteBeneficiarios}
                      >
                        <Icon name="minus"></Icon>
                      </Button>
                    </Col>
                    {beneficiariesFields?.map((item, i) => (
                      <span key={i} className="form-grid">
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
                            <label className="form-label">Correo</label>
                            <input
                              className="form-control"
                              type="email"
                              name={`beneficiaries[${i}].email`}
                              placeholder="Ingresa Correo"
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
                      </span>
                    ))}
                  </>

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
                            setBeneficiaries(1);
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
                          defaultValue={editData?.antecedentsLegalRepresentative.names}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.paternalLastName}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.isapre}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.afp}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.nationality}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.zipCode}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.email}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.rut}
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
                          defaultValue={editData?.antecedentsLegalRepresentative.phone}
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
                          defaultValue={editData?.jointDebtor.names}
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
                          defaultValue={editData?.jointDebtor.paternalLastName}
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
                          defaultValue={editData?.jointDebtor.rut}
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
                          defaultValue={editData?.jointDebtor.nationality}
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
                          defaultValue={editData?.jointDebtor.numberOfChildren}
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
                          defaultValue={editData?.jointDebtor.typeOfDocument}
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
                          defaultValue={editData?.jointDebtor.employmentSituation}
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
                          defaultValue={editData?.jointDebtor.email}
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
                          defaultValue={editData?.accountBankInfo.bankName}
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
                          defaultValue={editData?.accountBankInfo.accountType}
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
                          defaultValue={editData?.accountBankInfo.sucursalAddress}
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
                          defaultValue={editData?.accountBankInfo.accountNumber}
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
                      <Button
                        type="button"
                        color="danger"
                        className="btn-icon ml-2"
                        onClick={handleDeleteBeneficiarios}
                      >
                        <Icon name="minus"></Icon>
                      </Button>
                    </Col>
                    {editData &&
                      editData.beneficiaries?.map((item, i) => (
                        <span key={i} className="form-grid">
                          <input
                            type="hidden"
                            defaultValue={editData?.beneficiaries[i].id}
                            ref={register()}
                            name={`beneficiaries[${i}].id`}
                          />
                          <div>
                            <FormGroup>
                              <label className="form-label">Nombre</label>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue={editData?.beneficiaries[i].names}
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
                                defaultValue={editData?.beneficiaries[i].paternalLastName}
                                name={`beneficiaries[${i}].paternalLastName`}
                                placeholder="Ingresa Apellido"
                                ref={register()}
                              />
                            </FormGroup>
                          </div>
                          <div>
                            <FormGroup>
                              <label className="form-label">Correo</label>
                              <input
                                className="form-control"
                                type="email"
                                name={`beneficiaries[${i}].email`}
                                defaultValue={editData?.beneficiaries[i].email}
                                placeholder="Ingresa Correo"
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
                                defaultValue={editData?.beneficiaries[i].percentage}
                                placeholder="Ingresa Porcentaje"
                                ref={register()}
                              />
                            </FormGroup>
                          </div>
                        </span>
                      ))}

                    {beneficiariesFields?.map((item, i) => (
                      <span key={i} className="form-grid">
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
                            <label className="form-label">Correo</label>
                            <input
                              className="form-control"
                              type="email"
                              name={`beneficiaries[${i}].email`}
                              placeholder="Ingresa Correo"
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
