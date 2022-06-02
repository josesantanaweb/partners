import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContextProvider } from "../pages/users/UserContext";
import { NaturalContextProvider } from "../pages/clientes/Natural/NaturalContext";
import { LegalContextProvider } from "../pages/clientes/Legal/LegalContext";
import { AdviserContextProvider } from "../pages/adviser/AdviserContext";
import { RolesContextProvider } from "../pages/roles/RolesContext";
import { ProductsContextProvider } from "../pages/products/ProductsContext";
import { CompanyContextProvider } from "../pages/company/CompanyContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";
import Natural from "../pages/clientes/Natural/Natural";
import Legal from "../pages/clientes/Legal/Legal";
import Users from "../pages/users/UserList";
import Adviser from "../pages/adviser/AdviserList";
import Roles from "../pages/roles/RolesList";
import Products from "../pages/products/ProductsList";
import Company from "../pages/company/CompanyList";
import Metting from "../pages/app/Metting/Calender";
import EcomDashboard from "../pages/panel/e-commerce/index";
import Deals from "../pages/deals/DealsList";
import CustomerLibrary from "../pages/customerLibrary/CustomerLibrary";
import CustomerId from "../pages/customerLibrary/CustomerId";
import Documents from "../pages/documents/DocumentsList";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/index`} component={EcomDashboard}></Route>
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
          path={`${process.env.PUBLIC_URL}/natural`}
          render={() => (
            <NaturalContextProvider>
              <Natural />
            </NaturalContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/legal`}
          render={() => (
            <LegalContextProvider>
              <Legal />
            </LegalContextProvider>
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
            <CompanyContextProvider>
              <Company />
            </CompanyContextProvider>
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
          path={`${process.env.PUBLIC_URL}/deals`}
          render={() => (
            <RolesContextProvider>
              <Deals />
            </RolesContextProvider>
          )}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/documents`}
          render={() => (
            <RolesContextProvider>
              <Documents />
            </RolesContextProvider>
          )}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/products`}
          render={() => (
            <ProductsContextProvider>
              <Products />
            </ProductsContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/company`}
          render={() => (
            <CompanyContextProvider>
              <Company />
            </CompanyContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/calendar`} render={() => <Metting />}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/customer-library`}
            render={() => (
              <Route>
                <RolesContextProvider>
                  <CustomerLibrary />
                </RolesContextProvider>
              </Route>
            )}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/:id`}
            render={() => (
              <Route>
                <RolesContextProvider>
                  <CustomerId />
                </RolesContextProvider>
              </Route>
            )}
          ></Route>
        </Switch>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
