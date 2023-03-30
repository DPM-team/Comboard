export default {
  setFiles(state, payload) {
    console.log(payload);
    payload.files.forEach((file) => {
      state.files.push(file);
    });
  },
};
