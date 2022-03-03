import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomerProvider } from "../pages/panel/e-commerce/customer/CustomerContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";

import EcomOrder from "../pages/panel/e-commerce/order/OrderDefault";
import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import EcomCustomer from "../pages/panel/e-commerce/customer/CustomerList";
import EcomCustomerDetails from "../pages/panel/e-commerce/customer/CustomerDetails";
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
        <Route exact path={`${process.env.PUBLIC_URL}/orders`} component={EcomOrder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/products`} component={EcomProducts}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/users`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/adviser`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/customer`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
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
