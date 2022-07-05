import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Block,
  BlockBetween,
  Button,
  Icon,
  Col,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  RSelect,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PreviewAltCard,
  PaginationComponent,
} from "../../components/Component";
import DatePicker from "react-datepicker";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import LibraryServices from "../../services/LibraryServices";
import DocumentsServices from "../../services/DocumentsServices";
import CustomersServices from "../../services/CustomersServices";

const CustomerId = () => {
  const [data, setData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [documentsOptions, setDocumentsOptions] = useState(documents);
  const [customer, setCustomer] = useState([]);
  const [customerLegal, setCustomerLegal] = useState([]);
  const [issueDate, setIssueDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date());

  const [sm, updateSm] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [formData, setFormData] = useState({
    documentTypeId: "",
    // description: filterDocumentType?.description,
    observation: "",
    // issueDate: "",
    expirationDate: "",
    file: "",
  });

  // Filter customers input search bar
  const [documentsfiltred, setDocumentsfiltred] = useState([]); //usuarios/setUsuarios
  const [documentsTable, setDocumentsTable] = useState([]); //tabalUsuarios/setTablaUsuarios
  const [search, setSearch] = useState(""); //busqueda

  // function to find document type
  const filterDocumentType = documents.find((item) => item.value == documentsOptions.value);

  // get dinamic customerId
  const index = window.location.href.indexOf("customer-library") + 17;
  const customerId = window.location.href.slice(index);

  // function to get customer document
  const getCustomerDocument = async (customerId) => {
    try {
      const customerDocument = await LibraryServices.getCustomerDocument(customerId);
      setDocumentsTable(customerDocument?.data);
      setDocumentsfiltred(customerDocument?.data);
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (input) => {
    var res = documentsTable.filter((document) => {
      if (document?.documentType?.name.toString().toLowerCase().includes(input.toLowerCase())) {
        return document;
      }
    });
    setDocumentsfiltred(res);
  };

  // function to get customers natural
  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerNatural();
      const filterCustomerId = customers.data.find((item) => item.id == customerId);
      setCustomer(filterCustomerId);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCustomers(customerId);
  }, [customerId]);

  const getCustomersLegal = async () => {
    try {
      const customersLegal = await CustomersServices.getCustomerLegal();
      const filterCustomerId = customersLegal.data.find((item) => item.id == customerId);
      setCustomerLegal(filterCustomerId);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCustomersLegal(customerId);
  }, [customerId]);

  useEffect(() => {
    getCustomerDocument(parseInt(customerId));
  }, []);

  // function to reset the form
  const resetForm = () => {
    setFormData({
      documentTypeId: "",
      description: "",
      observation: "",
      issueDate: "",
      expirationDate: "",
      file: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { documentTypeId, description, observation, issueDate, expirationDate, file } = submitData;
    let submittedData = {
      documentTypeId: documentsOptions?.value,
      // description: documentsOptions?.value,
      observation: observation,
      issueDate,
      expirationDate,
      file: file[0],
    };
    try {
      const formData = new FormData();
      let object = {};

      formData.append("file", file[0]);
      formData.append("documentTypeId", documentsOptions.value);
      formData.append("expirationDate", expirationDate);
      formData.append("issueDate", issueDate);
      formData.append("observation", observation);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));
      console.log(json);

      await LibraryServices.addCustomerLibDoc(formData, customerId);
      setData([submittedData, customerId]);
      setModal({ edit: false, add: false });
      resetForm();
      getCustomerDocument(Number(customerId));
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  // function to get company select
  const getDocuments = async () => {
    try {
      const documents = await DocumentsServices.getDocuments();
      const documentsData = await documents.data.map((document) => ({
        label: document?.name,
        value: document?.id,
        description: document?.description,
      }));
      setDocuments(documentsData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsDocumentsChange = (optionValue) => {
    setDocumentsOptions(optionValue);
  };

  useEffect(() => {
    getDocuments();
    if (documentsOptions.value) {
      return documents.find((item) => item.value == documentsOptions.value);
    }
  }, [documentsOptions.value]);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = documentsfiltred.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // parse date
  const parseDate = (date) => {
    const dateParse = new Date(date);
    const day = dateParse.getDate();
    const month = dateParse.getMonth() + 1;
    const year = dateParse.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log(data);

  return (
    <React.Fragment>
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: "2.5rem",
                }}
              >
                <Link to="/customer-library" className="dropdown-toggle nk-quick-nav-icon mr-2">
                  <Icon name="arrow-left" />
                </Link>
                <div>
                  <BlockTitle tag="h3" page>
                    Lista de Documentos
                  </BlockTitle>
                  <BlockDes className="text-soft">
                    <p>
                      Documentos de{" "}
                      <span className="text-primary bold">{customer?.names || customerLegal?.companyName}</span> (
                      {documentsTable?.length} documentos)
                    </p>
                  </BlockDes>
                </div>
              </div>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="d-flex flex-row">
                <div className="mr-4">
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search" />
                        </div>
                        <input
                          type="text"
                          value={search}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Buscar por: Documento, Descripción, Fecha de emisión o caducidad"
                          style={{ minWidth: "30rem" }}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
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
                        <Button color="primary" onClick={() => setModal({ add: true })}>
                          <Icon name="plus" className="mr-1"></Icon>
                          Agregar Documento
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/* Button agregar Doc */}
        <Block>
          <div className="container-fluid overflow-auto scrollbar-fluid">
            <div className="nk-tb-list is-separate is-medium mb-3 ">
              <DataTableHead className="nk-tb-item">
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Documento</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Descripción</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha de creación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha de expiración</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Archivo</span>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => (
                    <DataTableItem key={item.id} className="rounded-0 text-center">
                      <DataTableRow className="text-center ">
                        <div className="user-card text-center d-flex align-items-center justify-content-center">
                          <div className="user-info text-center">
                            <span className="tb-lead">
                              {customer?.names || customerLegal?.companyName}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{customer?.email || customerLegal?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.documentType?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.documentType?.description}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.issueDate)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.expirationDate)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <Button color="primary" type="button">
                            <Icon name="eye" className="mr-1"></Icon>
                            <span className="text-white">Visualizar</span>
                          </Button>
                        </a>
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
                  <span className="text-silent">No se encontaron documentos</span>
                </div>
              )}
            </PreviewAltCard>
          </div>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: true })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Agregar Documento</h5>
              <p className="text-soft"> </p>
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
                      <label className="form-label">Documento</label>
                      <RSelect
                        value={documentsOptions}
                        options={documents}
                        onChange={onOptionsDocumentsChange}
                        defautlValue={formData.documentTypeId}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="description"
                        style={{ backgroundColor: "#e5e9f2", color: "black !important" }}
                        defaultValue={filterDocumentType?.description}
                        placeholder="Descripción documento"
                        ref={register({ required: "Este campo es requerido" })}
                        readOnly
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12" className="mb-4">
                    <FormGroup>
                      <label className="form-label">Observación</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="observation"
                        placeholder="Ingresa observación"
                        defaultValue={formData.observation}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6" className="mb-4">
                    <FormGroup>
                      <label className="form-label">Fecha de emisión</label>
                      <input
                        className="form-control"
                        type="date"
                        name="issueDate"
                        defaultValue={formData.issueDate}
                        ref={register()}
                      />
                      {/* aca */}
                      {/* <DatePicker
                        selected={issueDate}
                        className="form-control"
                        onChange={(date) => setIssueDate(date)}
                      /> */}
                    </FormGroup>
                  </Col>

                  <Col md="6" className="mb-4">
                    <FormGroup>
                      <label className="form-label">Fecha de expiración</label>
                      <input
                        className="form-control"
                        type="date"
                        name="expirationDate"
                        defaultValue={formData.expirationDate}
                        ref={register()}
                      />
                      {/* <DatePicker
                        selected={expirationDate}
                        className="form-control"
                        onChange={(date) => setExpirationDate(date)}
                      /> */}
                    </FormGroup>
                  </Col>

                  <Col md="12" className="mb-4">
                    <FormGroup>
                      <label className="form-label">Subir documento</label>
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
      </Content>
    </React.Fragment>
  );
};

export default CustomerId;
