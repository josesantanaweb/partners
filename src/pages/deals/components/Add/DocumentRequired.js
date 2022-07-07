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

  //useEffect(()=> console.log('hasta cuando',needDocument) ,[])


  const [modalDocument, setModalDocument] = useState({add: false});
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(()=> console.log(libraryClient),[])
  
  return(
    <>
      <Col md="12">
        <div className="scrollbar-fluid overflow-auto mb-3 table-records">
          <div className="nk-tb-list is-separate is-medium">
            <h6 className="text-center">Documentos Requeridos:</h6>
          <DataTableHead className="nk-tb-item scrollbar-fluid overflow-auto">
         
          </DataTableHead>
          {
            needDocument.documents
            ? needDocument.documents.map(act => 
              
              <DataTableItem key={act.id} className=" text-center border-bottom border bg-light">
               
               <DataTableRow className=" text-center border-bottom border ">{act.name}</DataTableRow>
                  {
                    libraryClient?
                    libraryClient.map( elem => {
                      if(elem.documentType.id == act.id){
                        return   <>
                          <DataTableRow className=" text-center border-bottom border ">Created: {elem?.createdAt?.split('T')[0]}</DataTableRow>
                          <DataTableRow className=" text-center border-bottom border ">Exp: {elem?.expirationDate?.split('T')[0]}</DataTableRow>
                          <DataTableRow className="p-0"><Button color="primary" size="md"><a target="blank" className="text-white" href={elem?.url} >Ver</a></Button></DataTableRow>
                          <DataTableRow className="p-0 m-0"><a target="blank" className="text-white" href={elem?.url} ><Button  color="primary" size="md">Vincular</Button></a></DataTableRow>
                          </>
                     
                      }
                      return <></>
                    }):<></>
                  }
                  <DataTableRow className=" ">
                  <Button color="primary" size="md"  onClick={() => setModalDocument({ add: true })}>
                    Subir
                  </Button>
                  </DataTableRow>
           
     

              </DataTableItem>
              
              )
            :<>
            </>
          }      
          </div>
        </div>
      </Col>
      
      <ModalUploadDocument modalDocument={modalDocument}  setModalDocument={setModalDocument} selectClient={selectClient}/>
    </>
  )
}

const ModalUploadDocument = ({modalDocument, setModalDocument,selectClient = {},}) => {
  // leallg document required
  const { register, handleSubmit } = useForm();
  const [documents, setDocuments] = useState([]);
  const [documentsOptions, setDocumentsOptions] = useState(documents);
  const [postData, setPostData] = useState({});
  const [formData, setFormData] = useState({
    file:""
  });
  useEffect( () => {
    getDocuments();

  },[]);
  
  // Obtener lista de documentos requeridos
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
  //Submit data al post
  const onFormSubmit = async (submitData) => {
    const { documentTypeId, description, observation, issueDate, expirationDate } = postData;
    const { file } = submitData
    const aux = file[0]
    console.log(aux)
    console.log(file)
    let submittedData = {
      documentTypeId,
      description,
      observation,
      issueDate,
      expirationDate,
      file: aux,
    };

    const formData = new FormData();
      let object = {};

      formData.append("file", aux);
      formData.append("documentTypeId", documentTypeId);
      formData.append("expirationDate", expirationDate);
      formData.append("issueDate", issueDate);
      formData.append("observation", observation);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));
      console.log(json);
      console.log("FORM_DATA",formData)

    console.log(submittedData)
    try {
      await LibraryServices.addCustomerLibDoc(formData, parseInt(selectClient?.id) )
        setModalDocument({ edit: false, add: false });
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

  return(
    <Modal isOpen={modalDocument.add}  className="modal-dialog-centered" size="lg">
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
          <div className="mt-4">
            <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)} >
              <Col md="12">
                <FormGroup>
                  <label className="form-label">Documento</label>
                  <RSelect
                    value={documentsOptions}
                    options={documents}
                    
                    onChange={ (e) => {
                      onOptionsDocumentsChange(e)
                      setPostData( prev => {
                        return {
                          ...prev,
                          documentTypeId: e.value
                        }
                      })
                      console.log(e)
                      console.log(postData)
                      console.log(selectClient)
                    }}
                    defaultValue={postData.documentTypeId}
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
                    onChange={ (e) => {
                      setPostData( prev => {
                        return {
                          ...prev,
                          description: e.target.value
                        }
                      })
                    }}
                    placeholder="Descripción documento"
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
                    onChange={ (e) => {
                      setPostData( prev => {
                        return {
                          ...prev,
                          observation: e.target.value
                        }
                      })
                    }}
                    placeholder="Ingresa observación"
        
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
                    onChange={(e) => {
                      setPostData( prev => {
                        let aux = e.target.value
                        aux = aux?.split('-')
                        aux = aux[2]+'-'+aux[1]+'-'+aux[0]
                        return {
                          ...prev,
                          issueDate: aux
                        }
                      })
                      console.log(postData)
                    }}
                  />
                  {/* aca */}
                  {/* <DatePicker
                    selected={issueDate}
                    className="form-control"
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
                    onChange={(e) => {
                      setPostData( prev => {
                        let aux = e.target.value
                        aux = aux?.split('-')
                        aux = aux[2]+'-'+aux[1]+'-'+aux[0]
                        return {
                          ...prev,
                          expirationDate: aux
                        }
                      })
                      console.log(postData)
                    }}
      
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
                        onChange={(e) => {
                          setPostData( prev => {
                            return {
                              ...prev,
                              file: e.target.value
                            }
                          })
                          console.log(postData)
                        }}
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

export default DocumentRequired;