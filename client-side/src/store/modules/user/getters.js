export default {
  profilePhoto(state) {
    return state.profilePhoto;
  },
  banner(state) {
    return state.banner;
  },
  name(state) {
    return state.name;
  },
  surname(state) {
    return state.surname;
  },
  fullname(state) {
    return state.name + " " + state.surname;
  },
};
