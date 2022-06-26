import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../components/Component";
import CustomersServices from "../../../../services/CustomersServices";

const AccountData = ({setAddActiveTab2 ,setGeneralStateForm, setModal, editData, selectClient}) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Editar cliente
  const onFormSubmit = async (submitData) => {
    const { bankName, accountType, sucursalAddress, accountNumber, accountOpeningDate } = submitData;
    let currentAccountData = {
      bankName: bankName,
      accountType: accountType,
      sucursalAddress: sucursalAddress,
      accountNumber: accountNumber,
      accountOpeningDate: accountOpeningDate,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { currentAccountData });
      setModal({ edit: false }, { add: false }, { document: false });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre del banco</label>
          <input
            className="form-control"
            type="text"
            name="bankName"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,currentAccountData:{
                  ...prev.currentAccountData,
                  backName:e.target.value
                }
              }
            })} 
            defaultValue={editData?.currentAccountData?.bankName}
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
            name="accountType"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,currentAccountData:{
                  ...prev.currentAccountData,
                  accountType:e.target.value
                }
              }
            })} 
            defaultValue={editData?.currentAccountData?.accountType}
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
            name="sucursalAddress"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,currentAccountData:{
                  ...prev.currentAccountData,
                  sucursalAddress:e.target.value
                }
              }
            })} 
            defaultValue={editData?.currentAccountData?.sucursalAddress}
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
            name="accountNumber"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,currentAccountData:{
                  ...prev.currentAccountData,
                  accountNumber:e.target.value
                }
              }
            })} 
            defaultValue={editData?.currentAccountData?.accountNumber}
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
            name="accountOpeningDate"
            onChange={(e)=>setGeneralStateForm( prev => {
              return {
                ...prev,currentAccountData:{
                  ...prev.currentAccountData,
                  accountOpeningDate:e.target.value
                }
              }
            })} 
            defaultValue={editData?.currentAccountData?.accountOpeningDate}
            placeholder="Ingresa Fecha de apertura"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col size="12">
        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
          <li>
            <Button color="primary" size="md" type="button" onClick={ ()=> setAddActiveTab2('2')}>
              Siguiente
            </Button>
          </li>
        </ul>
      </Col>
    </Form>
  );
};

export default AccountData;
