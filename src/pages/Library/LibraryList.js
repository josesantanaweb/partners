import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
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
} from "../../components/Component";

import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import CustomersServices from "../../services/CustomersServices";
import CustomersLibraryServices from "../../services/LibraryServices";
import CustomerId from "./CustomerId";

const LibraryList = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [dataLegal, setDataLegal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [customerId, setCustomerId] = useState(false);

  // function to get natual customers
  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerNatural();
      setData(customers?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCustomers();
  }, []);

  // function to get legal customers
  const getCustomerLegal = async () => {
    try {
      const customersLegal = await CustomersServices.getCustomerLegal();
      setDataLegal(customersLegal?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCustomerLegal();
  }, []);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); //current items = data

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
                  <span className="sub-text">Nombre</span>
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
                  <span className="sub-text">Dirección</span>
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
                        <span>{item?.names}</span>
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
                        <span>{item?.address.detailedAddress.address}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        {item.id ? (
                          <Link
                            to={`customer-library/${item.id}`}
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
                <p>Últimos {dataLegal.length} clientes legales</p>
              </BlockDes>
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
                  <span className="sub-text">Nombre de empresa</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Categoría</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Email</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Teléfono fijo</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Dirección</span>
                </DataTableRow>
                <DataTableRow className="text-center">
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>

              {dataLegal.length > 0
                ? lastCustomers(dataLegal).map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="text-center">
                        <span>{item?.id}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.companyName}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.companyCategory}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.email}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.phone}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        <span>{item?.address.detailedAddress.address}</span>
                      </DataTableRow>
                      <DataTableRow className="text-center">
                        {item.id ? (
                          <Link
                            to={`customer-library/${item.id}`}
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
