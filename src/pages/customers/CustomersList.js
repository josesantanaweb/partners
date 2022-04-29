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

const sexTypes = [
  {
    label: "Masculino",
    value: "M",
  },
  {
    label: "Femenino",
    value: "F",
  },
];

const CustomersList = () => {
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
  const [beneficiaries, setBeneficiaries] = useState(1);

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
    names: "",
    paternalLastName: "",
    typeId: 1,
    email: "",
    sex: "",
    profession: "",
    phone: "",
    isapre: "",
    AFP: "",
    nationality: "",
    rut: "",
    address: {
      countryId: 1,
      stateId: 1,
      communne: "",
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
    employmentHistory: {
      companyName: "",
      industry: "",
      businessPhone: "",
      laborSeniority: "",
      charge: "",
      email: "",
      rut: "",
      zipCode: "",
      annualIncome: "",
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
  const { fields, append, remove } = useFieldArray({ name: "beneficiaries", control });

  useEffect(() => {
    // update field array when ticket number changed
    const newVal = parseInt(beneficiaries || 1);
    const oldVal = fields.length;
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        append({
          names: "",
        });
      }
    } else {
      // remove tickets from field array
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [beneficiaries]);

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      names: "",
      paternalLastName: "",
      typeId: 1,
      email: "",
      sex: "M",
      profession: "",
      phone: "",
      isapre: "",
      AFP: "",
      nationality: "",
      rut: "",
      address: {
        countryId: 1,
        stateId: 1,
        communne: "",
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
      employmentHistory: {
        companyName: "",
        industry: "",
        businessPhone: "",
        laborSeniority: "",
        charge: "",
        email: "",
        rut: "",
        zipCode: "",
        annualIncome: "",
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

  const onSexChange = (value) => setFormData({ ...formData, sex: value.value });
  const onCountriesChange = (value) => {
    setCountryId(value.value);
    getCities();
  };
  const onCitiesChange = (value) => {
    setCityId(value.value);
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const {
      names,
      paternalLastName,
      email,
      birthDate,
      profession,
      phone,
      isapre,
      AFP,
      nationality,
      rut,
      address,
      jointDebtor,
      employmentHistory,
      currentAccountData,
      beneficiaries,
    } = submitData;
    let submittedData = {
      typeId: 1,
      names,
      paternalLastName,
      email,
      birthDate,
      sex: formData.sex,
      profession,
      phone,
      isapre,
      AFP,
      nationality,
      rut,
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
      employmentHistory: {
        companyName: employmentHistory.companyName,
        industry: employmentHistory.industry,
        businessPhone: employmentHistory.businessPhone,
        laborSeniority: employmentHistory.laborSeniority,
        charge: employmentHistory.charge,
        email: employmentHistory.email,
        rut: employmentHistory.rut,
        zipCode: employmentHistory.zipCode,
        annualIncome: employmentHistory.annualIncome,
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
    } catch (error) {
      if (error.response.data.message === "This customer already exists") {
        setErrorMessage("Usuario ya existe");
      }
    }
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    // const { names, paternalLastName, email } = submitData;
    // let submittedData = {
    //   names: names,
    //   paternalLastName: paternalLastName,
    //   email: email,
    // };
    // try {
    //   await CustomersServices.editCustomer(editData.id, submittedData);
    //   resetForm();
    //   getCustomers();
    //   setModal({ edit: false }, { add: false });
    // } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
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
  const filterCustomers = currentItems.filter((item) => item.type.id === 1);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddBeneficiarios = () => {
    setBeneficiaries(beneficiaries + 1);
  };

  return (
    <React.Fragment>
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Clientes Natural
              </BlockTitle>
              <BlockDes className="text-soft">
                {" "}
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
                  <span className="sub-text">Rut</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Profesion</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">AFP</span>
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
                          {item.names && <UserAvatar theme="purple" text={findUpper(item?.names)}></UserAvatar>}
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.names} {item.paternalLastName}{" "}
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
                        <span>{item.rut}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{item.profession}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{item.AFP}</span>
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
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="names"
                        defaultValue={formData.names}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.names && <span className="invalid">{errors.names.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
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
                      <label className="form-label">Fecha de Nacimiento</label>
                      <input
                        className="form-control"
                        type="date"
                        name="birthDate"
                        defaultValue={formData.birthDate}
                        placeholder="Ingresa apellido"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Sexo</label>
                      <RSelect
                        isSearchable={false}
                        options={sexTypes}
                        defaultValue={formData.sex}
                        onChange={onSexChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Profesion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="profession"
                        defaultValue={formData.profession}
                        placeholder="Ingresa Profesion"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.profession && <span className="invalid">{errors.profession.message}</span>}
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
                      <label className="form-label">Isapre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="isapre"
                        defaultValue={formData.isapre}
                        placeholder="Ingresa Isapre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.isapre && <span className="invalid">{errors.isapre.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">AFP</label>
                      <input
                        className="form-control"
                        type="text"
                        name="AFP"
                        defaultValue={formData.AFP}
                        placeholder="Ingresa AFP"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.AFP && <span className="invalid">{errors.AFP.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Nacionalidad</label>
                      <input
                        className="form-control"
                        type="text"
                        name="nationality"
                        defaultValue={formData.nationality}
                        placeholder="Ingresa nationality"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.nationality && <span className="invalid">{errors.nationality.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">RUT</label>
                      <input
                        className="form-control"
                        type="text"
                        name="rut"
                        defaultValue={formData.rut}
                        placeholder="Ingresa RUT"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.rut && <span className="invalid">{errors.rut.message}</span>}
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
                      <b>Historial</b>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Nombre de empresa</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.companyName"
                          defaultValue={formData.employmentHistory.companyName}
                          placeholder="Ingresa Nombre de empresa"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Industria</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.industry"
                          defaultValue={formData.employmentHistory.industry}
                          placeholder="Ingresa Industria"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Telefono</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.businessPhone"
                          defaultValue={formData.employmentHistory.businessPhone}
                          placeholder="Ingresa Telefono"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Antiguedad Laboral</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.laborSeniority"
                          defaultValue={formData.employmentHistory.laborSeniority}
                          placeholder="Ingresa Antiguedad Laboral"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Cargo</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.charge"
                          defaultValue={formData.employmentHistory.charge}
                          placeholder="Ingresa Cargo"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Correo</label>
                        <input
                          className="form-control"
                          type="email"
                          name="employmentHistory.email"
                          defaultValue={formData.employmentHistory.email}
                          placeholder="Ingresa Correo"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Rut</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.rut"
                          defaultValue={formData.employmentHistory.rut}
                          placeholder="Ingresa Rut"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Codigo postal</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.zipCode"
                          defaultValue={formData.employmentHistory.zipCode}
                          placeholder="Ingresa Codigo postal"
                          ref={register()}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Ingreso Anual</label>
                        <input
                          className="form-control"
                          type="text"
                          name="employmentHistory.annualIncome"
                          defaultValue={formData.employmentHistory.annualIncome}
                          placeholder="Ingresa Ingreso Anual"
                          ref={register()}
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
                      <b>Beneficiarios</b>
                      <Button type="button" color="primary" className="btn-icon ml-2" onClick={handleAddBeneficiarios}>
                        <Icon name="plus"></Icon>
                      </Button>
                    </Col>
                    {fields?.map((item, i) => (
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
                      <label className="form-label">Descripcion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={editData?.description}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Rol
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

export default CustomersList;
