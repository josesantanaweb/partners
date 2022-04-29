import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import CompanyServices from "../../services/CompanyServices";
import { setAuthenticated } from "../../store/features/AuthSlice";

export const CompanyContext = createContext();

export const CompanyContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const company = await CompanyServices.getCompany();
      setData(company.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
        window.location.reload();
      }
    }
  };

  return <CompanyContext.Provider value={{ contextData: [data, setData] }}>{props.children}</CompanyContext.Provider>;
};
