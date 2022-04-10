import React, { Component } from "react";
import { connect } from "react-redux";
import { addCustomer } from "../../redux/actions/customerActions";
import NumberFormat from "react-number-format";




import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,

} from "@coreui/react";




class addCustomers extends Component {

 

  state = {
    customerName: "",
    address: "",
    phone: "",
    city: "",
    status:"Aktif Siparişi Yok"
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addCustomer(this.state);
    console.log(this.state);
  };

  render() {
    
    return (
      <>
      <CRow  >
        <CCol xs="12" sm="14" md="12" >
          <CCard>
            <CCardHeader
              style={{
                marginLeft: "20%",
                backgroundColor: "#8599ad",
                marginRight: "20%",
              }}
            >
              <h6
                id="traffic"
                className="card-title mb-0"
                style={{ textAlign: "center", color: "white" }}
              >
                Yeni Müşteri Oluştur
              </h6>
            </CCardHeader>
            <CCardBody>
              <form
                className="container"
                autoComplete="off"
                onSubmit={this.handleSubmit}
              >
                <legend></legend>
                <div className="form-group">
                  <label>İsim ve Soyisim</label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    style={{ width: "60%" }}
                    onChange={this.handleChange}
                  />
                  <br></br>
                  <label>Telefon Numarası</label>
                  <NumberFormat
                    format="+90 (###) ### ## ##"
                    allowEmptyFormatting
                    mask="_"
                    className="form-control"
                    id="phone"
                    style={{ width: "60%" }}
                    onChange={this.handleChange}
                  />
                  <br></br>
                  <CRow>
                  <CCol xs="8">
                  <label>Adres</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    onChange={this.handleChange}
                  />
                  </CCol>
                  <CCol xs="4">
                  <label>Şehir</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    
                    onChange={this.handleChange}
                  />
                  </CCol>
                  </CRow>
                  <br></br>
                  <br></br>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CButton
                    type="submit"
                    active
                    color="success"
                    aria-pressed="true"
                  >
                    Müşteri Ekle
                  </CButton>
                </div>
              </form>
            </CCardBody>
         </CCard>
        </CCol>
        
            
        </CRow>
        
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    addCustomer: (customer) => dispatch(addCustomer(customer)),
    
  };
};




export default connect(null, mapDispatchToProps)(addCustomers);
