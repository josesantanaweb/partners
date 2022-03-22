import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import AuthServices from '../../services/AuthServices';
import {setAuthenticated} from '../../store/features/AuthSlice'
import { isAuthenticatedSelector } from '../../store/selectors';

const Login = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log(formData)
      const response = await AuthServices.login(formData)
      localStorage.setItem("access_token", response.access_token);
      dispatch(setAuthenticated(true));
      setLoading(false);
     
    } catch (error) {
      setError("Cannot login with credentials");
      setLoading(false);
    }
  };

  
  const { errors, register, handleSubmit } = useForm();

  if (isAuthenticated) {
    window.history.pushState(
      `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
      "login",
      `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
    );
    window.location.reload();
  }

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <div className="login">
          <Block className="nk-block-middle nk-auth-body  wide-xs">
            <div className="brand-logo pb-4 text-center">
              <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
              </Link>
            </div>

            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <BlockHead>
                <BlockContent>
                  <BlockTitle tag="h4">Inicio de sesión</BlockTitle>
                  <BlockDes>
                    <p>Bienvenido a Partners & Advisers</p>
                  </BlockDes>
                </BlockContent>
              </BlockHead>
              {errorVal !== "" && (
                <div className="mb-3">
                  <Alert color="danger" className="alert-icon">
                    {" "}
                    <Icon name="alert-circle" /> Credenciales invalidas{" "}
                  </Alert>
                </div>
              )}
              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Correo Electronico
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="email"
                      id="default-01"
                      name="email"
                      defaultValue={"admin@mail.com"}
                      ref={register({ required: "Este campo es requerido" })}
                      placeholder="Enter your email address or username"
                      className="form-control-lg form-control"
                    />
                    {errors.email && <span className="invalid">{errors.email.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="password">
                      Contraseña
                    </label>
                    <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                      Olvido su Contraseña?
                    </Link>
                  </div>
                  <div className="form-control-wrap">
                    <a
                      href="#password"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setPassState(!passState);
                      }}
                      className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                    >
                      <Icon name="eye" className="passcode-icon icon-show"></Icon>

                      <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                    </a>
                    <input
                      type={passState ? "text" : "password"}
                      id="password"
                      name="password"
                      defaultValue={"12345678"}
                      ref={register({ required: "Este campo es requerido" })}
                      placeholder="Enter your passcode"
                      className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    />
                    {errors.password && <span className="invalid">{errors.password.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button size="lg" className="btn-block" type="submit" color="primary">
                    {loading ? <Spinner size="sm" color="light" /> : "Iniciar sesión"}
                  </Button>
                </FormGroup>
              </Form>
              <div className="form-note-s2 text-center pt-4">
                {" "}
                No tienes una cuenta? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Registrate</Link>
              </div>
            </PreviewCard>
          </Block>
          <AuthFooter />
        </div>
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
