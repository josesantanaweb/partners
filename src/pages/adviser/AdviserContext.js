import React, { useState, createContext } from "react";
import { userData } from "./UserData";

export const AdviserContext = createContext();

export const AdviserContextProvider = (props) => {
  const [data, setData] = useState(userData);

  return <AdviserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</AdviserContext.Provider>;
};
