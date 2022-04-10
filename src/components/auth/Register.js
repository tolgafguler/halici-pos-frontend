import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import firebase from "../../config/firebaseConfig";

const Register = () => {
  const [registerError, setRegisterError] = useState(false);
  const [registerResponse, setRegisterResponse] = useState(false);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
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
                      .createUserWithEmailAndPassword(data.email, data.password)
                      .then((response) => {
                        setRegisterResponse(true);
                        setRegisterError(false);
                      })
                      .catch((error) => {
                        setRegisterError(true);
                        setRegisterResponse(false);
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
                      <h1>Kayıt Ol</h1>
                      <p className="text-muted">Yeni Hesap Oluştur</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          name="email"
                          placeholder="e-mail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          autoComplete="email"
                        />
                      </CInputGroup>
                      <div>{errors.email && touched.email && errors.email}</div>
                      <CInputGroup className="mb-3">
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
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                      <div>
                        {errors.password && touched.password && errors.password}

                        {registerError ? (
                          <div>
                            <p>kullanıcı zaten kayıtlı</p>
                          </div>
                        ) : (
                          <span></span>
                        )}
                        {registerResponse ? (
                          <div>
                            <p>başarılı kayıt</p>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </div>
                      <div className="register-button">
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-4"
                          disabled={isSubmitting}
                        >
                          Kayıt Ol
                        </CButton>
                      </div>
                    </form>
                  )}
                </Formik>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    
                  </CCol>
                  <CCol xs="12" sm="6">
                    
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
