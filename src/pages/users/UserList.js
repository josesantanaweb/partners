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
  UserAvatar,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  PreviewAltCard,
  RSelect,
} from "../../components/Component";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { findUpper } from "../../utils/Utils";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserContext";
import UsersServices from "../../services/UsersServices";
import RolesServices from "../../services/RolesServices";
import { Link } from "react-router-dom";
import Pagination from "../../components/singlePagination/Pagination";
import Swal from "sweetalert2";

const UserListDefaultPage = () => {
  const { contextData } = useContext(UserContext);
  const [data, setData] = contextData;
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();
  const [rolesOptions, setRolesOptions] = useState([]);
  const [roleDefaultEdit, setRoleDefaultEdit] = useState({});
  const [roleId, setRoleId] = useState(1);

  const [totalItems, setTotalItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (roles !== undefined) {
      rolesOptionsData();
    }
  }, [roles]);

  const getUser = async (filter) => {
    try {
      const users = await UsersServices.getUsers(filter);
      setData(users.data);
    } catch (error) {}
  };

  const getRoles = async () => {
    try {
      const roles = await RolesServices.getRoles();
      setRoles(roles?.data);
    } catch (error) {}
  };

  const rolesOptionsData = () => {
    const rolesOptionsData = roles?.map((item) => ({ label: item.name, value: item.id }));
    setRolesOptions(rolesOptionsData);
  };

  const onRolesChange = (value) => {
    setRoleId(value.value);
  };

  const [formData, setFormData] = useState({
    name: "",
  });

  const [sm, updateSm] = useState(false);

  const { errors, register, handleSubmit } = useForm();

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  // Function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, lastName, email, password } = submitData;
    let submittedData = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      rolId: roleId,
    };
    try {
      await UsersServices.addUser(submittedData);
      resetForm();
      getUser();
      setModal({ edit: false }, { add: false });
    } catch (error) {
      if (error.response.data.message === "This user already exists") {
        setErrorMessage("Usuario ya existe");
      }
    }
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, lastName } = submitData;
    let submittedData = {
      name: name,
      lastName: lastName,
      rolId: roleId,
    };
    try {
      await UsersServices.editUser(editData.id, submittedData);
      resetForm();
      getUser();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
    const filterRole = roles.filter((item) => item.id === data?.rol?.id);
    const defaultRoleEdit = {
      label: filterRole[0].name,
      value: filterRole[0].id,
    };
    setRoleDefaultEdit(defaultRoleEdit);
  };

  // Function to change to delete property for an item
  const deleteUser = (id) => {
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
          getUser();
          if (result.isConfirmed) {
            UsersServices.deleteUser(id);
            getUser();
            swalWithBootstrapButtons.fire("Eliminado!", "El registro ha sido elimindo exitosamente!.", "success");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Acción cancelada", "El registro está seguro!", "error");
          }
        });
    } catch (error) {
      throw new Error("Error deleting record!");
    }
  };

  const onFilter = (e) => {
    if (e.target.value.length > 1) {
      getUser(e.target.value);
    } else {
      getUser("");
    }
  };

  // ! Pagination
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to get documents pagination
  const getPaginationUsers = async (limit, page) => {
    const usersPag = await UsersServices.getPaginationUsers(limit, page);
    const usersData = await usersPag.data.map((data) => data);
    setData(usersData);
  };

  // function to get count of items
  const getTotalItems = async () => {
    const data = await UsersServices.getUser();
    const totalItems = await data.meta?.totalItems;
    setTotalItems(totalItems);
  };

  useEffect(() => {
    getTotalItems();
  }, []);

  useEffect(() => {
    getPaginationUsers(itemPerPage, currentPage);
  }, [itemPerPage, currentPage]);

  const backToFirstPage = () => window.location.reload();

  return (
    <React.Fragment>
      <Head title="Usuarios"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Usuarios
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {totalItems} usuarios</p>
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
                      <input className="form-control" onChange={onFilter} placeholder="Buscar" />
                    </li>
                    <li className="nk-block-tools-opt">
                      <a href={`${process.env.REACT_APP_API_URL}/export-information/users`}>
                        <Button color="primary" type="button">
                          <Icon name="printer" className="mr-1"></Icon>
                          Exportar
                        </Button>
                      </a>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Usuario
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
                  <span className="sub-text">N. de Usuario</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Usuario</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Rol</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Estado</span>
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
                        <div className="user-card text-center pl-5">
                          <UserAvatar theme="purple" text={findUpper(item.name)}></UserAvatar>
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.name} {item.lastName} <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.rol.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span className={`tb-status text-success`}>{item.status.name}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
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
              <h5 className="title">Agregar Usuario</h5>
              {errorMessage !== "" && (
                <div className="my-3">
                  <Alert color="danger" className="alert-icon">
                    <Icon name="alert-circle" />
                    Usuario ya existe
                  </Alert>
                </div>
              )}
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
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
                      <label className="form-label">Apellido</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        defaultValue={formData.lastName}
                        placeholder="Ingresa apellido"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.lastName && <span className="invalid">{errors.lastName.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Correo electronico</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Ingresa apellido"
                        ref={register({
                          required: "Este campo es requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Contrasena</label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        defaultValue={formData.email}
                        placeholder="Ingresa contrasena"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.password && <span className="invalid">{errors.password.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Rol</label>
                      <RSelect
                        isSearchable={false}
                        options={rolesOptions}
                        onChange={onRolesChange}
                        defaultValue={rolesOptions[0]}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agregar Usuario
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
              <h5 className="title">Update User</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
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
                      <label className="form-label">Apellido</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        defaultValue={editData?.lastName}
                        placeholder="Ingresa apellido"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.lastName && <span className="invalid">{errors.lastName.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Rol</label>
                      <RSelect
                        isSearchable={false}
                        options={rolesOptions}
                        defaultValue={roleDefaultEdit}
                        onChange={onRolesChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Usuario
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

export default UserListDefaultPage;
