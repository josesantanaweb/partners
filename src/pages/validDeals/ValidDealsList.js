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
  RSelect,
} from "../../components/Component";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import ValidDealsServices from "../../services/ValidDealsServices";
import DealActionsServices from "../../services/DealActionsServices";
import CurrenciesServices from "../../services/CurrenciesServices";
import AfterSalesServices from "../../services/AfterSalesServices";
import NumberFormat from "react-number-format";

const ValidDealsList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState();

  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [estimatedDate, setEstimatedDate] = useState(new Date());
  const [realDate, setRealDate] = useState(new Date());

  const [actions, setActions] = useState([]);
  const [actionsOptions, setActionsOptions] = useState(actions);

  const [currencies, setCurrencies] = useState([]);
  const [currenciesOptions, setCurrenciesOptions] = useState(currencies);

  const [ammountInv, setAmmountIn] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  const [sm, updateSm] = useState(false);
  const { register, handleSubmit } = useForm();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  // setting spanish date picker format
  registerLocale("es", es);

  // filter deals by input search
  const [tableDeals, setTableDeals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (editData?.dateOfEntry) {
      setDateOfEntry(new Date(editData?.dateOfEntry));
    }
    if (editData?.estimatedDate) {
      setEstimatedDate(new Date(editData?.estimatedDate));
    }
    if (editData?.realDate) {
      setRealDate(new Date(editData?.realDate));
    }
  }, []);

  // function to get Valid Deals
  const getValidDeals = async () => {
    try {
      const validDeals = await ValidDealsServices.getValidDeals();
      const validDealsData = await validDeals.data.map((data) => data);
      setData(validDealsData);
      setTableDeals(validDealsData);
    } catch (error) {}
  };

  useEffect(() => {
    getValidDeals();
  }, []);

  // function to get valid deals post actions
  const getDealsActions = async () => {
    try {
      const dealActions = await DealActionsServices.getDealAction();
      const dealActionData = await dealActions.data.map((action) => ({
        label: action?.name,
        value: action?.id,
      }));

      setActions(dealActionData);
    } catch (error) {}
  };

  useEffect(() => {
    getDealsActions();
  }, []);

  const onOptionsActionsChange = (optionValue) => {
    setActionsOptions(optionValue);
  };

  // function to get valid deals post actions
  const getCurrencies = async () => {
    try {
      const currencies = await CurrenciesServices.getCurrency();
      const currencyData = await currencies.data.map((currency) => ({
        label: currency?.isoCode,
        value: currency?.id,
      }));

      setCurrencies(currencyData);
    } catch (error) {}
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  const onOptionsCurrenciesChange = (optionValue) => {
    setCurrenciesOptions(optionValue);
  };

  // Valid Deals
  const [formData, setFormData] = useState({
    operationTypeId: "",
    dateOfEntry: dateOfEntry,
    estimateDate: estimatedDate,
    realDate: realDate,
    ammount: "",
    currencyId: "",
    file: "",
    dealId: "",
    aprobatedBy: "",
    file2: "",
  });

  // function to reset the form
  const resetForm = () => {
    setFormData({
      operationTypeId: "",
      dateOfEntry: "",
      estimateDate: "",
      realDate: "",
      ammount: "",
      currencyId: "",
      file: "",
      dealId: "",
      aprobatedBy: "",
      file2: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  const handleChangeAmmount = (ev) => setAmmountIn(Number(ev.target.value));

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { operationTypeId, ammount, currencyId, file, dealId, aprobatedBy, file2 } = submitData;
    let submittedData = {
      operationTypeId: operationTypeId,
      dateOfEntry: dateOfEntry,
      estimateDate: estimatedDate,
      realDate: realDate,
      ammount: ammount,
      currencyId: currencyId,
      file: file[0].name,
      dealId: dealId,
      aprobatedBy: aprobatedBy,
      file2: file2[0].name,
    };

    try {
      const formData = new FormData();
      let object = {};

      formData.append("operationTypeId", actionsOptions?.value);
      formData.append("dateOfEntry", dateOfEntry);
      formData.append("estimateDate", estimatedDate);
      formData.append("realDate", realDate);
      formData.append("ammount", Number(ammountInv));
      formData.append("currencyId", currenciesOptions?.value);
      formData.append("file", file[0].name);
      formData.append("dealId", editData?.id);
      formData.append("aprobatedBy", aprobatedBy);
      formData.append("file2", file2[0].name);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));

      console.log(json);

      await AfterSalesServices.addPostDealOperations(formData);

      setModal({ edit: false, add: false });
      resetForm();
      window.location.reload();

      await ValidDealsServices.editValidDeal(editData.id, submittedData);
      resetForm();
      getValidDeals();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to parse date
  const parseDate = (date) => {
    const dateParse = new Date(date);
    const dateString = dateParse.toLocaleDateString();
    return dateString;
  };

  // function to handle search
  const handleChange = (e) => {
    setSearch(e.target.value);
    filtredData(e.target.value);
  };

  // filter by input search field
  const filtredData = (term) => {
    var res = tableDeals.filter((item) => {
      if (
        item?.id.toString().toLowerCase().includes(term.toLowerCase()) ||
        item?.customer?.names.toString().toLowerCase().includes(term.toLowerCase()) ||
        item?.product?.name.toString().toLowerCase().includes(term.toLowerCase()) ||
        item?.company?.name.toString().toLowerCase().includes(term.toLowerCase())
      ) {
        return item;
      }
    });
    setData(res);
  };

  // function to get documents
  const getPaginationValidDeals = async (limit, page) => {
    const deals = await ValidDealsServices.getPaginationValidDeals(limit, page);
    const dealsData = await deals.data.map((data) => data);
    setData(dealsData);
  };

  const firstPageUrl = () => getPaginationValidDeals(itemPerPage, 1);
  const nextPageUrl = () => getPaginationValidDeals(itemPerPage, 2);
  const lastPageUrl = () => getPaginationValidDeals(itemPerPage, 3);

  // Formting decimal numbers
  function formatNumber(number, decimals, dec_point, thousands_point) {
    if (number == null || !isFinite(number)) {
      throw new TypeError("Número no válido");
    }

    if (!decimals) {
      var len = number.toString().split(".").length;
      decimals = len > 1 ? len : 0;
    }

    if (!dec_point) {
      dec_point = ".";
    }

    if (!thousands_point) {
      thousands_point = ",";
    }

    number = parseFloat(number).toFixed(decimals);

    number = number.replace(".", dec_point);

    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);

    return number;
  }

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Resumen de Operaciones
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {data.length} operaciones</p>
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
                    <li className="nk-block-tools-opt d-flex align-items-center">
                      <span className="sub-text mr-3">Filtrar búsqueda:</span>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search" />
                        </div>
                        <input
                          type="text"
                          value={search}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Cliente, Plan/Producto o Socio Estratégico"
                          style={{ minWidth: "20rem" }}
                        />
                      </div>
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
                  <span className="sub-text">Operación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text text-primary">N. de Cuenta</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Rut</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Asesor/a</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Plan/Producto</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Socio Estratégico</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Años del Plan</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Inversión</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha</span>
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
                        <span>{item?.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>A001XXX</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.customer?.names || item?.customer?.companyName}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.customer?.rut}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {item?.createdByAdvisor?.name || item?.createdByUser?.name + item?.createdByUser?.lastName}
                        </span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.product?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.company?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.yearsOfThePlan}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {formatNumber(item?.amountOfTheInvestment, 0, ",", ".")} {item?.currency?.isoCode}
                        </span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.createdAt)}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 d-flex justify-content-center">
                          <li className="nk-tb-action text-primary" onClick={() => onEditClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="plus"
                              direction="top"
                              text="Crear acción"
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
              <React.Fragment>
                {/* <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                /> */}
                <ul className="pagination border p-1">
                  <li className="active page-item border">
                    <a
                      className="page-link border border-white btn btn-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => firstPageUrl(itemPerPage, 1)}
                    >
                      1
                    </a>
                  </li>
                  <li className="active page-item border">
                    <a
                      className="page-link border border-white btn btn-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => nextPageUrl(itemPerPage, 2)}
                    >
                      2
                    </a>
                  </li>
                  <li className="active page-item border">
                    <a
                      className="page-link border border-white btn btn-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => lastPageUrl(itemPerPage, 3)}
                    >
                      3
                    </a>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              <div className="text-center">
                <span className="text-silent">Sin Registros</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        {/* Modal Edit */}
        <Modal
          isOpen={modal.edit}
          toggle={() => setModal({ edit: true })}
          className="modal-dialog-centered"
          // size="lg"
          style={{ maxWidth: "992px" }}
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>

            <div className="p-2 table-records modal-scroll">
              <h5 className="title pb-4">Creación Movimientos Post Venta</h5>
              <Col md="12" className="mb-4">
                <FormGroup className="border-bottom pb-2">
                  <h6>Datos de Operación</h6>
                </FormGroup>
              </Col>
              <Block>
                <div className="container-fluid overflow-auto scrollbar-fluid">
                  <div className="nk-tb-list is-separate is-medium">
                    <DataTableHead className="nk-tb-item">
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">N. de Cuenta</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Cliente</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Asesor/a</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Plan/Producto</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Empresa</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Fecha</span>
                      </DataTableRow>
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Monto</span>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableItem>
                      <DataTableRow className="text-center">
                        <span>0</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {editData?.createdByAdvisor?.name ||
                            editData?.createdByUser?.name + editData?.createdByUser?.lastName}
                        </span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {editData?.createdByAdvisor?.name ||
                            editData?.createdByUser?.name + editData?.createdByUser?.lastName}
                        </span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.product?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.company?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(editData?.createdAt)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {editData?.amountOfTheInvestment} {editData?.currency?.isoCode}
                        </span>
                      </DataTableRow>
                    </DataTableItem>
                  </div>
                </div>
              </Block>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Tipo de Operación</label>
                      <RSelect
                        value={actionsOptions}
                        options={actions}
                        onChange={onOptionsActionsChange}
                        defautlValue={formData.actionsTypeId}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de Ingreso</label>
                      <DatePicker
                        selected={dateOfEntry}
                        className="form-control"
                        onChange={(date) => setDateOfEntry(date)}
                        // dateFormat="MM/dd/yyyy"
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha Estimada</label>
                      <DatePicker
                        selected={estimatedDate}
                        className="form-control"
                        onChange={(date) => setEstimatedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha Real</label>
                      <DatePicker
                        selected={realDate}
                        className="form-control"
                        onChange={(date) => setRealDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                      />
                    </FormGroup>
                  </Col>

                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Monto</label>{" "}
                      <NumberFormat
                        name="ammount"
                        type="text"
                        defaultValue={formData.ammount}
                        placeholder="Ingrese monto"
                        className="form-control"
                        allowNegative={false}
                        decimalSeparator={","}
                        decimalPrecision={2}
                        thousandSeparator={"."}
                      />
                      <small className="text-primary">Inversión actual: {editData?.amountOfTheInvestment}</small>{" "}
                    </FormGroup>
                  </Col> */}
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Monto</label>
                      <NumberFormat
                        name="ammount"
                        placeholder="Ingrese monto"
                        className="form-control"
                        onChange={handleChangeAmmount}
                        allowNegative={false}
                        // decimalSeparator={","}
                        // decimalPrecision={2}
                        // thousandSeparator={"."}
                      />
                      <small className="text-primary">Inversión actual: {editData?.amountOfTheInvestment}</small>{" "}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Moneda</label>
                      <RSelect
                        value={currenciesOptions}
                        options={currencies}
                        onChange={onOptionsCurrenciesChange}
                        defautlValue={formData.actionsTypeId}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup className="border-bottom pb-2">
                      <h6>Validación de Operación</h6>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Aprobado por:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="aprobatedBy"
                        defaultValue={formData.aprobatedBy}
                        placeholder="Ingresa Nombre de asesor"
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Subir archivo de respaldo (Administrador)</label>
                      <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                        <label className="file-input__label" htmlFor="file-input">
                          <input
                            type="file"
                            className="bg-light border-0"
                            name="file"
                            defaultValue={formData.file}
                            ref={register()}
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                          />
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Subir correo de respaldo (Cliente)</label>
                      <div className="file-input border rounded d-flex pt-3 align-items-center bg-light">
                        <label className="file-input__label" htmlFor="file-input">
                          <input
                            type="file"
                            className="bg-light border-0"
                            name="file2"
                            defaultValue={formData.file2}
                            ref={register()}
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                          />
                        </label>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Guardar
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancelar
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default ValidDealsList;
