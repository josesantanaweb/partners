import React, { useContext, useState } from "react";
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
import { NaturalContext } from "../NaturalContext";
import classnames from "classnames";
import AddMainInformation from "./components/Add/MainInformation";
import EditMainInformation from "./components/Edit/MainInformation";
import EmploymentHistory from "./components/EmploymentHistory";
import CustomersServices from "../../../services/CustomersServices";
import AccountData from "./components/AccountData";

const Natural = () => {
  const { contextData } = useContext(NaturalContext);
  const [data, setData] = contextData;

  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({ edit: false, add: false });
  const [editData, setEditData] = useState();
  const [addActiveTab, setAddActiveTab] = useState("1");
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
  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerNatural();
      setData(customers?.data);
    } catch (error) {}
  };

  // Cerrar modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
  };

  // Edit data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
  };

  // Delete
  const onDeleteClick = async (id) => {
    try {
      await CustomersServices.deleteCustomer(id);
      getCustomers();
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
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Clientes Naturales
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {currentItems.length} clientes</p>
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
                        Agregar Cliente
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
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Tipo</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Codeudor</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Antecedentes Repr. Legal</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text"></span>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow>
                        <span>{item.id}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          {item.names && <UserAvatar theme="purple" text={findUpper(item?.names)}></UserAvatar>}
                          <div className="user-info">
                            <span className="tb-lead">
                              {item.names}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-info">Natural</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              Julio Martinez
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>julio@gmail.com</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          <div className="user-info">
                            <span className="tb-lead">
                              Maria Perez <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>maria@gmail.com</span>
                          </div>
                        </div>
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
                              text="Editar"
                            />
                          </li>
                          <li className="nk-tb-action-hidden" onClick={() => onDeleteClick(item.id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delete" + 1}
                              icon="trash-fill"
                              direction="top"
                              text="Borrar"
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
                  <span className="text-silent">Sin registros</span>
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
              <h5 className="title">Agregar Cliente</h5>
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
                  <AddMainInformation setModal={setModal} formData={formData} />
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Editar Cliente</h5>
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
                  {editData && <EditMainInformation setModal={setModal} editData={editData} />}
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default Natural;
