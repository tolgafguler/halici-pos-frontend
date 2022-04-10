import * as actionTypes from "./actionTypes";
export const logOut = () => {
    return (dispatch,getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch({
                type : actionTypes.LOG_OUT});
        })
        
    };
};