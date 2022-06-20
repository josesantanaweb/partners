import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Col,
  RSelect,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "../../../../components/Component";
import DatePicker from "react-datepicker";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import LibraryServices from "../../../../services/LibraryServices";
import DocumentsServices from "../../../../services/DocumentsServices";
import CustomersServices from "../../../../services/CustomersServices";

const DocumentRequired = ({ libraryClient ,setModal, editData, selectClient, needDocument,requiredDocument}) => {

  useEffect(()=> console.log('hasta cuando',needDocument) ,[needDocument])

  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    documentTypeId: "",
    // description: filterDocumentType?.description,
    observation: "",
    // issueDate: "",
    expirationDate: "",
    file: "",
  });
  const [documentsOptions, setDocumentsOptions] = useState(documents);
  const [modalDocument, setModalDocument] = useState({add: false});
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();

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

  const onFormCancel = () => {
    setModalDocument({ edit: false, add: false });
    resetForm();
  };

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
      // console.log(json);

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
  
  const ModalUploadDocument = () => {
    return(
      <Modal isOpen={modalDocument.add} toggle={() => setModalDocument({ add: false })} className="modal-dialog-centered" size="lg">
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
                      //defaultValue={filterDocumentType?.description}
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
      </Modal>)
  }

  return(
    <>
      <Col md="12">
        <div className="scrollbar-fluid overflow-auto mb-3 table-records">
          <div className="nk-tb-list is-separate is-medium">
          <DataTableHead className="nk-tb-item scrollbar-fluid overflow-auto">
              <DataTableRow   className="text-center border-bottom border bg-light">
                <span className="sub-text">Documentos Requeridos</span>
              </DataTableRow>
          
          
          </DataTableHead>
          {
                needDocument.documents
                ? needDocument.documents.map(act => 
                  <>
                  <DataTableItem className=" text-center border-bottom border bg-light">
                    <DataTableRow className="text-center d-flex justify-content-between">
                      <span className="sub-text">{act.name}</span>
                
                      <Button color="primary" size="md"  onClick={() => setModalDocument({ add: true })}>
                        Subir
                      </Button>
                    </DataTableRow> 
                    <DataTableRow className="text-center d-flex justify-content-between">
                      {
                        libraryClient.filter( e=> e.documentType.id == act.id )
                        .map( elem => (
                          <>
                            <DataTableItem> 
                              <DataTableRow className=" text-center border-bottom border ">{elem.documentType.name}</DataTableRow>
                              <DataTableRow className=" text-center border-bottom border ">Created: {elem.createdAt.split('T')[0]}</DataTableRow>
                              <DataTableRow className=" text-center border-bottom border ">Exp: {elem.expirationDate.split('T')[0]}</DataTableRow>
                              <DataTableRow className="p-0"><a target="blank" className="text-white" href={elem.url} ><Button color="primary" size="md">Ver</Button></a></DataTableRow>
                              <DataTableRow className=" "><a target="blank" className="text-white" href={elem.url} ><Button  color="primary" size="md">Vincular</Button></a></DataTableRow>
                            </DataTableItem>
                          </>    
                        ))
                      }
                    </DataTableRow> 
                  </DataTableItem>
                  
                
                  </>
                  )
                :<>
                </>
              }
              
          </div>
        </div>
      </Col>
      
      <ModalUploadDocument />
    </>
  )
}

export default DocumentRequired;