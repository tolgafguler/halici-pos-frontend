import * as actionTypes from "./actionTypes";

export const addCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("HalıYıkamacılar")
      .doc(authorId)
      .collection("customers")
      .add({
        ...customer,
        authorId:authorId,
        date: new Date(),
      })
      .then(() => {
        dispatch({
          type: actionTypes.ADD_CUSTOMER,
          payload: customer,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.ADD_CUSTOMER_ERR,
          err,
        });
      });
  };
};

export const deleteCustomer = customer => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("HalıYıkamacılar")
      .doc(getState().firebase.auth.uid)
      .collection("customers")
      .doc(customer)
      .delete()
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_CUSTOMER,
          });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_CUSTOMER_ERR,
          err,
        });
      });
  };
};