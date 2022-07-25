import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button, RSelect } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const InvestmentExperience = ({ setAddActiveTab2, setGeneralStateForm, setModal, editData }) => {
  const [data, setData] = useState([]);
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  const optionsInvExperience = [
    { value: "NULA", label: "NULA" },
    { value: "LIMITADA", label: "LIMITADA" },
    { value: "PROMEDIO", label: "PROMEDIO" },
    { value: "AVANZADA", label: "AVANZADA" },
    { value: "EXPERTA", label: "EXPERTA" },
  ];

  const [investmentExperienceOpt, setInvestmentExperienceOpt] = useState(optionsInvExperience);
  const [investmentExperienceOptions, setInvestmentExperienceOptions] = useState(investmentExperienceOpt);

  const onOptionsInvestmentExperienceChange = (optionValue) => {
    setInvestmentExperienceOptions(optionValue);
  };

  const getCustomersNatural = async () => {
    try {
      const customersNatural = await CustomersServices.getCustomersNatural();
      const customersData = await customersNatural.data.map((data) => data);
      setData(customersData);
    } catch (error) {}
  };

  useEffect(() => {
    getCustomersNatural();
  }, []);

  console.log(investmentExperienceOptions.value);

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { shares, mutualFunds, annuities, alternativeInvestments } = submitData;
    let investmentExperience = {
      shares: shares,
      mutualFunds: mutualFunds,
      annuities: annuities,
      options: investmentExperienceOptions.value,
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
          <RSelect
            value={investmentExperienceOptions}
            options={investmentExperienceOpt}
            onChange={onOptionsInvestmentExperienceChange}
            defautlValue={editData?.options}
          />
          {/* <input
            className="form-control"
            type="text"
            name="options"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  investmentExperience: {
                    ...prev.investmentExperience,
                    options: e.target.value,
                  },
                };
              })
            }
            defaultValue={editData?.investmentExperience?.options}
            placeholder="Ingresa Opciones"
            ref={register()}
          /> */}
        </FormGroup>
      </Col>

      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fondos mutuos</label>
          <input
            className="form-control"
            type="text"
            name="mutualFunds"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  investmentExperience: {
                    ...prev.investmentExperience,
                    mutualFunds: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  investmentExperience: {
                    ...prev.investmentExperience,
                    annuities: e.target.value,
                  },
                };
              })
            }
            defaultValue={editData?.investmentExperience?.annuities}
            placeholder="Ingresa Anualidades"
            ref={register()}
          />
        </FormGroup>
      </Col>

      {/* <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Opciones</label>
          <input
            className="form-control"
            type="text"
            name="shares"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  investmentExperience: {
                    ...prev.investmentExperience,
                    shares: e.target.value,
                  },
                };
              })
            }
            defaultValue={editData?.investmentExperience?.shares}
            placeholder="Ingrese Opciones"
            ref={register()}
          />
        </FormGroup>
      </Col> */}

      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Inversiones alternativas</label>
          <input
            className="form-control"
            type="text"
            name="alternativeInvestments"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  investmentExperience: {
                    ...prev.investmentExperience,
                    alternativeInvestments: e.target.value,
                  },
                };
              })
            }
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
          {/* <li>
            <Button color="primary" size="md" type="button" onClick={() => setAddActiveTab2("5")}>
              Siguiente
            </Button>
          </li> */}
        </ul>
      </Col>
    </Form>
  );
};

export default InvestmentExperience;
