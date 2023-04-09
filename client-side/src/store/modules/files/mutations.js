export default {
  setFiles(state, payload) {
    let array = [];
    payload.files.forEach((file, ind) => {
      array[ind] = file;
    });

    state.nextFiles = array;

    // console.log(state.nextFiles);

    payload.files.forEach((file) => {
      state.files.push(file);
    });
  },
};
