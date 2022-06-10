import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  UserAvatar,
  Icon,
} from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import { useForm } from "react-hook-form";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import CustomersServices from "../../services/CustomersServices";
import CustomersLibraryServices from "../../services/LibraryServices";

import LibraryServices from "../../services/LibraryServices";
import DocumentsServices from "../../services/DocumentsServices";

const LibraryList = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [dataLegal, setDataLegal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  // const [customerId, setCustomerId] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit } = useForm();

  const [documents, setDocuments] = useState([]);
  const [documentsOptions, setDocumentsOptions] = useState(documents);

  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  // Filter customers input search bar
  const [customers, setCustomers] = useState([]); //usuarios/setUsuarios
  const [customersTable, setCustomersTable] = useState([]); //tabalUsuarios/setTablaUsuarios
  const [search, setSearch] = useState(""); //busqueda

  // Customers Legal
  const [customersLegal, setCustomersLegal] = useState([]); //usuarios/setUsuarios
  const [customersLegalTable, setCustomersLegalTable] = useState([]); //tabalUsuarios/setTablaUsuarios
  const [searchLegal, setSearchLegal] = useState(""); //busqueda

  // function to get natural customers
  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerNatural();
      setCustomers(customers?.data);
      setCustomersTable(customers?.data);
    } catch (error) {}
  };

  // Nuevo
  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (input) => {
    var res = customersTable.filter((customer) => {
      if (
        customer?.names.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.rut.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.email.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.phone.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.mobilePhone.toString().toLowerCase().includes(input.toLowerCase())
      ) {
        return customer;
      }
    });
    setCustomers(res);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  // function to get legal customers
  const getCustomerLegal = async () => {
    try {
      const customersLegal = await CustomersServices.getCustomerLegal();
      setCustomersLegal(customersLegal?.data);
      setCustomersLegalTable(customersLegal?.data);
    } catch (error) {}
  };

  // Nuevo
  const handleChangeLegal = (e) => {
    console.log(e.target.value);
    setSearchLegal(e.target.value);
    filterLegal(e.target.value);
  };

  const filterLegal = (input) => {
    var res = customersLegalTable.filter((customer) => {
      if (
        customer?.companyName.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.companyCategory.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.email.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.email.toString().toLowerCase().includes(input.toLowerCase()) ||
        customer?.phone.toString().toLowerCase().includes(input.toLowerCase())
      ) {
        return customer;
      }
    });
    setCustomersLegal(res);
  };

  useEffect(() => {
    getCustomerLegal();
  }, []);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem); //current items = data

  // get the las 5 customers
  const lastCustomers = (data) => {
    return data.slice(0, 5);
  };

  // function to get customer library
  const getCustomersLibrary = async (customerId) => {
    try {
      const customerLibrary = await CustomersLibraryServices.getCustomerLibrary(customerId);
      return customerLibrary.data;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    currentItems.map((customer) => getCustomersLibrary(customer?.id === undefined ? customer.id : customer.id));
  }, []);

  // Modal get data
  const filterDocumentType = documents.find((item) => item.value == documentsOptions.value);

  const [formData, setFormData] = useState({
    documentTypeId: "",
    // description: filterDocumentType?.description,
    // observation: "",
    issueDate: "",
    expirationDate: "",
    file: "",
  });

  // get dinamic customerId
  const index = window.location.href.indexOf("customer-library") + 17;
  const customerId = window.location.href.slice(index);

  // function to get customer document
  const getCustomerDocument = async (customerId) => {
    try {
      const customerDocument = await LibraryServices.getCustomerDocument(customerId);
      setData(customerDocument.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCustomerDocument(parseInt(customerId));
  }, []);

  // function to reset the form
  const resetForm = () => {
    setFormData({
      documentTypeId: "",
      // description: "",
      // observation: "",
      issueDate: "",
      expirationDate: "",
      file: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // Submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { documentTypeId, description, observation, issueDate, expirationDate, file } = submitData;
    let submittedData = {
      documentTypeId: documentsOptions?.value,
      // description: documentsOptions.value,
      // observation: observation,
      issueDate: issueDate,
      expirationDate: expirationDate,
      file: file[0],
    };
    try {
      const formData = new FormData();
      let object = {};

      formData.append("file", file[0]);
      formData.append("documentTypeId", documentsOptions.value);
      formData.append("expirationDate", expirationDate);
      formData.append("issueDate", issueDate);

      formData.forEach((value, key) => (object[key] = value));
      var json = JSON.stringify(object);
      JSON.stringify(Object.fromEntries(formData));
      console.log(json);

      await LibraryServices.addCustomerLibDoc(formData, customerId);
      setData([submittedData, customerId]);
      setModal({ edit: false, add: false });
      resetForm();
      getCustomerDocument(Number(customerId));
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  // function to get company select
  const getDocuments = async () => {
    try {
      const documents = await DocumentsServices.getDocuments();
      const documentsData = await documents.data.map((document) => ({
        label: document?.name,
        value: document?.id,
        description: document?.description,
      }));

      setDocuments(documentsData);
    } catch (error) {
      throw error;
    }
  };
  const onOptionsDocumentsChange = (optionValue) => {
    setDocumentsOptions(optionValue);
  };

  useEffect(() => {
    getDocuments();
    // get document type filtred
    if (documentsOptions.value) {
      return documents.find((item) => item.value == documentsOptions.value);
    }
  }, [documentsOptions.value]);

  return (
    <React.Fragment>
      <Head title="Clientes"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Clientes Naturales
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Últimos {currentItems.length} clientes naturales</p>
              </BlockDes>
            </BlockHeadContent>

            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-right">
                      <Icon name="search" />
                    </div>
                    <input
                      type="text"
                      value={search}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Buscar por: Cliente, Rut, Email, Teléfono fijo o celular"
                      style={{ minWidth: "25rem" }}
                    />
                  </div>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <div className="container-fluid overflow-auto scrollbar-fluid table-records">
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow className="text-center">
                  <span className="sub-text text-primary">#</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Rut</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Email</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Teléfono fijo</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Teléfono celular</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? lastCustomers(currentItems).map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="text-center">
                        <span>{item?.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <div className="user-card">
                          {item?.names && <UserAvatar theme="purple" text={findUpper(item?.names)}></UserAvatar>}
                          <div className="user-info">
                            <span className="tb-lead">
                              {item?.names}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.rut}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.email}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.phone}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.mobilePhone}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        {item.id ? (
                          <Link
                            to={`/customer-library/${item?.id}`}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <TooltipComponent
                              tag="span"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="book"
                              direction="top"
                              text="Mis documentos"
                            />
                          </Link>
                        ) : null}
                      </DataTableRow>
                    </DataTableItem>
                  ))
                : null}
            </div>
          </div>
        </Block>
      </Content>

      {/* Clientes Legales */}
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Clientes Legales/Empresa
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Últimos {customersLegal.length} clientes legales</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-right">
                      <Icon name="search" />
                    </div>
                    <input
                      type="text"
                      value={searchLegal}
                      onChange={handleChangeLegal}
                      className="form-control"
                      placeholder="Buscar por: Empresa, Categoria, Email o Teléfono"
                      style={{ minWidth: "25rem" }}
                    />
                  </div>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <div className="container-fluid overflow-auto scrollbar-fluid table-records">
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow className="text-center">
                  <span className="sub-text text-primary">#</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Email</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Teléfono fijo</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Biblioteca</span>
                </DataTableRow>
              </DataTableHead>
              {customersLegal.length > 0
                ? lastCustomers(customersLegal).map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="text-center">
                        <span>{item?.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <div className="user-card text-center d-flex align-items-center justify-content-center">
                          {item?.companyName && (
                            <UserAvatar theme="purple" text={findUpper(item?.companyName)}></UserAvatar>
                          )}
                          <div className="user-info text-center">
                            <span className="tb-lead">
                              {item?.companyName}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.email}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.phone}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        {item.id ? (
                          <Link
                            to={`/customer-library/${item?.id}`}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <TooltipComponent
                              tag="span"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + 1}
                              icon="book"
                              direction="top"
                              text="Mis documentos"
                            />
                          </Link>
                        ) : null}
                      </DataTableRow>
                    </DataTableItem>
                  ))
                : null}
            </div>
          </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default LibraryList;
