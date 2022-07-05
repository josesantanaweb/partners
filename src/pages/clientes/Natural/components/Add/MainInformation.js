/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { Col, Button, RSelect } from "../../../../../components/Component";
import CountriesServices from "../../../../../services/CountriesServices";
import CustomersServices from "../../../../../services/CustomersServices";
import es from "date-fns/locale/es";
import "moment/locale/es"; // the locale you want
registerLocale("es", es);

const MainInformation = ({ setModal, formData }) => {
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [dateOfMarriage, setDateOfMarriage] = useState(new Date());
  const [rutIssueDate, setRutIssueDate] = useState(new Date());
  const [rutExpirationDate, setRutExpirationDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());

  // useForm
  const { register, handleSubmit, control } = useForm({});

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
      names,
      paternalLastName,
      email,
      phone,
      mobilePhone,
      birthDate,
      civilStatus,
      profession,
      totalNetWorthUSD,
      totalPatrimonyWithoutProperties,
      annualIncome,
      maritalRegime,
      nationality,
      rut,
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
      birthDate,
      civilStatus,
      dateOfMarriage,
      profession,
      totalNetWorthUSD,
      totalPatrimonyWithoutProperties,
      maritalRegime,
      nationality,
      annualIncome,
      zipCode,
      rut,
      rutIssueDate,
      rutExpirationDate,
      address: {
        countryId: countryId,
        stateId: cityId,
        communne: address.communne,
        address: address.address,
      },
      observations,
    };
    try {
      await CustomersServices.addCustomerNatural(data);
      setModal({ edit: false }, { add: false });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Rut</label>
          <input
            className="form-control"
            type="text"
            name="rut"
            defaultValue={formData.rut}
            placeholder="Ingresa rut"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de emisión</label>
          <DatePicker
            selected={rutIssueDate}
            className="form-control"
            onChange={(date) => setRutIssueDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="es"
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de expiracion</label>
          <DatePicker
            selected={rutExpirationDate}
            className="form-control"
            onChange={(date) => setRutExpirationDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="es"
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombres</label>
          <input
            className="form-control"
            type="text"
            name="names"
            defaultValue={formData.names}
            placeholder="Ingresa Nombres"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
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
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Apellidos</label>
          <input
            className="form-control"
            type="text"
            name="paternalLastName"
            defaultValue={formData.paternalLastName}
            placeholder="Ingresa Apellidos"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Telefono Celular</label>
          <input
            className="form-control"
            type="text"
            name="mobilePhone"
            defaultValue={formData.mobilePhone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Telefono Fijo</label>
          <input
            className="form-control"
            type="text"
            name="phone"
            defaultValue={formData.phone}
            placeholder="Ingresa Telefono Fijo"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
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
          <label className="form-label">Nacionalidad</label>
          <input
            className="form-control"
            type="text"
            name="nationality"
            defaultValue={formData.nationality}
            placeholder="Ingresa nacionalidad"
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
            placeholder="Codigo postal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Ciudad</label>
          <RSelect isSearchable={false} options={citiesOptions} onChange={onCitiesChange} />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Estado Civil</label>
          <input
            className="form-control"
            type="text"
            name="civilStatus"
            defaultValue={formData.civilStatus}
            placeholder="Ingresa Estado civil"
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
            defaultValue={formData.maritalRegime}
            placeholder="Ingresa Regimen conyugal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
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
          <label className="form-label">Ingreso Anual</label>
          <input
            className="form-control"
            type="text"
            name="annualIncome"
            defaultValue={formData.annualIncome}
            placeholder="Ingreso Anual"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">F de matrimonio</label>
          <DatePicker
            selected={dateOfMarriage}
            className="form-control"
            onChange={(date) => setDateOfMarriage(date)}
            dateFormat="dd/MM/yyyy"
            locale="es"
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
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
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Valor neto total USD</label>
          <input
            className="form-control"
            type="text"
            name="totalNetWorthUSD"
            defaultValue={formData.totalNetWorthUSD}
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
            defaultValue={formData.totalPatrimonyWithoutProperties}
            placeholder="Ingresa Neto de patrimonio"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Profesion</label>
          <input
            className="form-control"
            type="text"
            name="profession"
            defaultValue={formData.profession}
            placeholder="Ingresa Estado civil"
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
            defaultValue={formData.observations}
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
