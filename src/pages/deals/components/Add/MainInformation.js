import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Form } from "reactstrap";
import { Col, DataTableHead, DataTableRow, DataTableItem, Button, RSelect } from "../../../../components/Component";
import CustomersServices from "../../../../services/CustomersServices";
import DealsServices from "../../../../services/DealsServices";

// Deals data
const MainInformation = () => {
  const [data, setData] = useState([]);
  const [dataCust, setCust] = useState([]);
  const [dataCustLegal, setCustLegal] = useState([]);
  const { register, handleSubmit } = useForm();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  const [search, setSearch] = useState("");
  const [searchRut, setSearchRut] = useState("");
  const [CustTable, setCustTable] = useState([]);
  const [onSearchText, setSearchText] = useState("");

  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [paymentsMediums, setPaymentsMediums] = useState([]);
  const [paymentsMethods, setPaymentsMethods] = useState([]);

  const [plansOptions, setPlansOptions] = useState(plans);
  const [companiesOptions, setCompaniesOptions] = useState(companies);
  const [currenciesOptions, setCurrenciesOptions] = useState(currencies);
  const [paymentMethodsOptions, setPaymentMethodsOptions] = useState(paymentsMethods);

  // const [trailerFreeOptions, setTrailerFreeOptions] = useState();
  const [advisorFeeOptions, setAdvisorFeeOptions] = useState();

  // trilerFree
  const advisorFeeOptionsSelect = [
    { label: "Si", value: true },
    { label: "No", value: false },
  ];

  // get Natural customers
  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerNatural();
      const customersData = await customers.data.map((data) => data);
      setCust(customersData);
      setCustTable(customersData);
    } catch (error) {}
  };

  const getCustomersLegal = async () => {
    try {
      const customers = await CustomersServices.getCustomerLegal();
      const customersLegalData = await customers.data.map((data) => data);
      setCustLegal(customersLegalData);
    } catch (error) {}
  };

  useEffect(() => {
    getCustomers();
    getCustomersLegal();
  }, []);

  const [formData, setFormData] = useState({
    planId: "",
    companyId: "",
    period: "",
    amount: "",
    realAmount: "",
    sourceOfFunds: "",
    currencyId: "",
    paymentMethodId: "",
    advisorFeeService: "",
    advisorFeeComission: "",
    rut: "",
    names: "",
  });
  const resetForm = () => {
    setFormData({
      planId: "",
      companyId: "",
      period: "",
      amount: "",
      realAmount: "",
      sourceOfFunds: "",
      currencyId: "",
      paymentMethodId: "",
      advisorFeeService: "",
      advisorFeeComission: "",
      rut: "",
      names: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  console.log(`PlanId: `, plansOptions.value); // PlanId
  console.log(`CompanyId: `, companiesOptions.value); // CompanyId
  console.log(`CurrencyId: `, currenciesOptions.value); // CurrencyId
  console.log(`PaymentMethodId: `, paymentMethodsOptions.value); // PaymentMethodId
  console.log(`AdvisorFeeOptionSelect: `, advisorFeeOptionsSelect.value); // PaymentMethodId
  // ! Solictar campo select advosorFee true false
  // ! POSTMAN /deals/selects

  // function to post deals data
  const onFormSubmit = async (submitData) => {
    const {
      planId,
      companyId,
      period,
      amount,
      realAmount,
      sourceOfFunds,
      currencyId,
      paymentMethodId,
      advisorFeeService,
      advisorFeeComission,
      rut,
      names,
    } = submitData;
    let submittedData = {
      planId: plansOptions.value,
      companyId: companiesOptions.value,
      period: Number(period),
      amount: Number(amount),
      realAmount: Number(realAmount),
      sourceOfFunds: sourceOfFunds,
      currencyId: currenciesOptions.value,
      advisorFeeService: advisorFeeService.value, //-> boolean
      advisorFeeComission: advisorFeeComission, //-> %
      paymentMethodId: paymentMethodsOptions.value,
      rut: search,
      names: searchRut,
    };
    try {
      await DealsServices.addDocument(submittedData);
      setData([submittedData, ...data]);
      resetForm();
      getCustomers();
      setModal({ edit: false }, { add: false });
    } catch (error) {}
  };

  // Select plans
  // function to get plan select
  const getPlans = async () => {
    try {
      const selectsData = await DealsServices.getDealSelects();
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
      const selectsData = await DealsServices.getDealSelects();
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

  // function to get currencies select
  const getCurrencies = async () => {
    try {
      const selectsData = await DealsServices.getDealSelects();
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

  // function to get payment methods
  const getPaymentMethods = async () => {
    try {
      const selectsData = await DealsServices.getDealSelects();
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

  const onOptionsAdvisorFeeChange = (optionValue) => {
    setAdvisorFeeOptions(optionValue);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to get customer names and rut from input search
  const handleInputSearchChange = (ev) => {
    setSearch(ev.target.value);
    setSearchRut(ev.target.value);
    filtrar(ev.target.value);
  };

  // function to filter customer table by name fields
  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = CustTable.filter((elemento) => {
      if (elemento.names.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    });
    setCust(resultadoBusqueda);
  };

  // function to get customer names from input search
  const handleClickedRegisterNames = (customerName) => {
    dataCust.filter((customer) => customer.names === customerName && setSearch(customerName));
  };

  useEffect(() => {
    getCustomers(search);
  }, []);

  // Function to set input rut value in input field
  const handleClickedRegisterRut = (customerRut) => {
    dataCust.filter((customer) => customer.rut === customerRut && setSearchRut(customerRut));
  };

  // filter customers by name
  // const [dataCust, setCust] = useState([]); usuarios
  // const [CustTable, setCutTable] = useState([]);
  // const [search, setSearch] = useState("");

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="row mt-4">
      <Col md="12" className="mb-4">
        <FormGroup className="border-bottom pb-2">
          <h6>Datos del Cliente - Natural</h6>
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre</label>

          <input
            className="form-control"
            type="text"
            name="names"
            value={search}
            onChange={handleInputSearchChange}
            placeholder="Ingresa Nombre"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="6" className="mb-4">
        <FormGroup>
          <label className="form-label">Rut</label>
          <input
            className="form-control"
            type="text"
            name="rut"
            value={searchRut}
            onChange={handleInputSearchChange}
            ref={register()}
            readOnly
          />
        </FormGroup>
      </Col>

      <Col md="12">
        <div className="scrollbar-fluid overflow-auto mb-3 table-records">
          <div className="nk-tb-list is-separate is-medium">
            <DataTableHead className="nk-tb-item scrollbar-fluid overflow-auto">
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">N. de Cliente</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Ciente</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Rut</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Tipo</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Acción</span>
              </DataTableRow>
            </DataTableHead>

            {dataCust.length > 0
              ? dataCust.map((customer) => (
                  <DataTableItem key={customer.id}>
                    <DataTableRow className="text-center">
                      <span>{customer.id}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{customer.names}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{customer.rut}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{customer.names}</span>
                    </DataTableRow>

                    <DataTableRow className="text-center">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
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
              : null}
          </div>
        </div>
      </Col>

      {/* <Col md="12" className="mb-4">
        <FormGroup className="border-bottom pb-2">
          <h6>Datos del Cliente - Legal</h6>
        </FormGroup>
      </Col> */}
      {/* <Col md="12" className="mb-4">
        <FormGroup>
          <label className="form-label">Nombre de empresa</label>
          <input
            className="form-control"
            type="text"
            name="names"
            // defaultValue={formData.names}
            placeholder="Ingresa Nombre de Empresa"
            ref={register()}
          />
        </FormGroup>
      </Col>
      <Col md="12">
        <div className="scrollbar-fluid overflow-auto mb-3">
          <div className="nk-tb-list is-separate is-medium">
            <DataTableHead className="nk-tb-item scrollbar-fluid overflow-auto">
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">N. Cliente</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Ciente</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Rut</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Tipo</span>
              </DataTableRow>
              <DataTableRow className="text-center border-bottom border bg-light">
                <span className="sub-text">Acción</span>
              </DataTableRow>
            </DataTableHead>

            {dataCustLegal.length > 0
              ? dataCustLegal.map((customer) => (
                  <DataTableItem key={customer.id}>
                    <DataTableRow className="text-center">
                      <span>{customer.id}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{customer.names}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{customer.names}</span>
                    </DataTableRow>
                    <DataTableRow className="text-center">
                      <span>{customer.names}</span>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
        </div>
      </Col> */}

      <Col md="12" className="mb-4">
        <FormGroup className="border-bottom pb-2">
          <h6>Plan</h6>
        </FormGroup>
      </Col>
      <Col md="12" className="mb-4">
        <FormGroup>
          <RSelect
            value={plansOptions}
            options={plans}
            onChange={onOptionsPlansChange}
            defautlValue={formData.planId}
          />
        </FormGroup>
      </Col>
      <Col md="8" className="mb-4">
        <label className="form-label">Institución</label>
        <RSelect
          value={companiesOptions}
          options={companies}
          onChange={onOptionsCompaniesChange}
          defautlValue={formData.companyId}
        />
      </Col>
      <Col md="4" className="mb-4">
        <FormGroup>
          <label className="form-label">Años del Plan</label>
          <input
            type="number"
            className="form-control"
            name="period"
            ref={register({ required: "Este campo es obligatorio *" })}
            defaultValue={formData.period}
          />
        </FormGroup>
      </Col>

      <Col md="12" className="mb-4">
        <FormGroup className="border-bottom pb-2">
          <h6>Inversión</h6>
        </FormGroup>
      </Col>
      <Col md="4" className="mb-4">
        <FormGroup>
          <label className="form-label">Monto de Inversión</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            ref={register({ required: "Este campo es obligatorio *" })}
            defaultValue={formData.amount}
          />
        </FormGroup>
      </Col>
      <Col md="3" className="mb-4">
        <FormGroup>
          <label className="form-label">Moneda</label>
          <RSelect
            value={currenciesOptions}
            options={currencies}
            onChange={onOptionsCurrenciesChange}
            defautlValue={formData.currencyId}
          />
        </FormGroup>
      </Col>
      <Col md="5" className="mb-4">
        <FormGroup>
          <label className="form-label">Valor neto total USD</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            ref={register({ required: "Este campo es obligatorio *" })}
            defaultValue={formData.amount}
          />
        </FormGroup>
      </Col>
      <Col md="4" className="mb-4">
        <FormGroup>
          <label className="form-label">Método de pago</label>
          <RSelect
            value={paymentMethodsOptions}
            options={paymentsMethods}
            onChange={onOptionsPaymentsMethodsChange}
            defautlValue={formData.paymentMethodId}
          />
        </FormGroup>
      </Col>
      <Col md="8" className="mb-4">
        <FormGroup>
          <label className="form-label">Origen de los Fondos</label>
          <input
            type="text"
            className="form-control"
            name="paymentMethodId"
            ref={register({ required: "Este campo es obligatorio *" })}
            defaultValue={formData.paymentMethodId}
            placeholder="Ej: Herencia, Patrimonio, etc"
          />
        </FormGroup>
      </Col>

      <Col md="12" className="mb-4">
        <FormGroup className="border-bottom pb-2">
          <h6>Servicios de Comisión</h6>
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <label className="form-label">Advisor-Fee</label>
          <RSelect value={advisorFeeOptions} options={advisorFeeOptionsSelect} onChange={onOptionsAdvisorFeeChange} />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <label className="form-label">Porcentaje</label>
          <div className="form-control-wrap">
            <input
              type="number"
              className="form-control"
              name="advisorFeeComission"
              defaultValue={formData.advisorFeeComission}
              placeholder="Ej: 1 - 5 - 10"
            />
          </div>
        </FormGroup>
      </Col>
      <Col md="6" className="mt-4">
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
  );
};

export default MainInformation;
