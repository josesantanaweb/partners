import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  PreviewAltCard,
} from "../../components/Component";
import { Card } from "reactstrap";

import { findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { recentOrderData } from "../../components/partials/default/recent-orders/OrderData";

const CustomersLibrary = () => {
  return (
    <React.Fragment>
      <Head title="Biblioteca de Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Biblioteca de Clientes
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total 2,595 clientes</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent></BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Row className="g-gs">
          <Col lg="6">
            <Card className="card-full">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h6 className="title">Clientes Recientes</h6>
                  </div>
                </div>
              </div>
              <div className="nk-tb-list mt-n2">
                <DataTableHead>
                  <DataTableRow>
                    <span>Order No.</span>
                  </DataTableRow>
                  <DataTableRow size="sm">
                    <span>Customer</span>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <span>Date</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span>Amount</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="d-none d-sm-inline">Status</span>
                  </DataTableRow>
                </DataTableHead>
                {recentOrderData.map((item, idx) => (
                  <DataTableItem key={idx}>
                    <DataTableRow>
                      <span className="tb-lead">
                        <a href="#order" onClick={(ev) => ev.preventDefault()}>
                          {item.order}
                        </a>
                      </span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <div className="user-card">
                        <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>
                        <div className="user-name">
                          <span className="tb-lead">{item.name}</span>
                        </div>
                      </div>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span className="tb-sub">{item.date}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub tb-amount">
                        {item.amount} <span>USD</span>
                      </span>
                    </DataTableRow>
                    <DataTableRow>
                      <span
                        className={`badge badge-dot badge-dot-xs badge-${
                          item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </DataTableRow>
                  </DataTableItem>
                ))}
              </div>
            </Card>
          </Col>

          <Col xxl="6" md="6">
            <Block>
              <Card>
                <ul className="nk-top-products p-1">
                  <h6 className="p-1 p">Docs iniciales</h6>
                  <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2">
                    <div className="p-2 overflow-auto rounded scrollbar-fluid w-90">
                      <div className="title">Documento: Ficha Perfil cliente</div>
                      <div className="price">
                        Descripcion: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium.
                      </div>
                    </div>
                    <div className="p-2 mb-1 w-50 d-flex align-items-center justify-content-between p-2">
                      <Link to="/operation" className="nk-menu-link text-white w-100 bg-light text-center pr-2">
                        <Icon name="icon ni ni-download text-primary h-2"></Icon>
                      </Link>
                    </div>
                  </li>
                  <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2">
                    <div className="p-2 overflow-auto rounded scrollbar-fluid w-90">
                      <div className="title">Documento: Ficha Perfil cliente</div>
                      <div className="price">
                        Descripcion: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium.
                      </div>
                    </div>
                    <div className="p-2 mb-1 w-50 d-flex align-items-center justify-content-between p-2">
                      <Link to="/operation" className="nk-menu-link text-white w-100 bg-light text-center pr-2">
                        <Icon name="icon ni ni-download text-primary h-2"></Icon>
                      </Link>
                    </div>
                  </li>
                  <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2">
                    <div className="p-2 overflow-auto rounded scrollbar-fluid w-90">
                      <div className="title">Documento: Ficha Perfil cliente</div>
                      <div className="price">
                        Descripcion: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium.
                      </div>
                    </div>
                    <div className="p-2 mb-1 w-50 d-flex align-items-center justify-content-between p-2">
                      <Link to="/operation" className="nk-menu-link text-white w-100 bg-light text-center pr-2">
                        <Icon name="icon ni ni-download text-primary h-2"></Icon>
                      </Link>
                    </div>
                  </li>
                  <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2">
                    <div className="p-2 overflow-auto rounded scrollbar-fluid w-90">
                      <div className="title">Documento: Ficha Perfil cliente</div>
                      <div className="price">
                        Descripcion: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium.
                      </div>
                    </div>
                    <div className="p-2 mb-1 w-50 d-flex align-items-center justify-content-between p-2">
                      <Link to="/operation" className="nk-menu-link text-white w-100 bg-light text-center pr-2">
                        <Icon name="icon ni ni-download text-primary h-2"></Icon>
                      </Link>
                    </div>
                  </li>
                </ul>
              </Card>
            </Block>
          </Col>
        </Row>
      </Content>
    </React.Fragment>
  );
};
export default CustomersLibrary;
