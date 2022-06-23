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
} from "../../components/Component";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import DocumentsServices from "../../services/DocumentsServices";
import AfterSalesServices from "../../services/AfterSalesServices";

const DocumentsList = () => {
  const [data, setData] = useState([]);
  const [postDeals, setPostDeals] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [sm, updateSm] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  // function to get documents
  const getDocuments = async () => {
    try {
      const documents = await DocumentsServices.getDocuments();
      const documentsData = await documents.data.map((data) => data);
      setData(documentsData);
    } catch (error) {}
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // function to get documents
  const getPostDeals = async () => {
    try {
      const postDeals = await AfterSalesServices.getPostDealOperations();
      const postDealData = await postDeals.data.map((data) => data);
      console.log(`Post deals:`, postDealData);
      setPostDeals(postDealData);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getPostDeals();
  }, []);

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, description } = submitData;
    let submittedData = {
      name: name,
      description: description,
    };
    try {
      await DocumentsServices.addDocument(submittedData);
      setData([submittedData, ...data]);
      console.log(submittedData);

      resetForm();
      getDocuments();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, description } = submitData;

    let submittedData = {
      name: name,
      description: description,
    };

    try {
      await DocumentsServices.editDocument(editData.id, submittedData);
      resetForm();
      getDocuments();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
  };

  // Function to change to delete property for an item
  const deleteDocument = async (id) => {
    try {
      await DocumentsServices.deleteDocument(id);
      getDocuments();
    } catch (error) {}
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = postDeals.slice(indexOfFirstItem, indexOfLastItem);

  console.log(`Current ITEMS:`, currentItems);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to handle description doc length
  const handleDescriptionLength = (description) => {
    if (description.length > 35) {
      return description.substring(0, 35) + "...";
    }
    return description;
  };

  const parseDate = (date) => {
    const dateParse = new Date(date);
    const day = dateParse.getDate();
    const month = dateParse.getMonth() + 1;
    const year = dateParse.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Operaciones Post Venta
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {currentItems?.length} acciones</p>
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
                  <span className="sub-text">N. de Operación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Operación Post Venta</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Operación Post Venta</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha ingresada</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha estimada</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha final</span>
                </DataTableRow>

                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>
              {currentItems.length > 0
                ? currentItems.map((item, index) => (
                    <DataTableItem key={index}>
                      <DataTableRow className="text-center">
                        <span>{item?.dealId}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.createdByAdvisor?.name == null ? `No encontrado` : item?.customer?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.action?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span className="text-primary">{item?.ammount}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.dateOfEntry)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.estimateDate)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.realDate)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>Accion</span>
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
              <h5 className="title">Agregar Documento</h5>
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

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Actualizar Documento</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={editData?.name}
                        placeholder="Ingresa nombre"
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
                        type="textarea"
                        name="description"
                        defaultValue={editData?.description}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Documento
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
