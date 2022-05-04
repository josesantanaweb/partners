import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import RolesServices from "../../services/RolesServices";
import { setAuthenticated } from "../../store/features/AuthSlice";

export const RolesContext = createContext();

export const RolesContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const roles = await RolesServices.getRoles();
      setData(roles.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
        window.location.reload();
      }
    }
  };

  return <RolesContext.Provider value={{ contextData: [data, setData] }}>{props.children}</RolesContext.Provider>;
};
