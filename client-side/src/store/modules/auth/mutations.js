export default {
  // The same method is used for the login and for the logout
  setUser(state, payload) {
    state.loggedUserID = payload.userID;
    state.loggedUserToken = payload.token;
  },
};
