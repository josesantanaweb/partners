import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Component";
import PageContainer from "../../layout/page-container/PageContainer";
const Error504Classic = () => {
  return (
    <PageContainer>
      <div className="nk-block nk-block-middle wide-xs mx-auto">
        <div className="nk-block-content nk-error-ld text-center">
          <h1 className="nk-error-head">504</h1>
          <h3 className="nk-error-title">Oops! Pagina no existe o en mantenimiento</h3>
          <p className="nk-error-text">
            Lamentamos mucho las molestias. Parece que está intentando acceder a una página que esta en construccion
             o no existe.
          </p>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Button color="primary" size="lg" className="mt-2">
              Back To Home
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
export default Error504Classic;
