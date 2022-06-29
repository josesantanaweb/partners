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
  const [metaData, setMetaData] = useState({})
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
      setMetaData(deals.meta)
      const dealsData = await deals.data.map((data) => data);
      console.log(dealsData)
      setData(dealsData);
    } catch (error) {}
  };
  useEffect(() => {
    getDeals();
  }, []);
  //////////////////// llealg 1 //////////////////////////////////
  const [requiredDocument, setRequiredDocument] = useState([]);
  const [selectClient, setSelectClient] = useState({});
  const [needDocument, setNeedDocument] = useState({});
  const [libraryClient, setLibraryClient] = useState([]);
  const { errors, register, setValue, handleSubmit } = useForm();
  //State general de formual incluye todos los tabs
  const [generalStateForm, setGeneralStateForm] = useState({ 
    investorProfile:[],
    beneficiaries:[]
  })

  const paginateDeals = async ( service ) => {

  
      try {
        const deals = await DealsServices.getDealsPaginate(service);
        setMetaData(deals.meta)
        console.log(deals.meta)
        const dealsData = await deals.data.map((data) => data);
        console.log(dealsData)
        setData(dealsData);
      } catch (error) {}
  

  }

  const onSubmit = data => {
    console.log(generalStateForm);
  };

  const postDeals = (e)=> {
    e.preventDefault();
    console.log(generalStateForm)
    let statePost = {};
    if(selectClient.type.id == 1)
      statePost = {
      customerId: parseInt(generalStateForm.customerId) ,
      companyId:  generalStateForm.companyId,
      currencyId: generalStateForm.currencyId,
      paymentMethodId: generalStateForm.paymentMethodId,
      planId: generalStateForm.planId,
      yearsOfThePlan: parseInt(generalStateForm.yearsOfThePlan) ,
      amountOfTheInvestment: parseInt( generalStateForm.amountOfTheInvestment),
      totalNetValueUSD: parseInt(generalStateForm.totalNetValueUSD) ,
      originsOfTheFunds: generalStateForm.originsOfTheFunds,
      advisorFee: generalStateForm.advisorFee,
      percentage: parseInt(generalStateForm.percentage),
      customerInfo: {
        currentAccountData: {
          ...generalStateForm.currentAccountData,

        },
        employmentHistory:{
          ...generalStateForm.employmentHistory,
        },
        personalReferences:{
          ...generalStateForm.personalReferences,
          
        },
        investmentExperience: {
          ...generalStateForm.investmentExperience,
        },
        spousalHistory:{
          ...generalStateForm.spousalHistory,
        },
      beneficiaries:[...generalStateForm.beneficiaries.map( act => {
        return {
          ...act,
        }
      })],

      },
      investorProfile: [
        ...generalStateForm.investorProfile
      ],
      documents: [
 
      ]
    }

    if(selectClient.type.id == 2){
      statePost = {
        customerId: parseInt(generalStateForm.customerId) ,
        companyId:  generalStateForm.companyId,
        currencyId: generalStateForm.currencyId,
        paymentMethodId: generalStateForm.paymentMethodId,
        planId: generalStateForm.planId,
        yearsOfThePlan: parseInt(generalStateForm.yearsOfThePlan) ,
        amountOfTheInvestment: parseInt( generalStateForm.amountOfTheInvestment),
        totalNetValueUSD: parseInt(generalStateForm.totalNetValueUSD) ,
        originsOfTheFunds: generalStateForm.originsOfTheFunds,
        advisorFee: generalStateForm.advisorFee,
        percentage: parseInt(generalStateForm.percentage),
        customerInfo: {
          currentAccountData: {
            ...generalStateForm.currentAccountData,
  
          },
          employmentHistory:{
            ...generalStateForm.employmentHistory,
          },
          personalReferences:{
            ...generalStateForm.personalReferences,
            
          },
          investmentExperience: {
            ...generalStateForm.investmentExperience,
          },
          spousalHistory:{
            ...generalStateForm.spousalHistory,
          },
        beneficiaries:[...generalStateForm.beneficiaries.map( act => {
          return {
            ...act,
          }
        })],
  
        },
        investorProfile: [
          ...generalStateForm.investorProfile
        ],
        documents: [
        ]
      }
    }

    if(statePost.customerInfo.currentAccountData.id){
      statePost.customerInfo.currentAccountData.id = parseInt(statePost.customerInfo.currentAccountData.id)
    }

    if(statePost.customerInfo.employmentHistory.id){
      statePost.customerInfo.employmentHistory.id = parseInt(statePost.customerInfo.employmentHistory.id)
    }

    if(statePost.customerInfo.personalReferences.id){
      statePost.customerInfo.personalReferences.id = parseInt(statePost.customerInfo.personalReferences.id)
    }

    if(statePost.customerInfo.investmentExperience.id){
      statePost.customerInfo.investmentExperience.id = parseInt(statePost.customerInfo.investmentExperience.id)
    }

    if(statePost.customerInfo. spousalHistory.id){
      statePost.customerInfo. spousalHistory.id = parseInt(statePost.customerInfo. spousalHistory.id)
    }

    if(statePost?.customerInfo?.beneficiaries[0]?.id){
      statePost.customerInfo.beneficiaries = statePost.customerInfo.beneficiaries.map( prev => {
        return {
          ...prev, id: parseInt(prev.id)
        }
      })
    }

    console.log('estado',statePost)
    DealsServices.postDeals(statePost).then( ()=>  window.location.reload())
  }

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Negocios
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {currentItems.length} negocios</p>
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
                  <span className="sub-text">N. Negocio</span>
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
                        <span>{item?.createdByAdvisor?       item?.createdByAdvisor?.name +" " +item?.createdByAdvisor?.paternalLastName: 
                        item?.createdByUser?.name +" " +item?.createdByUser?.lastName }</span>
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
                        <span>{item.amountOfTheInvestment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.currency.name}</span>
                      </DataTableRow>
                    
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action-hidden">
                            {/* onClick={() => onEditClick(item.id, item)} */}
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Editar"
                            />
                          </li>
                          <li className="nk-tb-action-hidden">
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

            <PreviewAltCard>
              {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={metaData.totalItems}
                  paginate={()=>paginateDeals(metaData.nextPageUrl)}
              
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
                setNeedDocument([]);
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2 table-record">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="title" >Agregar Negocio</h5>
                <Button color="primary" type="submit" onClick={ e=> postDeals(e)}>
                    <Icon name="plus" className="mr-1"></Icon>
                          Guardar Operacion
                </Button>
              </div>
           
              { requiredDocument.length != 0 && addActiveTab == 2 ? <span style={{color:'red'}}>Requerido: </span>: ""}
              { requiredDocument.length != 0 && addActiveTab == 2 && requiredDocument.map( (act, i) => <span>{i+1 + ")"  + ' '+ act.name}. </span>)}

              { needDocument.documents?.length && addActiveTab == 4? <span style={{color:'red'}}>Información del cliente requerida: </span>: ""}
              { needDocument.documents?.length > 0 && addActiveTab == 4 && needDocument.documents.map( (act, i) => <span>{i+1 + ")"  + ' '+ act.name}. </span>)}
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
                  <AddMainInformation  setAddActiveTab={setAddActiveTab} generalStateForm={generalStateForm} setGeneralStateForm={setGeneralStateForm} setValue={setValue} registerState={register} handleSubmitGeneral={handleSubmit} setLibraryClient={setLibraryClient} setModal={setModal} setNeedDocument={setNeedDocument} setRequiredDocument={setRequiredDocument} setSelectClient={setSelectClient} />
                  {/* formData={formData} */}
                </TabPane>
              </TabContent>
              <TabContent activeTab={addActiveTab}>
                <TabPane tabId="2">
                  <AddCustomerFile setAddActiveTab1={setAddActiveTab} generalStateForm={generalStateForm} setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient}/>
                  {/* formData={formData} */}
                </TabPane>
              </TabContent>
              <TabContent activeTab={addActiveTab}>
                <TabPane tabId="3">
                  <InvestorProfile setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient}/>
                </TabPane>
              </TabContent>
              <TabContent activeTab={addActiveTab}>
                <TabPane tabId="4">
                  <DocumentRequired libraryClient={libraryClient} needDocument={needDocument} requiredDocument={requiredDocument} setModal={setModal} selectClient={selectClient} />
                </TabPane>
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
        {/* Nuevo elemento Modal */}
      </Content>
    </React.Fragment>
  );
};

export default DealsList;
