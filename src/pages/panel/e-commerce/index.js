import React from "react";
import { Link } from "react-router-dom";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row } from "../../../components/Component";
import RecentOrders from "../../../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../../../components/partials/default/top-products/TopProducts";
import AverageOrder from "../../../components/partials/e-commerce/average-order/AverageOrder";
import Customer from "../../../components/partials/e-commerce/customers/Customer";
import Orders from "../../../components/partials/e-commerce/orders/Orders";
import TotalSales from "../../../components/partials/e-commerce/total-sales/TotalSales";
import StoreStatistics from "../../../components/partials/default/StoreStatistics";
import TrafficSources from "../../../components/partials/e-commerce/traffic-sources/TrafficSources";
import StoreVisitors from "../../../components/partials/e-commerce/store-visitors/StoreVisitors";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Head title="Dashboard Asesor/a"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block className="container-fluid">
          {/* Dashboard Menu-quick access */}
          <Row className="card flex flex-row mx-auto bg-white p-2 mb-4">
            <Col className="nk-menu-item text-center btn btn-outline-light" md="3" lg="3">
              <Link to="/customer" className="nk-menu-link text-dark-50 w-100 bg-transparent">
                <span>
                  <em className="icon ni ni-users-fill"></em>
                </span>
                <span className="nk-menu-text pl-1">Clientes</span>
              </Link>
            </Col>

            <Col className="nk-menu-item text-center btn btn-outline-light" md="3" lg="3">
              <Link to="/operation" className="nk-menu-link text-dark-50 w-100 bg-transparent">
                <span>
                  <em className="icon ni ni-swap-alt-fill"></em>
                </span>
                <span className="nk-menu-text pl-1">Operaciones</span>
              </Link>
            </Col>

            <Col className="nk-menu-item text-center btn btn-outline-light" md="3" lg="3">
              <Link to="/customers-library" className="nk-menu-link text-dark-50 w-100 bg-transparent">
                <span>
                  <em className="icon ni ni-users-fill"></em>
                </span>
                <span className="nk-menu-text pl-1">Bibl. de Clientes</span>
              </Link>
            </Col>

            <Col className="nk-menu-item text-center btn btn-outline-light" md="3" lg="3">
              <Link to="/customer" className="nk-menu-link text-dark-50 w-100 bg-transparent">
                <span>
                  <em className="icon ni ni-users-fill"></em>
                </span>
                <span className="nk-menu-text pl-1">Otro</span>
              </Link>
            </Col>
          </Row>

          <Row className="g-gs">
            <Col xxl="4" md="6">
              <TotalSales />
            </Col>
            <Col xxl="4" md="6">
              <AverageOrder />
            </Col>
            <Col xxl="4">
              <Row className="g-gs">
                <Col xxl="12" md="6">
                  <Orders />
                </Col>
                <Col xxl="12" md="6">
                  <Customer />
                </Col>
              </Row>
            </Col>
            <Col xxl="8">
              <RecentOrders />
            </Col>
            <Col xxl="4" md="6">
              <TopProducts />
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics />
            </Col>
            <Col xxl="5" lg="6">
              <TrafficSources />
            </Col>
            <Col xxl="4" lg="6">
              <StoreVisitors />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Dashboard;
