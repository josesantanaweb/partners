import React, { useState } from "react";
import Head from "../../layout/head/Head";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Jumbotron,
} from "reactstrap";
import Content from "../../layout/content/Content";
import {
  Block,
  Row,
  Col,
  BlockTitle,
  BlockDes,
  BlockHeadContent,
  Button,
  Icon,
  BlockContent,
} from "../../components/Component";
import DataCard from "../../components/partials/default/DataCard";

import Logo from "../../layout/logo/Logo";
import Carrousel from "./carrousel/Carrousel";

const AdvisorsLibrary = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Head title="Biblioteca de Asesores"></Head>
      <section style={{ marginTop: "4.1rem" }}>
        <Navbar className="rounded" color="white" light expand="md">
          <NavbarBrand href="/">{<Logo />}</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Inicio</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="dropdown-indicator">
                  Contratos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Negocio</DropdownItem>
                  <DropdownItem>Validaciones</DropdownItem>
                  <DropdownItem>Respaldos</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="dropdown-indicator">
                  Tutoriales
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Creación de Clientes</DropdownItem>
                  <DropdownItem>Biblioteca de Clientes</DropdownItem>
                  <DropdownItem>Creación de Usuarios</DropdownItem>
                  <DropdownItem>Creación de Asesores</DropdownItem>
                  <DropdownItem>Creación de Roles</DropdownItem>
                  <DropdownItem>Actividades de Agenda</DropdownItem>
                  <DropdownItem>Creación de Operación</DropdownItem>
                  <DropdownItem>Creación de Operaciónes Post Venta</DropdownItem>
                  <DropdownItem>Creación de Socio Estratégico</DropdownItem>
                  <DropdownItem>Creación de Plan/Producto</DropdownItem>
                  <DropdownItem>Creación de Documentos</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/components/">Notificias e Información</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Asesorias</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </section>
      <section>
        <Carrousel />
      </section>

      <Content className="rounded">
        <Block className="bg-white p-4 rounded">
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
              Contratos de Negocio
            </BlockTitle>
            <BlockDes className="text-soft">
              <p>Total documentos</p>
            </BlockDes>
          </BlockHeadContent>
          <Row className="g-gs">
            <Col xxl="3" sm="6">
              <div className="nk-ecwg nk-ecwg3 bg-white rounded shadow-sm mt-1">
                <div className="card-inner pb-0">
                  <div className="card-title-group">
                    <div className="card-title">
                      <h6 className="title">Nombre Documento</h6>
                      <p className="text-body">Descripción</p>
                    </div>
                  </div>
                  <div className="data">
                    <div className="data-group">
                      <div className="amount">01</div>
                      <div className="info text-right">
                        <span className="change up text-danger">{/* <Icon name="arrow-long-up"></Icon>4.63% */}</span>
                        <span>
                          <a href="#" target="_blank" rel="noreferrer">
                            <Button color="primary" type="button">
                              <Icon name="eye" className="mr-1"></Icon>
                              <span className="text-white">Visualizar</span>
                            </Button>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xxl="3" sm="6">
              <div className="nk-ecwg nk-ecwg3 bg-white rounded shadow-sm mt-1">
                <div className="card-inner pb-0">
                  <div className="card-title-group">
                    <div className="card-title">
                      <h6 className="title">Nombre Documento</h6>
                      <p className="text-body">Descripción</p>
                    </div>
                  </div>
                  <div className="data">
                    <div className="data-group">
                      <div className="amount">01</div>
                      <div className="info text-right">
                        <span className="change up text-danger">{/* <Icon name="arrow-long-up"></Icon>4.63% */}</span>
                        <span>
                          <a href="#" target="_blank" rel="noreferrer">
                            <Button color="primary" type="button">
                              <Icon name="eye" className="mr-1"></Icon>
                              <span className="text-white">Descargar</span>
                            </Button>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xxl="3" sm="6">
              <div className="nk-ecwg nk-ecwg3 bg-white rounded shadow-sm mt-1">
                <div className="card-inner pb-0">
                  <div className="card-title-group">
                    <div className="card-title">
                      <h6 className="title">Nombre Documento</h6>
                      <p className="text-body">Descripción</p>
                    </div>
                  </div>
                  <div className="data">
                    <div className="data-group">
                      <div className="amount">01</div>
                      <div className="info text-right">
                        <span className="change up text-danger">{/* <Icon name="arrow-long-up"></Icon>4.63% */}</span>
                        <span>
                          <a href="#" target="_blank" rel="noreferrer">
                            <Button color="primary" type="button">
                              <Icon name="eye" className="mr-1"></Icon>
                              <span className="text-white">Visualizar</span>
                            </Button>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xxl="3" sm="6">
              <div className="nk-ecwg nk-ecwg3 bg-white rounded shadow-sm mt-1">
                <div className="card-inner pb-0">
                  <div className="card-title-group">
                    <div className="card-title">
                      <h6 className="title">Nombre Documento</h6>
                      <p className="text-body">Descripción</p>
                    </div>
                  </div>
                  <div className="data">
                    <div className="data-group">
                      <div className="amount">01</div>
                      <div className="info text-right">
                        <span className="change up text-danger">{/* <Icon name="arrow-long-up"></Icon>4.63% */}</span>
                        <span>
                          <a href="#" target="_blank" rel="noreferrer">
                            <Button color="primary" type="button">
                              <Icon name="eye" className="mr-1"></Icon>
                              <span className="text-white">Descargar</span>
                            </Button>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Block>
      </Content>

      <Content className="rounded">
        <BlockHeadContent>
          <BlockDes className="text-soft text-center">
            <p className="text-primary">Asesoría</p>
          </BlockDes>
          <BlockTitle tag="h3" page className=" d-flex flex-column text-center">
            Contratos de Negocio
          </BlockTitle>
          <BlockDes className="text-soft text-center">
            <p>Con nuestra asesoría experta te ayudamos a invertir en el mejor modelo que se ajuste a tus objetivos.</p>
          </BlockDes>
        </BlockHeadContent>
      </Content>

      <Content>
        <Block>
          <Row className="d-flex align-items-center justify-content-center p-2">
            <Col xs={6} md={4} className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                }}
              >
                <img
                  alt="Card image"
                  style={{ margin: "0 auto", width: "30%", padding: "1.5rem 0" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
                />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Card subtitle
                  </CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={6} md={4} className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                }}
              >
                <img
                  alt="Card image"
                  style={{ margin: "0 auto", width: "30%", padding: "1.5rem 0" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
                />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Card subtitle
                  </CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
            <Col xs={6} md={4} className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                }}
              >
                <img
                  alt="Card image"
                  style={{ margin: "0 auto", width: "30%", padding: "1.5rem 0" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
                />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Card subtitle
                  </CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Block>
      </Content>

      <Content className="rounded">
        <Block className="bg-white p-4 rounded">
          <Row className="d-flex align-items-center justify-content-center bg-white">
            <Col md={6} className="d-flex justify-content-left">
              <img
                style={{ width: "600px", height: "550px" }}
                src="https://partnersadvisers.cl/wp-content/uploads/2021/07/Partners_banner_14-600x600.png"
                alt="link"
              />
            </Col>

            <Col md={6} className="d-flex justify-content-center">
              <div className="d-flex flex-column justify-content-center text-center">
                <p className="text-primary">Asesoría</p>
                <h3>Ser Empresa Líder en Asesorías de Inversión</h3>
                <BlockDes className="text-soft text-center">
                  <p>
                    Con nuestra asesoría experta te ayudamos a invertir en el mejor modelo que se ajuste a tus
                    objetivos.
                  </p>
                </BlockDes>
                <BlockContent className="p-4">
                  <div className="d-flex flex-row pt-3 pb-3">
                    <div className="d-flex align-items-center justify-content-center user-avatar mr-4">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="text-left">
                      <h6 className="title text-primary">Asesoría Experta</h6>
                      <p>Equipo de asesores de larga trayectoria en instituciones financieras.</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row pt-3 pb-3">
                    <div className="d-flex align-items-center justify-content-center user-avatar mr-4">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="text-left">
                      <h6 className="title text-primary">Asesoría Experta</h6>
                      <p>Equipo de asesores de larga trayectoria en instituciones financieras.</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row pt-3 pb-3">
                    <div className="d-flex align-items-center justify-content-center user-avatar mr-4">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="text-left">
                      <h6 className="title text-primary">Asesoría Experta</h6>
                      <p>Equipo de asesores de larga trayectoria en instituciones financieras.</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row pt-3 pb-3">
                    <div className="d-flex align-items-center justify-content-center user-avatar mr-4">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="text-left">
                      <h6 className="title text-primary">Asesoría Experta</h6>
                      <p>Equipo de asesores de larga trayectoria en instituciones financieras.</p>
                    </div>
                  </div>
                </BlockContent>
              </div>
            </Col>
          </Row>
        </Block>
      </Content>

      <Content className="rounded">
        <Block>
          <div>
            <Jumbotron>
              <h1 className="display-3">Titulo Noticia</h1>
              <p className="lead">
                This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured
                content or information.
              </p>
              <hr className="my-2" />
              <p>
                It uses utility classes for typography and spacing to space content out within the larger container.
              </p>
              <p className="lead">
                <Button color="primary">Learn More</Button>
              </p>
            </Jumbotron>
          </div>
        </Block>
      </Content>

      {/* <Block>
        <iframe
          style={{ width: "100%", height: "100vh", border: "none" }}
          src="https://partnersadvisers.cl/gestioninmobiliaria/modelo-irs/"
        ></iframe>
      </Block> */}
    </React.Fragment>
  );
};

export default AdvisorsLibrary;
