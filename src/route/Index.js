import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomerProvider } from "../pages/customer/CustomerContext";
import { CompanyProvider } from "../pages/company/CompanyContext";
import { UserContextProvider } from "../pages/users/UserContext";
import { AdviserContextProvider } from "../pages/adviser/AdviserContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";

import Operation from "../pages/operation/OperationDefault";
// import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import Customer from "../pages/customer/CustomerList";
import Company from "../pages/company/CompanyList";
import Users from "../pages/users/UserList";
import Adviser from "../pages/adviser/AdviserListDefault";
import EcomCustomerDetails from "../pages/customer/CustomerDetails";
import EcomDashboard from "../pages/panel/e-commerce/index";

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
            <CustomerProvider>
              <Customer />
            </CustomerProvider>
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
          path={`${process.env.PUBLIC_URL}/customer-details/:id`}
          render={(props) => (
            <CustomerProvider>
              <EcomCustomerDetails {...props} />
            </CustomerProvider>
          )}
        ></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
