import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../components/Component";

const EmploymentHistory = ({ setModal, formData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Agreagar cliente
  const onFormSubmit = async (submitData) => {
    console.log(submitData);
  };

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Tipo de empleo</label>
          <input
            className="form-control"
            type="text"
            name="employmentHistory.typeOfEmployee"
            defaultValue={formData.employmentHistory.typeOfEmployee}
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
            name="employmentHistory.companyName"
            defaultValue={formData.employmentHistory.companyName}
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
            name="employmentHistory.address"
            defaultValue={formData.employmentHistory.address}
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
            name="employmentHistory.industry"
            defaultValue={formData.employmentHistory.industry}
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
            name="employmentHistory.laborSeniority"
            defaultValue={formData.employmentHistory.laborSeniority}
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
            name="employmentHistory.charge"
            defaultValue={formData.employmentHistory.charge}
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
            name="employmentHistory.businessPhone"
            defaultValue={formData.employmentHistory.businessPhone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Emal</label>
          <input
            className="form-control"
            type="text"
            name="employmentHistory.email"
            defaultValue={formData.employmentHistory.email}
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
            name="employmentHistory.rut"
            defaultValue={formData.employmentHistory.rut}
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
            name="employmentHistory.zipCode"
            defaultValue={formData.employmentHistory.zipCode}
            placeholder="Ingresa Codigo Postal"
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

export default EmploymentHistory;
