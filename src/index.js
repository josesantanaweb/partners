import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";

const Error404Modern = lazy(() => import("./pages/error/404-modern"));

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Suspense fallback={<div />}>
        <Router basename={`/`}>
          <Route render={({ location }) => (location.state && location.state.is404 ? <Error404Modern /> : <App />)} />
        </Router>
      </Suspense>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
