import React, { useEffect, useState } from "react";
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
  RSelect,
} from "../../components/Component";

import { getDateStructured } from "../../utils/Utils";
import { useForm } from "react-hook-form";

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";

const OperationDefault = () => {
  const [data, setData] = useState(orderData);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    operationNumber: "0000001",
    planNumber: "0000001",
    currencyType: "",
    operationType: "",
    customer: "",
    adviser: "",
    company: "",
    productType: "",
    product: "",
    investmentAmount: "",
    period: "",
    commission: "",
  });

  const [view, setView] = useState({
    add: false,
    details: false,
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
      operationNumber: "",
      currencyType: "",
      planNumber: "",
      operationType: "",
      customer: "",
      adviser: "",
      company: "",
      productType: "",
      product: "",
      investmentAmount: "",
      period: "",
      commission: "",
    });
  };

  const onFormSubmit = (form) => {
    const {
      operationNumber,
      currencyType,
      planNumber,
      customer,
      adviser,
      company,
      productType,
      product,
      period,
      investmentAmount,
      comisión,
    } = form;

    let submittedData = {
      id: data.length + 1,
      operationNumber: "000001",
      currencyType: currencyType,
      planNumber: "0000001",
      customer: customer,
      adviser: adviser,
      company: company,
      productType: productType,
      product: product,
      investmentAmount: investmentAmount,
      period: period,
      comisión: comisión,
    };

    console.log(data);

    setData([submittedData, ...data]);
    setView({ add: false, details: false });
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
    setView({ add: false, details: false });
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

  const { errors, register, handleSubmit } = useForm();

  // Get select input data
  const [option, setOption] = useState();

  function handleChange(event) {
    setOption(event.target.value);
  }

  // Format USD currency type
  // const formatterToUSDCurrency = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  //   minimumFractionDigits: 2,
  // });

  // // Format EUR currency type
  // const formatterToEUCurrency = new Intl.NumberFormat("de-DE", {
  //   style: "currency",
  //   currency: "EUR",
  //   minimumFractionDigits: 2,
  // });

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
          <div className="nk-tb-list is-separate is-medium mb-3">
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
              {/* <DataTableRow>
                <span className="sub-text text-center">Tipo</span>
              </DataTableRow> */}
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
                <span className="sub-text text-center">Plazo</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text text-center">Comisión</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text text-center">Acción</span>
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
                    {/* <DataTableRow className="text-center">
                      <span>{item.currencyType}</span>
                    </DataTableRow> */}
                    <DataTableRow className="text-center">
                      <span>{item.customer}</span>
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
                      <span>{item.investmentAmount}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.period}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.commission}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{item.currencyType}</span>
                    </DataTableRow>

                    <DataTableRow className="text-center">
                      <span className="tb-sub">{item.purchased}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span
                        className={`dot bg-${item.status === "Delivered" ? "success" : "warning"} d-mb-none`}
                      ></span>
                      <span
                        className={`badge badge-sm badge-dot has-bg badge-${
                          item.status === "Abierta" ? "success" : "warning"
                        } d-none d-mb-inline-flex`}
                      >
                        {item.status}
                      </span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span className="tb-lead">$ {item.total}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools text-center">
                      <ul className="nk-tb-actions gx-1">
                        {item.status !== "Delivered" && (
                          <li className="nk-tb-action-hidden" onClick={() => markAsDelivered(item.id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delivery" + item.id}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Editar"
                            />
                          </li>
                        )}
                        <li
                          className="nk-tb-action-hidden"
                          onClick={() => {
                            loadDetail(item.id);
                            toggle("details");
                          }}
                        >
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"view" + item.id}
                            icon="eye"
                            direction="top"
                            text="View Details"
                          />
                        </li>
                        <li>
                          <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      loadDetail(item.id);
                                      toggle("details");
                                    }}
                                  >
                                    <Icon name="eye"></Icon>
                                    <span>Order Details</span>
                                  </DropdownItem>
                                </li>
                                {item.status !== "Delivered" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        markAsDelivered(item.id);
                                      }}
                                    >
                                      <Icon name="truck"></Icon>
                                      <span>Mark as Delivered</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      deleteOrder(item.id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove Order</span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
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
                <span className="text-silent">No orders found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

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
              <h5 className="title">Agregar Operacion</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="">
                          Rut del Cliente
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            ref={register({ required: "This is required" })}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* <React.Fragment>
                      <SearchBarRut />
                    </React.Fragment> */}

                    {/* Success */}
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="">
                          Número de Operación
                        </label>
                        <div className="form-control-wrap">
                          <input
                            placeholder="Listo"
                            type="number"
                            className="form-control"
                            name="operationNumber"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.operationNumber}
                            disabled
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Success */}

                    {/* Success */}
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="plan-number">
                          Número de Plan
                        </label>
                        <div className="form-control-wrap">
                          <input
                            placeholder="Listo"
                            type="number"
                            className="form-control"
                            name="planNumber"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.planNumber}
                            disabled
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Success */}

                    {/* Success */}

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="currency-type">
                          Tipo de Moneda
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="currencyType"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.currencyType}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="CLP - Pesos chilenos">CLP - Pesos chilenos</option>
                            <option value="USD - Dolar Estados Unidos">USD - Dolar Estados Unidos</option>
                            <option value="EUR - Euros">EUR - Euros</option>
                          </select>
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Success */}

                    <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="investment-amount">
                          Monto de Inversion
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="investmentAmount"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.investmentAmount}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="adviser">
                          Plan del Cliente
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            placeholder="disabled"
                            className="disabled"
                            name="adviser"
                            options={[
                              { value: "Jonh Doe", label: "On Hold" },
                              { value: "Julio Perez", label: "Delivered" },
                            ]}
                            defaultValue={formData.adviser}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Success */}
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="company">
                          Empresa
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="company"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.company}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Empresa-1">Empresa-1</option>
                            <option value="Empresa-2">Empresa-2</option>
                            <option value="Empresa-3">Empresa-3</option>
                          </select>
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Success */}

                    {/* Success */}
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-type">
                          Tipo de Producto
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="productType"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.productType}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Tipo Producto 1">Tipo Producto 1</option>
                            <option value="Tipo Producto 2">Tipo Producto 2</option>
                            <option value="Tipo Producto 3">Tipo Producto 3</option>
                          </select>
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Success */}

                    {/* Success */}
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product">
                          Producto
                        </label>
                        <div className="form-control-wrap">
                          <select
                            className="form-control"
                            name="product"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.product}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Producto 1">Producto 1</option>
                            <option value="Producto 2">Producto 2</option>
                            <option value="Producto 3">Producto 3</option>
                          </select>
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Success */}

                    {/* Correct */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="period">
                          Periodo de Duración
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            name="period"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.period}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Correct */}

                    {/* Hasta aca los registros */}
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                          Pago Anual
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Forma de Pago
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Jonh Doe", label: "Mensual" },
                              { value: "Julio Perez", label: "Anual" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Medio de Pago
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Jonh Doe", label: "Tarjeta" },
                              { value: "Julio Perez", label: "Cuenta corriente" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                          Abono
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    {/* Comision inputs */}

                    <Col md="5">
                      <h6 className="my-2">Comisiones de servicio</h6>
                      Comisiones Servicio Discresional
                      {["radio"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 flex flex-col">
                          <label className="form-label" htmlFor="total">
                            Si
                          </label>
                          <input inline label="2" name="group1" type={type} id={`inline-${type}-2`} className="mr-5" />

                          <label className="form-label" htmlFor="total">
                            No
                          </label>
                          <input inline label="2" name="group1" type={type} id={`inline-${type}-2`} className="mr-5" />
                        </div>
                      ))}
                    </Col>

                    <Col md="7">
                      <div className="form-group">
                        <label className="form-label my-3" htmlFor="total">
                          Porcentaje de Comisión
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col md="5">
                      TRAILER Free
                      {["radio"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 flex flex-col">
                          <label className="form-label" htmlFor="total">
                            Si
                          </label>
                          <input inline label="2" name="group1" type={type} id={`inline-${type}-2`} className="mr-5" />

                          <label className="form-label" htmlFor="total">
                            No
                          </label>
                          <input inline label="2" name="group1" type={type} id={`inline-${type}-2`} className="mr-5" />
                        </div>
                      ))}
                    </Col>

                    <Col md="7">
                      <div className="form-group">
                        <label className="form-label my-2" htmlFor="total">
                          Porcentaje de Comisión
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>

                    {/* Comision inputs */}
                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Agregar Operacion</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
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
                <h5 className="title">Detalle de Operacion</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Operacion</span>
                  <span className="caption-text">{formData.orderId}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Estatus</span>
                  <span className={`dot bg-${formData.status === "Abierta" ? "success" : "warning"} d-mb-none`}></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-Delivered ? "success" : "warning"
                    } d-none d-mb-inline-flex`}
                  >
                    {formData.status}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Cliente</span>
                  <span className="caption-text">{formData.customer}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Tipo de Negocio</span>
                  <span className="caption-text">{formData.purchased}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Total Price</span>
                  <span className="caption-text">{formData.total}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default OperationDefault;
