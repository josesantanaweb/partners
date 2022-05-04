import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from 'react-redux';
import UsersServices from "../../services/UsersServices";
import {setAuthenticated} from '../../store/features/AuthSlice'

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const users = await UsersServices.getUsers();
      setData(users.data)
    } catch (error) {
      if(error.response.data.message === 'Unauthorized') {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
        window.location.reload()
      }
    }
  }
  

  return <UserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</UserContext.Provider>;
};
