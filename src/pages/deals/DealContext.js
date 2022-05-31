import React, { useState, createContext } from "react";
import { DealData } from "./DealData";

export const DealContext = createContext();

export const DealProvider = (props) => {
  const [data, setData] = useState(DealData);

  return <DealContext.Provider value={{ contextData: [data, setData] }}>{props.children}</DealContext.Provider>;
};

export default DealProvider;
