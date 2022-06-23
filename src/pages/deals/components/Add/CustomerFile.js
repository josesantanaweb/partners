import React, { useState } from "react";
import { FormGroup, Modal, ModalBody, Form, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import AddAccountData from "./AccountData.js";
import AddEmploymentHistory from "./EmploymentHistory.js";
import PersonalReferences from "../../../clientes/Natural/components/Edit/PersonalReferences.js";
import InvestMentExpirence from "../../../clientes/Natural/components/Edit/InvestmentExperience"
import SpousalHistory from "../../../clientes/Natural/components/Edit/SpousalHistory"
import Beneficiaries from "../../../clientes/Natural/components/Edit/Beneficiaries"
import CompanyQyestionnaire from '../../../clientes/Legal/components/Edit/CompanyQuestionnaire'
import CompanyFinancialProfile from '../../../clientes/Legal/components/Edit/CompanyFinancialProfile'
import CompanyBanksItWorksWith from '../../../clientes/Legal/components/Edit/CompanyBanksItWorksWith'
import CompanyPartners from '../../../clientes/Legal/components/Edit/CompanyPartners'

const CustomerFile = ({setGeneralStateForm,selectClient}) => {
  const [addActiveTab, setAddActiveTab] = useState("1");
  const [addActiveTabDocument, setAddActiveTabDocument] = useState("1");
  const [modal, setModal] = useState({
    edit: false,
    add: false,

  });

  return (
    <React.Fragment>
      {
        selectClient?.type?.id  == 1? <Nav tabs>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "1" })}
            onClick={() => setAddActiveTab("1")}
          >
            Datos de la cuenta
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "2" })}
            onClick={() => setAddActiveTab("2")}
          >
            Antecedentes laborales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "3" })}
            onClick={() => setAddActiveTab("3")}
          >
            Referencias Personales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "4" })}
            onClick={() => setAddActiveTab("4")}
          >
            Experiencia de Inversiones
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "5" })}
            onClick={() => setAddActiveTab("5")}
          >
            Antecedentes del conyuge
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "6" })}
            onClick={() => setAddActiveTab("6")}
          >
            Bendeficiarios
          </NavLink>
        </NavItem>
      </Nav>
    : <Nav tabs>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: addActiveTab === "7" })}
            onClick={() => setAddActiveTab("7")}
          >
            Cuestionario de la empresa
          </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag="a"
          href="#tab"
          className={classnames({ active: addActiveTab === "8" })}
          onClick={() => setAddActiveTab("8")}
        >
          Perfil de Empresa
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag="a"
          href="#tab"
          className={classnames({ active: addActiveTab === "9" })}
          onClick={() => setAddActiveTab("9")}
        >
          Informacion Bancaria
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag="a"
          href="#tab"
          className={classnames({ active: addActiveTab === "10" })}
          onClick={() => setAddActiveTab("10")}
        >
          Socios
        </NavLink>
      </NavItem>
    </Nav>
      }
  
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="1">
          <AddAccountData setGeneralStateForm={setGeneralStateForm} setModal={setModal} editData={selectClient} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="2">
          <AddEmploymentHistory setGeneralStateForm={setGeneralStateForm} setModal={setModal}  editData={selectClient} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="3">
          <PersonalReferences setGeneralStateForm={setGeneralStateForm} setModal={setModal}  editData={selectClient} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="4">
          <InvestMentExpirence setGeneralStateForm={setGeneralStateForm} setModal={setModal}  editData={selectClient} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="5">
          <SpousalHistory  setGeneralStateForm={setGeneralStateForm} setModal={setModal}  editData={selectClient} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="6">
          <Beneficiaries  setGeneralStateForm={setGeneralStateForm} setModal={setModal}  selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="7">
          <CompanyQyestionnaire  setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="8">
          <CompanyFinancialProfile  setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="9">
          <CompanyBanksItWorksWith  setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="10">
          <CompanyPartners  setGeneralStateForm={setGeneralStateForm} setModal={setModal} selectClient={selectClient} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default CustomerFile;
