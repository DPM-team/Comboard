<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }} </base-card>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2>Join Our Community!</h2>
        <h4 style="padding-bottom: 10px">Create an account with a few steps</h4>
      </auth-header>
      <auth-form-input @data="getName" id="firstname" name="name" :value="name" type="text" placeholder="Firstname" phdIcon="pen" required />
      <auth-form-input @data="getSurname" id="surname" name="surname" :value="surname" type="text" placeholder="Surname" phdIcon="pen" required />
      <auth-form-input @data="getUsername" id="username" name="username" :value="username" type="text" placeholder="Username" phdIcon="user" required />
      <auth-form-input @data="getEmail" id="email" name="email" type="email" :value="email" placeholder="Email" phdIcon="envelope" required />
      <auth-form-input @data="getPassword" id="password" name="password" :value="password" type="password" placeholder="Password" :minLength="8" phdIcon="lock" required />
      <p id="password-mandatory">Use 8 or more characters with a combination of letters, numbers and symbols</p>
      <auth-form-input
        @data="getPasswordConfirmation"
        id="confirm-password"
        name="confirmedPassword"
        :value="passwordConfirmation"
        type="password"
        placeholder="Confirm Password"
        :minLength="8"
        phdIcon="lock"
        required
      />
      <auth-form-input id="login-btn" name="loginButton" type="submit" value="Agree & Join" />
      <p id="agreement">By clicking Agree & Join, you agree to the comboard <a href="/user-agreement">User Agreement</a> and <a href="/privacy-policy">Privacy Policy.</a></p>
    </auth-form>
    <p id="login-account">
      Already on Comboard?
      <router-link id="login-now" to="/login">Login</router-link>
    </p>
  </base-section>
</template>

<script>
import AuthForm from "../../auth/AuthForm.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import BaseSection from "../../basic-components/BaseSection.vue";
import BaseCard from "../../basic-components/BaseCard.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthHeader,
    BaseSection,
    BaseCard,
  },
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      if (!this.confirmPassword()) {
        this.errorMessage = "Passwords doesn't match, please try again!";
        this.password = "";
        this.passwordConfirmation = "";
        return;
      }

      try {
        await this.$store.dispatch("register", {
          name: this.name,
          surname: this.surname,
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.$router.push("/dashboard");
      } catch (error) {
        this.errorMessage = error.message || "Failed to register.";
      }
    },
    confirmPassword() {
      return this.password === this.passwordConfirmation;
    },
    getName(inputValue) {
      this.name = inputValue;
    },
    getSurname(inputValue) {
      this.surname = inputValue;
    },
    getUsername(inputValue) {
      this.username = inputValue;
    },
    getEmail(inputValue) {
      this.email = inputValue;
    },
    getPassword(inputValue) {
      this.password = inputValue;
    },
    getPasswordConfirmation(inputValue) {
      this.passwordConfirmation = inputValue;
    },
  },
};
</script>

<style scoped>
#agreement,
#password-mandatory {
  text-align: center;
  font-size: small;
  padding-left: 40px;
  width: 75%;
}
#agreement,
#password-mandatory a {
  color: var(--color-primary);
}

h4 {
  color: #a0a6b0;
}

h2,
h4 {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2px;
}

#login-account {
  text-align: center;
  font-size: medium;
  margin-top: 10px;
}

#login-now {
  color: #1a75ff;
  text-decoration: none;
  margin-left: 10px;
}
</style>
