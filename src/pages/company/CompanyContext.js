import React, { useState, createContext } from "react";
import { CompanyData } from "./CompanyData";

export const CompanyContext = createContext();

export const CompanyProvider = (props) => {
  const [data, setData] = useState(CompanyData);

  return <CompanyContext.Provider value={{ contextData: [data, setData] }}>{props.children}</CompanyContext.Provider>;
};
