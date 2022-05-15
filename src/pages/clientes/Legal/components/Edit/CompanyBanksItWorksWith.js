import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { Col, Button, Icon, RSelect } from "../../../../../components/Component";
import CountriesServices from "../../../../../services/CountriesServices";
import CustomersServices from "../../../../../services/CustomersServices";

const CompanyBanksItWorksWith = ({ setModal, editData }) => {
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [cityId, setCityId] = useState(2);
  const [citiesOptions, setCitiesOptions] = useState([]);

  // useForm
  const { register, handleSubmit, control } = useForm();

  const { fields: banksFields, append: appendBanks, remove: removeBanks } = useFieldArray({ control, name: "banks" });

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

  // Agregar beneficiarios
  const handleAddBeneficiarios = () => {
    appendBanks({
      countryId: "",
      stateId: "",
      bank: "",
      bankBranch: "",
    });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { addBanks, editBanks } = submitData;
    if (editBanks && addBanks) {
      let companyBanksItWorksWith = {
        companyBanksItWorksWith: [...addBanks, ...editBanks],
      };

      try {
        await CustomersServices.editCustomerNatural(editData.id, companyBanksItWorksWith);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    } else if (editBanks) {
      let companyBanksItWorksWith = {
        companyBanksItWorksWith: editBanks,
      };

      try {
        await CustomersServices.editCustomerNatural(editData.id, companyBanksItWorksWith);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    } else {
      let companyBanksItWorksWith = {
        companyBanksItWorksWith: addBanks,
      };

      try {
        await CustomersServices.editCustomerNatural(editData.id, companyBanksItWorksWith);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    }
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="mt-4">
      <div className="add-beneficiarie">
        <Button color="primary" size="md" type="button" onClick={handleAddBeneficiarios}>
          <Icon name="plus"></Icon>
          Agregar Beneficiario
        </Button>
      </div>

      {editData?.companyBanksItWorksWith.map((item, i) => (
        <span key={i} className="form-grid-beneficiaries">
          <div>
            <FormGroup>
              <label className="form-label">Banco</label>
              <input
                className="form-control"
                type="text"
                name={`editBanks[${i}].bank`}
                defaultValue={editData?.companyBanksItWorksWith[i].bank}
                placeholder="Ingresa Banco"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Sucursal</label>
              <input
                className="form-control"
                type="text"
                name={`editBanks[${i}].bankBranch`}
                defaultValue={editData?.companyBanksItWorksWith[i].bankBranch}
                placeholder="Ingresa Sucursal"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div style={{ width: "150px" }}>
            <FormGroup>
              <label className="form-label">Pais</label>
              <RSelect isSearchable={false} options={countriesOptions} onChange={onCountriesChange} />
              <input
                type="hidden"
                defaultValue={countryId}
                name={`editBanks[${i}].countryId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <div style={{ width: "150px" }}>
            <FormGroup>
              <label className="form-label">Ciudad</label>
              <RSelect isSearchable={false} options={citiesOptions} onChange={onCitiesChange} />
              <input
                type="hidden"
                defaultValue={cityId}
                name={`editBanks[${i}].stateId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
        </span>
      ))}

      {banksFields.map((item, i) => (
        <span key={i} className="form-grid-beneficiaries">
          <div>
            <FormGroup>
              <label className="form-label">Banco</label>
              <input
                className="form-control"
                type="text"
                name={`addBanks[${i}].bank`}
                placeholder="Ingresa Banco"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Sucursal</label>
              <input
                className="form-control"
                type="text"
                name={`addBanks[${i}].bankBranch`}
                placeholder="Ingresa Sucursal"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div style={{ width: "150px" }}>
            <FormGroup>
              <label className="form-label">Pais</label>
              <RSelect isSearchable={false} options={countriesOptions} onChange={onCountriesChange} />
              <input
                type="hidden"
                defaultValue={countryId}
                name={`addBanks[${i}].countryId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <div style={{ width: "150px" }}>
            <FormGroup>
              <label className="form-label">Ciudad</label>
              <RSelect isSearchable={false} options={citiesOptions} onChange={onCitiesChange} />
              <input
                type="hidden"
                defaultValue={cityId}
                name={`addBanks[${i}].stateId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <Button type="button" color="danger" className="btn-icon ml-2 delete-btn" onClick={() => removeBanks(i)}>
            <Icon name="minus"></Icon>
          </Button>
        </span>
      ))}

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

export default CompanyBanksItWorksWith;
