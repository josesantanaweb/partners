import React, { useState, useEffect } from "react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PreviewAltCard,
  TooltipComponent,
  RSelect,
} from "../../components/Component";

import { get, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { FormGroup, Modal, ModalBody, Form, Col } from "reactstrap";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import AfterSalesServices from "../../services/AfterSalesServices";
import DealActionsServices from "../../services/DealActionsServices";
import CurrenciesServices from "../../services/CurrenciesServices";
import NumberFormat from "react-number-format";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";

const DocumentsList = () => {
  // GET[PAGINATION]
  const [totalItems, setTotalItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { errors, register, handleSubmit } = useForm();
  const [postDeals, setPostDeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [tablePostDeals, setTablePostDeals] = useState([]);
  const [search, setSearch] = useState("");
  const [sm, updateSm] = useState(false);
  const [editData, setEditData] = useState();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [dateOfEntry, setDateOfEntry] = useState(new Date());
  const [estimatedDate, setEstimatedDate] = useState(new Date());
  const [realDate, setRealDate] = useState(new Date());
  const [operations, setOperations] = useState([]);
  const [operationsOptions, setOperationsOptions] = useState(operations);
  const [currencies, setCurrencies] = useState([]);
  const [currenciesOptions, setCurrenciesOptions] = useState(currencies);

  // setting spanish date picker format
  registerLocale("es", es);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateOfEntry: dateOfEntry,
    estimateDate: estimatedDate,
    realDate: realDate,
    actionsOptions: "",
    ammount: "",
  });

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      dateOfEntry: "",
      estimateDate: "",
      realDate: "",
      actionsOptions: "",
      ammount: "",
    });
  };

  // const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  // const [itemPerPage] = useState(5);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = postDeals.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to get post deals
  const getPostDeals = async () => {
    try {
      const postDeals = await AfterSalesServices.getPostDealOperations();
      const postDealData = await postDeals.data.map((data) => data);
      setPostDeals(postDealData);
      setTablePostDeals(postDealData);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getPostDeals();
  }, []);

  // function to handle input search
  const handleInputSearchChange = (ev) => {
    setSearch(ev.target.value);
    filterSearch(ev.target.value);
  };

  // function that loads the want to editted data
  const onEditClick = (id, data) => {
    setModal({ edit: true }, { add: false });
    setEditData(data);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  const deletePostDeal = (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-primary m-1",
          cancelButton: "btn btn-light m-1",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Estás seguro?",
          text: "Se eliminará el registor seleccionado!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          getPostDeals();
          if (result.isConfirmed) {
            AfterSalesServices.deletePostDeal(id);
            getPostDeals();
            swalWithBootstrapButtons.fire("Eliminado!", "El registro ha sido elimindo exitosamente!.", "success");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Acción cancelada", "El registro está seguro!", "error");
          }
        });
    } catch (error) {
      throw new Error("Error deleting record!");
    }
  };

  // function to filter post deal results (N. de Operación, Cliente y Operación Post Venta)
  const filterSearch = (input) => {
    const searchResult = tablePostDeals.filter((postDeal) => {
      if (
        postDeal?.id.toString().toLowerCase().includes(input.toLowerCase()) ||
        postDeal?.deal?.id.toString().toLowerCase().includes(input.toLowerCase()) ||
        postDeal?.action?.name.toString().toLowerCase().includes(input.toLowerCase()) ||
        postDeal?.ammount.toString().toLowerCase().includes(input.toLowerCase())
      )
        return postDeal;
    });
    setPostDeals(searchResult);
  };

  // function to parse date
  const parseDate = (date) => {
    const dateParse = new Date(date);
    const day = dateParse.getDate();
    const month = dateParse.getMonth() + 1;
    const year = dateParse.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
  const [ammountInv, setAmmountIn] = useState("");
  const handleChangeAmmount = (ev) => setAmmountIn(ev.target.value);

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
    if (editData?.actionsOptions) {
      setOperationsOptions(new Date(editData?.actionsOptions));
    }
    if (editData?.ammountInv) {
      setOperationsOptions(new Date(editData?.ammountInv));
    }
  }, []);

  const onEditSubmit = async (submitData) => {
    try {
      const formData = new FormData();
      let object = {};

      formData.append("ammount", ammountInv); //✅
      formData.append("operationTypeId", operationsOptions?.value); //✅
      formData.append("currencyId", currenciesOptions?.value); //✅
      formData.append("dateOfEntry", dateOfEntry); //✅
      formData.append("estimateDate", estimatedDate); //✅
      formData.append("realDate", realDate); //✅

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));

      await AfterSalesServices.editPostDeal(editData.id, formData);
      resetForm();
      getPostDeals();
      setModal({ edit: false }, { add: false });
      setErrorMessage("");
    } catch (error) {
      if (error.response.data.message === "This advisor already exists") {
        setErrorMessage("Asesor ya existe");
      }
    }
  };

  // Get Operation Type
  const getOperationType = async () => {
    try {
      const operations = await DealActionsServices.getDealAction();
      const operationsData = await operations.data.map((operation) => ({
        label: operation?.name,
        value: operation?.id,
      }));
      setOperations(operationsData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsOperationsChange = (optionValue) => {
    setOperationsOptions(optionValue);
  };

  operations.find((item) => item.id == operationsOptions.value);

  useEffect(() => {
    getOperationType();
    if (operationsOptions.value) {
      return operations.find((item) => item.value == operationsOptions.value);
    }
  }, [operationsOptions.value]);

  // Get Operation Type
  const getCyrrencyType = async () => {
    try {
      const currencies = await CurrenciesServices.getCurrency();
      const currenciesData = await currencies.data.map((operation) => ({
        label: operation?.isoCode,
        value: operation?.id,
      }));
      setCurrencies(currenciesData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsCurrenciesChange = (optionValue) => {
    setCurrenciesOptions(optionValue);
  };

  operations.find((item) => item.id == currenciesOptions.value);

  useEffect(() => {
    getCyrrencyType();
    if (currenciesOptions.value) {
      return currencies.find((item) => item.value == currenciesOptions.value);
    }
  }, [currenciesOptions.value]);

  const getTotalItems = async () => {
    try {
      const items = await AfterSalesServices.getPostDealOperations();
      const totalItems = await items?.meta?.totalItems;
      setTotalItems(totalItems);
    } catch (error) {
      throw new Error("Not found total Items");
    }
  };
  const getItemsPerPage = async () => {
    try {
      const items = await AfterSalesServices.getPostDealOperations();
      const totalItems = await items?.meta?.limit;
      setItemsPerPage(totalItems);
    } catch (error) {
      throw new Error("Not found total Items");
    }
  };

  useEffect(() => {
    getTotalItems();
    getItemsPerPage();
  });

  return (
    <React.Fragment>
      <Head title="Acciones Post Venta"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Operaciones Post Venta
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {totalItems} acciones</p>
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
                          onChange={handleInputSearchChange}
                          className="form-control"
                          placeholder="Operación, Operación Post Venta o Inversión"
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
                  <span className="sub-text">N. de Operación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Operación Post Venta</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Plan</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Asesor/a</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Inversión Post Venta</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha ingresada</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha estimada</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Fecha final</span>
                </DataTableRow>

                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>
              {currentItems.length > 0
                ? currentItems.map((item, index) => (
                    <DataTableItem key={index}>
                      <DataTableRow className="text-center">
                        <span>{item?.deal?.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.action?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.deal?.plan?.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.aprobatedBy}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {item?.ammount} {item.currency?.isoCode}
                        </span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.dateOfEntry)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.estimateDate)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(item?.realDate)}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 d-flex justify-content-center">
                          <li className="nk-tb-action" onClick={() => onEditClick(item.id, item)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Editar"
                            />
                          </li>
                          <li className="nk-tb-action" onClick={() => deletePostDeal(item.id)}>
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
          </div>
          <PreviewAltCard>
            {currentItems.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemsPerPage}
                totalItems={totalItems}
                paginate={paginate}
                currentPage={currentPage}
                // totalItems={postDeals.length}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No se encontraron registros</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: true })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Actualizar Post Venta</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Tipo de Operación</label>

                      <RSelect
                        value={operationsOptions}
                        options={operations}
                        onChange={onOptionsOperationsChange}
                        defautlValue={formData?.operationTypeId}
                      />

                      {errors.operationTypeId && <span className="invalid">{errors.operationTypeId.message}</span>}
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Fecha de Ingreso</label>
                      <DatePicker
                        selected={dateOfEntry}
                        className="form-control"
                        onChange={(date) => setDateOfEntry(date)}
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

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Monto</label>
                      <NumberFormat
                        className="form-control"
                        name="ammount"
                        onChange={handleChangeAmmount}
                        placeholder="Ingrese monto"
                        allowNegative={false}
                        // decimalSeparator={","}
                        // decimalPrecision={2}
                        // thousandSeparator={"."}
                      />
                      <small className="text-primary">Inversión actual: {editData?.ammount}</small>
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

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Actualizar Post Venta
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
