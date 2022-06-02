import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const EmploymentHistory = ({ setModal, editData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  const onFormSubmit = async (submitData) => {
    const {
      typeOfEmployee,
      companyName,
      address,
      industry,
      laborSeniority,
      charge,
      businessPhone,
      email,
      rut,
      zipCode,
    } = submitData;
    let employmentHistory = {
      typeOfEmployee: typeOfEmployee,
      companyName: companyName,
      address: address,
      industry: industry,
      laborSeniority: laborSeniority,
      charge: charge,
      businessPhone: businessPhone,
      email: email,
      rut: rut,
      zipCode: zipCode,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { employmentHistory });
      window.location.reload();
      setModal({ edit: false }, { add: false }, { document: false });
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Tipo de empleo</label>
          <input
            className="form-control"
            type="text"
            name="typeOfEmployee"
            defaultValue={editData?.employmentHistory?.typeOfEmployee}
            placeholder="Ingresa Tipo de empleo"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre de empresa</label>
          <input
            className="form-control"
            type="text"
            name="companyName"
            defaultValue={editData?.employmentHistory?.companyName}
            placeholder="Ingresa Nombre de empresa"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Direccion</label>
          <input
            className="form-control"
            type="text"
            name="address"
            defaultValue={editData?.employmentHistory?.address}
            placeholder="Ingresa Direccion"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Industria</label>
          <input
            className="form-control"
            type="text"
            name="industry"
            defaultValue={editData?.employmentHistory?.industry}
            placeholder="Ingresa Industria"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Antoguedad laboral</label>
          <input
            className="form-control"
            type="text"
            name="laborSeniority"
            defaultValue={editData?.employmentHistory?.laborSeniority}
            placeholder="Ingresa Antoguedad laboral"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Cargo</label>
          <input
            className="form-control"
            type="text"
            name="charge"
            defaultValue={editData?.employmentHistory?.charge}
            placeholder="Ingresa Cargo"
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
            name="businessPhone"
            defaultValue={editData?.employmentHistory?.businessPhone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            defaultValue={editData?.employmentHistory?.email}
            placeholder="Ingresa Emal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">RUT</label>
          <input
            className="form-control"
            type="text"
            name="rut"
            defaultValue={editData?.employmentHistory?.rut}
            placeholder="Ingresa RUT"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Codigo Postal</label>
          <input
            className="form-control"
            type="text"
            name="zipCode"
            defaultValue={editData?.employmentHistory?.zipCode}
            placeholder="Ingresa Codigo Postal"
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

export default EmploymentHistory;
