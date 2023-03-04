export default {
  setStep1(context) {
    context.commit("setStep", {
      step: "step1",
    });
  },
  setStep2(context) {
    context.commit("setStep", {
      step: "step2",
    });
  },
  setStep3(context) {
    context.commit("setStep", {
      step: "step3",
    });
  },
  setActive(context, payload) {
    context.commit("setActiveStep", {
      step: payload.activeStep,
    });
  },
};
