/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button, RSelect } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const CompanyFinancialProfile = ({ setModal, editData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Agreagar cliente
  const onFormSubmit = async (submitData) => {
    const {
      contractType,
      anualFee,
      needForLiquidity,
      annualIncomeUSD,
      liquidAssets,
      totalEquity,
      timeToWithdrawMoneyFromTheAccount,
      bankOfOriginOfFunds,
      countryOfOriginOfFunds,
      sourceOfFunds,
      exactAmountOfInvestment,
      methodOfPayment,
    } = submitData;
    let companyFinancialProfile = {
      contractType,
      anualFee,
      needForLiquidity,
      annualIncomeUSD,
      liquidAssets,
      totalEquity,
      timeToWithdrawMoneyFromTheAccount,
      bankOfOriginOfFunds,
      countryOfOriginOfFunds,
      sourceOfFunds,
      exactAmountOfInvestment,
      methodOfPayment,
    };
    try {
      await CustomersServices.editCustomerLegal(editData.id, { companyFinancialProfile });
      setModal({ edit: false }, { add: false });
      window.location.reload();
    } catch (error) {}
  };

  console.log(editData);

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Tipo de contrato</label>
          <input
            className="form-control"
            type="text"
            name="contractType"
            defaultValue={editData?.companyFinancialProfile?.contractType}
            placeholder="Ingresa Tipo de contrato"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fee anual</label>
          <input
            className="form-control"
            type="text"
            name="anualFee"
            defaultValue={editData?.companyFinancialProfile?.anualFee}
            placeholder="Ingresa Fee anual"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Necesidad de liquidez</label>
          <input
            className="form-control"
            type="text"
            name="needForLiquidity"
            defaultValue={editData?.companyFinancialProfile?.needForLiquidity}
            placeholder="Ingresa Necesidad de liquidez"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Ingreso anual USD</label>
          <input
            className="form-control"
            type="text"
            name="annualIncomeUSD"
            defaultValue={editData?.companyFinancialProfile?.annualIncomeUSD}
            placeholder="Ingresa Ingreso anual USD"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Activos liquidos</label>
          <input
            className="form-control"
            type="text"
            name="liquidAssets"
            defaultValue={editData?.companyFinancialProfile?.liquidAssets}
            placeholder="Ingresa Activos liquidos"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Patrimonio total</label>
          <input
            className="form-control"
            type="text"
            name="totalEquity"
            defaultValue={editData?.companyFinancialProfile?.totalEquity}
            placeholder="Ingresa Patrimonio total"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Tiempo estimado (en años) en el que planea realizar retiros de la cuenta</label>
          <input
            className="form-control"
            type="text"
            name="timeToWithdrawMoneyFromTheAccount"
            defaultValue={editData?.companyFinancialProfile?.timeToWithdrawMoneyFromTheAccount}
            placeholder="Ingresa Tiempo estimado (en años) en el que planea realizar retiros de la cuenta"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Origen de los fondos</label>
          <input
            className="form-control"
            type="text"
            name="sourceOfFunds"
            defaultValue={editData?.companyFinancialProfile?.sourceOfFunds}
            placeholder="Ingresa Origen de los fondos"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Monto exacto de la inversión que planea en Stonex</label>
          <input
            className="form-control"
            type="text"
            name="exactAmountOfInvestment"
            defaultValue={editData?.companyFinancialProfile?.exactAmountOfInvestment}
            placeholder="Ingresa Monto exacto de la inversión que planea en Stonex"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Método de pago</label>
          <input
            className="form-control"
            type="text"
            name="methodOfPayment"
            defaultValue={editData?.companyFinancialProfile?.methodOfPayment}
            placeholder="Ingresa Método de pago"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">País origen de los fondos</label>
          <input
            className="form-control"
            type="text"
            name="countryOfOriginOfFunds"
            defaultValue={editData?.companyFinancialProfile?.countryOfOriginOfFunds}
            placeholder="Ingresa País origen de los fondos"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">País origen de los fondos</label>
          <input
            className="form-control"
            type="text"
            name="countryOfOriginOfFunds"
            defaultValue={editData?.companyFinancialProfile?.countryOfOriginOfFunds}
            placeholder="Ingresa País origen de los fondos"
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

export default CompanyFinancialProfile;
