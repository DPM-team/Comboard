<template>
  <base-section>
    <auth-form @submit.prevent="submitForm" class="w">
      <h2 id="primary-header--id" class="primary-header text-center">Create an Organization</h2>
      <h4 id="secondary-header--id" class="secondary-header text-center">Complete the steps to create an Organizatons</h4>
      <div class="progressbar">
        <div class="progress" id="progress"></div>
        <div id="step-1" class="progress-step" :class="[{ progressStepActive: this.progressStepActive(1) }]">1</div>
        <div id="step-2" class="progress-step" :class="[{ progressStepActive: this.progressStepActive(2) }]">2</div>
      </div>
      <base-card>
        <auth-header> </auth-header>
        <div v-if="this.step === 1">
          <auth-form-input @data="getDataInput" id="name" type="text" name="name" placeholder="Name of Organization" required></auth-form-input>
          <select name="type" id="type" @data="getDataInput">
            <option value="Business">Business</option>
            <option value="University">University</option>
            <option value="Simple">Simple</option>
          </select>
          <auth-form-input @data="getDataInput" id="email" type="email" name="email" placeholder="Email of Organization" required></auth-form-input>
          <auth-form-input @data="getDataInput" id="phone" type="tel" name="phone" placeholder="Phone of Organization" required></auth-form-input>
        </div>
        <div v-else>
          <auth-form-input @data="getDataInput" id="vatNumber" type="text" name="vatnumber" placeholder="VAT Number" required></auth-form-input>
          <auth-form-input @data="getDataInput" id="location" type="text" name="location" placeholder="Location" required></auth-form-input>
          <auth-form-input @data="getDataInput" id="phone" type="phone" name="code" placeholder="Email of Organization" required></auth-form-input>
        </div>
      </base-card>
      <div class="btns-group">
        <auth-form-input v-if="this.step === 2" type="button" value="Back" @click="this.back"></auth-form-input>
        <auth-form-input type="submit" value="Next"></auth-form-input>
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
      inputsData: [],
      step: 1,
    };
  },
  methods: {
    submitForm() {
      console.log(this.inputsData);
      if (this.step < 2) {
        this.next();
      } else {
        //this
      }
    },
    back() {
      this.step--;
    },
    progressStepActive(step) {
      return this.step === step ? true : false;
    },
    next() {
      this.step++;
    },
    getDataInput(i) {
      this.inputsData[this.inputsData.length] = i;
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
  margin: 2rem 0;
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
