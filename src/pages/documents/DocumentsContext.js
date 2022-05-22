import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import DocumentsServices from "../../services/DocumentsServices";
import { setAuthenticated } from "../../store/features/AuthSlice";

export const DocumentsContext = createContext();

export const DocumentsContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = async () => {
    try {
      const documents = await DocumentsServices.getDocuments();
      setData(documents.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
        window.location.reload();
      }
    }
  };

  return (
    <DocumentsContext.Provider value={{ contextData: [data, setData] }}>{props.children}</DocumentsContext.Provider>
  );
};
