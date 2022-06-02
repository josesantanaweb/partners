import React, { useContext, useState, useEffect } from "react";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
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
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import { ProductsContext } from "./ProductsContext";
import ProductsServices from "../../services/ProductsServices";
import DocumentsServices from "../../services/DocumentsServices";
import SegmentsServices from "../../services/SegmentsServices";

const ProductsList = () => {
  const { contextData } = useContext(ProductsContext);
  const [data, setData] = contextData;
  const [documentsId, setDocumentsId] = useState();
  const [customerSegmentsId, setCustomerSegmentsId] = useState();
  const [customerNatural, setCustomerNatural] = useState();
  const [customerLegal, setCustomerLegal] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();

  useEffect(() => {
    getDocuments();
    getSegmentsNatural();
    getSegmentsLegal();
  }, []);

  useEffect(() => {
    if (customerNatural && customerLegal) {
      const segments = [...customerNatural, ...customerLegal];
      setCustomerSegmentsId(segments);
    }
  }, [customerNatural, customerLegal]);

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  const getProducts = async () => {
    try {
      const products = await ProductsServices.getProducts();
      setData(products.data);
    } catch (error) {}
  };

  const getSegmentsNatural = async () => {
    try {
      const segmentsNatural = await SegmentsServices.getSegmentsNatural();
      setCustomerNatural(segmentsNatural.data);
    } catch (error) {}
  };

  const getSegmentsLegal = async () => {
    try {
      const segmentsLegal = await SegmentsServices.getSegmentsLegal();
      setCustomerLegal(segmentsLegal.data);
    } catch (error) {}
  };

  const getDocuments = async () => {
    try {
      const documents = await DocumentsServices.getDocuments();
      setDocumentsId(documents.data);
    } catch (error) {}
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    observation: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [sm, updateSm] = useState(false);

  const { errors, register, handleSubmit, reset } = useForm({
    defaultValues: {
      documentsId: [],
      customerNaturalField: [],
      customerLegalField: [],
    },
  });

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      observation: "",
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, description, observation, documentsId, customerNaturalField, customerLegalField } = submitData;
    const numberDocuments = documentsId.map((i) => Number(i));
    const numberSegmentsNatural = customerNaturalField.map((i) => Number(i));
    const numberSegmentsLegal = customerLegalField.map((i) => Number(i));
    let submittedData = {
      name: name,
      description: description,
      observation: observation,
      documentsId: numberDocuments,
      customerSegmentsId: [...numberSegmentsNatural, ...numberSegmentsLegal],
    };

    try {
      await ProductsServices.addProduct(submittedData);
      resetForm();
      getProducts();
      setModal({ edit: false }, { add: false });
      window.location.reload();
    } catch (error) {}
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, description, observation, documentsId, customerNaturalField, customerLegalField } = submitData;
    const numberDocuments = documentsId.map((i) => Number(i));
    const numberSegmentsNatural = customerNaturalField.map((i) => Number(i));
    const numberSegmentsLegal = customerLegalField.map((i) => Number(i));
    let submittedData = {
      name: name,
      description: description,
      observation: observation,
      documentsId: numberDocuments,
      customerSegmentsId: [...numberSegmentsNatural, ...numberSegmentsLegal],
    };

    try {
      await ProductsServices.editProduct(editData.id, submittedData);
      resetForm();
      getProducts();
      setModal({ edit: false }, { add: false });
      window.location.reload();
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
    reset({
      documentsId: data.documentsId.map((item) => String(item)),
      customerNaturalField: data.customerSegmentsId.map((item) => String(item)),
      customerLegalField: data.customerSegmentsId.map((item) => String(item)),
    });
  };

  // Function to change to delete property for an item
  const deleteUser = async (id) => {
    try {
      await ProductsServices.deleteProduct(id);
      getProducts();
    } catch (error) {}
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Planes
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {data.length} planes</p>
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
                        Agregar Plan
                      </Button>
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
                <DataTableRow>
                  <span className="sub-text">#</span>
                </DataTableRow>
                <DataTableRow size="xs">
                  <span className="sub-text">Nombre</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Descripcion</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text"></span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow>
                        <span>{item.id}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{item.name}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{item.description}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action-hidden" onClick={() => onEditClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Edit"
                            />
                          </li>
                          <li className="nk-tb-action-hidden" onClick={() => deleteUser(item.id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delete" + 1}
                              icon="trash-fill"
                              direction="top"
                              text="Delete"
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
              <h5 className="title">Agregar Plan</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Plan ya existe
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Datos del Plan</h6>
                    </div>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Descripcion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Ingresa apellido"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Observacion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="observation"
                        defaultValue={formData.observation}
                        placeholder="Ingresa apellido"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Informacion Solicitada Para Cliente Natural</h6>
                    </div>
                  </Col>

                  {customerNatural &&
                    customerNatural.map((item, i) => (
                      <Col md="6" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="customerNaturalField"
                            value={item.id}
                            className="custom-control-input form-control"
                            id={item.name}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.name}>
                            {item.name}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Informacion Solicitada Para Cliente Legal</h6>
                    </div>
                  </Col>

                  {customerLegal &&
                    customerLegal.map((item, i) => (
                      <Col md="6" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="customerLegalField"
                            value={item.id}
                            className="custom-control-input form-control"
                            id={item.name}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.name}>
                            {item.name}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Informacion Requerida</h6>
                    </div>
                  </Col>

                  {documentsId &&
                    documentsId.map((item, i) => (
                      <Col md="6" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="documentsId"
                            value={item.id}
                            className="custom-control-input form-control"
                            id={item.name}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.name}>
                            {item.name}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Plan
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
              <h5 className="title">Actualizar Producto</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Datos del Plan</h6>
                    </div>
                  </Col>
                  <Col md="6">
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

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Descripcion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={editData?.description}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Observacion</label>
                      <input
                        className="form-control"
                        type="text"
                        name="observation"
                        defaultValue={editData?.observation}
                        placeholder="Ingresa observacion"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Informacion Solicitada Para Cliente Natural</h6>
                    </div>
                  </Col>

                  {customerNatural &&
                    customerNatural.map((item, i) => (
                      <Col md="6" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="customerNaturalField"
                            value={item.id}
                            defaultValue={editData?.customerSegmentsId?.includes(item.id)}
                            className="custom-control-input form-control"
                            id={item.name}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.name}>
                            {item.name}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Informacion Solicitada Para Cliente Legal</h6>
                    </div>
                  </Col>

                  {customerLegal &&
                    customerLegal.map((item, i) => (
                      <Col md="6" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="customerLegalField"
                            value={item.id}
                            defaultValue={editData?.customerSegmentsId?.includes(item.id)}
                            className="custom-control-input form-control"
                            id={item.name}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.name}>
                            {item.name}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col md="12">
                    <div className="custom-tab">
                      <h6>Informacion Requerida</h6>
                    </div>
                  </Col>
                  {documentsId &&
                    documentsId.map((item, i) => (
                      <Col md="6" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="documentsId"
                            value={item.id}
                            defaultValue={editData?.documentsId?.includes(item.id)}
                            className="custom-control-input form-control"
                            id={item.name}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.name}>
                            {item.name}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Plan
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

export default ProductsList;
