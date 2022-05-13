import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../components/Component";

const AccountData = ({ setModal, formData }) => {
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
      <Col md="3" className="mb-4">
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
      <Col md="3" className="mb-4">
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
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Numero de cuenta</label>
          <input
            className="form-control"
            type="text"
            name="currentAccountData.accountNumber"
            defaultValue={formData.currentAccountData.accountNumber}
            placeholder="Ingresa Direccion"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de apertura</label>
          <input
            className="form-control"
            type="date"
            name="currentAccountData.accountOpeningDate"
            defaultValue={formData.accountOpeningDate}
            placeholder="Ingresa Fecha de apertura"
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

export default AccountData;
