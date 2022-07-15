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
  RSelect
} from "../../components/Component";
import { FormGroup, Modal, ModalBody, Form, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import AddMainInformation from "./components/Add/MainInformation";
import AddCustomerFile from "./components/Add/CustomerFile";
import AddAccountData from "./components/Add/AccountData";
import DocumentRequired from "./components/Add/DocumentRequired";
import EditMainInformation from "./components/Edit/MainInformation";
import AccountData from "../clientes/Natural/components/Edit/AccountData";
import EmploymentHistory from "../clientes/Natural/components/Edit/EmploymentHistory";

import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import DocumentsServices from "../../services/DocumentsServices";

// Desde acá
import DealsServices from "../../services/DealsServices";
import InvestorProfile from "./components/Add/InvestorProfile";
import { preventContextMenu } from "@fullcalendar/core";
import NumberFormat from "react-number-format";
import imgGrafica from "../../assets/images/grafica1.png";
import imgGrafica2 from "../../assets/images/grafica2.png";

const DealsList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState();
  const [addActiveTab, setAddActiveTab] = useState("1");
  const [addActiveTabDocument, setAddActiveTabDocument] = useState("1");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    document: false,
  });

  const [modalNegocio, setModalNegocio] = useState({
    edit: false,
    add: false,
    document: false,
  })

  const [modalFichaCliente, setModalFichaCliente] = useState({
    edit: false,
    add: false,
    document: false,
  })


  const [modalPerfil, setModalPerfil] = useState({
    edit: false,
    add: false,
    document: false,
  })


  const [modalDocumentos, setModalDocumentos] = useState({
    edit: false,
    add: false,
    document: false,
  })


  // const getDocuments = async () => {
  //   try {
  //     const documents = await DocumentsServices.getDocuments();
  //     const documentsData = await documents.data.map((data) => data);

  //     setData(documentsData);
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   getDocuments();
  // }, []);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  // });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [sm, updateSm] = useState(false);
  const [metaData, setMetaData] = useState({});
  // function to reset the form
  // const resetForm = () => {
  //   setFormData({
  //     name: "",
  //     description: "",
  //   });
  // };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
    // resetForm();
  };

  // Submit function to add a new item
  // const onFormSubmit = async (submitData) => {
  //   const { name, description } = submitData;
  //   let submittedData = {
  //     name: name,
  //     description: description,
  //   };
  //   try {
  //     await DocumentsServices.addDocument(submittedData);
  //     setData([submittedData, ...data]);
  //     console.log(submittedData);

  //     resetForm();
  //     getDocuments();
  //     setModal({ edit: false }, { add: false });
  //   } catch (error) {}
  // };

  // submit function to update a new item
  // const onEditSubmit = async (submitData) => {
  //   const { name, description } = submitData;
  //   let submittedData = {
  //     name: name,
  //     description: description,
  //   };

  //   try {
  //     await DocumentsServices.editDocument(editData.id, submittedData);
  //     resetForm();
  //     getDocuments();
  //     setModal({ edit: false }, { add: false });
  //   } catch (error) {}
  // };

  // function that loads the want to editted data
  // const onEditClick = (id, data) => {
  //   setModal({ edit: true }, { add: false }, { document: false });
  //   setEditData(data);
  // };

  // Function to change to delete property for an item
  // const deleteDocument = async (id) => {
  //   try {
  //     await DocumentsServices.deleteDocument(id);
  //     getDocuments();
  //   } catch (error) {}
  // };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to handle description doc length
  // const handleDescriptionLength = (description) => {
  //   if (description.length > 35) {
  //     return description.substring(0, 35) + "...";
  //   }
  //   return description;
  // };

  // Desde acá
  //  *** function to get deals list
  const getDeals = async () => {
    try {
      const deals = await DealsServices.getDeal();
      setMetaData(deals.meta);
      const dealsData = await deals.data.map((data) => data);
      console.log(dealsData);
      setData(dealsData);
    } catch (error) { }
  };
  useEffect(() => {
    getDeals();
  }, []);

  const [requiredDocument, setRequiredDocument] = useState([]);

  const [selectClient, setSelectClient] = useState({});
  const [needDocument, setNeedDocument] = useState({
    documents: []
  });
  const [libraryClient, setLibraryClient] = useState([]);
  const { errors, register, setValue, handleSubmit } = useForm();
  //State general de formual incluye todos los tabs
  const [generalStateForm, setGeneralStateForm] = useState({
    investorProfile: [],
    beneficiaries: [],
  });

  const paginateDeals = async (service) => {
    try {
      const deals = await DealsServices.getDealsPaginate(service);
      setMetaData(deals.meta);
      console.log(deals.meta);
      const dealsData = await deals.data.map((data) => data);
      console.log(dealsData);
      setData(dealsData);
    } catch (error) { }
  };

  const onSubmit = (data) => {
    console.log(generalStateForm);
  };

  const postDeals = (e) => {
    e.preventDefault();
    console.log(generalStateForm);
    let statePost = {};
    if (selectClient.type.id == 1)
      statePost = {
        customerId: parseInt(generalStateForm.customerId),
        companyId: generalStateForm.companyId,
        currencyId: generalStateForm.currencyId,
        paymentMethodId: generalStateForm.paymentMethodId,
        planId: generalStateForm.planId,
        yearsOfThePlan: parseInt(generalStateForm.yearsOfThePlan),
        amountOfTheInvestment: parseInt(generalStateForm.amountOfTheInvestment),
        totalNetValueUSD: parseInt(generalStateForm.totalNetValueUSD),
        originsOfTheFunds: generalStateForm.originsOfTheFunds,
        advisorFee: generalStateForm.advisorFee,
        percentage: parseInt(generalStateForm.percentage),
        customerInfo: {
          currentAccountData: {
            ...generalStateForm.currentAccountData,
          },
          employmentHistory: {
            ...generalStateForm.employmentHistory,
          },
          personalReferences: {
            ...generalStateForm.personalReferences,
          },
          investmentExperience: {
            ...generalStateForm.investmentExperience,
          },
          spousalHistory: {
            ...generalStateForm.spousalHistory,
          },
          beneficiaries: [
            ...generalStateForm.beneficiaries.map((act) => {
              return {
                ...act,
              };
            }),
          ],
        },
        investorProfile: [...generalStateForm.investorProfile],
        documents: [...generalStateForm.documents],
      };

    if (selectClient.type.id == 2) {
      statePost = {
        customerId: parseInt(generalStateForm.customerId),
        companyId: generalStateForm.companyId,
        currencyId: generalStateForm.currencyId,
        paymentMethodId: generalStateForm.paymentMethodId,
        planId: generalStateForm.planId,
        yearsOfThePlan: parseInt(generalStateForm.yearsOfThePlan),
        amountOfTheInvestment: parseInt(generalStateForm.amountOfTheInvestment),
        totalNetValueUSD: parseInt(generalStateForm.totalNetValueUSD),
        originsOfTheFunds: generalStateForm.originsOfTheFunds,
        advisorFee: generalStateForm.advisorFee,
        percentage: parseInt(generalStateForm.percentage),
        customerInfo: {
          currentAccountData: {
            ...generalStateForm.currentAccountData,
          },
          employmentHistory: {
            ...generalStateForm.employmentHistory,
          },
          personalReferences: {
            ...generalStateForm.personalReferences,
          },
          investmentExperience: {
            ...generalStateForm.investmentExperience,
          },
          spousalHistory: {
            ...generalStateForm.spousalHistory,
          },
          beneficiaries: [
            ...generalStateForm.beneficiaries.map((act) => {
              return {
                ...act,
              };
            }),
          ],
        },
        investorProfile: [...generalStateForm.investorProfile],
        documents: [...generalStateForm.documents],
      };
    }

    if (statePost.customerInfo.currentAccountData.id) {
      statePost.customerInfo.currentAccountData.id = parseInt(statePost.customerInfo.currentAccountData.id);
    }

    if (statePost.customerInfo.employmentHistory.id) {
      statePost.customerInfo.employmentHistory.id = parseInt(statePost.customerInfo.employmentHistory.id);
    }

    if (statePost.customerInfo.personalReferences.id) {
      statePost.customerInfo.personalReferences.id = parseInt(statePost.customerInfo.personalReferences.id);
    }

    if (statePost.customerInfo.investmentExperience.id) {
      statePost.customerInfo.investmentExperience.id = parseInt(statePost.customerInfo.investmentExperience.id);
    }

    if (statePost.customerInfo.spousalHistory.id) {
      statePost.customerInfo.spousalHistory.id = parseInt(statePost.customerInfo.spousalHistory.id);
    }

    if (statePost?.customerInfo?.beneficiaries[0]?.id) {
      statePost.customerInfo.beneficiaries = statePost.customerInfo.beneficiaries.map((prev) => {
        return {
          ...prev,
          id: parseInt(prev.id),
        };
      });
    }

    console.log("estado", statePost);
    DealsServices.postDeals(statePost).then(() => window.location.reload());
  };

  /////Update hooks

  const [dateItemDeal, setDataItemDeal] = useState({})

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Operaciones
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {currentItems.length} operaciones</p>
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
                        Agregar Negocio
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
                  <span className="sub-text">N. de Operación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Rut</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Asesor</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Plan/Producto</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Institución</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Años del Plan</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Inversión</span> {/* Monto de Inversión */}
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Moneda</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Origen de los Fondos</span>
                </DataTableRow>

                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => (
                  <DataTableItem key={item.id}>
                    <DataTableRow className="text-center">
                      <span>{item.id}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.customer.names}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.customer.rut}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>
                        {item?.createdByAdvisor
                          ? item?.createdByAdvisor?.name + " " + item?.createdByAdvisor?.paternalLastName
                          : item?.createdByUser?.name + " " + item?.createdByUser?.lastName}
                      </span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.product.name}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.company.name}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.yearsOfThePlan}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <NumberFormat
                        value={item.amountOfTheInvestment}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        allowNegative={false}
                        decimalSeparator={","}
                        decimalPrecision={2}

                        renderText={(value, props) => <div {...props}>{value}</div>}
                      />;

                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.currency.name}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.originsOfTheFunds}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        <li className="nk-tb-action">
                          {/* onClick={() => onEditClick(item.id, item)} */}
           
                  
                              <>
                            
                                  <Button class="list-group-item " onClick={async() => { await setDataItemDeal(item); await setModalNegocio({ edit: true });  }} style={{
                                    backgroundColor: "#526484"
                                  }}>Negocio</Button>
                             
                                  <Button style={{
                                    backgroundColor: "#526484"
                                  }} class="list-group-item"
                                    onClick={() => { setModalPerfil({ edit: true }); console.log('holis') }}

                                  >Perfil del Inversionistas</Button>
                         

                             </>
                            
                   
                        </li>
                        <li className="nk-tb-action">
                          {/* onClick={() => deleteDocument(item.id)} */}
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
            {currentItems.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={metaData.totalItems}
                paginate={() => paginateDeals(metaData.nextPageUrl)}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">Sin Registros</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        {/* Nuevo elemento Modal */}
        <Modal
          isOpen={modal.add}
          className="modal-dialog-centered "
          size="lg"
          style={{ maxWidth: "1192px" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <a
                href="#close"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                  setRequiredDocument([]);
                  setNeedDocument({ documents: [] });
                }}
                className="close"
              >
                <Icon name="cross-sm"></Icon>
              </a>
              <div className="p-2 table-record">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="title" >Crear Operación</h5>
                  <Button color="primary" type="submit" onClick={e => postDeals(e)}>
                    <Icon name="plus" className="mr-1"></Icon>
                    Guardar Operación
                  </Button>
                </div>

                {requiredDocument.length != 0 && addActiveTab == 2 ? <span style={{ color: 'red' }}>Requerido: </span> : ""}
                {requiredDocument.length != 0 && addActiveTab == 2 && requiredDocument.map((act, i) => <span>{i + 1 + ")" + ' ' + act.name}. </span>)}

                {needDocument.documents?.length && addActiveTab == 4 ? <span style={{ color: 'red' }}>Información del cliente requerida: </span> : ""}
                {needDocument.documents?.length > 0 && addActiveTab == 4 && needDocument.documents.map((act, i) => <span>{i + 1 + ")" + ' ' + act.name}. </span>)}

                <Nav tabs>
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      className={classnames({ active: addActiveTab === "1" })}
                      onClick={() => setAddActiveTab("1")}
                    >
                      Negocio
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      className={classnames({ active: addActiveTab === "2" })}
                      onClick={() => setAddActiveTab("2")}
                    >
                      Ficha de Cliente
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      className={classnames({ active: addActiveTab === "3" })}
                      onClick={() => setAddActiveTab("3")}
                    >
                      Perfil de Inversionista
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      className={classnames({ active: addActiveTab === "4" })}
                      onClick={() => setAddActiveTab("4")}
                    >
                      Ajuntar Documentos
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={addActiveTab}>
                  <TabPane tabId="1">
                    <AddMainInformation setAddActiveTab={setAddActiveTab} generalStateForm={generalStateForm} setGeneralStateForm={setGeneralStateForm} setValue={setValue} registerState={register} handleSubmitGeneral={handleSubmit} setLibraryClient={setLibraryClient} setModal={setModal} setNeedDocument={setNeedDocument} setRequiredDocument={setRequiredDocument} setSelectClient={setSelectClient} />
                    {/* formData={formData} */}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={addActiveTab}>
                  <TabPane tabId="2">
                    <AddCustomerFile setAddActiveTab1={setAddActiveTab} generalStateForm={generalStateForm} setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient} />
                    {/* formData={formData} */}
                  </TabPane>
                </TabContent>
                <TabContent activeTab={addActiveTab}>
                  <TabPane tabId="3">
                    <InvestorProfile setAddActiveTab={setAddActiveTab} setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={addActiveTab}>
                  <TabPane tabId="4">
                    <DocumentRequired setLibraryClient={setLibraryClient} generalStateForm={generalStateForm} setGeneralStateForm={setGeneralStateForm} libraryClient={libraryClient} needDocument={needDocument} requiredDocument={requiredDocument} setModal={setModal} selectClient={selectClient} />
                  </TabPane>
                  <TabPane tabId="4"></TabPane>
                </TabContent>
              </div>
            </ModalBody>
          </form>
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

        <Modal
          isOpen={modal.document}
          toggle={() => setModal({ document: false })}
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
              <h5 className="title">Editar Cliente</h5>
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
                {/* <TabPane tabId="1">{editData && <AccountData setModal={setModal} editData={editData} />}</TabPane>
                <TabPane tabId="2">{editData && <EmploymentHistory setModal={setModal} editData={editData} />}</TabPane> */}
                {/* <TabPane tabId="3">
                  {editData && <PersonalReferences setModal={setModal} editData={editData} />}
                </TabPane>
                <TabPane tabId="4">
                  {editData && <InvestmentExperience setModal={setModal} editData={editData} />}
                </TabPane>
                <TabPane tabId="5">{editData && <SpousalHistory setModal={setModal} editData={editData} />}</TabPane>
                <TabPane tabId="6">{editData && <Beneficiaries setModal={setModal} editData={editData} />}</TabPane> */}
              </TabContent>
            </div>
          </ModalBody>
        </Modal>
        <ModalNegocio modal={modalNegocio} setModal={setModalNegocio} data={dateItemDeal} />
        <ModalFichaDelCliente modal={modalFichaCliente} setModal={setModalFichaCliente} />
        <ModalPerfilDelInversionista modal={modalPerfil} setModal={setModalPerfil} />
        <ModalDocumentosRequeridos modal={modalDocumentos} setModal={setModalDocumentos} />
        {/* Nuevo elemento Modal */}
      </Content>
    </React.Fragment>
  );
};

const ModalNegocio = ({ modal, setModal, data }) => {

  const [dataForm, setDataForm] = useState({
    customerId: data.customer?.id,
    companyId: 1,
    currencyId: 1,
    paymentMethodId: 1,
    planId: 15,
    yearsOfThePlan: data.yearsOfThePlan,
    amountOfTheInvestment: data.amountOfTheInvestment,
    totalNetValueUSD: 1,
    originsOfTheFunds: "dfsafdf",
    advisorFee: true,
    percentage: data.percentage,
  });

  const [companies, setCompanies] = useState([]);
  const [companiesOptions, setCompaniesOptions] = useState(companies);

  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
    // resetForm();
  };

  const onOptionsCompaniesChange = (optionValue) => {
    setCompaniesOptions(optionValue);
    setDataForm((prev) => {
      return {
        ...prev,
        companyId: optionValue.value,
      };
    });
  };

  const getCompanies = async () => {
    try {
      setDataForm({
        customerId: data.customer?.id,
        companyId: 1,
        currencyId: 1,
        paymentMethodId: 1,
        planId: 15,
        yearsOfThePlan: data.yearsOfThePlan,
        amountOfTheInvestment: data.amountOfTheInvestment,
        totalNetValueUSD: 1,
        originsOfTheFunds: "dfsafdf",
        advisorFee: true,
        percentage: data.percentage,
      })
      const selectsData = await DealsServices.getDealSelects();
      const companiesData = await selectsData.companies.map((company) => ({ label: company.name, value: company.id }));
      setCompanies(companiesData);
    } catch (error) {
      throw error;
    }
  };

  const funcAux = async()=> {
    await getCompanies()
    setCompaniesOptions({ label: data?.company?.name, value: data?.company?.id })
  }
  useEffect(() => {
    console.log("Update Date Negocio!", data)
    funcAux()
  }, [data])

  return (
    <Modal style={{ maxWidth: "1200px" }} isOpen={modal.edit} className="modal-dialog-centered" size="lg">
      <ModalBody >
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
        <div className="p-2 table-record">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="title" >Actualizar Negocio</h5>
            <Button color="primary" onClick={() => {
              console.log(data)
            }} >
              <Icon name="plus" className="mr-1"></Icon>
              Guardar
            </Button>
          </div>
        </div>
        <Form className="row mt-4">


          <Col md="6" className="mb-4">
            <label className="form-label">Socio Estratégico</label>
            <RSelect
              value={companiesOptions}
              options={companies}
              onChange={(e) => {
                onOptionsCompaniesChange(e)
                console.log(e)
              }}

            />
          </Col>
          <Col md="6" className="mb-4">

            <FormGroup>
              <label className="form-label">Nº de Cuenta</label>
              <input
                type="number"
                className="form-control disabled"
                name="amount"
                disabled
                onClick={() => {
                  console.log("hois")
                  console.log(data)
                }}
              />
            </FormGroup>

          </Col>
          <Col md="8" className="mb-4">

          </Col>
          <Col md="6" className="mb-4">
            <label className="form-label">Plan</label>
            <FormGroup>
              <RSelect
              />
            </FormGroup>
          </Col>
          <Col md="4" className="mb-4">
            <FormGroup>
              <label className="form-label">Años del Plan</label>
              <input
                type="number"
                className="form-control"
                name="period"
                value={dataForm.yearsOfThePlan}

              />
            </FormGroup>
          </Col>

          <Col md="12" className="mb-4">
            <FormGroup className="border-bottom pb-2">
              <h6>Inversión</h6>
            </FormGroup>
          </Col>
          <Col md="4" className="mb-4">
            <FormGroup>
              <label className="form-label">Monto de Inversión</label>

            </FormGroup>
          </Col>
          <Col md="3" className="mb-4">
            <FormGroup>
              <label className="form-label">Moneda</label>
              <RSelect
              />
            </FormGroup>
          </Col>
          <Col md="5" className="mb-4">
            <FormGroup>
              <label className="form-label">Valor neto total USD</label>

            </FormGroup>
          </Col>
          <Col md="4" className="mb-4">
            <FormGroup>
              <label className="form-label">Método de pago</label>
              <RSelect
              />
            </FormGroup>
          </Col>
          <Col md="8" className="mb-4">
            <FormGroup>
              <label className="form-label">Origen de los Fondos</label>
              <input
                type="text"
                className="form-control"
                name="paymentMethodId"


                placeholder="Ej: Herencia, Patrimonio, etc"
              />
            </FormGroup>
          </Col>

          <Col md="12" className="mb-4">
            <FormGroup className="border-bottom pb-2">
              <h6>Servicios de Comisión</h6>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label className="form-label">Advisor-Fee</label>
              <RSelect
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label className="form-label">Porcentaje</label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  className="form-control"
                  name="advisorFeeComission"
                  placeholder="Ej: 1 - 5 - 10"
                  value={dataForm.percentage}
                />
              </div>
            </FormGroup>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  )
}

const ModalFichaDelCliente = ({ modal, setModal }) => {

  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
    // resetForm();
  };

  return (
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
        <div className="p-2 table-record">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="title" >Crear Operación 2</h5>
            <Button color="primary" type="submit" >
              <Icon name="plus" className="mr-1"></Icon>
              Guardar Operación
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

const ModalPerfilDelInversionista = ({ modal, setModal }) => {

  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
    // resetForm();
  };

  return (
    <Modal style={{ maxWidth: "1192px" }} isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
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
        <div className="p-2 table-record">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="title" >Actualizar Perfil Del Inversionista</h5>
            <Button color="primary" type="submit" >
              <Icon name="plus" className="mr-1"></Icon>
              Guardar
            </Button>
          </div>
        </div>
        {
          ///////////////////////////////////////////////////
        }
        <Col md="12">
          <Form className="column align-items-center mt-4">
            <h6>1. HORIZONTE DE TIEMPO</h6>
            <label className="form-label mb-0">¿Cual es su horizonte de tiempo para esta inversion?</label>
            <br />
            <label className="form-label">
              ¿Cuando necesitara este dinero, o durante cuanto tiempo cree que mantendra esta inversion?
            </label>
            <FormGroup
              onChange={(e) => {
                setGeneralStateForm((prev) => {
                  const aux = [...prev.investorProfile];
                  aux[0] = {
                    number: parseInt(1),
                    answer: e.target.value,
                  };
                  return {
                    ...prev,
                    investorProfile: [...aux],
                  };
                });
              }}
              className="d-flex flex-column justify-content-center"
            >
              <div class="form-check">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="question1" value={1} />
                Menos de 3 años
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question1" value={2} />
                3-5 años
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="radio3" name="question1" value={3} />
                6-10 años
                <label class="form-check-label"></label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question1" value={4} />
                11 años o mas
              </div>
            </FormGroup>
            <hr />

            <h6>2. EXPERIENCIA</h6>
            <label className="form-label mb-0">
              ¿Cual de las siguiente opciones describe mejor su nivel de conocimiento sobre mercado de valores y sus
              productos?
            </label>
            <br />
            <FormGroup
              onChange={(e) => {
                setGeneralStateForm((prev) => {
                  const aux = [...prev.investorProfile];
                  aux[1] = {
                    number: parseInt(2),
                    answer: e.target.value,
                  };
                  return {
                    ...prev,
                    investorProfile: [...aux],
                  };
                });
              }}
              className="d-flex flex-column justify-content-center"
            >
              <div class="form-check">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="question2" value={1} />
                Ninguno - sin conocimiento ni experienci sobre inversiones
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question2" value={2} />
                Minimo - mi conocimiento es muy limitado y no tengo experiencia
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="radio3" name="question2" value={3} />
                Bueno - Buen conocimiento y cierta experiencia en inverisones
                <label class="form-check-label"></label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question2" value={3} />
                Amplio - Fuerte conocimiento y experiencia activa en inversiones
              </div>
            </FormGroup>
            <hr />

            <h6>3. % DE ACTIVOS TOTALES</h6>
            <label className="form-label mb-0">
              ¿Que porcentajes de sus activos totales liquidos(incluyendo dinero en efectivo, depositos, bonos, acciones,
              fondos mutuos, pero excluyendo inmuebles) representa esta inversion?
            </label>
            <br />
            <FormGroup
              onChange={(e) => {
                setGeneralStateForm((prev) => {
                  const aux = [...prev.investorProfile];
                  aux[2] = {
                    number: parseInt(3),
                    answer: e.target.value,
                  };
                  return {
                    ...prev,
                    investorProfile: [...aux],
                  };
                });
              }}
              className="d-flex flex-column justify-content-center"
            >
              <div class="form-check">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="question3" value={1} />
                Mas de 75%
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question3" value={2} />
                Entre 50% - 75%
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="radio3" name="question3" value={3} />
                Entre 25% - 50%
                <label class="form-check-label"></label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question3" value={4} />
                Menos de 25%
              </div>
            </FormGroup>
            <hr />
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <h6 className="mb-2">4. Objectivos de inversion</h6>
            <label className="form-label mb-2">
              ¿Cual de estas frases describre mejor sus objectivos de inversion para esta inversion en particular?
            </label>
            <br />
            <FormGroup
              onChange={(e) => {
                setGeneralStateForm((prev) => {
                  const aux = [...prev.investorProfile];
                  aux[3] = {
                    number: parseInt(4),
                    answer: e.target.value,
                  };
                  return {
                    ...prev,
                    investorProfile: [...aux],
                  };
                });
              }}
              className="d-flex flex-column justify-content-center"
            >
              <div class="form-check mb-2">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="optradio3" value={1} />
                Lo que mas me import es la seguridad de mi inversion inicial. Prefiero correr un riesgo muy pequeño o
                evitar cualquier riesgo de sufrir perdidas. Me conformo con que mi inversiones renten al menos la
                inflacion, ya que no quiero arriesgarme a perder dinero.
              </div>
              <div class="form-check mb-2">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question4" value={2} />
                Puedo aceptar perdidas pequeñas a corto plazo, pero me import la seguridad de mi inversion
              </div>
              <div class="form-check mb-2">
                <input type="radio" class="form-check-input" id="radio3" name="question4" />
                Busco equilibrio entre la seguridad de la inversion y el potencial crecimiento de la misma. Me gustaria
                que mis inversiones rentaran mas que la inflacion a largo plazo, aun cuando existe algo de riesgo que
                estas sufran alto y bajos en los precios a corto plazo.
                <label class="form-check-label"></label>
              </div>
              <div class="form-check mb-2">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question4" value={3} />
                Busco el crecimiento de la inversion y estoy dispuesto a aceptar algunas perdidas para obtener un
                crecimiento potencialmente mayor.
              </div>
              <div class="form-check mb-2">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question4" value={4} />
                Estoy dispuesto a aceptar un riesgo significativo y pontenciales perdidas para lograr un mayor crecimiento
                de inversion en el largo plazo. Me gustaria que mis inverisones superen ampliamente la inflacion a largo
                plazo. aun corriendo un mayor riego de perdidas en el corto plazo.
              </div>
            </FormGroup>
            <hr />

            <h6>5. RIESGO Y VOLATILIDAD</h6>
            <label className="form-label mb-0">
              ¿Cual es su actitud frente a la volatilidad del mercado a corto plazo?
            </label>
            <br />
            <FormGroup
              onChange={(e) => {
                setGeneralStateForm((prev) => {
                  const aux = [...prev.investorProfile];
                  aux[4] = {
                    number: parseInt(5),
                    answer: e.target.value,
                  };
                  return {
                    ...prev,
                    investorProfile: [...aux],
                  };
                });
              }}
              className="d-flex flex-column justify-content-center"
            >
              <div class="form-check">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="question5" value={1} />
                Generalmente entro en panico cuando el mercado cae.
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question5" value={2} />
                Algunas veces sobre-reacciono ante las fluctuaciones del mercado.
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="radio3" name="question5" value={3} />
                Paciente pero preocupado; adopto una actitud de esperar a ver que pasa.
                <label class="form-check-label"></label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question5" value={4} />
                La volatilidad en el corto plazo No me afecta
              </div>
            </FormGroup>
            <hr />
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <h6>
              6. EL SIGUIENTE GRAFICO; muestra la evolucion del valor de tres portafolios de inversion hipoteticos, para
              un periodo de 4 años. Los portafolios mas riesgosos experimentan variaciones (mas frecuentes y profundas en
              su valor, sin embargo, tienen un mayor retorno esperado a largo plazo)
            </h6>
            <label className="form-label mb-0">¿En cual de los portafolios se sentiria mas comodo invirtiendo?</label>
            <br />
            <Col md="12">
              <div className="d-flex justify-content-around">
                <FormGroup
                  onChange={(e) => {
                    setGeneralStateForm((prev) => {
                      const aux = [...prev.investorProfile];
                      aux[5] = {
                        number: parseInt(6),
                        answer: e.target.value,
                      };
                      return {
                        ...prev,
                        investorProfile: [...aux],
                      };
                    });
                  }}
                  className="d-flex flex-column justify-content-center"
                >
                  <div class="form-check">
                    <label class="form-check-label" for="radio1"></label>
                    <input type="radio" class="form-check-input" id="radio1" name="question6" value={1} />
                    Portafolio 1
                  </div>
                  <div class="form-check">
                    <label class="form-check-label" for="radio2"></label>
                    <input type="radio" class="form-check-input" id="radio2" name="question6" value={2} />
                    Portafolio 2
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio3" name="question6" value={3} />
                    Portafolio 3<label class="form-check-label"></label>
                  </div>
                </FormGroup>
                <img src={imgGrafica} alt="Grafica" width={600} height={250} />
              </div>
            </Col>
            <hr />
            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <h6>
              7. LA GRAFICAS DEL CUADRADO QUE APARECE A CONTINUACION; muestra el rendimiento de cinco inversiones
              hipoteticas diferentes. Cada barra muestra los posibles rendimientos de la s inverisones en un año.
            </h6>
            <label className="form-label mb-0">¿Con cual de estas inversiones se sentiria mas comodo?</label>
            <br />
            <Col md="12">
              <div className="d-flex justify-content-around">
                <FormGroup
                  onChange={(e) => {
                    setGeneralStateForm((prev) => {
                      const aux = [...prev.investorProfile];
                      aux[6] = {
                        number: parseInt(7),
                        answer: e.target.value,
                      };
                      return {
                        ...prev,
                        investorProfile: [...aux],
                      };
                    });
                  }}
                  className="d-flex flex-column justify-content-center"
                >
                  <div class="form-check">
                    <label class="form-check-label" for="radio1"></label>
                    <input type="radio" class="form-check-input" id="radio1" name="question7" value={1} />
                    Portafolio A
                  </div>
                  <div class="form-check">
                    <label class="form-check-label" for="radio2"></label>
                    <input type="radio" class="form-check-input" id="radio2" name="question7" value={2} />
                    Portafolio B
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio3" name="question7" value={3} />
                    Portafolio C<label class="form-check-label"></label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio3" name="question7" value={4} />
                    Portafolio D<label class="form-check-label"></label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio3" name="question7" value={5} />
                    Portafolio E<label class="form-check-label"></label>
                  </div>
                </FormGroup>
                <img src={imgGrafica2} alt="Grafica" width={600} height={250} />
              </div>
            </Col>
            <hr />
            <h6>
              8. CONSIDERE EL SIGUIENTE ESCENARIO: Imagine que durante los ultimos 3 meses de bolsa de valores tuvo una
              perdida de 25%. Algunos fondos de su portafolio tambien estan perdiendo 25% de su valor.
            </h6>
            <label className="form-label mb-0">¿Que haria usted?</label>
            <br />
            <FormGroup
              onChange={(e) => {
                setGeneralStateForm((prev) => {
                  const aux = [...prev.investorProfile];
                  aux[7] = {
                    number: parseInt(8),
                    answer: e.target.value,
                  };
                  return {
                    ...prev,
                    investorProfile: [...aux],
                  };
                });
              }}
              className="d-flex flex-column justify-content-center"
            >
              <div class="form-check">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="question8" value={1} />
                Vender el 100% de los fondos.
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question8" value={2} />
                Vender parte de los fondos.
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="radio3" name="question8" />
                Transferir parte a un fondo mas conservador.
                <label class="form-check-label"></label>
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio2"></label>
                <input type="radio" class="form-check-input" id="radio2" name="question8" value={3} />
                Analizaria las perspectivas del activo y compraria mas unidades del mismo fondo (siempre que los
                fundamentos asi lo justifiquen).
              </div>
              <div class="form-check">
                <label class="form-check-label" for="radio1"></label>
                <input type="radio" class="form-check-input" id="radio1" name="question8" value={4} />
                No haria nada.
              </div>
            </FormGroup>
          </Form>
        </Col>
      </ModalBody>
    </Modal>
  )
}

const ModalDocumentosRequeridos = ({ modal, setModal }) => {

  const onFormCancel = () => {
    setModal({ edit: false, add: false, document: false });
    // resetForm();
  };

  return (
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
        <div className="p-2 table-record">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="title" >Crear Operación 4</h5>
            <Button color="primary" type="submit" >
              <Icon name="plus" className="mr-1"></Icon>
              Guardar Operación
            </Button>
          </div>
        </div>
        {///// /
        }


      </ModalBody>
    </Modal>
  )
}

export default DealsList;
