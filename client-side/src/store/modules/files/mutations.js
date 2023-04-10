export default {
  setFiles(state, payload) {
    payload.files.forEach((file) => {
      state.files.push(file);
    });
  },

  setNextFiles(state, payload) {
    let array = [];
    payload.files.forEach((file, ind) => {
      array[ind] = file;
    });

    state.nextFiles = array;
  },

  setNextFilesg(state) {
    state.nextFiles = [];
  },
};
