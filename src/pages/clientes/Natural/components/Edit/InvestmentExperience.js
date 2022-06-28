import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const InvestmentExperience = ({setAddActiveTab2, setGeneralStateForm, setModal, editData }) => {
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,investmentExperience:{
                  ...prev.investmentExperience,
                  shares:e.target.value
                }
              }
            })} 
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,investmentExperience:{
                  ...prev.investmentExperience,
                  mutualFunds:e.target.value
                }
              }
            })}
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,investmentExperience:{
                  ...prev.investmentExperience,
                  annuities:e.target.value
                }
              }
            })}
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,investmentExperience:{
                  ...prev.investmentExperience,
                  options:e.target.value
                }
              }
            })}
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
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,investmentExperience:{
                  ...prev.investmentExperience,
                  alternativeInvestments:e.target.value
                }
              }
            })}
            defaultValue={editData?.investmentExperience?.alternativeInvestments}
            placeholder="Ingresa Inversiones alternativas"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col size="12">
        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
          <li>
          <Button color="primary" size="md" type="button" onClick={()=>setAddActiveTab2('5')}>
              Siguiente
            </Button>
          </li>
    
        </ul>
      </Col>
    </Form>
  );
};

export default InvestmentExperience;
