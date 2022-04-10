import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {isLoaded} from 'react-redux-firebase'
import firebase from './config/firebaseConfig'
import {createFirestoreInstance} from 'redux-firestore'

import { icons } from './assets/icons'
import { Provider } from 'react-redux'
import {useSelector} from 'react-redux'

import store from './store'


React.icons = icons
const rrfProps= {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if(!isLoaded(auth))
    return(
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    );
    return children;
}


ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
       <App/>
      </AuthIsLoaded> 
    </ReactReduxFirebaseProvider>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
