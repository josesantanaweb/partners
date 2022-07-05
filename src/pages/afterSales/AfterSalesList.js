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

import { useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import { FormGroup, Modal, ModalBody, Form, Col } from "reactstrap";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import AfterSalesServices from "../../services/AfterSalesServices";
import DealActionsServices from "../../services/DealActionsServices";
import CurrenciesServices from "../../services/CurrenciesServices";
import NumberFormat from "react-number-format";
import swal from "sweetalert";
// import swal from '@sweetalert/with-react'

const DocumentsList = () => {
  const { errors, register, handleSubmit } = useForm();
  const [postDeals, setPostDeals] = useState([]);
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

  const [actions, setActions] = useState([]);
  const [actionsOptions, setActionsOptions] = useState(actions);

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
    ammount: Number(""),
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
      ammount: Number(""),
    });
  };

  const [currentPage, setCurrentPage] = useState(1); //-> 1 o 2 o 3
  const [itemPerPage] = useState(5); //->limit

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

  // Function to change to delete property for an item
  const deletePostDeal = async (id) => {
    try {
      await swal({
        title: "¿Estás seguro?",
        text: "Se eliminará la acción Post Venta seleccionada!",
        icon: "warning",
        dangerMode: true,
        buttons: {
          confirm: { text: "Aceptar", className: "bg-primary" },
          cancel: "Cancelar",
        },
      }).then((resDelete) => {
        if (resDelete) {
          getPostDeals();
          swal("Listo! Post Venta eliminada exitosamente!", {
            icon: "success",
            timer: "2000",
            buttons: {
              confirm: { text: "Listo", className: "bg-primary" },
            },
          });
          AfterSalesServices.deletePostDeal(id);
          getPostDeals();
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

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const {
      operationTypeId,
      // dateOfEntry,
      // estimateDate,
      // realDate,
      ammount,
      currencyId,
      file,
      dealId,
      aprobatedBy,
      file2,
    } = submitData;

    let submittedData = {
      operationTypeId: operationTypeId,
      dateOfEntry: dateOfEntry,
      estimateDate: estimatedDate,
      realDate: realDate,
      ammount: ammount,
      currencyId: currencyId,
      file: file[0].name,
      dealId: dealId, //->customerId
      aprobatedBy: aprobatedBy,
      file2: file2[0].name,
      actionsOptions: actionsOptions,
    };

    try {
      // !

      const formData = new FormData();
      let object = {};

      formData.append("operationTypeId", actionsOptions?.value);
      formData.append("dateOfEntry", dateOfEntry);
      formData.append("estimateDate", estimatedDate);
      formData.append("realDate", realDate);
      formData.append("ammount", ammount);
      formData.append("currencyId", currenciesOptions?.value);
      formData.append("file", file[0].name);
      formData.append("dealId", editData?.id);
      formData.append("aprobatedBy", aprobatedBy);
      formData.append("file2", file2[0].name);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));

      console.log(json);

      // await AfterSalesServices.addPostDealOperations(formData);

      setModal({ edit: false, add: false });
      resetForm();
      window.location.reload();

      await AfterSalesServices.editPostDeal(editData.id, submittedData);
      resetForm();
      getPostDeals();
      setModal({ edit: false }, { add: false });

      // !

      // await AfterSalesServices.editPostDeal(editData.id, submittedData);
      // resetForm();
      // getPostDeals();
      // setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // function to parse date
  const parseDate = (date) => {
    const dateParse = new Date(date);
    const day = dateParse.getDate();
    const month = dateParse.getMonth() + 1;
    const year = dateParse.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Edit Selects
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
      setActionsOptions(new Date(editData?.actionsOptions));
    }
  }, []);

  const getPaginationPostDeals = async (limit, page) => {
    const postDeals = await AfterSalesServices.getPostDealOperationsPags(limit, page);
    const postDealsData = await postDeals.data.map((data) => data);
    setPostDeals(postDealsData);
  };

  const firstPageUrl = () => getPaginationPostDeals(itemPerPage, 1);
  const nextPageUrl = () => getPaginationPostDeals(itemPerPage, 2);
  const lastPageUrl = () => getPaginationPostDeals(itemPerPage, 3);

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
                <p>Total {currentItems?.length} acciones</p>
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
                  <span className="sub-text">Operación</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Operación Post Venta</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Inversión</span>
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
                          <li
                            className="nk-tb-action"
                            onClick={() => {
                              deletePostDeal(item.id);
                            }}
                          >
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
            <React.Fragment>
              {/* {currentItems.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={postDeals.length}
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
            <div className="text-center">
              <span className="text-silent">No se encontraron registros</span>
            </div>
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
                        // value={editData?.actionsOptions}
                        options={actions}
                        onChange={onOptionsActionsChange}
                        defautlValue={formData.actionsTypeId}
                        // defautlValue={editData?.actionsTypeId}

                        // value={editData?.operationTypeId}
                        // options={actions}
                        // onChange={onOptionsActionsChange}
                        // defautlValue={formData.actionsTypeId}
                        // name="operationTypeId"
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
                        dateFormat="MM/dd/yyyy"
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
                        dateFormat="MM/dd/yyyy"
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
                        dateFormat="MM/dd/yyyy"
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
                        defaultValue={editData?.ammount}
                        placeholder="Ingrese monto"
                        allowNegative={false}
                        decimalSeparator={","}
                        decimalPrecision={2}
                        thousandSeparator={"."}
                        ref={register()}
                      />
                      <small className="text-primary">Inversión actual: {editData?.ammount}</small>
                      {/* <small className="text-primary">Inversión actual: {editData?.amountOfTheInvestment}</small>{" "} */}
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
                        defaultValue={editData?.aprobatedBy}
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
                            defaultValue={editData?.file}
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
                            defaultValue={editData?.file2}
                            ref={register()}
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg, .jpeg, .png, application/vnd.ms-excel"
                          />
                        </label>
                      </div>
                    </FormGroup>
                  </Col>

                  {/* <Col md="12">
                    <FormGroup>
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        type="textarea"
                        name="description"
                        defaultValue={editData?.description}
                        placeholder="Ingresa nombre"
                        ref={register({ required: "Este campo es requerido" })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col> */}

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
