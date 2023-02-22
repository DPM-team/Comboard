export default {
  setStep(state, payload) {
    state[payload.step] = true;
  },
};
