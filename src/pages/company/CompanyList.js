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
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  PreviewAltCard,
  RSelect,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import { CompanyContext } from "./CompanyContext";
import CompanyServices from "../../services/CompanyServices";
import CountriesServices from "../../services/CountriesServices";

const CompanyList = () => {
  const { contextData } = useContext(CompanyContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [countries, setCountries] = useState();
  const [editCountry, setEditCountry] = useState();
  const [cities, setCities] = useState();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();

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

  const getCompany = async () => {
    try {
      const company = await CompanyServices.getCompany();
      setData(company.data);
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

  const onCountriesChange = (value) => {
    setCountryId(value.value);
    getCities();
  };

  const onCitiesChange = (value) => {
    setCityId(value.value);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessPhone: "",
    address: {
      countryId: 1,
      stateId: 1,
      detailedAddress: {
        address: "",
      },
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [sm, updateSm] = useState(false);

  const { errors, register, handleSubmit } = useForm();

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      businessPhone: "",
      address: {
        countryId: 1,
        stateId: 1,
        detailedAddress: {
          address: "",
        },
      },
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, email, address, businessPhone } = submitData;
    let submittedData = {
      name: name,
      email: email,
      businessPhone: businessPhone,
      address: {
        countryId: countryId,
        stateId: cityId,
        detailedAddress: {
          address: address.detailedAddress.address,
        },
      },
    };

    try {
      await CompanyServices.addCompany(submittedData);
      resetForm();
      getCompany();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, email, address, businessPhone } = submitData;
    let submittedData = {
      name: name,
      email: email,
      businessPhone: businessPhone,
      address: {
        countryId: countryId,
        stateId: cityId,
        detailedAddress: {
          address: address.detailedAddress.address,
        },
      },
    };

    try {
      await CompanyServices.editCompany(editData.id, submittedData);
      resetForm();
      getCompany();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
    const filterCountry = countries.filter((value) => value.id === editData?.address.countryId);
    const editCountry = {
      label: filterCountry[0].name,
      value: filterCountry[0].id,
    };
    setEditCountry(editCountry);
  };

  // Function to change to delete property for an item
  const deleteUser = async (id) => {
    try {
      await CompanyServices.deleteCompany(id);
      getCompany();
    } catch (error) {}
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Empresa"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Empresa
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {data.length} Empresa</p>
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
                        Agregar Empresa
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
                <span className="sub-text">Nombre</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Email</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Telefono</span>
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
                    <DataTableRow>
                      <span>{item.name}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{item.email}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>{item.businessPhone}</span>
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
              <h5 className="title">Agregar Empresa</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Empresa ya existe
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
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Ingresa email"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Telefono</label>
                      <input
                        className="form-control"
                        type="text"
                        name="businessPhone"
                        defaultValue={formData.businessPhone}
                        placeholder="Ingresa Telefono"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.businessPhone && <span className="invalid">{errors.businessPhone.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
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

                  <Col md="6">
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

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Direccion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address.detailedAddress.address"
                        defaultValue={formData.address.detailedAddress.address}
                        placeholder="Ingresa Direccion"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Empresa
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
              <h5 className="title">Actualizar Empresa</h5>
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
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={editData?.email}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Telefono</label>
                      <input
                        className="form-control"
                        type="text"
                        name="businessPhone"
                        defaultValue={editData?.businessPhone}
                        placeholder="Ingresa nombre"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Pais</label>
                      <RSelect
                        isSearchable={false}
                        options={countriesOptions}
                        defaultValue={editCountry}
                        onChange={onCountriesChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Ciudad</label>
                      <RSelect
                        isSearchable={false}
                        options={citiesOptions}
                        defaultValue={editData?.address.stateId}
                        onChange={onCitiesChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Direccion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address.detailedAddress.address"
                        defaultValue={editData?.address.detailedAddress.address}
                        placeholder="Ingresa Direccion"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Empresa
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

export default CompanyList;
