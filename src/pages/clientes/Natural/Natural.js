import React, { useContext, useState, useEffect } from "react";
import { Modal, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  UserAvatar,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
} from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { NaturalContext } from "./NaturalContext";
import classnames from "classnames";
import AddMainInformation from "./components/Add/MainInformation";
import EditMainInformation from "./components/Edit/MainInformation";
import AccountData from "./components/Edit/AccountData";
import EmploymentHistory from "./components/Edit/EmploymentHistory";
import PersonalReferences from "./components/Edit/PersonalReferences";
import InvestmentExperience from "./components/Edit/InvestmentExperience";
import SpousalHistory from "./components/Edit/SpousalHistory";
import CustomersServices from "../../../services/CustomersServices";
import Beneficiaries from "./components/Edit/Beneficiaries";
import { Link } from "react-router-dom";
import Pagination from "../../../components/singlePagination/Pagination";
import Swal from "sweetalert2";

const Natural = () => {
  const { contextData } = useContext(NaturalContext);
  const [data, setData] = contextData;

  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({ edit: false, add: false, document: false });
  const [editData, setEditData] = useState();
  const [addActiveTab, setAddActiveTab] = useState("1");
  const [addActiveTabDocument, setAddActiveTabDocument] = useState("1");

  const [totalItems, setTotalItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [formData, setFormData] = useState({
    names: "",
    paternalLastName: "",
    email: "",
    phone: "",
    mobilePhone: "",
    birthDate: "",
    civilStatus: "",
    dateOfMarriage: "",
    profession: "",
    annualIncome: "",
    totalNetWorthUSD: "",
    totalPatrimonyWithoutProperties: "",
    maritalRegime: "",
    nationality: "",
    rut: "",
    rutIssueDate: "",
    rutExpirationDate: "",
    zipCode: "",
    address: {
      countryId: 1,
      stateId: 1,
      detailedAddress: {
        address: "",
        communne: "",
      },
    },
    observations: "",
    employmentHistory: {
      typeOfEmployee: "",
      companyName: "",
      address: "",
      industry: "",
      laborSeniority: "",
      charge: "",
      businessPhone: "",
      email: "",
      rut: "",
      zipCode: "",
    },
    currentAccountData: {
      bankName: "",
      accountType: "",
      sucursalAddress: "",
      accountNumber: "",
      accountOpeningDate: "",
    },
  });

  // Get Natural
  const getCustomers = async (filter) => {
    try {
      const customers = await CustomersServices.getCustomerNatural(filter);
      setData(customers?.data);
    } catch (error) {}
  };

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
  };

  // Edit data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false }, { document: false });
    setEditData(data);
  };

  // Edit ficha
  const onDocumentClick = (id, data) => {
    setModal({ document: true }, { add: false }, { edit: false });
    setEditData(data);
  };

  // Delete
  // const onDeleteClick = async (id) => {
  //   try {
  //     await CustomersServices.deleteCustomerNatural(id);
  //     getCustomers();
  //   } catch (error) {}
  // };

  const onDeleteClick = (id) => {
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
          getCustomers();
          if (result.isConfirmed) {
            CustomersServices.deleteCustomerNatural(id);
            getCustomers();
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
      getCustomers(e.target.value);
    } else {
      getCustomers("");
    }
  };

  // ! Pagination
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to get documents pagination
  const getPaginationCustomersNatural = async (limit, page) => {
    const customersNaturalPag = await CustomersServices.getPaginationCustomerNatural(limit, page);
    const customersNaturalData = await customersNaturalPag.data.map((data) => data);
    setData(customersNaturalData);
  };

  // function to get count of items
  const getTotalItems = async () => {
    const data = await CustomersServices.getCustomersNatural();
    const totalItems = await data.meta?.totalItems;
    setTotalItems(totalItems);
  };

  useEffect(() => {
    getTotalItems();
  }, []);

  useEffect(() => {
    getPaginationCustomersNatural(itemPerPage, currentPage);
  }, [itemPerPage, currentPage]);

  const backToFirstPage = () => window.location.reload();

  return (
    <React.Fragment>
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Clientes Naturales
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {totalItems} clientes</p>
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
                      <a href={`${process.env.REACT_APP_API_URL}/export-information/customers/natural`}>
                        <Button color="primary" type="button">
                          <Icon name="printer" className="mr-1"></Icon>
                          Exportar
                        </Button>
                      </a>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Cliente Natural
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
                  <span className="sub-text">N. de Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Teléfono Fijo</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Teléfono Celular</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Profesión</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Dirección</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>

              {data.length > 0
                ? data.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="text-center">
                        <span>{item.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <div className="user-card d-flex align-items-center justify-content-center">
                          {item?.names && <UserAvatar theme="purple" text={findUpper(item?.names)}></UserAvatar>}
                          <div className="user-info">
                            <span className="tb-lead">
                              {item?.names}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span className="text-info">{item?.phone}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span className="text-info">{item?.mobilePhone}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.profession}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.address?.detailedAddress?.address}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action" onClick={() => onDocumentClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"file" + 1}
                              icon="file-fill"
                              direction="top"
                              text="Ficha"
                            />
                          </li>
                          <li className="nk-tb-action" onClick={() => onEditClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Datos Personales"
                            />
                          </li>
                          <li className="nk-tb-action" onClick={() => onDeleteClick(item.id)}>
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
                  to="/customer"
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
            <div className="p-2 table-records modal-scroll">
              <h5 className="title">Agregar Cliente Natural</h5>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTab === "1" })}
                    onClick={() => setAddActiveTab("1")}
                  >
                    Antecedentes personales
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={addActiveTab}>
                <TabPane tabId="1">
                  <div>
                    <AddMainInformation setModal={setModal} formData={formData} />
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: true })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Editar Cliente Natural</h5>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTab === "1" })}
                    onClick={() => setAddActiveTab("1")}
                  >
                    Informacion Principal
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={addActiveTab}>
                <TabPane tabId="1">
                  <div className="pr-2 table-records modal-scroll">
                    {editData && <EditMainInformation setModal={setModal} editData={editData} />}
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={modal.document}
          toggle={() => setModal({ document: true })}
          className="modal-dialog-centered"
          size="lg"
          style={{ maxWidth: "1200px" }}
        >
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
              <h5 className="title">Editar Cliente Natural</h5>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTabDocument === "1" })}
                    onClick={() => setAddActiveTabDocument("1")}
                  >
                    Datos de la cuenta
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTabDocument === "2" })}
                    onClick={() => setAddActiveTabDocument("2")}
                  >
                    Antecedentes laborales
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTabDocument === "3" })}
                    onClick={() => setAddActiveTabDocument("3")}
                  >
                    Referencias Personales
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTabDocument === "4" })}
                    onClick={() => setAddActiveTabDocument("4")}
                  >
                    Experiencia de Inversiones
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTabDocument === "5" })}
                    onClick={() => setAddActiveTabDocument("5")}
                  >
                    Antecedentes del conyuge
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: addActiveTabDocument === "6" })}
                    onClick={() => setAddActiveTabDocument("6")}
                  >
                    Beneficiarios
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={addActiveTabDocument}>
                <TabPane tabId="1">{editData && <AccountData setModal={setModal} editData={editData} />}</TabPane>
                <TabPane tabId="2">{editData && <EmploymentHistory setModal={setModal} editData={editData} />}</TabPane>
                <TabPane tabId="3">
                  {editData && <PersonalReferences setModal={setModal} editData={editData} />}
                </TabPane>
                <TabPane tabId="4">
                  {editData && <InvestmentExperience setModal={setModal} editData={editData} />}
                </TabPane>
                <TabPane tabId="5">{editData && <SpousalHistory setModal={setModal} editData={editData} />}</TabPane>
                <TabPane tabId="6">{editData && <Beneficiaries setModal={setModal} editData={editData} />}</TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default Natural;
