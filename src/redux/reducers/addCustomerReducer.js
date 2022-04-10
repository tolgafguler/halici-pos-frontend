import {toast} from 'react-toastify'

const addCustomerReducer = (state = {}, action) => {
 
    switch (action.type) {
    case "ADD_CUSTOMER": {
      toast.success("Müşteri Başarıyla Eklendi");
      return state;
    }
    case "ADD_CUSTOMER_ERR": {
      toast.error("Müşteri Eklenirken Bir Hata Oluştu");
      return state;
    }
    case "DELETE_CUSTOMER": {
      toast.warn("Müşteri Bilgileri Silindi");
      return state;
    }
    case "DELETE_CUSTOMER_ERR": {
      toast.error("Müşteri Bilgiler Silinirken Bir Hata Oluştu");
      return state;
    }
    default:
      return state;
  }
};
export default addCustomerReducer;
