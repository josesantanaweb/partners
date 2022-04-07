import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomersServices from "../../services/CustomersServices";
import { setAuthenticated } from "../../store/features/AuthSlice";

export const CustomersContext = createContext();

export const CustomerContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const customers = await CustomersServices.getCustomers();
      setData(customers.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
        window.location.reload();
      }
    }
  };

  return (
    <CustomersContext.Provider value={{ contextData: [data, setData] }}>{props.children}</CustomersContext.Provider>
  );
};
