export default {
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
  setStep4() {
    context.commit("setStep", {
      step: "step2",
    });
  },
};
