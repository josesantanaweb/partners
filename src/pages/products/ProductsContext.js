import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductsServices from "../../services/ProductsServices";
import { setAuthenticated } from "../../store/features/AuthSlice";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const products = await ProductsServices.getProducts();
      setData(products.data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        localStorage.removeItem("access_token");
        dispatch(setAuthenticated(false));
      }
    }
  };

  return <ProductsContext.Provider value={{ contextData: [data, setData] }}>{props.children}</ProductsContext.Provider>;
};
