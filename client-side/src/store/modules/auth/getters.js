export default {
  loggedUserID(state) {
    return state.loggedUserID;
  },
  loggedUserToken(state) {
    return state.loggedUserToken;
  },
  isAuthenticated(state) {
    // !state.loggedUserToken (Convert this to Boolean at first)
    // !!state.loggedUserToken take the truthy or falsy value
    // We do this convert because we want to return a Boolean value and not null or number
    return !!state.loggedUserToken;
  },
};
