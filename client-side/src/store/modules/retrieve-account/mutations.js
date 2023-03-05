export default {
  setStepCompleted(state, payload) {
    state[payload.step] = true;
    console.log(state);
  },
  setActiveStep(state, payload) {
    state.activeStep = payload.step;
  },
};
