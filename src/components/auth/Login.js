import React,{useState}  from "react";
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
  CLink
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import firebase from "../../config/firebaseConfig";
import { connect } from 'react-redux'

const Login = ({uid}) => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [LoggedInError, setLoggedInError] = useState(false);
  
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {LoggedIn && uid ? (
        <Redirect to="/" />
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
                          <h1>Oturum A??</h1>
                          <p className="text-muted">
                            Hesab??n??zla Giri?? Yap??n??z
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
                              placeholder="??ifre"
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
                                Giri?? Yap
                              </CButton>
                            </CCol>

                            <CCol xs="6" className="text-right">
                              {LoggedInError ? (
                                <div>
                                  <p>Mail Veya ??ifre Hatal??</p>
                                </div>
                              ) : (
                                <span></span>
                              )}
                              <CButton color="link" className="px-0">
                                ??ifrenizi mi unuttunuz ?
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
                      <h2>Kay??t Ol</h2>
                      <p></p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          ??imdi Kay??t Ol
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

const mapStateToProps = (state) => {
  //console.log(state);
  const uid = state.firebase.auth.uid;
  return{
    uid 
  }
}


export default connect(mapStateToProps)(Login);
