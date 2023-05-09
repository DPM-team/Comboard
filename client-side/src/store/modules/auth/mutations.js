export default {
  // The same method is used for the login and for the logout
  setUser(state, payload) {
    state.loggedUserID = payload.userID;
    state.loggedUserToken = payload.token;
  },

  setUserInfo(state, payload) {
    state.name = payload.name;
    state.surname = payload.surname;
  },

  setProfilePhoto(state, payload) {
    state.userImage = payload.photo;
    console.log(state);
  },
};
