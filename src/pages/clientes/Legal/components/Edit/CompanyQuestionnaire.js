import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";

const AccountData = ({ setModal, editData }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  console.log(editData);

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const {
      mailCorrespondence,
      receiveDocumentsByDocuSign,
      depositOrWithdrawalOfThirdParties,
      companyIsAnInvestmentFund,
      businessWithCompaniesInTheUS,
      otherAccountsInUS,
      bearerSharesIssued,
      isBankBranchOrARepresentationOfABank,
      companyLocatedInUSCosideratedAMutualFunds,
      isItABureauDeChange,
      isAGovernmentEntity,
      isAnInvestmentFundOrFinancialAdvisor,
    } = submitData;
    let companyQuestionnaire = {
      mailCorrespondence: mailCorrespondence,
      receiveDocumentsByDocuSign: receiveDocumentsByDocuSign,
      depositOrWithdrawalOfThirdParties: depositOrWithdrawalOfThirdParties,
      companyIsAnInvestmentFund: companyIsAnInvestmentFund,
      businessWithCompaniesInTheUS: businessWithCompaniesInTheUS,
      otherAccountsInUS: otherAccountsInUS,
      bearerSharesIssued: bearerSharesIssued,
      isBankBranchOrARepresentationOfABank: isBankBranchOrARepresentationOfABank,
      companyLocatedInUSCosideratedAMutualFunds: companyLocatedInUSCosideratedAMutualFunds,
      isItABureauDeChange: isItABureauDeChange,
      isAGovernmentEntity: isAGovernmentEntity,
      isAnInvestmentFundOrFinancialAdvisor: isAnInvestmentFundOrFinancialAdvisor,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { companyQuestionnaire });
      setModal({ edit: false }, { add: false }, { document: false });
      window.location.reload();
    } catch (error) {}
    console.log(companyQuestionnaire);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="mailCorrespondence"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.mailCorrespondence}
            id="1"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="1">
            ¿Acepta que la correspondencia sea por correo electronico?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="receiveDocumentsByDocuSign"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.receiveDocumentsByDocuSign}
            id="2"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="2">
            ¿Desea recibir los documentos a traves de DocuSign?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="depositOrWithdrawalOfThirdParties"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.depositOrWithdrawalOfThirdParties}
            id="3"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="3">
            ¿La cuenta tendra deposito/retiro de terceros?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="companyIsAnInvestmentFund"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.companyIsAnInvestmentFund}
            id="4"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="4">
            ¿La empresa es un fondo de cobertura/inversion?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="businessWithCompaniesInTheUS"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.businessWithCompaniesInTheUS}
            id="5"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="5">
            ¿La empresa tiene negocios con clientes/empresas US?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="otherAccountsInUS"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.otherAccountsInUS}
            id="6"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="6">
            ¿Tiene otras cuentas en US?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="bearerSharesIssued"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.bearerSharesIssued}
            id="7"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="7">
            ¿Alguna vez emitio acciones al portador?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="isBankBranchOrARepresentationOfABank"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.isBankBranchOrARepresentationOfABank}
            id="8"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="8">
            ¿La empresa es un banco, Brach de un banco o actua en representacion de un banco?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="companyLocatedInUSCosideratedAMutualFunds"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.companyLocatedInUSCosideratedAMutualFunds}
            id="9"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="9">
            ¿Si la empresa estuviese localizada en US seria considerada un broke de commodites o fondos mutuos?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="isItABureauDeChange"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.isItABureauDeChange}
            id="10"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="10">
            ¿La empresa es un intermediario de dinero o una casa de cambios?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="isAGovernmentEntity"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.isAGovernmentEntity}
            id="11"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="11">
            ¿Es una entidad gubernamental?
          </label>
        </div>
      </Col>
      <Col md="4" className="mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="isAnInvestmentFundOrFinancialAdvisor"
            className="custom-control-input form-control"
            defaultChecked={editData?.companyQuestionnaire?.isAnInvestmentFundOrFinancialAdvisor}
            id="12"
            ref={register()}
          />
          <label className="custom-control-label" htmlFor="12">
            ¿Es un fondo de inversion o asesor financiero?
          </label>
        </div>
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

export default AccountData;
