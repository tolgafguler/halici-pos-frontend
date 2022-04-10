const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOG_OUT":
      return state;

    default:
      return state;
  }
};
export default authReducer;
