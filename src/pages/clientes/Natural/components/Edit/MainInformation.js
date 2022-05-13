/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button, RSelect } from "../../../../../components/Component";
import CountriesServices from "../../../../../services/CountriesServices";
import CustomersServices from "../../../../../services/CustomersServices";

const MainInformation = ({ setModal, editData }) => {
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

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const {
      names,
      paternalLastName,
      email,
      phone,
      mobilePhone,
      birthDate,
      civilStatus,
      dateOfMarriage,
      profession,
      totalNetWorthUSD,
      totalPatrimonyWithoutProperties,
      annualIncome,
      maritalRegime,
      nationality,
      rut,
      rutIssueDate,
      rutExpirationDate,
      address,
      zipCode,
      observations,
    } = submitData;
    let data = {
      typeId: 1,
      names,
      paternalLastName,
      email,
      phone,
      mobilePhone,
      birthDate: editData.birthDate,
      civilStatus,
      dateOfMarriage: editData.dateOfMarriage,
      profession,
      totalNetWorthUSD,
      totalPatrimonyWithoutProperties,
      maritalRegime,
      nationality,
      annualIncome,
      zipCode,
      rut,
      rutIssueDate: editData.rutIssueDate,
      rutExpirationDate: editData.rutExpirationDate,
      address: {
        countryId: countryId,
        stateId: cityId,
        communne: address.communne,
        address: address.address,
      },
      observations,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, data);
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombres</label>
          <input
            className="form-control"
            type="text"
            name="names"
            defaultValue={editData?.names}
            placeholder="Ingresa Nombres"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Apellidos</label>
          <input
            className="form-control"
            type="text"
            name="paternalLastName"
            defaultValue={editData?.paternalLastName}
            placeholder="Ingresa Apellidos"
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
            defaultValue={editData?.email}
            placeholder="Ingresa Email"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de nacimiento</label>
          <input
            className="form-control"
            type="date"
            name="birthDate"
            defaultValue={editData?.birthDate}
            placeholder="Ingresa Fecha de nacimiento"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Estado Civil</label>
          <input
            className="form-control"
            type="text"
            name="civilStatus"
            defaultValue={editData?.civilStatus}
            placeholder="Ingresa Estado civil"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de matrimonio</label>
          <input
            className="form-control"
            type="date"
            name="dateOfMarriage"
            defaultValue={editData?.dateOfMarriage}
            placeholder="Ingresa Fecha de matrimonio"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Profesion</label>
          <input
            className="form-control"
            type="text"
            name="profession"
            defaultValue={editData?.profession}
            placeholder="Ingresa Estado civil"
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
            name="mobilePhone"
            defaultValue={editData?.mobilePhone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Telefono 2</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            defaultValue={editData?.phone}
            placeholder="Ingresa Telefono 2"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Ingreso Anual</label>
          <input
            className="form-control"
            type="text"
            name="annualIncome"
            defaultValue={editData?.annualIncome}
            placeholder="Ingreso Anual"
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
            defaultValue={editData?.zipCode}
            placeholder="Codigo postal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Valor neto total USD</label>
          <input
            className="form-control"
            type="text"
            name="totalNetWorthUSD"
            defaultValue={editData?.totalNetWorthUSD}
            placeholder="Ingresa Valor neto total USD"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Neto de patrimonio</label>
          <input
            className="form-control"
            type="text"
            name="totalPatrimonyWithoutProperties"
            defaultValue={editData?.totalPatrimonyWithoutProperties}
            placeholder="Ingresa Neto de patrimonio"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Regimen conyugal</label>
          <input
            className="form-control"
            type="text"
            name="maritalRegime"
            defaultValue={editData?.maritalRegime}
            placeholder="Ingresa Regimen conyugal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nacionalidad</label>
          <input
            className="form-control"
            type="text"
            name="nationality"
            defaultValue={editData?.nationality}
            placeholder="Ingresa nacionalidad"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Rut</label>
          <input
            className="form-control"
            type="text"
            name="rut"
            defaultValue={editData?.rut}
            placeholder="Ingresa rut"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de emisión</label>
          <input
            className="form-control"
            type="date"
            name="rutIssueDate"
            defaultValue={editData?.rutIssueDate}
            placeholder="Ingresa Fecha de emisión"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de expiracion</label>
          <input
            className="form-control"
            type="date"
            name="rutExpirationDate"
            defaultValue={editData?.rutExpirationDate}
            placeholder="Ingresa Fecha de expiracion"
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
            defaultValue={editData?.address.detailedAddress.communne}
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
            defaultValue={editData?.address.detailedAddress.address}
            placeholder="Ingresa address"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="12" className="mb-4">
        <FormGroup>
          <label className="form-label">Observacion</label>
          <textarea
            className="form-control"
            name="observations"
            placeholder="Ingresa Observacion"
            cols="30"
            rows="10"
            defaultValue={editData?.observations}
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col size="12">
        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
          <li>
            <Button color="primary" size="md" type="submit">
              Guardar
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