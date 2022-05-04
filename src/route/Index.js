import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CompanyProvider } from "../pages/company/CompanyContext";
import { UserContextProvider } from "../pages/users/UserContext";
import { CustomerContextProvider } from "../pages/customers/CustomersContext";
import { AdviserContextProvider } from "../pages/adviser/AdviserContext";
import { RolesContextProvider } from "../pages/roles/RolesContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";

import Operation from "../pages/operation/OperationDefault";
// import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import Customer from "../pages/customers/CustomersList";
import CustomerJuridico from "../pages/customers/CustomersListJuridico";
import Company from "../pages/company/CompanyList";
import Users from "../pages/users/UserList";
import Adviser from "../pages/adviser/AdviserList";
import Roles from "../pages/roles/RolesList";
import EcomDashboard from "../pages/panel/e-commerce/index";
import CustomersLibrary from "../pages/customersLibrary/CustomersLibrary";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/*Panel */}
        <Route exact path={`${process.env.PUBLIC_URL}/index`} component={EcomDashboard}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/operation`} component={Operation}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/products`} component={EcomProducts}></Route> */}
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/users`}
          render={() => (
            <UserContextProvider>
              <Users />
            </UserContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/adviser`}
          render={() => (
            <AdviserContextProvider>
              <Adviser />
            </AdviserContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/customer`}
          render={() => (
            <CustomerContextProvider>
              <Customer />
            </CustomerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/customer-juridico`}
          render={() => (
            <CustomerContextProvider>
              <CustomerJuridico />
            </CustomerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/company`}
          render={() => (
            <CompanyProvider>
              <Company />
            </CompanyProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/roles`}
          render={() => (
            <RolesContextProvider>
              <Roles />
            </RolesContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/customers-library`}
          render={() => (
            <RolesContextProvider>
              <CustomersLibrary />
            </RolesContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
