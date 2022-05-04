import React, { useEffect, useState } from "react";
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
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  RSelect,
  PreviewAltCard,
} from "../../components/Component";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

import { DealData } from "./DealData";
import { useForm } from "react-hook-form";
import OperationsServices from "../../services/OperationsServices";

const DealList = () => {
  const [data, setData] = useState(DealData);
  const [sm, updateSm] = useState(false);
  const [onSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    uploadFiles: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    planId: Number(""),
    companyId: Number(""),
    productTypeId: Number(""),
    productId: Number(""),
    currencyId: Number(""),
    amount: Number(""),
    amountPaid: Number(""),
    period: "",
    annualPayment: Number(""),
    paymentMethodId: Number(""),
    paymentMediumId: Number(""),
    discresionalService: false,
    discresionalServiceCommission: Number(""), //-> 5%
    trailerFree: false,
    trailerFreeCommission: Number(""), //-> 15%
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  // Hooks by Jose Contreras
  const [customerDeals, setCustomerDeals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tableCustomers, setTableCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRut, setSearchRut] = useState("");

  // unselects the data on mount
  useEffect(() => {
    let newData;
    newData = DealData.map((item) => {
      item.checked = false;
      return item;
    });
    setData([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = DealData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...DealData]);
    }
  }, [onSearchText, setData]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      planId: Number(""),
      companyId: Number(""),
      productTypeId: Number(""),
      productId: Number(""),
      currencyId: Number(""),
      amount: Number(""),
      amountPaid: Number(""),
      period: "",
      annualPayment: Number(""),
      paymentMethodId: Number(""),
      paymentMediumId: Number(""),
      discresionalService: false,
      discresionalServiceCommission: Number(""), //-> 5%
      trailerFree: false,
      trailerFreeCommission: Number(""), //-> 15%
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false, uploadFiles: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const {
      planId,
      companyId,
      productTypeId,
      productId,
      currencyId,
      amount,
      amountPaid,
      period,
      annualPayment,
      paymentMethodId,
      paymentMediumId,
      discresionalService,
      discresionalServiceCommission,
      trailerFree,
      trailerFreeCommission,
    } = submitData;

    // get customer id
    const customerId = tableCustomers.find((item) => item.rut === searchRut);

    let submittedData = {
      planId: plansOptions.value,
      companyId: companiesOptions.value,
      productTypeId: productTypesOptions.value,
      productId: productsOptions.value,
      currencyId: currenciesOptions.value,
      amount: Number(amount),
      amountPaid: Number(amountPaid),
      period: period,
      annualPayment: Number(annualPayment),
      paymentMethodId: paymentMediumsOptions.value,
      paymentMediumId: paymentMethodsOptions.value,
      discresionalService: discresionalOptions.value,
      discresionalServiceCommission: discresionalServiceCommission, //-> 5% eror 500 server
      trailerFree: trailerFreeOptions.value,
      trailerFreeCommission: trailerFreeCommission, //-> 15% error 500 server
    };
    try {
      await OperationsServices.addDeal(submittedData);
      setData([submittedData, ...data]);

      console.log(submittedData);
      setSearch("");
      setSearchRut("");
      resetForm();
      setModal({ edit: false }, { add: false }, { uploadFiles: false });
    } catch (error) {
      throw error;
    }
  };

  // function to edit customer deals selected
  const onEditDeal = async (id) => {
    const deal = data.find((item) => item.id === id);
    setFormData({
      planId: deal.planId,
      customerId: deal.customerId,
      companyId: deal.companyId,
      productTypeId: deal.productTypeId,
      productId: deal.productId,
      currencyId: deal.currencyId,
      amount: deal.amount,
      amountPaid: deal.amountPaid,
      period: deal.period,
      annualPayment: deal.annualPayment,
      paymentMethodId: deal.paymentMethodId,
      paymentMediumId: deal.paymentMediumId,
      discresionalService: deal.discresionalService,
      discresionalServiceCommission: deal.discresionalServiceCommission,
      trailerFree: deal.trailerFree,
      trailerFreeCommission: deal.trailerFreeCommission,
    });
    setModal({ edit: true, add: false, uploadFiles: true });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { name, email, phone } = submitData;
    let submittedData;
    let newitems = submitData;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarBg: item.avatarBg,
          name: name,
          image: item.image,
          role: item.role,
          email: email,
          balance: formData.balance,
          phone: "+" + phone,
          emailStatus: item.emailStatus,
          kycStatus: item.kycStatus,
          lastLogin: item.lastLogin,
          status: formData.status,
          country: item.country,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function to delete an item deal and get rest items
  const deleteCustomerDeal = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete an item deal
  const deleteDeal = async (id) => {
    try {
      await OperationsServices.deleteDeal(id);
      deleteCustomerDeal(id);
    } catch (error) {
      throw error;
    }
  };

  // function to get all customers to deal form
  const getCustomer = async (customerName) => {
    try {
      const customers = await OperationsServices.getCustomer(customerName);
      const customersData = customers.data.map((customerData) => customerData);
      customers.data.map((customerData) => customerData.names === customerName && customerData);
      setCustomers(customersData);
      setTableCustomers(customersData);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getCustomer(search);
  }, [search]);

  // function to get only 100 customer items
  const getPrincipalCustomersRegisters = (customersData) => {
    let newCustomersData = customersData.slice(0, 100);
    return newCustomersData;
  };

  // function filter names and rut by customer names (input search)
  const handleInputSearchChange = (ev) => {
    setSearch(ev.target.value);
    setSearchRut(ev.target.value);
  };

  // function to set input rut value in input field
  const handleClickedRegisterRut = (customerRut) =>
    customers.filter((customer) => customer.rut === customerRut && setSearchRut(customerRut));

  // function to reset names and rut fields
  const handleClearSearch = () => {
    setSearch("");
    setSearchRut("");
    resetForm();
  };

  // function to get customer names from input search
  const handleClickedRegisterNames = (customerName) => {
    customers.filter((customer) => customer.names === customerName && setSearch(customerName));
  };

  // * Deals
  // function to get customer item deals
  const getCustomerDeals = async () => {
    try {
      const deals = await OperationsServices.getDeals();
      const dealsData = deals.data.map((dealData) => dealData);
      setCustomerDeals(dealsData);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getCustomerDeals();
  }, []);

  // function to parse datepicker value
  const parseDate = (date) => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // function to get total deals
  const getTotalDeals = () => customerDeals.length;

  // function that loads the want to editted data
  const onEditClick = (id) => {
    customerDeals.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          email: item.email,
          status: item.status,
          phone: item.phone,
          balance: item.balance,
        });
        setModal({ edit: true }, { uploadFiles: false }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function that loads files
  const onUploadClick = (id) => {
    customerDeals.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          email: item.email,
          status: item.status,
          phone: item.phone,
          balance: item.balance,
        });
        setModal({ uploadFiles: true }, { edit: false }, { add: false });
        setEditedId(id);
      }
    });
  };
  // -> editButtons

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = customerDeals; //->data
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteUser = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorSuspendUser = () => {
    let newData;
    newData = data.map((item) => {
      if (item.checked === true) item.status = "Suspend";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const customerDealsPage = data.slice(indexOfFirstItem, indexOfLastItem); //->check this

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const { errors, register, handleSubmit } = useForm();

  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [paymentsMediums, setPaymentsMediums] = useState([]);
  const [paymentsMethods, setPaymentsMethods] = useState([]);

  const [productsOptions, setProductsOptions] = useState(products);
  const [plansOptions, setPlansOptions] = useState(plans);
  const [companiesOptions, setCompaniesOptions] = useState(companies);
  const [productTypesOptions, setProductTypesOptions] = useState(productTypes);
  const [currenciesOptions, setCurrenciesOptions] = useState(currencies);
  const [paymentMediumsOptions, setPaymentMediumsOptions] = useState(paymentsMediums);
  const [paymentMethodsOptions, setPaymentMethodsOptions] = useState(paymentsMethods);

  // function to get product select
  const getProducts = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const productsData = await selectsData.products.map((product) => ({ label: product.name, value: product.id }));
      setProducts(productsData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsProductsChange = (optionValue) => {
    setProductsOptions(optionValue);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(`state:`, products);
  // console.log(`product:`, productsOptions.value);

  // function to get plan select
  const getPlans = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const plansData = await selectsData.plans.map((plan) => ({ label: plan.name, value: plan.id }));
      setPlans(plansData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsPlansChange = (optionValue) => {
    setPlansOptions(optionValue);
  };
  useEffect(() => {
    getPlans();
  }, []);

  // function to get company select
  const getCompanies = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const companiesData = await selectsData.companies.map((company) => ({ label: company.name, value: company.id }));
      setCompanies(companiesData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsCompaniesChange = (optionValue) => {
    setCompaniesOptions(optionValue);
  };
  useEffect(() => {
    getCompanies();
  }, []);

  // function to get product type select
  const getProductTypes = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const productTypesData = await selectsData.productTypes.map((productType) => ({
        label: productType.name,
        value: productType.id,
      }));
      setProductTypes(productTypesData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsProductTypesChange = (optionValue) => {
    setProductTypesOptions(optionValue);
  };
  useEffect(() => {
    getProductTypes();
  }, []);

  // function to get product select
  const getCurrencies = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const currenciesData = await selectsData.currencyTypes.map((currencyType) => ({
        label: currencyType.name,
        value: currencyType.id,
      }));
      setCurrencies(currenciesData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsCurrenciesChange = (optionValue) => {
    setCurrenciesOptions(optionValue);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  // function to get payment payment mediums
  const getPaymentMediums = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const paymentMediumsData = await selectsData.paymentMediums.map((paymentMedium) => ({
        label: paymentMedium.name,
        value: paymentMedium.id,
      }));
      setPaymentsMediums(paymentMediumsData);
    } catch (error) {
      throw error;
    }
  };

  const onOptionsPaymentsMediumsChange = (optionValue) => {
    setPaymentMediumsOptions(optionValue);
  };

  useEffect(() => {
    getPaymentMediums();
  }, []);

  // function to get payment methods
  const getPaymentMethods = async () => {
    try {
      const selectsData = await OperationsServices.getDealSelects();
      const paymentMethodsData = await selectsData.paymentMethods.map((paymentMethod) => ({
        label: paymentMethod.name,
        value: paymentMethod.id,
      }));
      setPaymentsMethods(paymentMethodsData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsPaymentsMethodsChange = (optionValue) => {
    setPaymentMethodsOptions(optionValue);
  };
  useEffect(() => {
    getPaymentMethods();
  }, []);

  // Comision fields
  const [discresionalOptions, setDiscresionalOptionsOptions] = useState();
  const [trailerFreeOptions, setTrailerFreeOptions] = useState();

  const discresionalServiceOptions = [
    { label: "Si", value: true },
    { label: "No", value: false },
  ];

  const trilerFreeOptions = [
    { label: "Si", value: true },
    { label: "No", value: false },
  ];

  const onOptionsDiscresionalServiceChange = (optionValue) => {
    setDiscresionalOptionsOptions(optionValue);
  };

  const onOptionsTrailerFreeChange = (optionValue) => {
    setTrailerFreeOptions(optionValue);
  };

  return (
    <React.Fragment>
      <Head title="Lista de Operaciones"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Lista de Operaciones
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Total {getTotalDeals()} operaciones</p>
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
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
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
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow>
                  <span className="sub-text text-center">N. de Operación</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">N. de Plan</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Cliente</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Rut</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Asesor</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text text-center">Plan</span>
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
                  <span className="sub-text text-center">Abono</span>
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
                  <span className="sub-text text-center">Metodo de Pago</span>
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
                <DataTableRow>
                  <span className="sub-text text-center">Acción</span>
                </DataTableRow>
              </DataTableHead>

              {/* Conflictos: customer, rut , company, tipo de dato discresionalServiceCommission y trailerFreeCommission */}
              {customerDeals.length > 0
                ? customerDeals.map((deal) => (
                    <DataTableItem key={deal.id}>
                      <DataTableRow className="text-center">
                        <span>{deal.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.plan.id}</span>
                      </DataTableRow>

                      {/* Cliente y Rut */}
                      <DataTableRow className="text-center">
                        <span>(Nombre cliente *)</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>(Rut del cliente *)</span>
                      </DataTableRow>
                      {/* Cliente y Rut */}

                      <DataTableRow className="text-center">
                        <span>{deal.createdByAdvisor.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.plan.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>(Empresa *)</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.productType.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.product.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.amount}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.amountPaid}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.currency.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{parseDate(deal.period)}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.annualPayment}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.paymentMedium.id === null ? "No definido" : deal.paymentMedium.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{deal.paymentMethod.id === null ? "No definido" : deal.paymentMethod.name}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {deal.discresionalService ? "Si" : "No"}
                          {" - "}
                          {deal.discresionalServiceCommission}%
                        </span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>
                          {deal.trailerFree ? "Si" : "No"}
                          {" - "}
                          {deal.trailerFreeCommission}%
                        </span>
                      </DataTableRow>

                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 text-center d-flex justify-content-center">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon bg-danger">
                                <Icon name="icon ni ni-files text-white"></Icon>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onUploadClick(deal.id)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#uploadFiles"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="icon ni ni-files"></Icon>
                                      <span>Subir Documentos</span>
                                    </DropdownItem>
                                  </li>
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 text-center d-flex justify-content-center">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon bg-danger">
                                <Icon name="icon ni ni-files text-white"></Icon>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onEditClick(deal.id)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#uploadFiles"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="icon ni ni-files"></Icon>
                                      <span>Validar Documentos</span>
                                    </DropdownItem>
                                  </li>
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>

                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onEditClick(deal.id)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Editar Operación</span>
                                    </DropdownItem>
                                  </li>
                                  {deal.status !== "Suspend" && (
                                    <React.Fragment>
                                      <li className="divider"></li>
                                      <li onClick={() => deleteDeal(deal.id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#suspend"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="trash"></Icon>
                                          <span>Eliminar Operación</span>
                                        </DropdownItem>
                                      </li>
                                    </React.Fragment>
                                  )}
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
              {customerDeals.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No se encontraron operaciones</span>
                </div>
              )}
            </PreviewAltCard>
          </div>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Agregar Operación</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="12">
                    <h6 className="border-bottom pb-1">Información del Cliente</h6>
                  </Col>
                  <Col md="7">
                    <FormGroup>
                      <label className="form-label">Nombre del Cliente</label>
                      <div className="search flex flex-row justify-content-between align-items-center">
                        <input
                          className="form-control"
                          type="text"
                          name="customer"
                          value={search}
                          onChange={handleInputSearchChange}
                          placeholder="Ingresa Nombre"
                        />
                        <Button className="bg-primary border border-primary ml-1" onClick={handleClearSearch}>
                          <em className="icon ni ni-repeat text-white"></em>
                        </Button>
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <label className="form-label">Rut</label>
                      <input
                        className="form-control"
                        type="text"
                        name="rut"
                        value={searchRut}
                        onChange={handleInputSearchChange}
                        readOnly="readonly"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <div className="overflow-auto rounded scrollbar-fluid border bg-light">
                      {customers.length === 0 ? (
                        <span className="text-danger">
                          <em className="icon ni ni-info"></em>
                          <i className="pl-1">Cliente no encontrado</i>
                        </span>
                      ) : (
                        customers &&
                        getPrincipalCustomersRegisters(customers).map((customer) => (
                          <DataTableItem key={customer.id} className="bg-white rounded">
                            <DataTableRow className="text-center ml-3 mr-3">
                              <span className="text-center">{customer.id}</span>
                            </DataTableRow>
                            <DataTableRow className="text-center ml-3 mr-3">
                              <span className="text-center text-nowrap pl-2 pr-1">{customer.names}</span>
                            </DataTableRow>
                            <DataTableRow className="text-center ml-3 mr-3">
                              <span className="text-center text-nowrap pl-2 pr-1">{customer.paternalLastName}</span>
                            </DataTableRow>
                            <DataTableRow className="text-center ml-3 mr-3">
                              <span className="text-center text-nowrap pl-2 pr-1">{customer.rut}</span>
                            </DataTableRow>
                            <DataTableRow className="text-center ml-3 mr-3">
                              <span className="text-center text-nowrap pl-2 pr-1">{customer.email}</span>
                            </DataTableRow>
                            <DataTableRow className="text-center ml-3 mr-3">
                              <span className="text-center text-nowrap pl-2 pr-1">{parseDate(customer.createdAt)}</span>
                            </DataTableRow>
                            <DataTableRow className="text-center ml-3 mr-3">
                              <Button
                                onClick={() => {
                                  handleClickedRegisterNames(customer.names);
                                  handleClickedRegisterRut(customer.rut);
                                }}
                                className="bg-primary border-0 text-white"
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
                    <h6 className="border-bottom pb-1 mt-3">Plan del Cliente</h6>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <RSelect
                        value={plansOptions}
                        options={plans}
                        onChange={onOptionsPlansChange}
                        defautlValue={formData.planId}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <h6 className="border-bottom pb-1 mt-3">Empresa y Producto</h6>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Empresa</label>
                      <RSelect
                        value={companiesOptions}
                        options={companies}
                        onChange={onOptionsCompaniesChange}
                        defautlValue={formData.companyId}
                      />
                      {errors.companyId && <span className="invalid">{errors.companyId.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Tipo de Producto</label>
                      <RSelect
                        value={productTypesOptions}
                        options={productTypes}
                        onChange={onOptionsProductTypesChange}
                        defautlValue={formData.productTypeId}
                      />
                      {errors.productTypeId && <span className="invalid">{errors.productTypeId.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Producto</label>
                      <RSelect
                        value={productsOptions}
                        options={products}
                        onChange={onOptionsProductsChange}
                        defautlValue={formData.productId}
                      />
                      {errors.productId && <span className="invalid">{errors.productId.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <h6 className="border-bottom pb-1 mt-3">Inversión y Pago</h6>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Moneda</label>
                      <RSelect
                        value={currenciesOptions}
                        options={currencies}
                        onChange={onOptionsCurrenciesChange}
                        defautlValue={formData.currencyId}
                      />
                      {errors.currencyId && <span className="invalid">{errors.currencyId.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Inversión</label>
                      <input
                        type="number"
                        className="form-control"
                        name="amount"
                        ref={register({ required: "Este campo es obligatorio *" })}
                        defaultValue={formData.amount}
                      />
                      {errors.amount && <span className="invalid">{errors.amount.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Abono inicial</label>
                      <input
                        type="number"
                        className="form-control"
                        name="amountPaid"
                        ref={register({ required: "Este campo es obligatorio *" })}
                        defaultValue={formData.amountPaid}
                      />
                      {errors.amountPaid && <span className="invalid">{errors.amountPaid.message}</span>}
                    </FormGroup>
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
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="payment-medium">
                        Forma de Pago
                      </label>
                      <RSelect
                        value={paymentMediumsOptions}
                        options={paymentsMediums}
                        onChange={onOptionsPaymentsMediumsChange}
                        defautlValue={formData.paymentMediumId}
                      />
                      {errors.paymentMediumId && <span className="invalid">{errors.paymentMediumId.message}</span>}
                    </div>
                  </Col>

                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="payment-method">
                        Metodo de Pago
                      </label>
                      <RSelect
                        value={paymentMethodsOptions}
                        options={paymentsMethods}
                        onChange={onOptionsPaymentsMethodsChange}
                        defautlValue={formData.paymentMethodId}
                      />
                      {errors.paymentMethodId && <span className="invalid">{errors.paymentMethodId.message}</span>}
                    </div>
                  </Col>

                  <Col md="12">
                    <h6 className="border-bottom pb-1 mt-3">Servicios de Comisión</h6>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Comisión Discresional</label>
                      <RSelect
                        value={discresionalOptions}
                        options={discresionalServiceOptions}
                        onChange={onOptionsDiscresionalServiceChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Porcentaje</label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          name="discresionalServiceCommission"
                          ref={register({ required: "Este campo es obligatorio *" })}
                          defaultValue={formData.discresionalServiceCommission}
                          placeholder="Ej: 1 - 5 - 10"
                        />
                        {errors.discresionalServiceCommission && (
                          <span className="invalid">{errors.discresionalServiceCommission.message}</span>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Comisión Trailer Free</label>
                      <RSelect
                        value={trailerFreeOptions}
                        options={trilerFreeOptions}
                        onChange={onOptionsTrailerFreeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Porcentaje</label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          name="trailerFreeCommission"
                          ref={register({ required: "Este campo es obligatorio *" })}
                          defaultValue={formData.trailerFreeCommission}
                          placeholder="Ej: 1 - 5 - 10"
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Agresar Clientes
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

        {/* Modal subir Docs */}
        <Modal
          isOpen={modal.uploadFiles}
          toggle={() => setModal({ uploadFiles: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#uploadFiles"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>

            <h5 className="title">Documentos de la Operación</h5>
            <div className="mt-4">
              <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                <Col md="12">
                  <h6 className="border-bottom pb-1 mt-3">Documentos asociados</h6>
                </Col>
                <Col md="6">
                  <Card>
                    <ul className="nk-top-products">
                      <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2 flex-column">
                        <div className="p-1 overflow-auto rounded scrollbar-fluid w-auto">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                          <div className="price">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <ul className="nk-top-products">
                      <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2 flex-column">
                        <div className="p-1 overflow-auto rounded scrollbar-fluid w-auto">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                          <div className="price">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <ul className="nk-top-products">
                      <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2 flex-column">
                        <div className="p-1 overflow-auto rounded scrollbar-fluid w-auto">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                          <div className="price">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <ul className="nk-top-products">
                      <li className="item bg-white rounded border m-1 d-flex align-items-center justify-content-between p-2 flex-column">
                        <div className="p-1 overflow-auto rounded scrollbar-fluid w-auto">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                          <div className="price">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>

                <Col md="12">
                  <h6 className="border-bottom pb-1 mt-3">Documentos de Operación</h6>
                </Col>

                {/* Docs desde Biblioteca de Clientes */}
                <Col sm="8">
                  <Card>
                    <ul className=" text-center w-auto">
                      <li className="item bg-white rounded border d-flex align-items-center justify-content-between p-2 ">
                        <div className="overflow-auto rounded scrollbar-fluid w-100">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>

                <Col sm="4" className="d-flex align-items-center justify-content-end">
                  <ul className="d-flex flex-row align-items-center justify-content-end">
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="pr-2 p-2">
                        <Icon className="icon ni ni-loader"></Icon>
                      </Button>
                    </li>
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="btn btn-primary btn-icon pr-2">
                        <Icon className="icon ni ni-clip p-0"></Icon>
                        <span className="p-1">Adjuntar</span>
                      </Button>
                    </li>
                  </ul>
                </Col>

                <Col sm="8">
                  <Card>
                    <ul className=" text-center w-auto">
                      <li className="item bg-white rounded border d-flex align-items-center justify-content-between p-2 ">
                        <div className="overflow-auto rounded scrollbar-fluid w-100">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>

                <Col sm="4" className="d-flex align-items-center justify-content-end">
                  <ul className="d-flex flex-row align-items-center justify-content-end">
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="pr-2 p-2">
                        <Icon className="icon ni ni-loader"></Icon>
                      </Button>
                    </li>
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="btn btn-primary btn-icon pr-2">
                        <Icon className="icon ni ni-clip p-0"></Icon>
                        <span className="p-1">Adjuntar</span>
                      </Button>
                    </li>
                  </ul>
                </Col>

                <Col sm="8">
                  <Card>
                    <ul className=" text-center w-auto">
                      <li className="item bg-white rounded border d-flex align-items-center justify-content-between p-2 ">
                        <div className="overflow-auto rounded scrollbar-fluid w-100">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>

                <Col sm="4" className="d-flex align-items-center justify-content-end">
                  <ul className="d-flex flex-row align-items-center justify-content-end">
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="pr-2 p-2">
                        <Icon className="icon ni ni-loader"></Icon>
                      </Button>
                    </li>
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="btn btn-primary btn-icon pr-2">
                        <Icon className="icon ni ni-clip p-0"></Icon>
                        <span className="p-1">Adjuntar</span>
                      </Button>
                    </li>
                  </ul>
                </Col>

                <Col sm="8">
                  <Card>
                    <ul className=" text-center w-auto">
                      <li className="item bg-white rounded border d-flex align-items-center justify-content-between p-2 ">
                        <div className="overflow-auto rounded scrollbar-fluid w-100">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>

                <Col sm="4" className="d-flex align-items-center justify-content-end">
                  <ul className="d-flex flex-row align-items-center justify-content-end">
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="pr-2 p-2">
                        <Icon className="icon ni ni-loader"></Icon>
                      </Button>
                    </li>
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="btn btn-primary btn-icon pr-2">
                        <Icon className="icon ni ni-clip p-0"></Icon>
                        <span className="p-1">Adjuntar</span>
                      </Button>
                    </li>
                  </ul>
                </Col>

                <Col sm="8">
                  <Card>
                    <ul className=" text-center w-auto">
                      <li className="item bg-white rounded border d-flex align-items-center justify-content-between p-2 ">
                        <div className="overflow-auto rounded scrollbar-fluid w-100">
                          <div className="title">Documento: Ficha Perfil cliente</div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Col>

                <Col sm="4" className="d-flex align-items-center justify-content-end">
                  <ul className="d-flex flex-row align-items-center justify-content-end">
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="pr-2 p-2">
                        <Icon className="icon ni ni-loader"></Icon>
                      </Button>
                    </li>
                    <li className="d-flex align-items-center justify-content-center ml-2">
                      <Button className="btn btn-primary btn-icon pr-2">
                        <Icon className="icon ni ni-clip p-0"></Icon>
                        <span className="p-1">Adjuntar</span>
                      </Button>
                    </li>
                  </ul>
                </Col>

                {/* Docs desde Biblioteca de Clientes */}

                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                        Subir
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
          </ModalBody>
        </Modal>
        {/* Modal subir Docs */}

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Actualizar Operación</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="12">
                    <h6 className="border-bottom pb-1 mt-3">Plan del Cliente</h6>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Empresa</label>
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Tipo de Producto</label>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    {/* <FormGroup>
                      <label className="form-label">Producto</label>
                      <select
                        className="form-control"
                        name="productId"
                        defaultValue={formData.productTypeId}
                        ref={register({ required: "Este campo es obligatorio *" })}
                      >
                        <option value="">Seleccionar...</option>
                        {selectedProduct &&
                          selectedProduct.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                      </select>
                      {errors.productId && <span className="invalid">{errors.productId.message}</span>}
                    </FormGroup> */}
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Producto select</label>
                      <div className="form-control-wrap">
                        <RSelect
                        // isSearchable={false}
                        // options={companiesOptions}
                        // defaultValue={formData.companyId}
                        // onChange={onCountriesChange}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="4">
                    <FormGroup>
                      <label className="form-label">Producto</label>
                      <select
                        className="form-control"
                        name="productId"
                        defaultValue={formData.productTypeId}
                        ref={register({ required: "Este campo es obligatorio *" })}
                      >
                        <option value="">Seleccionar...</option>
                        {selectedProduct &&
                          selectedProduct.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                      </select>
                      {errors.productId && <span className="invalid">{errors.productId.message}</span>}
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        name="phone"
                        defaultValue={Number(formData.phone)}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="12">
                    <FormGroup>
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatus}
                          defaultValue={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col> */}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update User
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
                          Cancel
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
export default DealList;
