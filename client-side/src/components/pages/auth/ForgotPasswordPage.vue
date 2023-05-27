<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }} </base-card>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2 id="primary-header--id" class="primary-header text-center">Retrieve your account</h2>
        <h4 id="secondary-header--id" class="secondary-header text-center">Four simple steps and your account is back!</h4>
      </auth-header>
      <div class="progressbar">
        <div class="progress" id="progress"></div>
        <div id="step-1" class="progress-step" :class="[completedStep1, { progressStepActive: checkActiveStep(1) }]" data-title="Account">1</div>
        <div id="step-2" class="progress-step" :class="[completedStep2, { progressStepActive: checkActiveStep(2) }]" data-title="Confirm">2</div>
        <div id="step-3" class="progress-step" :class="[completedStep3, { progressStepActive: checkActiveStep(3) }]" data-title="New Password">3</div>
        <div id="step-4" class="progress-step" :class="[completedStep3, { progressStepActive: checkActiveStep(4) }]" data-title="Completed!">4</div>
      </div>
      <base-card>
        <div v-if="checkActiveStep(1)">
          <h5 class="form-title">Account Information</h5>
          <input v-model="insertedEmail" id="email" type="email" name="email" placeholder="Email" phdIcon="envelope" required />
        </div>
        <div v-else-if="checkActiveStep(2)">
          <h5 class="form-title">Verify the code you received via email</h5>
          <input v-model="insertedVerificationCode" id="code" type="text" name="code" placeholder="Code" phdIcon="key" required />
        </div>
        <div v-else-if="checkActiveStep(3)">
          <h5 class="form-title">Create new Password!</h5>
          <input v-model="insertedNewPassword" id="newPassword" type="password" name="code" placeholder="Password" phdIcon="lock" required />
        </div>
        <div v-else>
          <a href="/login" class="btn btn-final width-50 mc-auto">Go to Login</a>
        </div>
      </base-card>
      <div class="btns-group">
        <input v-if="showButton(1)" type="button" value="Back" @click="back()" />
        <input v-if="showButton(4)" type="submit" value="Next" />
      </div>
    </auth-form>
  </base-section>
</template>

<script>
import BaseCard from "../../basic-components/BaseCard.vue";
import AuthForm from "../../auth/AuthForm.vue";
import BaseSection from "../../basic-components/BaseSection.vue";
import AuthHeader from "../../auth/AuthHeader.vue";

export default {
  components: {
    BaseCard,
    AuthForm,
    AuthHeader,
    BaseSection,
  },
  data() {
    return {
      insertedEmail: null,
      insertedVerificationCode: null,
      insertedNewPassword: null,
      errorMessage: "",
    };
  },
  computed: {
    completedStep1() {
      return {
        completedStep: this.$store.getters.getStep1,
      };
    },
    completedStep2() {
      return {
        completedStep: this.$store.getters.getStep2,
      };
    },
    completedStep3() {
      return {
        completedStep: this.$store.getters.getStep3,
      };
    },
    setActive(step) {
      if (step === this.$store.getters.getActiveStep) {
        return {
          progressStepActive: true,
        };
      } else {
        return { progressStepActive: false };
      }
    },
  },
  methods: {
    submitForm() {
      if (this.$store.getters.getActiveStep < 4) {
        this.callStepApi();
        console.log(this.$store.getters.getStep1);
      } else {
        this.$store.dispatch("setActive", {
          activeStep: this.$store.getters.getActiveStep++,
        });
      }
    },
    checkActiveStep(numStep) {
      return this.$store.getters.getActiveStep === numStep ? true : false;
    },
    back() {
      if (this.$store.getters.getActiveStep > 0) {
        this.$store.dispatch("setActive", {
          activeStep: this.$store.getters.getActiveStep - 1,
        });
      } else {
        this.$store.dispatch("setActive", {
          activeStep: 1,
        });
      }
      this.redirect();
    },
    showButton(numStep) {
      return this.$store.getters.getActiveStep !== numStep ? true : false;
    },
    redirect() {
      this.$router.replace(`/retrieve-password/step-${this.$store.getters.getActiveStep}`);
    },
    async callStepApi() {
      try {
        if (this.$store.getters.getActiveStep === 1) {
          const email = JSON.stringify({
            email: this.insertedEmail,
          });

          await this.$store.dispatch("callAPI", email).then((res) => {
            if (res instanceof Error) {
              throw res;
            }

            this.errorMessage = "";
            this.redirect();
          });
        } else if (this.$store.getters.getActiveStep === 2) {
          const password = JSON.stringify({
            password: this.insertedVerificationCode,
          });

          await this.$store.dispatch("callAPI", password).then((res) => {
            if (res instanceof Error) {
              throw res;
            }

            this.errorMessage = "";
            this.redirect();
          });
        } else if (this.$store.getters.getActiveStep === 3) {
          const password = JSON.stringify({
            password: this.insertedNewPassword,
          });

          await this.$store.dispatch("callAPI", password).then((res) => {
            if (res instanceof Error) {
              throw res;
            }
            
            this.errorMessage = "";
            this.redirect();
          });
        }
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
  },
};
</script>

<style scoped>
h4 {
  color: #a0a6b0;
}

h2,
h4 {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2px;
}
/* Progressbar */
.progressbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 4rem;
}

.form-title {
  font-size: 0.85rem;
  color: var(--primary-dark-color);
  margin: 5px 0 0 0;
}

.progressbar::before,
.progress {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 3px;
  width: 100%;
  background-color: #ccc;
  z-index: -1;
}

div {
  margin: 10px;
}

.progress {
  background-color: #1a75ff;
  width: 0%;
  transition: 0.5s;
}

.progress-step {
  width: 45px;
  height: 45px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.7s;
  font-size: 1.5rem;
  color: #ffffff;
}

.progress-step::after {
  content: attr(data-title);
  position: absolute;
  top: calc(100% + 0.5rem);
  font-size: 0.75rem;
  color: #000000;
}

.btns-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.completedStep {
  background-color: green;
}

.progressStepActive {
  background-color: #1a75ff;
}
</style>
