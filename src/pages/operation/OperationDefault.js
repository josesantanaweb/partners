import React, { useEffect, useState } from "react";
import axios from "axios";
import OperationsServices from "../../services/OperationsServices";
import { Link } from "react-router-dom";
import { useRut } from "react-rut-formatter";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import DatePicker from "react-datepicker";
import { orderData } from "./OperationData";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
} from "../../components/Component";

import { getDateStructured } from "../../utils/Utils";
import { useForm } from "react-hook-form";

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";

const OperationDefault = () => {
  const { rut, updateRut, isValid } = useRut();

  const [data, setData] = useState(orderData);
  const [smOption, setSmOption] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    operationNumber: "0000001",
    planNumber: "0000001",
    customerPlan: "",
    currencyType: "",
    operationType: "",
    customer: "",
    adviser: "",
    company: "",
    productType: "",
    product: "",
    investmentAmount: parseInt(0),
    rut: "",
    customer: "",
    period: "",
    commission: "",
    annualPayment: 0,
    formOfPayment: "",
    paymentMethod: "",
    amountOfMoney: 0,
    discretionaryCommission: "",
    trailerFreeComission: 0,
  });

  const [view, setView] = useState({
    add: false,
    details: false,
    viewChecklist: false,
  });

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = orderData.filter((item) => {
        return item.orderId.includes(onSearchText);
      });
      setData([...filteredObject]);
    } else {
      setData([...orderData]);
    }
  }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      viewChecklist: type === "viewChecklist" ? true : false,
    });
  };

  // selects all the order
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one order
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      operationNumber: "0000001", //este campo puede ir ""
      planNumber: "0000001", //este campo puede ir ""
      currencyType: "",
      customerPlan: "",
      operationType: "",
      adviser: "",
      company: "",
      productType: "",
      product: "",
      investmentAmount: parseInt(0),
      rut: "",
      customer: "",
      period: "",
      commission: "",
      annualPayment: 0,
      formOfPayment: "",
      paymentMethod: "",
      amountOfMoney: 0,
      discretionaryCommission: "",
      trailerFreeComission: 0,
    });
  };

  const onFormSubmit = (form) => {
    const {
      operationNumber,
      currencyType,
      planNumber,
      customerPlan,
      adviser,
      company,
      productType,
      product,
      period,
      investmentAmount,
      rut,
      customer,
      comission,
      annualPayment,
      formOfPayment,
      paymentMethod,
      amountOfMoney,
      discretionaryCommission,
      trailerFreeComission,
    } = form;

    let submittedData = {
      id: data.length + 1,
      operationNumber: "000001",
      currencyType: currencyType,
      planNumber: "0000001",
      customerPlan: customerPlan,
      adviser: adviser,
      company: company,
      productType: productType,
      product: product,
      investmentAmount: investmentAmount,
      rut: rut,
      customer: customer,
      period: period,
      comisión: comission,
      annualPayment: annualPayment,
      formOfPayment: formOfPayment,
      paymentMethod: paymentMethod,
      amountOfMoney: amountOfMoney,
      discretionaryCommission: discretionaryCommission,
      trailerFreeComission: trailerFreeComission,
    };

    setData([submittedData, ...data]);
    setView({ add: false, details: false, viewChecklist: false });
    resetForm();
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, viewChecklist: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markAsDelivered = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Delivered";
    setData([...newData]);
  };

  // function to delete a Order
  const deleteOrder = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteOrder = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorMarkAsDelivered = () => {
    let newData;
    newData = data.map((item) => {
      if (item.check === true) item.status = "Delivered";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit, formState } = useForm();

  // Get select input data
  const [option, setOption] = useState();

  function handleChange(event) {
    setOption(event.target.value);
  }

  // ************************************************
  // Get input search data Public API
  const [customers, setCustomers] = useState([]);
  const [tableCustomers, setTableCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // Get customers from API
  const getCustomer = async (customerName) => {
    try {
      const customers = await OperationsServices.getCustomer(customerName);
      const customersData = customers.data.map((customerData) => customerData);

      const customerFiltredData = customers.data.map((customerData) => {
        if (customerData.names === customerName) {
          return customerData;
        }
      });

      console.log(`Customer:`, customerFiltredData); //-> checked
      console.log(`Name:`, customerName); //-> checked

      setCustomers(customersData);
      setTableCustomers(customersData);
    } catch (error) {
      throw error;
    }
  };

  // Get customer names from input search
  const handleInputSearchChange = (ev) => {
    setSearch(ev.target.value);
  };

  const handleClickedRegister = (customerName) => {
    const customerRutSelected = customers.filter((customer) => {
      if (customer.names === customerName) {
        setSearch(customer.names);
      }
    });
  };

  useEffect(() => {
    getCustomer(search);
  }, [search]);

  return (
    <React.Fragment>
      <Head title="Order Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Operaciones</BlockTitle>
            </BlockHeadContent>

            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Buscar por numero"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Estado
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Abierta</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Cerrada</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setView({ add: true })}>
                        <Icon name="plus"></Icon>
                        <span className="pr-2">Crear Operación</span>
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
            <div className="nk-tb-list is-separate is-medium mb-3 ">
              <DataTableHead className="nk-tb-item">
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      id="pid-all"
                      onChange={(e) => selectorCheck(e)}
                    />
                    <label className="custom-control-label" htmlFor="pid-all"></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">N. de Operacion</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">N. de Plan</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Cliente</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Cliente</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Asesor</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Empresa</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Tipo de Producto</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Producto</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Monto de Inversión</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Moneda</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Plazo</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Pago Anual</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Forma de Pago</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Medio de Pago</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Abono</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Comisión Discresional</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Comisión Trailer Free</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Subir Docs. Asesor/a</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Validar Docs. P&A</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1 my-n1">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon mr-n1">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#markasdone"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  selectorMarkAsDelivered();
                                }}
                              >
                                <Icon name="edit"></Icon>
                                <span>Editar</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#remove"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  selectorDeleteOrder();
                                }}
                              >
                                <Icon name="trash"></Icon>
                                <span>Remove Orders</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="nk-tb-col-check text-center">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            defaultChecked={item.check}
                            id={item.id + "oId-all"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "oId-all"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <a href="#id" onClick={(ev) => ev.preventDefault()}>
                          #{item.operationNumber}
                        </a>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.planNumber}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.customer}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.rut}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.adviser}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.company}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.productType}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.product}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseInt(item.investmentAmount) + 3}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.currencyType}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.period}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.annualPayment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.formOfPayment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.paymentMethod}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.amountOfMoney}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item.discretionaryCommission}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span className="tb-sub">{item.trailerFreeComission}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="" className="dropdown-toggle bg-transparent border-0">
                                <DropdownItem
                                  tag="a"
                                  href="#dropdown"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    loadDetail(item.id);
                                    toggle("details");
                                  }}
                                >
                                  <div className="icon-status icon-status-na">
                                    <Icon name="upload" className="text-danger"></Icon>
                                  </div>
                                </DropdownItem>
                              </DropdownToggle>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>

                      <DataTableRow className="text-center">
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="" className="dropdown-toggle bg-transparent border-0">
                                <DropdownItem
                                  tag="a"
                                  href="#dropdown"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    loadDetail(item.id);
                                    toggle("viewChecklist");
                                  }}
                                >
                                  <div className="icon-status icon-status-na">
                                    <Icon name="check" className="text-danger"></Icon>
                                  </div>
                                </DropdownItem>
                              </DropdownToggle>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  ))
                : null}
            </div>
          </div>
        </Block>
        <PreviewAltCard>
          {data.length > 0 ? (
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center">
              <span className="text-silent">No se encontaron operaciones</span>
            </div>
          )}
        </PreviewAltCard>
        {/* Operations Modal Form */}
        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Agregar Operación</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <h6 className="border-bottom pb-1">Información del Cliente</h6>
                    </Col>

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="rut">
                          Buscar Cliente
                        </label>
                        <div className="search flex flex-column">
                          <div className="form-icon form-icon-right">
                            <Icon name="search"></Icon>
                          </div>
                          <input
                            type="text"
                            name="rut"
                            defaultValue={formData.rut}
                            value={search}
                            onChange={handleInputSearchChange}
                            className="form-control"
                            placeholder="Nombre de Cliente"
                            ref={register({ required: "Este campo es obligatorio *" })}
                          />
                        </div>
                      </div>

                      <div className="overflow-auto rounded scrollbar-fluid container-fluid">
                        {customers.length === 0 ? (
                          <span className="text-danger">
                            <em className="icon ni ni-info"></em>
                            <i>Cliente no válido</i>
                          </span>
                        ) : (
                          customers &&
                          customers.map((customer) => (
                            <DataTableItem key={customer.id}>
                              <DataTableRow className="text-center">
                                <span>{customer.id}</span>
                              </DataTableRow>
                              <DataTableRow className="text-center">
                                <span>{customer.names}</span>
                              </DataTableRow>
                              <DataTableRow className="text-center">
                                <span>{customer.paternalLastName}</span>
                              </DataTableRow>
                              <DataTableRow className="text-center">
                                <span>{customer.rut}</span>
                              </DataTableRow>
                              <DataTableRow className="text-center">
                                <span>{customer.email}</span>
                              </DataTableRow>
                              <DataTableRow>
                                <Button
                                  onClick={() => handleClickedRegister(customer.names)}
                                  className="bg-dark border-0 text-white"
                                >
                                  <em className="icon ni ni-check"></em>
                                </Button>
                              </DataTableRow>
                            </DataTableItem>
                          ))
                        )}
                      </div>
                    </Col>

                    <Col md="12">
                      <h6 className="border-bottom pb-1 mt-2">Plan</h6>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer-plan">
                          Plan del Cliente
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="customerPlan"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.customerPlan}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="plan-1">Plan 1</option>
                            <option value="plan-2">Plan 2</option>
                            <option value="plan-3">Plan 3</option>
                          </select>
                          {errors.customerPlan && <span className="invalid">{errors.customerPlan.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <h6 className="border-bottom pb-1 mt-2">Empresa y Producto</h6>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="company">
                          Empresa
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="company"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.company}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Empresa-1">Empresa 1</option>
                            <option value="Empresa-2">Empresa 2</option>
                            <option value="Empresa-3">Empresa 3</option>
                          </select>
                          {errors.company && <span className="invalid">{errors.company.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-type">
                          Tipo de Producto
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="productType"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.productType}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="ADVANCE">ADVANCE</option>
                            <option value="SENIOR">SENIOR</option>
                          </select>
                          {errors.productType && <span className="invalid">{errors.productType.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product">
                          Producto
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="product"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.product}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="PLAT">PLAT</option>
                            <option value="ACC">ACC</option>
                            <option value="EVO">EVO</option>
                            <option value="STONEX">STONEX</option>
                            <option value="EXCESO">EXCESO</option>
                          </select>
                          {errors.product && <span className="invalid">{errors.product.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <h6 className="border-bottom pb-1 mt-2">Inversión</h6>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="currency-type">
                          Tipo de Moneda
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="currencyType"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.currencyType}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="CLP">CLP - Pesos chilenos</option>
                            <option value="USD">USD - Dolar Estados Unidos</option>
                            <option value="EUR">EUR - Euros</option>
                          </select>
                          {errors.currencyType && <span className="invalid">{errors.currencyType.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="investment-amount">
                          Monto de Inversión
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="investmentAmount"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.investmentAmount}
                          />
                          {errors.investmentAmount && (
                            <span className="invalid">{errors.investmentAmount.message}</span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="amount-of-money">
                          Abono
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="amountOfMoney"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.amountOfMoney}
                          />
                          {errors.amountOfMoney && <span className="invalid">{errors.amountOfMoney.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="fc fc-button-group">
                        <label className="form-label" htmlFor="period">
                          Periodo de Duración
                        </label>
                        <div className="form-control-wrap">
                          <input
                            className="fc-button bg-light w-100"
                            type="date"
                            name="period"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.period}
                          />
                          {errors.period && <span className="invalid">{errors.period.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="annual-payment">
                          Pago Anual
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="annualPayment"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.annualPayment}
                          />
                          {errors.annualPayment && <span className="invalid">{errors.annualPayment.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <h6 className="border-bottom pb-1 mt-2">Pago</h6>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="form-of-payment">
                          Forma de Pago
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="formOfPayment"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.formOfPayment}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="MENSUAL">MENSUAL</option>
                            <option value="TRIMESTRAL">TRIMESTRAL</option>
                            <option value="ANUAL">ANUAL</option>
                          </select>
                          {errors.formOfPayment && <span className="invalid">{errors.formOfPayment.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="payment-method">
                          Medio de Pago
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="paymentMethod"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            defaultValue={formData.formOfPayment}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="AL CONTADO">AL CONTADO</option>
                            <option value="TARJETA">TARJETA</option>
                            <option value="CHEQUE">CHEQUE</option>
                          </select>
                          {errors.paymentMethod && <span className="invalid">{errors.paymentMethod.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="12" className="border-bottom mt-2">
                      <h6>Comisiones de servicio</h6>
                    </Col>
                    <Col md="4">
                      <label className="form-label mt-1">Servicio Discresional</label>
                      <div className="form-group">
                        <div className="form-control-wrap flex row ml-0 mt-1">
                          <div>
                            Si
                            <input
                              ref={register({ required: "Este campo es obligatorio *" })}
                              type="radio"
                              value="Si"
                              name="discretionaryCommission"
                              defaultValue={formData.discretionaryCommission}
                              className="ml-1"
                            />
                          </div>
                          <div className="ml-3">
                            No
                            <input
                              ref={register({ required: "Este campo es obligatorio *" })}
                              type="radio"
                              value="No"
                              name="discretionaryCommission"
                              defaultValue={formData.discretionaryCommission}
                              className="ml-1 "
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label htmlFor="annual-payment" className="form-label mt-1">
                          Porcentaje de comisión
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            name="comissionPercentage"
                            placeholder="Ejemplo: 1, 1.0"
                            className="form-control"
                            // name="annualPayment"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            // defaultValue={formData.annualPayment}
                          />
                          {/* {errors.annualPayment && <span className="invalid">{errors.annualPayment.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <label className="form-label mt-1">Trailer Free</label>
                      <div className="form-group">
                        <div className="form-control-wrap flex row ml-0 mt-1">
                          <div>
                            Si
                            <input
                              ref={register({ required: "Este campo es obligatorio *" })}
                              type="radio"
                              value="Si"
                              name="trailerFreeComission"
                              defaultValue={formData.trailerFreeComission}
                              className="ml-1"
                            />
                          </div>
                          <div className="ml-3">
                            No
                            <input
                              ref={register({ required: "Este campo es obligatorio *" })}
                              type="radio"
                              value="No"
                              name="trailerFreeComission"
                              defaultValue={formData.trailerFreeComission}
                              className="ml-1"
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label htmlFor="annual-payment" className="form-label mt-1">
                          Porcentaje de comisión
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            placeholder="Ejemplo: 1, 1.0"
                            className="form-control"
                            // name="annualPayment"
                            ref={register({ required: "Este campo es obligatorio *" })}
                            // defaultValue={formData.annualPayment}
                          />
                          {/* {errors.annualPayment && <span className="invalid">{errors.annualPayment.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="text-right pt-4">
                        <Button color="primary" type="submit">
                          <span>Agregar Operación</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Modal Details */}
        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-tnx-details mt-sm-3">
              <div className="nk-modal-head mb-3">
                <h5 className="title">Checklist 1 del Cliente</h5>
                <h3 className="sub-text">Documentación Necesaria</h3>
                <Link to="/customer-library" className=" text-dark-50 w-100 bg-transparent">
                  <span>
                    <em className="icon ni ni-users-fill"></em>
                  </span>
                  <span className="nk-menu-text pl-1">Subir desde Lib. de Clientes</span>
                </Link>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">N. de Operacion</span>
                  <span className="caption-text">{formData.id}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Cliente</span>
                  <span className="caption-text">{formData.customer}</span>
                </Col>

                <form>
                  <div className="container-fluid">
                    <Row className="g-3">
                      <Col lg="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 1
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              ref={register({ required: "Este campo es obligatorio *" })}
                              // defaultValue={formData.annualPayment}
                            />
                            {/* {errors.annualPayment && <span className="invalid">{errors.annualPayment.message}</span>} */}
                          </div>
                        </div>
                      </Col>
                      <Col lg="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 2
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              ref={register({ required: "Este campo es obligatorio *" })}
                              // defaultValue={formData.annualPayment}
                            />
                            {/* {errors.annualPayment && <span className="invalid">{errors.annualPayment.message}</span>} */}
                          </div>
                        </div>
                      </Col>
                      <Col lg="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 3
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              ref={register({ required: "Este campo es obligatorio *" })}
                              // defaultValue={formData.annualPayment}
                            />
                            {/* {errors.annualPayment && <span className="invalid">{errors.annualPayment.message}</span>} */}
                          </div>
                        </div>
                        <Col size="12">
                          <Button color="primary" type="submit">
                            <span>Subir Archivos</span>
                          </Button>
                        </Col>
                      </Col>
                    </Row>
                  </div>
                </form>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        {/* Modal Details */}

        {/* Modal View Files */}
        <Modal isOpen={view.viewChecklist} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-tnx-details mt-sm-3">
              <div className="nk-modal-head mb-3">
                <h5 className="title">Validar Documentos Checklist 1 del Cliente</h5>
                <h3 className="sub-text">Documentación Necesaria</h3>
                <Link to="/customer-library" className=" text-dark-50 w-100 bg-transparent">
                  <span>
                    <em className="icon ni ni-users-fill"></em>
                  </span>
                  <span className="nk-menu-text pl-1">Subir desde Lib. de Clientes</span>
                </Link>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">N. de Operacion</span>
                  <span className="caption-text">{formData.id}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Cliente</span>
                  <span className="caption-text">{formData.customer}</span>
                </Col>

                <form>
                  <div className="container-fluid">
                    <Row className="g-3">
                      <Col md="8">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 1
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              ref={register({ required: "Este campo es obligatorio *" })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 1
                          </label>
                          <div className="form-control-wrap">
                            <Link to="/customer-library/document-1" className=" text-dark-50 w-100 bg-transparent">
                              <span>
                                <em className="icon ni ni-eye "></em>
                              </span>
                              <span className="nk-menu-text pl-1 pt-1">Visualizar documento</span>
                            </Link>
                          </div>
                        </div>
                      </Col>

                      <Col md="8">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 2
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              ref={register({ required: "Este campo es obligatorio *" })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 2
                          </label>
                          <div className="form-control-wrap">
                            <Link to="/customer-library/document-3" className=" text-dark-50 w-100 bg-transparent">
                              <span>
                                <em className="icon ni ni-eye "></em>
                              </span>
                              <span className="nk-menu-text pl-1 pt-1">Visualizar documento</span>
                            </Link>
                          </div>
                        </div>
                      </Col>

                      <Col md="8">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 3
                          </label>
                          <div className="form-control-wrap">
                            <input
                              type="file"
                              className="form-control"
                              name=""
                              ref={register({ required: "Este campo es obligatorio *" })}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="form-group">
                          <label className="form-label" htmlFor="annual-payment">
                            Documento 3
                          </label>
                          <div className="form-control-wrap">
                            <Link to="/customer-library/document-3" className=" text-dark-50 w-100 bg-transparent">
                              <span>
                                <em className="icon ni ni-eye "></em>
                              </span>
                              <span className="nk-menu-text pl-1 pt-1">Visualizar documento</span>
                            </Link>
                          </div>
                        </div>
                      </Col>

                      <Col size="12">
                        <Button color="primary" type="submit">
                          <span>Validar Archivos</span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </form>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        {/* Modal View files */}
      </Content>
    </React.Fragment>
  );
};

export default OperationDefault;
