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
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import ValidDealsServices from "../../services/ValidDealsServices";
import DealActionsServices from "../../services/DealActionsServices";
import CurrenciesServices from "../../services/CurrenciesServices";
import AfterSalesServices from "../../services/AfterSalesServices";

const DocumentsList = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editData, setEditData] = useState();

  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [estimatedDate, setEstimatedDate] = useState(new Date());
  const [realDate, setRealDate] = useState(new Date());

  const [actions, setActions] = useState([]);
  const [actionsOptions, setActionsOptions] = useState(actions);

  const [currencies, setCurrencies] = useState([]);
  const [currenciesOptions, setCurrenciesOptions] = useState(currencies);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [sm, updateSm] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  // Pruebas datePicker
  const [startDate, setStartDate] = useState(new Date());

  // setting spanish date picker format
  registerLocale("es", es);

  // filter deals by input search
  // const [usuarios, setUsuarios] = useState([]);
  const [tableDeals, setTableDeals] = useState([]);
  const [search, setSearch] = useState("");

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
        // description: action?.description,
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
        label: currency?.name,
        value: currency?.id,
        // description: action?.description,
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
    dateOfEntry: "",
    estimateDate: "",
    realDate: "",
    ammount: "",
    currencyId: "",
    file: "",
    dealId: "",
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
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { operationTypeId, dateOfEntry, estimateDate, realDate, ammount, currencyId, file, dealId } = submitData;
    let submittedData = {
      operationTypeId: actionsOptions?.value,
      dateOfEntry: dateOfEntry,
      estimateDate: estimateDate,
      realDate: realDate,
      ammount,
      currencyId: currenciesOptions?.value,
      file: file[0],
      dealId,
    };

    try {
      await ValidDealsServices.addValidDeal(submittedData);
      setData([submittedData, ...data]);
      resetForm();
      getValidDeals();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { operationTypeId, dateOfEntry, estimateDate, realDate, ammount, currencyId, file, dealId } = submitData;
    let submittedData = {
      operationTypeId: operationTypeId,
      // operationTypeId: actionsOptions?.value,
      dateOfEntry: dateOfEntry,
      estimateDate: estimateDate,
      realDate: realDate,
      ammount: ammount,
      currencyId: currencyId,
      // currencyId: currenciesOptions?.value,
      file: file[0],
      dealId: dealId, //->customerId
    };

    try {
      const formData = new FormData();
      let object = {};

      formData.append("operationTypeId", actionsOptions?.value);
      formData.append("dateOfEntry", dateOfEntry);
      formData.append("estimateDate", estimateDate);
      formData.append("realDate", realDate);
      formData.append("ammount", editData?.amountOfTheInvestment);
      formData.append("currencyId", currenciesOptions?.value);
      formData.append("file", file[0]);
      formData.append("dealId", editData?.id);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));
      console.log(json);

      await AfterSalesServices.addPostDealOperations(formData);

      setModal({ edit: false, add: false });
      resetForm();
      // getCustomerDocument(Number(customerId));
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

  // function to handle description doc length
  // const handleDescriptionLength = (description) => {
  //   if (description.length > 35) {
  //     return description.substring(0, 35) + "...";
  //   }
  //   return description;
  // };

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
        item?.ammount.toString().toLowerCase().includes(term.toLowerCase())
        // item.createdByAdvisor.name.toString().toLowerCase().includes(term.toLowerCase())
      ) {
        return item;
      }
    });
    setData(res);
  };

  //! Formato de fecha mes dia anio para el back
  //! Agregar CAMPO NUMERO DE DOCUMENTO

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
                    <li className="nk-block-tools-opt">
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search" />
                        </div>
                        <input
                          type="text"
                          value={search}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Buscar por: Cliente, Asesor/a, Plan o Empresa"
                          style={{ minWidth: "25rem" }}
                        />
                      </div>
                    </li>
                    {/* <li className="nk-block-tools-opt">
                      <Button color="primary" onClick={() => setModal({ add: true })}>
                        <Icon name="plus" className="mr-1"></Icon>
                        Agregar Documento
                      </Button>
                    </li> */}
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
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Asesor/a</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Plan/Producto</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Empresa</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Monto</span>
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
                        <span>{item?.customer?.names}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.createdByAdvisor?.name == null ? `No encontrado` : item?.customer?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.product?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.company?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.createdAt)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.amountOfTheInvestment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.currency?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 d-flex justify-content-center">
                          <li className="nk-tb-action" onClick={() => onEditClick(item.id, item)}>
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

            <PreviewAltCard>
              {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
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

        {/* Modal Edit */}

        <Modal
          isOpen={modal.edit}
          toggle={() => setModal({ edit: false })}
          className="modal-dialog-centered"
          size="lg"
          style={{ maxWidth: "1024px" }}
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

            <div className="p-2">
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
                      <DataTableRow className="text-center bg-light">
                        <span className="sub-text">Moneda</span>
                      </DataTableRow>
                    </DataTableHead>
                    <DataTableItem>
                      <DataTableRow className="text-center">
                        <span>{editData?.customer?.name ? "Sin Nombre" : editData?.customer?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.createdByAdvisor?.name}</span>
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
                        <span>{editData?.amountOfTheInvestment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{editData?.currency?.name}</span>
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
                      <input
                        className="form-control"
                        type="date"
                        name="dateOfEntry"
                        defaultValue={formData.dateOfEntry}
                        ref={register()}
                      />
                      {/* <DatePicker
                        selected={dateOfEntry}
                        className="form-control"
                        onChange={(date) => setDateOfEntry(date)}
                        dateFormat="MM/dd/yyyy"
                        locale="es"
                      /> */}
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de Estimada</label>
                      <input
                        type="date"
                        className="form-control"
                        name="estimateDate"
                        defaultValue={formData.estimateDate}
                        ref={register()}
                      />
                      {/* <DatePicker
                        selected={estimatedDate}
                        className="form-control"
                        onChange={(date) => setEstimatedDate(date)}
                        dateFormat="MM/dd/yyyy"
                        locale="es"
                      /> */}
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha Real</label>
                      <input
                        className="form-control"
                        type="date"
                        name="realDate"
                        defaultValue={formData.realDate}
                        ref={register()}
                      />
                      {/* <DatePicker
                        selected={realDate}
                        className="form-control"
                        onChange={(date) => setRealDate(date)}
                        dateFormat="MM/dd/yyyy"
                        locale="es"
                      /> */}
                    </FormGroup>
                  </Col>
                  {/* <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha Prueba</label>
                      <DatePicker
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                        locale="es"
                      />

                      <DatePicker
                        selected={realDate}
                        className="form-control"
                        onChange={(date) => setRealDate(date)}
                        dateFormat="MM/dd/yyyy"
                        locale="es"
                      />
                    </FormGroup>
                  </Col> */}

                  {/* <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de ingreso</label>
                      <input
                        className="form-control"
                        type="date"
                        name="issueDate"
                        defaultValue={formData.issueDate}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha estimada</label>
                      <input
                        className="form-control"
                        type="date"
                        name="issueDate"
                        defaultValue={formData.issueDate}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha real</label>
                      <input
                        className="form-control"
                        type="date"
                        name="realDate"
                        defaultValue={formData.realDate}
                        ref={register()}
                      />
                    </FormGroup>
                  </Col> */}

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Monto</label>{" "}
                      <input
                        className="form-control"
                        type="text"
                        name="ammount"
                        defaultValue={formData.ammount}
                        placeholder="Ingrese monto"
                        ref={register()}
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
                    <FormGroup>
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

export default DocumentsList;
