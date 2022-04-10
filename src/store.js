import { createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {firebaseReducer,getFirebase} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import addCustomerReducer from './redux/reducers/addCustomerReducer'
import authReducer from "./redux/reducers/authReducer"



const initialState = {
  sidebarShow: 'responsive'
}


const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}


const rootReducers = combineReducers({
  changeState,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
 
  customer:addCustomerReducer,
  auth:authReducer
 
})



const store = createStore(
  rootReducers,
  applyMiddleware(thunk.withExtraArgument({ getFirebase }))
  );

export default store