import React, { useState, useEffect } from "react";
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
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import CustomersLibraryServices from "../../services/CustomersLibraryServices";
import DocumentsServices from "../../services/DocumentsServices";

const CustomerId = () => {
  const [data, setData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [documentsOptions, setDocumentsOptions] = useState(documents);
  const [sm, updateSm] = useState(false);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  const filterDocumentType = documents.find((item) => item.value == documentsOptions.value);

  const [formData, setFormData] = useState({
    documentTypeId: "",
    // description: filterDocumentType?.description,
    // observation: "",
    issueDate: "",
    expirationDate: "",
    file: "",
  });

  // get dinamic customerId
  const index = window.location.href.indexOf("customer-library") + 17;
  const customerId = window.location.href.slice(index);

  // function to get customer document
  const getCustomerDocument = async (customerId) => {
    try {
      const customerDocument = await CustomersLibraryServices.getCustomerDocument(customerId);
      setData(customerDocument.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCustomerDocument(parseInt(customerId));
  }, []);

  // function to reset the form
  const resetForm = () => {
    setFormData({
      documentTypeId: "",
      // description: "",
      // observation: "",
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
      // description: documentsOptions.value,
      // observation: observation,
      issueDate: issueDate,
      expirationDate: expirationDate,
      file: file[0],
    };

    try {
      const formData = new FormData();
      let object = {};

      formData.append("file", file[0]);
      formData.append("documentTypeId", documentsOptions.value);
      formData.append("expirationDate", expirationDate);
      formData.append("issueDate", issueDate);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));
      console.log(json);

      await CustomersLibraryServices.addCustomerLibDoc(formData, customerId);
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
    // get document type filtred
    if (documentsOptions.value) {
      return documents.find((item) => item.value == documentsOptions.value);
    }
  }, [documentsOptions.value]);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Documentos
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Documentos básicos de Negocio</p>
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
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Documento
                      </Button>
                    </li>
                  </ul>
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
                  <span className="sub-text">Documento</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Descripción</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha de creación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Archivo</span>
                </DataTableRow>
              </DataTableHead>

              {data.length > 0
                ? data.map((item) => (
                    <DataTableItem key={item.id} className="rounded-0">
                      <DataTableRow className="text-center border-bottom">
                        <span>{item?.documentType?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center border-bottom">
                        <span>{item?.documentType?.description}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center border-bottom">
                        <span>{item?.createdAt}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center border-bottom">
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
                      <input
                        type="text"
                        className="form-control"
                        name="observation"
                        ref={register({ required: "Este campo es obligatorio *" })}
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
                    </FormGroup>
                  </Col>

                  <Col md="12" className="mb-4">
                    <FormGroup>
                      <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                        <label className="file-input__label" htmlFor="file-input">
                          <input
                            type="file"
                            className="bg-light border-0"
                            name="file"
                            defaultValue={formData.file}
                            ref={register()}
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
