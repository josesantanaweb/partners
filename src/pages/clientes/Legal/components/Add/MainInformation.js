/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button, RSelect } from "../../../../../components/Component";
import CountriesServices from "../../../../../services/CountriesServices";
import CustomersServices from "../../../../../services/CustomersServices";

const MainInformation = ({ setModal, formData }) => {
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();
  const [citiesOptions, setCitiesOptions] = useState([]);

  // useForm
  const { register, handleSubmit } = useForm();

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

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Agreagar cliente
  const onFormSubmit = async (submitData) => {
    const {
      companyName,
      companyCategory,
      taxIdentificationNumber,
      zipCode,
      email,
      phone,
      descriptionOfAccountInvestments,
      totalPatrimonyWithoutProperties,
      address,
    } = submitData;
    let data = {
      typeId: 2,
      companyName,
      companyCategory,
      taxIdentificationNumber,
      zipCode,
      email,
      phone,
      descriptionOfAccountInvestments,
      totalPatrimonyWithoutProperties,
      address: {
        countryId: countryId,
        stateId: cityId,
        communne: address.communne,
        address: address.address,
      },
    };
    try {
      await CustomersServices.addCustomerLegal(data);
      setModal({ edit: false }, { add: false });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre de Socio Estratégico</label>
          <input
            className="form-control"
            type="text"
            name="companyName"
            defaultValue={formData.companyName}
            placeholder="Ingresa Nombre de empresa"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Categoria</label>
          <input
            className="form-control"
            type="text"
            name="companyCategory"
            defaultValue={formData.companyCategory}
            placeholder="Ingresa Categoria"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Numero de Identificacion</label>
          <input
            className="form-control"
            type="text"
            name="taxIdentificationNumber"
            defaultValue={formData.taxIdentificationNumber}
            placeholder="Ingresa Numero de Identificacion"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Codigo postal</label>
          <input
            className="form-control"
            type="text"
            name="zipCode"
            defaultValue={formData.zipCode}
            placeholder="Ingresa Codigo postal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            defaultValue={formData.email}
            placeholder="Ingresa Email"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Telefono</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            defaultValue={formData.phone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Descripcion de las Inversiones</label>
          <input
            className="form-control"
            type="text"
            name="descriptionOfAccountInvestments"
            defaultValue={formData.descriptionOfAccountInvestments}
            placeholder="Ingresa Descripcion de las Inversiones"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Descripcion de las Inversiones</label>
          <input
            className="form-control"
            type="text"
            name="descriptionOfAccountInvestments"
            defaultValue={formData.descriptionOfAccountInvestments}
            placeholder="Ingresa Descripcion de las Inversiones"
            ref={register()}
          />
        </FormGroup>
      </Col>

      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Pais</label>
          <RSelect
            isSearchable={false}
            options={countriesOptions}
            defaultValue={countriesOptions[0]}
            onChange={onCountriesChange}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Ciudad</label>
          <RSelect isSearchable={false} options={citiesOptions} onChange={onCitiesChange} />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
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
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Direccion</label>
          <input
            className="form-control"
            type="text"
            name="address.address"
            defaultValue={formData.address.address}
            placeholder="Ingresa address"
            ref={register()}
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
              className="link link-light"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
            >
              Cancelar
            </a>
          </li>
        </ul>
      </Col>
    </Form>
  );
};

export default MainInformation;
