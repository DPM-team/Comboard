<template>
  <base-section>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2 id="primary-header--id" class="primary-header text-center">Retrieve your account</h2>
        <h4 id="secondary-header--id" class="secondary-header text-center">Four simple steps and your account is back!</h4>
      </auth-header>
      <div class="progressbar">
        <div class="progress" id="progress"></div>
        <div id="step-1" class="progress-step progress-step-active" data-title="Account">1</div>
        <div id="step-2" class="progress-step" data-title="Confirm">2</div>
        <div id="step-3" class="progress-step" data-title="New Password">3</div>
        <div id="step-4" class="progress-step" data-title="Completed!">4</div>
      </div>
      <base-card>
        <div v-if="this.chechActiveStep(1)">
          <h5 class="form-title">Account Information</h5>
          <auth-form-input @data="getDataInput" id="email" type="email" name="email" placeholder="Email" required></auth-form-input>
        </div>
        <div v-else-if="this.chechActiveStep(2)">
          <h5 class="form-title">Verify the code you received via email</h5>
          <auth-form-input id="code" type="text" name="code" placeholder="Code" required></auth-form-input>
        </div>

        <div v-else-if="this.chechActiveStep(3)">
          <h5 class="form-title">Create new Password!</h5>
          <auth-form-input id="newPassword" type="text" name="code" placeholder="Password" required></auth-form-input>
        </div>
        <div v-else>
          <a href="" class="btn btn-final width-50 mc-auto">Go to Login</a>
        </div>
      </base-card>
      <div class="btns-group">
        <auth-form-input v-if="this.showButton()" type="button" value="Back" v-on:click="this.back"></auth-form-input>
        <auth-form-input v-if="this" type="submit" value="Next"></auth-form-input>
      </div>
    </auth-form>
  </base-section>
</template>

<script>
import BaseCard from "../../basic-components/BaseCard.vue";
import AuthForm from "../../auth/AuthForm.vue";
import BaseSection from "../../basic-components/BaseSection.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
export default {
  components: {
    BaseCard,
    AuthForm,
    AuthHeader,
    AuthFormInput,
    BaseSection,
  },
  emits: ["data"],
  data() {
    return {
      steps: [1],
      inputData: null,
    };
  },
  beforeUpdate() {
    console.log({
      email: this.inputData,
    });
    console.log(this.inputData);

    fetch("../retrieve-account/step-1/submit", {
      method: "POST",
      body: JSON.stringify({
        email: this.inputData,
      }),
    }).then((g) => {
      console.log(g);
      // console.log("duhiwj");
    });
    console.log("disjkl");
    // fetch("http://localhost:3000/retrieve-account/step-2/", {
    //   method: "post",
    //   mode: "no-cors",
    //   body: JSON.stringify({
    //     password: true,
    //   }),
    // });
  },
  methods: {
    submitForm() {
      this.calcStep();
    },
    chechActiveStep(step) {
      return this.getStep() === step ? true : false;
    },
    back() {
      if (this.steps.length > 0) {
        this.steps.pop();
        this.redirect();
      } else {
        this.steps.push(1);
      }
    },
    getDataInput(i) {
      this.inputData = i;
    },
    showButton() {
      return this.getStep() !== 1 ? true : false;
    },
    redirect() {
      this.$router.replace(`/retrieve-password/step-${this.getStep()}`);
    },
    calcStep() {
      if (this.steps.length < 4) {
        this.steps.push(this.getStep() + 1);
        this.redirect();
      } else {
        this.steps.push(1);
      }
    },

    getStep() {
      return this.steps[this.steps.length - 1];
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

.progress-step-active {
  background-color: #1a75ff;
}
</style>
