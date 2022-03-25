import React, { useState, createContext, useEffect } from "react";
// import { userData } from "./UserData";
import UsersServices from "../../services/UsersServices";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const users = await UsersServices.getUsers();
      // console.log(users.data)
      setData(users.data)
    } catch (error) {
      
    }
  }
  

  return <UserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</UserContext.Provider>;
};
