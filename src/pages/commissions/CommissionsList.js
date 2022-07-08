import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Component";
import ErrorImage from "../../images/gfx/error-404.svg";
import PageContainer from "../../layout/page-container/PageContainer";

const Commissions = () => {
  return (
    <PageContainer>
      <div className="nk-block nk-block-middle wide-md mx-auto">
        <div className="nk-block-content nk-error-ld text-center">
          {/* <img className="nk-error-gfx" src={ErrorImage} alt="error" /> */}
          <div className="wide-xs mx-auto">
            <h3 className="nk-error-title">Módulo "Comisiones" en Desarrollo</h3>
            <p className="nk-error-text">
              Lamentamos mucho las molestias. Parece que está intentando acceder a una página que esta en desarrollo o
              en mantención
            </p>
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <Button color="primary" size="lg" className="mt-2">
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Commissions;
