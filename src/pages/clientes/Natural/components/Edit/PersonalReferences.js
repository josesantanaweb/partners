import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const PersonalReferences = ({ setGeneralStateForm ,setModal, editData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { names, paternalLastName, email, phone, address } = submitData;
    let personalReferences = {
      names: names,
      paternalLastName: paternalLastName,
      email: email,
      phone: phone,
      address: address,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { personalReferences });
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
            name="names"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,personalReferences:{
                  ...prev.personalReferences,
                  names:e.target.value
                }
              }
            })} 
            defaultValue={editData?.personalReferences?.names}
            placeholder="Ingrese Nombres"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        {/* Cambiar para tener un solor entre apellido materno y paterno */}
        <FormGroup>
          <label className="form-label">Apellidos</label>
          <input
            className="form-control"
            type="text"
            name="paternalLastName"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,personalReferences:{
                  ...prev.personalReferences,
                  paternalLastName:e.target.value
                }
              }
            })} 
            defaultValue={editData?.personalReferences?.paternalLastName}
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,personalReferences:{
                  ...prev.personalReferences,
                  email:e.target.value
                }
              }
            })} 
            defaultValue={editData?.personalReferences?.email}
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,personalReferences:{
                  ...prev.personalReferences,
                  phone:e.target.value
                }
              }
            })} 
            defaultValue={editData?.personalReferences?.phone}
            placeholder="Ingresa Telefono"
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,personalReferences:{
                  ...prev.personalReferences,
                  address:e.target.value
                }
              }
            })} 
            defaultValue={editData?.personalReferences?.address}
            placeholder="Ingresa Direccion"
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

export default PersonalReferences;
