import React, { useState, useEffect } from "react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  PreviewAltCard,
  RSelect,
} from "../../components/Component";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import DatePicker from "react-datepicker";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import ValidDealsServices from "../../services/ValidDealsServices";

const DocumentsList = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [estimatedDate, setEstimatedDate] = useState(new Date());
  const [realDate, setRealDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [sm, updateSm] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  // Valid Deals
  const getValidDeals = async () => {
    try {
      const validDeals = await ValidDealsServices.getValidDeals();
      const validDealsData = await validDeals.data.map((data) => data);
      console.log(`Valid data`, validDealsData);
      setData(validDealsData);
    } catch (error) {}
  };

  useEffect(() => {
    getValidDeals();
  }, []);

  // Valid Deals
  const [formData, setFormData] = useState({
    // name: "",
    // description: "",
    customer: "",
    company: "",
    createdByAdvisor: "",
    product: "",
    createdAt: "",
    amountOfTheInvestment: "",
    currency: "",
  });

  // function to reset the form
  const resetForm = () => {
    setFormData({
      // name: "",
      // description: "",
      customer: "",
      company: "",
      createdByAdvisor: "",
      product: "",
      createdAt: "",
      amountOfTheInvestment: "",
      currency: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const {
      // name,
      // description,
      customer,
      company,
      createdByAdvisor,
      product,
      createdAt,
      amountOfTheInvestment,
      currency,
    } = submitData;
    let submittedData = {
      // name: name,
      // description: description,
      customer: customer,
      company: company,
      createdByAdvisor: createdByAdvisor,
      product: product,
      createdAt: createdAt,
      amountOfTheInvestment: amountOfTheInvestment,
      currency: currency,

      dateOfEntry: dateOfEntry,
      estimatedDate: estimatedDate,
      realDate: realDate,
    };
    try {
      await ValidDealsServices.addValidDeal(submittedData);
      setData([submittedData, ...data]);
      console.log(submittedData);

      resetForm();
      getValidDeals();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const {
      // name,
      // description,
      customer,
      company,
      createdByAdvisor,
      product,
      createdAt,
      amountOfTheInvestment,
      currency,
    } = submitData;

    let submittedData = {
      // name: name,
      // description: description,
      customer: customer,
      company: company,
      createdByAdvisor: createdByAdvisor,
      product: product,
      createdAt: createdAt,
      amountOfTheInvestment: amountOfTheInvestment,
      currency: currency,
    };

    try {
      await ValidDealsServices.editValidDeal(editData.id, submittedData);
      resetForm();
      getValidDeals();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to handle description doc length
  // const handleDescriptionLength = (description) => {
  //   if (description.length > 35) {
  //     return description.substring(0, 35) + "...";
  //   }
  //   return description;
  // };

  // function to parse date
  const parseDate = (date) => {
    const dateParse = new Date(date);
    const dateString = dateParse.toLocaleDateString();
    return dateString;
  };

  const options = [
    { value: "retiro", label: "Retiro" },
    { value: "abono", label: "Abono" },
    { value: "transfondos", label: "Transferencia de Fondos" },
    { value: "fondomutuo", label: "Fondo Mutuo" },
  ];

  const optionsCurrency = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "clp", label: "CLP" },
  ];

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Resumen de Operaciones
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {data.length} operaciones</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search" />
                        </div>
                        <input
                          type="text"
                          // value={search}
                          // onChange={handleChange}
                          className="form-control"
                          placeholder="Buscar por: Cliente, Asesor/a, Plan o Empresa"
                          style={{ minWidth: "25rem" }}
                        />
                      </div>
                    </li>
                    {/* <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Documento
                      </Button>
                    </li> */}
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="container-fluid overflow-auto scrollbar-fluid">
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Asesor/a</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Plan/Producto</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Empresa</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Monto</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Moneda</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="text-center">
                        <span>{item?.customer?.name == null ? `No encontrado` : item?.customer?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.createdByAdvisor?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.product?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.company?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.createdAt)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.amountOfTheInvestment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.currency?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 d-flex justify-content-center">
                          <li className="nk-tb-action" onClick={() => onEditClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="plus"
                              direction="top"
                              text="Crear acción"
                            />
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  ))
                : null}
            </div>

            <PreviewAltCard>
              {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">Sin Registros</span>
                </div>
              )}
            </PreviewAltCard>
          </div>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Agregar Operación</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Producto ya existe
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Nombre documento"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Descripción documento"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Documento
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                            setErrorMessage("");
                          }}
                          className="link link-light"
                        >
                          Cancelar
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modal.edit}
          toggle={() => setModal({ edit: false })}
          className="modal-dialog-centered"
          size="lg"
          style={{ maxWidth: "1024px" }}
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>

            <div className="p-2">
              <h5 className="title pb-4">Creación Movimientos Post Venta</h5>
              <Col md="12" className="mb-4">
                <FormGroup className="border-bottom pb-2">
                  <h6>Datos de Operación</h6>
                </FormGroup>
              </Col>
              <Block>
                <div className="container-fluid overflow-auto scrollbar-fluid">
                  <div className="nk-tb-list is-separate is-medium">
                    <DataTableHead className="nk-tb-item">
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Cliente</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Asesor/a</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Plan/Producto</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Empresa</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Fecha</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Monto</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Moneda</span>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableItem>
                      <DataTableRow className="text-center">
                        <span>{editData?.customer?.name ? "Sin Nombre" : editData?.customer?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.createdByAdvisor?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.product?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.company?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(editData?.createdAt)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.amountOfTheInvestment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.currency?.name}</span>
                      </DataTableRow>
                    </DataTableItem>
                  </div>
                </div>
              </Block>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Tipo de Operación</label>
                      <RSelect
                        // value={documentsOptions}
                        // options={documents}
                        // onChange={onOptionsDocumentsChange}
                        // defautlValue={formData.documentTypeId}
                        options={options}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de Ingreso</label>
                      <DatePicker
                        selected={dateOfEntry}
                        className="form-control"
                        onChange={(date) => setDateOfEntry(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de Estimada</label>
                      <DatePicker
                        selected={estimatedDate}
                        className="form-control"
                        onChange={(date) => setEstimatedDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha Real</label>
                      <DatePicker
                        selected={realDate}
                        className="form-control"
                        onChange={(date) => setRealDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormGroup>
                  </Col>

                  {/* <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de ingreso</label>
                      <input
                        className="form-control"
                        type="date"
                        name="issueDate"
                        defaultValue={formData.issueDate}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha estimada</label>
                      <input
                        className="form-control"
                        type="date"
                        name="issueDate"
                        defaultValue={formData.issueDate}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha real</label>
                      <input
                        className="form-control"
                        type="date"
                        name="realDate"
                        defaultValue={formData.realDate}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col> */}

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Monto</label>
                      <input
                        className="form-control"
                        type="text"
                        name="amount"
                        defaultValue={formData.amount}
                        placeholder="Ingrese monto"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Moneda</label>
                      <RSelect
                        // value={documentsOptions}
                        // options={documents}
                        // onChange={onOptionsDocumentsChange}
                        // defautlValue={formData.documentTypeId}
                        options={optionsCurrency}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                        <label className="file-input__label" htmlFor="file-input">
                          <input
                            type="file"
                            className="bg-light border-0"
                            name="file"
                            defaultValue={formData.file}
                            ref={register()}
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                          />
                        </label>
                      </div>
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
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancelar
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default DocumentsList;
