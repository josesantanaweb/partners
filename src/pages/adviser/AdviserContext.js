import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import AdvisersServices from "../../services/AdvisersServices";
import { setAuthenticated } from "../../store/features/AuthSlice";

export const AdviserContext = createContext();

export const AdviserContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAdviser();
  }, []);

  const getAdviser = async () => {
    try {
      const advisers = await AdvisersServices.getAdvisers();
      setData(advisers.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
      }
    }
  };

  return <AdviserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</AdviserContext.Provider>;
};
