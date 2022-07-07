import React from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Col, Button } from "../../../../components/Component";
import CustomersServices from "../../../../services/CustomersServices";

const EmploymentHistory = ({ setAddActiveTab2, setGeneralStateForm, setModal, editData, selectClient }) => {
  // useForm
  const { register, handleSubmit } = useForm();

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  const onFormSubmit = async (submitData) => {
    const {
      typeOfEmployee,
      companyName,
      address,
      industry,
      laborSeniority,
      charge,
      businessPhone,
      email,
      rut,
      zipCode,
    } = submitData;
    let employmentHistory = {
      typeOfEmployee: typeOfEmployee,
      companyName: companyName,
      address: address,
      industry: industry,
      laborSeniority: laborSeniority,
      charge: charge,
      businessPhone: businessPhone,
      email: email,
      rut: rut,
      zipCode: zipCode,
    };
    try {
      await CustomersServices.editCustomerNatural(editData.id, { employmentHistory });
      window.location.reload();
      setModal({ edit: false }, { add: false }, { document: false });
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Tipo de empleo</label>
          <input
            className="form-control"
            type="text"
            name="typeOfEmployee"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    typeOfEmployee: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.typeOfEmployee}
            placeholder="Ingresa Tipo de empleo"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre de empresa</label>
          <input
            className="form-control"
            type="text"
            name="companyName"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    companyName: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.companyName}
            placeholder="Ingresa Nombre de empresa"
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    address: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.address}
            placeholder="Ingresa Direccion"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Industria</label>
          <input
            className="form-control"
            type="text"
            name="industry"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    industry: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.industry}
            placeholder="Ingresa Industria"
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    laborSeniority: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.laborSeniority}
            placeholder="Ingresa Antiguedad laboral"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Cargo</label>
          <input
            className="form-control"
            type="text"
            name="charge"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    charge: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.charge}
            placeholder="Ingresa Cargo"
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
            name="businessPhone"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    businessPhone: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.businessPhone}
            placeholder="Ingresa Telefono"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    email: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.email}
            placeholder="Ingresa Emal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">RUT</label>
          <input
            className="form-control"
            type="text"
            name="rut"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    rut: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.rut}
            placeholder="Ingresa RUT"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Codigo Postal</label>
          <input
            className="form-control"
            type="text"
            name="zipCode"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  employmentHistory: {
                    ...prev.employmentHistory,
                    zipCode: e.target.value,
                  },
                };
              })
            }
            defaultValue={selectClient?.employmentHistory?.zipCode}
            placeholder="Ingresa Codigo Postal"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col size="12">
        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
          <li>
            <Button color="primary" type="button" size="md" onClick={() => setAddActiveTab2("3")}>
              Siguiente
            </Button>
          </li>
        </ul>
      </Col>
    </Form>
  );
};

export default EmploymentHistory;
