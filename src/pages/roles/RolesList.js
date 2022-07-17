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
import { Link } from "react-router-dom";
import Pagination from "../../components/singlePagination/Pagination";

const RolesList = () => {
  const { contextData } = useContext(RolesContext);
  const [data, setData] = contextData;
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [menuItems, setMenuItems] = useState([]);

  const [totalItems, setTotalItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

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
  // const deleteUser = async (id) => {
  //   Swal.fire({
  //     title: "Atencion!",
  //     text: "¿Esta Seguro que desea borrar el rol?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ffb344",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Aceptar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       RolesServices.deleteRole(id);
  //       Swal.fire("Eliminado!", "Rol Eliminado Correctamente", "success");
  //     }
  //     window.location.reload();
  //   });
  // };

  const deleteUser = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary m-1",
          cancelButton: "btn btn-light m-1",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Estás seguro?",
          text: "Se eliminará el registor seleccionado!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          getRoles();
          if (result.isConfirmed) {
            RolesServices.deleteRole(id);
            getRoles();
            swalWithBootstrapButtons.fire("Eliminado!", "El registro ha sido elimindo exitosamente!.", "success");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Acción cancelada", "El registro está seguro!", "error");
          }
        });
    } catch (error) {
      throw new Error("Error deleting record!");
    }
  };

  // ! Pagination
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to get documents pagination
  const getPaginationRoles = async (limit, page) => {
    const rolesPag = await RolesServices.getPaginationRoles(limit, page);
    const rolesData = await rolesPag.data.map((data) => data);
    setData(rolesData);
  };

  // function to get count of items
  const getTotalItems = async () => {
    const data = await RolesServices.getRoles();
    const totalItems = await data.meta?.totalItems;
    setTotalItems(totalItems);
  };

  useEffect(() => {
    getTotalItems();
  }, []);

  useEffect(() => {
    getPaginationRoles(itemPerPage, currentPage);
  }, [itemPerPage, currentPage]);

  const backToFirstPage = () => window.location.reload();

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
                <DataTableRow className="text-center">
                  <span className="sub-text">N. de Rol</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Nombre</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Descripción</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {data.length > 0
                ? data.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="text-center">
                        <span>{item.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.description}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools text-center">
                        <ul className="nk-tb-actions gx-1 d-flex justify-content-center">
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
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (
              <React.Fragment>
                <Pagination
                  data={data.length}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </React.Fragment>
            ) : (
              <div className="text-center">
                <Link
                  to="/products"
                  className="text-silent d-flex align-items-center justify-content-center"
                  onClick={backToFirstPage}
                >
                  <Icon name="chevrons-left" />
                  Actualizar registros
                </Link>
              </div>
            )}
          </PreviewAltCard>
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
                      <label className="form-label">Descripción del rol</label>
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

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: true })} className="modal-dialog-centered" size="lg">
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
