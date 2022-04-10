import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import firebase from "../../../config/firebaseConfig";

const Login = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [LoggedInError, setLoggedInError] = useState(false);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {LoggedIn ? (
        <Redirect from="/login" to="/" />
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Zorunlu Alan";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email =
                            "Mail Adresinizi uygun formatta giriniz";
                        }
                        if (!values.password) {
                          errors.password = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);

                        firebase
                          .auth()
                          .signInWithEmailAndPassword(data.email, data.password)
                          .then((response) => {
                            setLoggedIn(true);
                            setLoggedInError(false);
                          })
                          .catch((error) => {
                            setLoggedIn(false);
                            setLoggedInError(true);
                          });

                        setSubmitting(false);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <h1>Oturum Aç</h1>
                          <p className="text-muted">
                            Hesabınızla Giriş Yapınız
                          </p>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="email"
                              name="email"
                              placeholder="e-mail"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              autoComplete="username"
                            />
                          </CInputGroup>
                          <div>
                            {errors.email && touched.email && errors.email}
                          </div>
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              placeholder="Şifre"
                              autoComplete="current-password"
                            />
                          </CInputGroup>
                          <div>
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </div>
                          <CRow>
                            <CCol xs="6">
                              <CButton
                                type="submit"
                                disabled={isSubmitting}
                                color="primary"
                                className="px-4"
                              >
                                Giriş Yap
                              </CButton>
                            </CCol>

                            <CCol xs="6" className="text-right">
                              {LoggedInError ? (
                                <div>
                                  <p>Mail Veya Şifre Hatalı</p>
                                </div>
                              ) : (
                                <span></span>
                              )}
                              <CButton color="link" className="px-0">
                                Şifrenizi mi unuttunuz ?
                              </CButton>
                            </CCol>
                          </CRow>
                        </form>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Kayıt Ol</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Şimdi Kayıt Ol
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  );
};

export default Login;
