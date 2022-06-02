import React, { useState } from "react";
import { FormGroup, Modal, ModalBody, Form, Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import AddAccountData from "./AccountData.js";

const CustomerFile = () => {
  const [addActiveTab, setAddActiveTab] = useState("1");
  const [addActiveTabDocument, setAddActiveTabDocument] = useState("1");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  return (
    <React.Fragment>
      <Nav tabs>
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
      <TabContent activeTab={addActiveTab}>
        <TabPane tabId="1">
          <AddAccountData setModal={setModal} />
          {/* formData={formData} */}
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default CustomerFile;
