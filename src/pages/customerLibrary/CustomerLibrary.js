import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  UserAvatar,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import CustomersServices from "../../services/CustomersServices";
import CustomersLibraryServices from "../../services/CustomersLibraryServices";

const Legal = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [customerDocSelected, setCustomerDocSelected] = useState(null);

  // Get Legal
  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerLegal();
      setData(customers?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCustomers();
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
      console.log(currentItems);
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
                Lista de Clientes Legales
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Últimos {currentItems.length} clientes</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="container-fluid overflow-auto scrollbar-fluid">
            <div className="nk-tb-list is-separate is-medium mb-3">
              <DataTableHead className="nk-tb-item">
                <DataTableRow>
                  <span className="sub-text">#</span>
                </DataTableRow>
                <DataTableRow size="xs">
                  <span className="sub-text">Cliente</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Tipo</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Telefono</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Categoria</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Numero de identificacion</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Acción</span>
                </DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? lastCustomers(currentItems).map((item) => (
                    <DataTableItem key={item.id}>
                      <DataTableRow>
                        <span>{item.id}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          {item?.companyName && (
                            <UserAvatar theme="purple" text={findUpper(item?.companyName)}></UserAvatar>
                          )}
                          <div className="user-info">
                            <span className="tb-lead">
                              {item?.companyName}
                              <span className="dot dot-success d-md-none ml-1"></span>
                            </span>
                            <span>{item?.email}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-info">Legal</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="text-info">{item?.phone}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{item?.companyCategory}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{item?.taxIdentificationNumber}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <Link
                          to="customer-library/documents"
                          className="dropdown-toggle nk-quick-nav-icon"
                          onClick={() => setCustomerDocSelected(item.id)}
                        >
                          <div className="icon-status text-primary">
                            <Icon name="book" />
                          </div>
                        </Link>
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

export default Legal;
