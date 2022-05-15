import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomersServices from "../../../services/CustomersServices";
import { setAuthenticated } from "../../../store/features/AuthSlice";

export const NaturalContext = createContext();

export const NaturalContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomerNatural();
      setData(customers.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
        window.location.reload();
      }
    }
  };

  return <NaturalContext.Provider value={{ contextData: [data, setData] }}>{props.children}</NaturalContext.Provider>;
};
