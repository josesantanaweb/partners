import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const SpousalHistory = ({ setModal, editData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const {
      completeName,
      address,
      phone,
      typeOfEmployee,
      nameOfLastEmployer,
      positionLastEmployed,
      laborSeniority,
      profession,
      rut,
      rutIssueDate,
      rutExpirationDate,
      nationality,
      birthDate,
    } = submitData;
    let spousalHistory = {
      completeName: completeName,
      address: address,
      phone: phone,
      typeOfEmployee: typeOfEmployee,
      nameOfLastEmployer: nameOfLastEmployer,
      positionLastEmployed: positionLastEmployed,
      laborSeniority: laborSeniority,
      profession: profession,
      rut: rut,
      rutIssueDate: rutIssueDate,
      rutExpirationDate: rutExpirationDate,
      nationality: nationality,
      birthDate: birthDate,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { spousalHistory });
      setModal({ edit: false }, { add: false }, { document: false });
      window.location.reload();
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
            name="completeName"
            defaultValue={editData?.spousalHistory?.completeName}
            placeholder="Ingrese Nombres"
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
            defaultValue={editData?.spousalHistory?.address}
            placeholder="Ingresa Direccion"
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
            defaultValue={editData?.spousalHistory?.phone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Tipo de empleeado</label>
          <input
            className="form-control"
            type="text"
            name="typeOfEmployee"
            defaultValue={editData?.spousalHistory?.typeOfEmployee}
            placeholder="Ingresa Tipo de empleeado"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre del ultimo empleador</label>
          <input
            className="form-control"
            type="text"
            name="nameOfLastEmployer"
            defaultValue={editData?.spousalHistory?.nameOfLastEmployer}
            placeholder="Ingresa Nombre del ultimo empleador"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Cargo del ultimo empleador</label>
          <input
            className="form-control"
            type="text"
            name="positionLastEmployed"
            defaultValue={editData?.spousalHistory?.positionLastEmployed}
            placeholder="Ingresa Cargo del ultimo empleador"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Antiguedad laboral</label>
          <input
            className="form-control"
            type="text"
            name="laborSeniority"
            defaultValue={editData?.spousalHistory?.laborSeniority}
            placeholder="Ingresa Antiguedad laboral"
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
            defaultValue={editData?.spousalHistory?.profession}
            placeholder="Ingresa Profesion"
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
            defaultValue={editData?.spousalHistory?.rut}
            placeholder="Ingresa Rut"
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
            defaultValue={editData?.spousalHistory?.rutIssueDate}
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
            defaultValue={editData?.spousalHistory?.rutExpirationDate}
            placeholder="Ingresa Fecha de expiracion"
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
            defaultValue={editData?.spousalHistory?.nationality}
            placeholder="Ingresa Nacionalidad"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de nacimineto</label>
          <input
            className="form-control"
            type="date"
            name="birthDate"
            defaultValue={editData?.spousalHistory?.birthDate}
            placeholder="Ingresa Fecha de nacimineto"
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

export default SpousalHistory;
