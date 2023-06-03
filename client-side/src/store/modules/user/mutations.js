export default {
  setProfilePhoto(state, payload) {
    state.profilePhoto = payload.profilePhoto;
  },

  setBanner(state, payload) {
    state.banner = payload.banner;
  },

  setUserInfo(state, payload) {
    state.name = payload.name;
    state.surname = payload.surname;
  },
};
