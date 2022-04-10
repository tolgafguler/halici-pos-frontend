import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {deleteCustomer} from "../../redux/actions/customerActions"



import {
  CButton,
  CCard,
  CCollapse,
  CBadge,
  CCardBody,
  CDataTable,
  CAlert,
  CContainer
} from "@coreui/react";




const CustomerList = ({customers,deleteCustomer}) => {

  const [details, setDetails] = useState([]);

  
  const fields = [
    { key: "MüşteriAdı", _style: { width: "20%" } },
    { key: "Telefon", _style: { width: "18%" } },
    { key: "Adres", _style: { width: "50%" } },
    { key: "Durum", _style: { width: "8%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Aktif Siparişi Var":
        return "success";
      case "Aktif Siparişi Yok":
        return "danger";
      case "Pending":
        return "secondary";
      case "Banned":
        return "warning";
      default:
        return "primary";
    }
  };
  const handleDelete = customer => {
    deleteCustomer(customer);
  }

  return (
    <>
    
      <CCard style={{ backgroundColor: "#f1f3f4" }}>
        <CCardBody>
          <CDataTable
            items={
              customers &&
              customers.map((customer) => ({
                MüşteriAdı: customer.customerName,
                Telefon: customer.phone,
                Adres: customer.address,
                KayıtTarihi: customer.date.toDate().toLocaleDateString("tr-TR"),
                Durum:customer.status,
                Key:customer.id
                
              }))
            }
            fields={fields}
            columnFilter
            tableFilter={{ label: "Müşteri Ara:", placeholder: " " }}
            itemsPerPageSelect={{
              label: "Sayfa Başına Müşteri Sayısı:",
              values: [5, 10, 20, 50],
            }}
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              Durum: (item) => (
                <td>
                  <CBadge color={getBadge(item.Durum)}>{item.Durum}</CBadge>
                </td>
              ),
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        const position = details.indexOf(index);
                        let newDetails = details.slice();
                        if (position !== -1) {
                          newDetails.splice(position, 1);
                        } else {
                          newDetails = [...details, index];
                        }
                        setDetails(newDetails);
                      }}
                    >
                      {details.includes(index) ? " Gizle " :  "Ayrıntılar"}
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <h4>{item.customerName}</h4>
                      <p className="text-muted">Kayıt Tarihi: {item.KayıtTarihi}</p>
                      
                      <CButton size="sm" color="danger" className="ml-1" onClick = {() => handleDelete(item.Key)}>
                        Sil
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          
            
          />
        </CCardBody>
      </CCard>
      

      
    </>
  );
};

const mapDispatchToProps = dispatch => {
  
  return {
    deleteCustomer: customer => dispatch(deleteCustomer(customer)),
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  const customers = state.firestore.ordered.customers;
  return {
    customers: customers,
    uid: state.firebase.auth.uid
  };
};

export default compose(
  
  connect(mapStateToProps),
  firestoreConnect((ownProps) => [
    {
      collection: "HalıYıkamacılar",
      doc:ownProps.uid,
      subcollections:[{collection:'customers'}],
      where:["authorId","==",ownProps.uid],
      orderBy:["date","desc"],
      storeAs: "customers"
    
      
      
      
      
      
      
    },
  ]),
  connect(null,mapDispatchToProps)
  
)(CustomerList);
