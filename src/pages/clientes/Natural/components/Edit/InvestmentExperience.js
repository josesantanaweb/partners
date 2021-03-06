import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const InvestmentExperience = ({ setModal, editData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { shares, mutualFunds, annuities, options, alternativeInvestments } = submitData;
    let investmentExperience = {
      shares: shares,
      mutualFunds: mutualFunds,
      annuities: annuities,
      options: options,
      alternativeInvestments: alternativeInvestments,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { investmentExperience });
      setModal({ edit: false }, { add: false }, { document: false });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Opciones</label>
          <input
            className="form-control"
            type="text"
            name="shares"
            defaultValue={editData?.investmentExperience?.shares}
            placeholder="Ingrese Opciones"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fondos mutuos</label>
          <input
            className="form-control"
            type="text"
            name="mutualFunds"
            defaultValue={editData?.investmentExperience?.mutualFunds}
            placeholder="Ingresa Fondos mutuos"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Anualidades</label>
          <input
            className="form-control"
            type="text"
            name="annuities"
            defaultValue={editData?.investmentExperience?.annuities}
            placeholder="Ingresa Anualidades"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Opciones</label>
          <input
            className="form-control"
            type="text"
            name="options"
            defaultValue={editData?.investmentExperience?.options}
            placeholder="Ingresa Opciones"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Inversiones alternativas</label>
          <input
            className="form-control"
            type="text"
            name="alternativeInvestments"
            defaultValue={editData?.investmentExperience?.alternativeInvestments}
            placeholder="Ingresa Inversiones alternativas"
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

export default InvestmentExperience;
