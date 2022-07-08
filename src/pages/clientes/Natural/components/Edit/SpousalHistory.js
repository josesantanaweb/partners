import React, { useState, useEffect } from "react";
import { FormGroup, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Button } from "../../../../../components/Component";
import CustomersServices from "../../../../../services/CustomersServices";
registerLocale("es", es);

const SpousalHistory = ({ setAddActiveTab2, setGeneralStateForm, setModal, editData }) => {
  const [rutIssueDate, setRutIssueDate] = useState(new Date());
  const [rutExpirationDate, setRutExpirationDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());

  useEffect(() => {
    if (editData?.spousalHistory?.rutIssueDate) {
      setRutIssueDate(new Date(editData?.spousalHistory?.rutIssueDate));
    }
    if (editData?.spousalHistory?.rutExpirationDate) {
      setRutExpirationDate(new Date(editData?.spousalHistory?.rutExpirationDate));
    }
    if (editData?.spousalHistory?.birthDate) {
      setBirthDate(new Date(editData?.spousalHistory?.birthDate));
    }
  }, []);

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
      nationality,
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
      // window.location.reload();
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    completeName: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    address: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    phone: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    typeOfEmployee: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    nameOfLastEmployer: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    positionLastEmployed: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    laborSeniority: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    profession: e.target.value,
                  },
                };
              })
            }
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
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    rut: e.target.value,
                  },
                };
              })
            }
            defaultValue={editData?.spousalHistory?.rut}
            placeholder="Ingresa Rut"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de emisión</label>
          <DatePicker
            selected={rutIssueDate}
            className="form-control"
            onChange={(date) => {
              setRutIssueDate(date);
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    rutIssueDate: date,
                  },
                };
              });
            }}
            dateFormat="dd/MM/yyyy"
            locale="es"
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de expiracion</label>
          <DatePicker
            selected={rutExpirationDate}
            className="form-control"
            onChange={(date) => {
              setRutExpirationDate(date);
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    rutExpirationDate: date,
                  },
                };
              });
            }}
            dateFormat="dd/MM/yyyy"
            locale="es"
          />
        </FormGroup>
      </Col>

      {/* <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">País de nacimiento</label>
          <input
            className="form-control"
            type="text"
            name="countryOfBirth"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    countryOfBirth: e.target.value,
                  },
                };
              })
            }
            defaultValue={editData?.spousalHistory?.nationality}
            placeholder="Ingresa Fecha de Nacimiento"
            ref={register()}
          />
        </FormGroup>
      </Col> */}
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Nacionalidad</label>
          <input
            className="form-control"
            type="text"
            name="nationality"
            onChange={(e) =>
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    nationality: e.target.value,
                  },
                };
              })
            }
            defaultValue={editData?.spousalHistory?.nationality}
            placeholder="Ingresa Nacionalidad"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Fecha de nacimiento</label>
          <DatePicker
            selected={birthDate}
            className="form-control"
            onChange={(date) => {
              setBirthDate(date);
              setGeneralStateForm((prev) => {
                return {
                  ...prev,
                  spousalHistory: {
                    ...prev.spousalHistory,
                    birthDate: date,
                  },
                };
              });
            }}
            dateFormat="dd/MM/yyyy"
            locale="es"
          />
        </FormGroup>
      </Col>
      <Col size="12">
        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
          <li>
            <Button color="primary" size="md" type="button" onClick={() => setAddActiveTab2("6")}>
              Siguiente
            </Button>
          </li>
        </ul>
      </Col>
    </Form>
  );
};

export default SpousalHistory;
