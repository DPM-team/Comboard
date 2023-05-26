export default {
  async callAPI(context, payload) {
    try {
      await fetch(`/api/retrieve-account/step-${context.state.activeStep}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong ");
        }

        if (context.state.activeStep === 1) {
          context.commit("setStepCompleted", {
            step: "step1",
          });
          console.log("state");
        } else if (context.state.activeStep === 2) {
          context.commit("setStepCompleted", {
            step: "step2",
          });
        } else if (context.state.activeStep === 3) {
          context.commit("setStepCompleted", {
            step: "step3",
          });
        }
        context.commit("setActiveStep", {
          step: context.getters.getActiveStep + 1,
        });
      });
    } catch (e) {
      return new Error(e.message);
    }
  },
  setActive(context, payload) {
    context.commit("setActiveStep", {
      step: payload.activeStep,
    });
  },
};
