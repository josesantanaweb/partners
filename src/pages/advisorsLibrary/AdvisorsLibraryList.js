import React from "react";
import { Block } from "../../components/Component";
import Head from "../../layout/head/Head";

const AdvisorsLibrary = () => {
  return (
    <React.Fragment>
      <Head title="Librería de Asesores"></Head>
      <Block>
        <iframe
          style={{ width: "100%", height: "100vh", border: "none" }}
          src="https://partnersadvisers.cl/gestioninmobiliaria/corretajedepropiedades/"
        ></iframe>
      </Block>
      <Block>
        <iframe
          style={{ width: "100%", height: "100vh", border: "none" }}
          src="https://partnersadvisers.cl/gestioninmobiliaria/modelo-irs/"
        ></iframe>
      </Block>
    </React.Fragment>
  );
};

export default AdvisorsLibrary;
