export default {
  setProfilePhoto(state, payload) {
    state.profilePhoto = payload.profilePhoto;
  },

  setUserInfo(state, payload) {
    state.name = payload.name;
    state.surname = payload.surname;
  },
};
