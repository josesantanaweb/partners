import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Button, Icon, RSelect } from "../../../../../components/Component";
import CountriesServices from "../../../../../services/CountriesServices";
import CustomersServices from "../../../../../services/CustomersServices";

const CompanyPartners = ({ setModal, editData }) => {
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [cityId, setCityId] = useState(2);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [editBirthDate, setEditBirthDate] = useState(new Date(editData?.companyPartners[0].birthDate));

  // useForm
  const { register, handleSubmit, control } = useForm();

  const {
    fields: partnersFields,
    append: appendPartners,
    remove: removePartners,
  } = useFieldArray({ control, name: "partners" });

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
  const handleAddPartners = () => {
    appendPartners({
      percentageOfParticipation: "",
      category: "",
      names: "",
      lastName: "",
      zipCode: "",
      phone: "",
      email: "",
      numberOfChildrens: "",
      birthDate: "",
      countryIssuingTheDocument: "",
      documentoType: "",
      documentNumber: "",
      documentIssuanceDate: "",
      documentExpirationDate: "",
      nationality: "",
      employmentSituation: "",
      profession: "",
      civilStatus: "",
      address: {
        countryId: 1,
        stateId: 1,
        communne: "",
        residenceAddress: "",
        addressOfCorrespondence: "",
      },
    });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { addPartners, editPartners } = submitData;
    if (editPartners && addPartners) {
      let companyPartners = {
        companyPartners: [...addPartners, ...editPartners],
      };

      try {
        await CustomersServices.editCustomerNatural(editData.id, companyPartners);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    } else if (editPartners) {
      let companyPartners = {
        companyPartners: editPartners,
      };

      try {
        await CustomersServices.editCustomerNatural(editData.id, companyPartners);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    } else {
      let companyPartners = {
        companyPartners: addPartners,
      };

      try {
        await CustomersServices.editCustomerNatural(editData.id, companyPartners);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
        console.log(companyPartners);
      } catch (error) {}
    }
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="mt-4">
      <div className="add-beneficiarie">
        <Button color="primary" size="md" type="button" onClick={handleAddPartners}>
          <Icon name="plus"></Icon>
          Agregar Socios
        </Button>
      </div>

      {editData?.companyPartners.map((item, i) => (
        <span key={i} className="form-grid-partners">
          <div>
            <FormGroup>
              <label className="form-label">Porcentaje de participación</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].percentageOfParticipation`}
                defaultValue={editData?.companyPartners[i].percentageOfParticipation}
                placeholder="Ingresa Porcentaje de participación"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Categoria</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].category`}
                defaultValue={editData?.companyPartners[i].category}
                placeholder="Ingresa Categoria"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Nombres</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].names`}
                defaultValue={editData?.companyPartners[i].names}
                placeholder="Ingresa Nombres"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Apellidos</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].lastName`}
                defaultValue={editData?.companyPartners[i].lastName}
                placeholder="Ingresa Apellidos"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Codigo postal</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].zipCode`}
                defaultValue={editData?.companyPartners[i].zipCode}
                placeholder="Ingresa Codigo postal"
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
                name={`editPartners[${i}].phone`}
                defaultValue={editData?.companyPartners[i].phone}
                placeholder="Ingresa Telefono"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name={`editPartners[${i}].email`}
                defaultValue={editData?.companyPartners[i].email}
                placeholder="Ingresa Email"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Numero de hijos</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].numberOfChildrens`}
                defaultValue={editData?.companyPartners[i].numberOfChildrens}
                placeholder="Ingresa Numero de hijos"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Nacimiento</label>
              <DatePicker
                selected={editBirthDate}
                className="form-control"
                defaultValue={new Date(editData?.companyPartners[i].birthDate)}
                onChange={(date) => setEditBirthDate(date)}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Numero Pais del documento</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].countryIssuingTheDocument`}
                defaultValue={editData?.companyPartners[i].countryIssuingTheDocument}
                placeholder="Ingresa Numero Pais del documento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Tipo de documento</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].documentoType`}
                defaultValue={editData?.companyPartners[i].documentoType}
                placeholder="Ingresa Tipo de documento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Numero de documento</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].documentNumber`}
                defaultValue={editData?.companyPartners[i].documentNumber}
                placeholder="Ingresa Numero de documento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Emision</label>
              <input
                className="form-control"
                type="date"
                name={`editPartners[${i}].documentIssuanceDate`}
                defaultValue={editData?.companyPartners[i].documentIssuanceDate}
                placeholder="Ingresa Fecha de Emision"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Expiracion</label>
              <input
                className="form-control"
                type="date"
                name={`editPartners[${i}].documentExpirationDate`}
                defaultValue={editData?.companyPartners[i].documentExpirationDate}
                placeholder="Ingresa Fecha de Expiracion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Nacionalidad</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].nationality`}
                defaultValue={editData?.companyPartners[i].nationality}
                placeholder="Ingresa Nacionalidad"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Situacion laboral</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].employmentSituation`}
                defaultValue={editData?.companyPartners[i].employmentSituation}
                placeholder="Ingresa Situacion laboral"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Profesion</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].profession`}
                defaultValue={editData?.companyPartners[i].profession}
                placeholder="Ingresa Profesion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Estado civil</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].civilStatus`}
                defaultValue={editData?.companyPartners[i].civilStatus}
                placeholder="Ingresa Estado civil"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Pais</label>
              <RSelect isSearchable={false} options={countriesOptions} onChange={onCountriesChange} />
              <input
                type="hidden"
                defaultValue={countriesOptions[0]}
                name={`editPartners[${i}].address.countryId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Ciudad</label>
              <RSelect isSearchable={false} options={citiesOptions} onChange={onCitiesChange} />
              <input
                type="hidden"
                defaultValue={cityId}
                name={`editPartners[${i}].address.stateId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Comuna</label>
              <input
                className="form-control"
                type="text"
                defaultValue={editData?.companyPartners[i].address.communne}
                name={`editPartners[${i}].address.communne`}
                placeholder="Ingresa Comuna"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Direccion</label>
              <input
                className="form-control"
                type="text"
                name={`editPartners[${i}].address.residenceAddress`}
                defaultValue={editData?.companyPartners[i].address.residenceAddress}
                placeholder="Ingresa Direccion"
                ref={register()}
              />
            </FormGroup>
          </div>
        </span>
      ))}

      {partnersFields.map((item, i) => (
        <span key={i} className="form-grid-partners">
          <div>
            <FormGroup>
              <label className="form-label">Porcentaje de participación</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].percentageOfParticipation`}
                placeholder="Ingresa Porcentaje de participación"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Categoria</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].category`}
                placeholder="Ingresa Categoria"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Nombres</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].names`}
                placeholder="Ingresa Nombres"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Apellidos</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].lastName`}
                placeholder="Ingresa Apellidos"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Codigo postal</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].zipCode`}
                placeholder="Ingresa Codigo postal"
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
                name={`addPartners[${i}].phone`}
                placeholder="Ingresa Telefono"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name={`addPartners[${i}].email`}
                placeholder="Ingresa Email"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Numero de hijos</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].numberOfChildrens`}
                placeholder="Ingresa Numero de hijos"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Nacimiento</label>
              <input
                className="form-control"
                type="date"
                name={`addPartners[${i}].birthDate`}
                placeholder="Ingresa Fecha de Nacimiento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Numero Pais del documento</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].countryIssuingTheDocument`}
                placeholder="Ingresa Numero Pais del documento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Tipo de documento</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].documentoType`}
                placeholder="Ingresa Tipo de documento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Numero de documento</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].documentNumber`}
                placeholder="Ingresa Numero de documento"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Emision</label>
              <input
                className="form-control"
                type="date"
                name={`addPartners[${i}].documentIssuanceDate`}
                placeholder="Ingresa Fecha de Emision"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Expiracion</label>
              <input
                className="form-control"
                type="date"
                name={`addPartners[${i}].documentExpirationDate`}
                placeholder="Ingresa Fecha de Expiracion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Nacionalidad</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].nationality`}
                placeholder="Ingresa Nacionalidad"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Situacion laboral</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].employmentSituation`}
                placeholder="Ingresa Situacion laboral"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Profesion</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].profession`}
                placeholder="Ingresa Profesion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Estado civil</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].civilStatus`}
                placeholder="Ingresa Estado civil"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Pais</label>
              <RSelect isSearchable={false} options={countriesOptions} onChange={onCountriesChange} />
              <input
                type="hidden"
                defaultValue={countriesOptions[0]}
                name={`addPartners[${i}].address.countryId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Ciudad</label>
              <RSelect isSearchable={false} options={citiesOptions} onChange={onCitiesChange} />
              <input
                type="hidden"
                defaultValue={cityId}
                name={`addPartners[${i}].address.stateId`}
                ref={register({ valueAsNumber: true })}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Comuna</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].address.communne`}
                placeholder="Ingresa Comuna"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Direccion</label>
              <input
                className="form-control"
                type="text"
                name={`addPartners[${i}].address.residenceAddress`}
                placeholder="Ingresa Direccion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <Button type="button" color="danger" className="btn-icon ml-2 delete-btn" onClick={() => removePartners(i)}>
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

export default CompanyPartners;
