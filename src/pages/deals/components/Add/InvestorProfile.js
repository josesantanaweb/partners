import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Col,
  RSelect,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "../../../../components/Component";
import { FormGroup, Modal, ModalBody, Form, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import imgGrafica from "../../../../assets/images/grafica1.png"
import imgGrafica2 from "../../../../assets/images/grafica2.png"


const InvestorProfile = ({ setModal, editData, selectClient, needDocument,requiredDocument}) => {

  return(
    <>
      <Col md="12">  
        <Form className="column align-items-center mt-4">
          <h6>1. HORIZONTE DE TIEMPO</h6>
          <label className="form-label mb-0">¿Cual es su horizonte de tiempo para esta inversion?</label><br />
          <label className="form-label">¿Cuando necesitara este dinero, o durante cuanto tiempo cree que mantendra esta inversion?</label>
          <FormGroup className="d-flex flex-column justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="horizonteQuestion" value="option1" />Menos de 3 años
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="horizonteQuestion" value="option2"/>3-5 años
            </div>
            <div class="form-check">
              <input type="radio" class="form-check-input" id="radio3" name="horizonteQuestion"/>6-10 años
              <label class="form-check-label"></label>
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="horizonteQuestion" value="option2"/>11 años o mas
            </div>
          </FormGroup>
          <hr />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6>2. EXPERIENCIA</h6>
          <label className="form-label mb-0">¿Cual de las siguiente opciones describe mejor su nivel de conocimiento sobre mercado de valores y sus productos?</label><br />
          <FormGroup className="d-flex flex-column justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" />Ninguno - sin conocimiento ni experienci sobre inversiones
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio" value="option2"/>Minimo - mi conocimiento es muy limitado y no tengo experiencia
            </div>
            <div class="form-check">
              <input type="radio" class="form-check-input" id="radio3" name="optradio"/>Bueno - Buen conocimiento y cierta experiencia en inverisones
              <label class="form-check-label"></label>
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio" value="option2"/>Amplio - Fuerte conocimiento y experiencia activa en inversiones
            </div>
          </FormGroup>
          <hr />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6>3. % DE ACTIVOS TOTALES</h6>
          <label className="form-label mb-0">¿Que porcentajes de sus activos totales liquidos(incluyendo dinero en efectivo, depositos, bonos, acciones, fondos mutuos, pero excluyendo inmuebles) representa esta inversion?</label><br />
          <FormGroup className="d-flex flex-column justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="optradio2" value="option1" />Mas de 75%
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio2" value="option2"/>Entre 50% - 75%
            </div>
            <div class="form-check">
              <input type="radio" class="form-check-input" id="radio3" name="optradio2"/>Entre 25% - 50%
              <label class="form-check-label"></label>
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio2" value="option2"/>Menos de 25%
            </div>
          </FormGroup>
          <hr />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6 className="mb-2">4. Objectivos de inversion</h6>
          <label className="form-label mb-2">¿Cual de estas frases describre mejor sus objectivos de inversion para esta inversion en particular?</label><br />
          <FormGroup className="d-flex flex-column justify-content-center">
            <div class="form-check mb-2">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="optradio3" value="option1" />
              Lo que mas me import es la seguridad de mi inversion inicial. Prefiero correr un riesgo muy pequeño o evitar cualquier riesgo de sufrir perdidas.
              Me conformo con que mi inversiones renten al menos la inflacion, ya que no quiero arriesgarme a perder dinero.
            </div>
            <div class="form-check mb-2">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio3" value="option2"/>Puedo aceptar perdidas pequeñas a corto plazo, pero me import la seguridad de mi inversion
            </div>
            <div class="form-check mb-2">
              <input type="radio" class="form-check-input" id="radio3" name="optradio3"/>Busco equilibrio entre la seguridad de la inversion y el potencial crecimiento de la misma. Me gustaria que mis inversiones rentaran mas que la inflacion a largo plazo, aun cuando existe algo de riesgo que estas sufran alto y bajos en los precios a corto plazo.
              <label class="form-check-label"></label>
            </div>
            <div class="form-check mb-2">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio3" value="option2"/>Busco el crecimiento de la inversion y estoy dispuesto a aceptar algunas perdidas para obtener un crecimiento potencialmente mayor. 
            </div>
            <div class="form-check mb-2">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio3" value="option2"/>Estoy dispuesto a aceptar un riesgo significativo y pontenciales perdidas para lograr un mayor crecimiento de inversion en el largo plazo.
              Me gustaria que mis inverisones superen ampliamente la inflacion a largo plazo. aun corriendo un mayor riego de perdidas en el corto plazo.
            </div>
          </FormGroup>
          <hr />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6>5. RIESGO Y VOLATILIDAD</h6>
          <label className="form-label mb-0">¿Cual es su actitud frente a la volatilidad del mercado a corto plazo?</label><br />
          <FormGroup className="d-flex flex-column justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="optradio4" value="option1" />Generalmente entro en panico cuando el mercado cae.
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio4" value="option2"/>Algunas veces sobre-reacciono ante las fluctuaciones del mercado.
            </div>
            <div class="form-check">
              <input type="radio" class="form-check-input" id="radio3" name="optradio4"/>Paciente pero preocupado; adopto una actitud de esperar a ver que pasa.
              <label class="form-check-label"></label>
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio4" value="option2"/>La volatilidad en el corto plazo No me afecta
            </div>
          </FormGroup>
          <hr />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6>6. EL SIGUIENTE GRAFICO; muestra la evolucion del valor de tres portafolios de inversion hipoteticos, para un periodo de 4 años.
            Los portafolios mas riesgosos experimentan variaciones (mas frecuentes y profundas en su valor, sin embargo, tienen un mayor retorno esperado a largo plazo)
          </h6>
          <label className="form-label mb-0">¿En cual de los portafolios se sentiria mas comodo invirtiendo?</label><br />
          <Col md="12">
            <div className="d-flex justify-content-around">
              <FormGroup className="d-flex flex-column justify-content-center">
                <div class="form-check">
                  <label class="form-check-label" for="radio1"></label>
                  <input type="radio" class="form-check-input" id="radio1" name="optradio5" value="option1" />Portafolio 1
                </div>
                <div class="form-check">
                  <label class="form-check-label" for="radio2"></label>
                  <input type="radio" class="form-check-input" id="radio2" name="optradio5" value="option2"/>Portafolio 2
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="radio3" name="optradio5"/>Portafolio 3
                  <label class="form-check-label"></label>
                </div>
              </FormGroup>
              <img src={imgGrafica} alt="Grafica" width={600} height={250} />
            </div>
          </Col>
          <hr />
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6>7. LA GRAFICAS DEL CUADRADO QUE APARECE A CONTINUACION; muestra el rendimiento de cinco inversiones hipoteticas diferentes.
            Cada barra muestra los posibles rendimientos de la s inverisones en un año.
          </h6>
          <label className="form-label mb-0">¿Con cual de estas inversiones se sentiria mas comodo?</label><br />
          <Col md="12">
            <div className="d-flex justify-content-around">
              <FormGroup className="d-flex flex-column justify-content-center">
                <div class="form-check">
                  <label class="form-check-label" for="radio1"></label>
                  <input type="radio" class="form-check-input" id="radio1" name="optradio6" value="option1" />Portafolio A
                </div>
                <div class="form-check">
                  <label class="form-check-label" for="radio2"></label>
                  <input type="radio" class="form-check-input" id="radio2" name="optradio6" value="option2"/>Portafolio B
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="radio3" name="optradio6"/>Portafolio C
                  <label class="form-check-label"></label>
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="radio3" name="optradio6"/>Portafolio D
                  <label class="form-check-label"></label>
                </div>
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="radio3" name="optradio6"/>Portafolio E
                  <label class="form-check-label"></label>
                </div>
              </FormGroup>
              <img src={imgGrafica2} alt="Grafica" width={600} height={250} />
            </div>
          </Col>  
          <hr />
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <h6>8. CONSIDERE EL SIGUIENTE ESCENARIO: Imagine que durante los ultimos 3 meses de bolsa de valores
            tuvo una perdida de 25%. Algunos fondos de su portafolio tambien estan perdiendo 25% de su valor.
          </h6>
          <label className="form-label mb-0">¿Que haria usted?</label><br />
          <FormGroup className="d-flex flex-column justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="optradio7" value="option7" />Vender el 100% de los fondos.
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio7" value="option7"/>Vender parte de los fondos.
            </div>
            <div class="form-check">
              <input type="radio" class="form-check-input" id="radio3" name="optradio7"/>Transferir parte a un fondo mas conservador.
              <label class="form-check-label"></label>
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2"></label>
              <input type="radio" class="form-check-input" id="radio2" name="optradio7" value="option7"/>Analizaria las perspectivas del activo y compraria mas unidades del mismo fondo (siempre que los fundamentos asi lo justifiquen).
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio1"></label>
              <input type="radio" class="form-check-input" id="radio1" name="optradio7" value="option7" />No haria nada.
            </div>
          </FormGroup>
        </Form>
      </Col>
    </>
  )
}

export default InvestorProfile;