import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { Col, Button, Icon } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const Beneficiaries = ({ setModal, editData }) => {
  // useForm
  const { register, handleSubmit, control } = useForm();

  const {
    fields: beneficiariesFields,
    append: appendBeneficiaries,
    remove: removeBeneficiaries,
  } = useFieldArray({ control, name: "beneficiaries" });

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Agregar beneficiarios
  const handleAddBeneficiarios = () => {
    appendBeneficiaries({
      names: "",
      paternalLastName: "",
      email: "",
      percentage: "",
      birthDate: "",
      kinship: "",
      address: "",
      rut: "",
    });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { addBeneficiaries, editBeneficiaries } = submitData;
    if (editBeneficiaries && addBeneficiaries) {
      let beneficiaries = {
        beneficiaries: [...addBeneficiaries, ...editBeneficiaries],
      };
      try {
        await CustomersServices.editCustomerNatural(editData.id, beneficiaries);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    } else if (editBeneficiaries) {
      let beneficiaries = {
        beneficiaries: editBeneficiaries,
      };
      try {
        await CustomersServices.editCustomerNatural(editData.id, beneficiaries);
        setModal({ edit: false }, { add: false }, { document: false });
        window.location.reload();
      } catch (error) {}
    } else {
      let beneficiaries = {
        beneficiaries: addBeneficiaries,
      };
      try {
        await CustomersServices.editCustomerNatural(editData.id, beneficiaries);
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

      {editData?.beneficiaries.map((item, i) => (
        <span key={i} className="form-grid-beneficiaries">
          <div>
            <FormGroup>
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                type="text"
                name={`editBeneficiaries[${i}].names`}
                defaultValue={editData?.beneficiaries[i].names}
                placeholder="Ingresa Nombre"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Apellido</label>
              <input
                className="form-control"
                type="text"
                name={`editBeneficiaries[${i}].paternalLastName`}
                defaultValue={editData?.beneficiaries[i].paternalLastName}
                placeholder="Ingresa Apellido"
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
                name={`editBeneficiaries[${i}].email`}
                defaultValue={editData?.beneficiaries[i].email}
                placeholder="Ingresa Email"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de Nacimineto</label>
              <input
                className="form-control"
                type="date"
                name={`editBeneficiaries[${i}].birthDate`}
                defaultValue={editData?.beneficiaries[i].birthDate}
                placeholder="Ingresa Fecha de Nacimineto"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Porcentaje</label>
              <input
                className="form-control"
                type="text"
                name={`editBeneficiaries[${i}].percentage`}
                defaultValue={editData?.beneficiaries[i].percentage}
                placeholder="Ingresa Porcentaje"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Parentesco</label>
              <input
                className="form-control"
                type="text"
                name={`editBeneficiaries[${i}].kinship`}
                defaultValue={editData?.beneficiaries[i].kinship}
                placeholder="Ingresa Parentesco"
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
                name={`editBeneficiaries[${i}].phone`}
                defaultValue={editData?.beneficiaries[i].phone}
                placeholder="Ingresa Telefono"
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
                name={`editBeneficiaries[${i}].address`}
                defaultValue={editData?.beneficiaries[i].address}
                placeholder="Ingresa Direccion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">RUT</label>
              <input
                className="form-control"
                type="text"
                name={`editBeneficiaries[${i}].rut`}
                defaultValue={editData?.beneficiaries[i].rut}
                placeholder="Ingresa RUT"
                ref={register()}
              />
            </FormGroup>
          </div>
        </span>
      ))}

      {beneficiariesFields.map((item, i) => (
        <span key={i} className="form-grid-beneficiaries">
          <div>
            <FormGroup>
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                type="text"
                name={`addBeneficiaries[${i}].names`}
                placeholder="Ingresa Nombre"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Apellido</label>
              <input
                className="form-control"
                type="text"
                name={`addBeneficiaries[${i}].paternalLastName`}
                placeholder="Ingresa Apellido"
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
                name={`addBeneficiaries[${i}].email`}
                placeholder="Ingresa Email"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Fecha de cumpleanos</label>
              <input
                className="form-control"
                type="date"
                name={`addBeneficiaries[${i}].birthDate`}
                placeholder="Ingresa Fecha de cumpleanos"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Porcentange</label>
              <input
                className="form-control"
                type="text"
                name={`addBeneficiaries[${i}].percentage`}
                placeholder="Ingresa Porcentange"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">Parentesco</label>
              <input
                className="form-control"
                type="text"
                name={`addBeneficiaries[${i}].kinship`}
                placeholder="Ingresa Parentesco"
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
                name={`addBeneficiaries[${i}].phone`}
                placeholder="Ingresa Telefono"
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
                name={`addBeneficiaries[${i}].address`}
                placeholder="Ingresa Direccion"
                ref={register()}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <label className="form-label">RUT</label>
              <input
                className="form-control"
                type="text"
                name={`addBeneficiaries[${i}].rut`}
                placeholder="Ingresa RUT"
                ref={register()}
              />
            </FormGroup>
          </div>
          <Button
            type="button"
            color="danger"
            className="btn-icon ml-2 delete-btn"
            onClick={() => removeBeneficiaries(i)}
          >
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

export default Beneficiaries;
