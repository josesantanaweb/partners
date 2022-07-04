import React, { useContext, useState, useEffect } from "react";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import Swal from "sweetalert2";
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
import { RolesContext } from "./RolesContext";
import RolesServices from "../../services/RolesServices";
import MenuServices from "../../services/MenuServices";

const RolesList = () => {
  const { contextData } = useContext(RolesContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [menuItems, setMenuItems] = useState([]);

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  useEffect(() => {
    getMenuItems();
  }, []);

  const getRoles = async () => {
    try {
      const roles = await RolesServices.getRoles();
      setData(roles.data);
    } catch (error) {}
  };

  const getMenuItems = async () => {
    try {
      const menu = await MenuServices.getMenuItems();
      setMenuItems(menu);
    } catch (error) {}
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [sm, updateSm] = useState(false);

  const { errors, register, handleSubmit, reset } = useForm({
    defaultValues: {
      menuItems: [],
    },
  });

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, description, menuItems } = submitData;
    const numberMenuItems = menuItems.map((i) => Number(i));
    let submittedData = {
      name: name,
      description: description,
      menuItemsId: numberMenuItems,
    };
    try {
      await RolesServices.addRole(submittedData);
      resetForm();
      getRoles();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, description, menuItems } = submitData;
    const numberMenuItems = menuItems.map((i) => Number(i));
    let submittedData = {
      name: name,
      description: description,
      menuItemsId: numberMenuItems,
    };

    try {
      await RolesServices.editRole(editData.id, submittedData);
      resetForm();
      getRoles();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
    reset({
      menuItems: data.menuItemsId.map((item) => String(item)),
    });
  };

  // Function to change to delete property for an item
  const deleteUser = async (id) => {
    Swal.fire({
      title: "Atencion!",
      text: "¿Esta Seguro que desea borrar el rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffb344",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        RolesServices.deleteRole(id);
        Swal.fire("Eliminado!", "Rol Eliminado Correctamente", "success");
      }
      window.location.reload();
    });
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Roles"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Roles
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {data.length} roles</p>
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
                        Agregar Rol
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
                          <li className="nk-tb-action" onClick={() => onEditClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Editar"
                            />
                          </li>
                          <li className="nk-tb-action" onClick={() => deleteUser(item.id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delete" + 1}
                              icon="trash-fill"
                              direction="top"
                              text="Eliminar"
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
              <h5 className="title">Agregar Rol</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Rol ya existe
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre del rol</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Ingresa nombre del rol"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Descripcion del rol</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Ingresa descripcion del rol"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  {menuItems &&
                    menuItems.map((item, i) => (
                      <Col md="3" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="menuItems"
                            value={item.id}
                            className="custom-control-input form-control"
                            id={item.text}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.text}>
                            {item.text}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Rol
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
              <h5 className="title">Actualizar Rol</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Nombre del rol</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={editData?.name}
                        placeholder="Ingresa nombre del rol"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Descripcion del rol</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        defaultValue={editData?.description}
                        placeholder="Ingresa descripcion del rol"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>

                  {menuItems &&
                    menuItems.map((item, i) => (
                      <Col md="3" key={i}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="menuItems"
                            value={item.id}
                            defaultValue={editData?.menuItemsId.includes(item.id)}
                            className="custom-control-input form-control"
                            id={item.text}
                            ref={register()}
                          />
                          <label className="custom-control-label" htmlFor={item.text}>
                            {item.text}
                          </label>
                        </div>
                      </Col>
                    ))}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Rol
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

export default RolesList;
