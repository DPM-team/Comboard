<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" colorEr="error">{{ errorMessage }} </base-card>
    <auth-form>
      <auth-header>
        <h2>Join Our Community!</h2>
        <h4>Create an account fast and simple!</h4>
      </auth-header>
      <auth-form-input @data="getName" id="firstname" name="name" type="text" placeholder="Firstname" required />
      <auth-form-input @data="getSurname" id="surname" name="surname" type="text" placeholder="Surname" required />
      <auth-form-input @data="getUsername" id="username" name="username" type="text" placeholder="Username" required />
      <auth-form-input @data="getEmail" id="email" name="email" type="email" placeholder="Email" required />
      <auth-form-input @data="getPassword" id="password" name="password" type="password" placeholder="Password" :minLength="8" required />
      <p id="password-mandatory">Use 8 or more characters with a combination of letters, numbers and symbols</p>
      <auth-form-input id="confirm-password" name="confirmedPassword" type="password" placeholder="Confirm Password" :minLength="8" required />
      <auth-form-input id="login-btn" name="loginButton" type="submit" value="Agree & Join" @click.prevent="submitForm" />
      <p id="agreement">
        By clicking Agree & Join, you agree to the comboard <a href="/user-agreement">User Agrement</a>, <a href="/privacy-policy">Privacy Policy</a> and <a href="#">CooKie Policy</a>
      </p>
      <auth-choices></auth-choices>
    </auth-form>
    <p id="login-account">
      Already to Comboard?
      <router-link id="login-now" to="/login">Login Now!</router-link>
    </p>
  </base-section>
</template>

<script>
import AuthForm from "../../auth/AuthForm.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import AuthChoices from "../../auth/AuthChoices.vue";
import BaseSection from "../../basic-components/BaseSection.vue";
import BaseCard from "../../basic-components/BaseCard.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthHeader,
    AuthChoices,
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
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        // Call register action from Auth module
        // We want await because we need to finish first the api call. We need to wait for call to end
        await this.$store
          .dispatch("register", {
            name: this.name,
            surname: this.surname,
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then((r) => {
            if (r instanceof Error) {
              throw r;
            }
            this.$router.push("/dashboard");
          });
      } catch (error) {
        this.errorMessage = error.message || "Failed to authenticate.";
      }

      console.log(this.$store.getters.loggedUserID);
    },
    getName(i) {
      this.name = i;
    },
    getSurname(i) {
      this.surname = i;
    },
    getUsername(i) {
      this.username = i;
    },
    getEmail(i) {
      this.email = i;
    },
    getPassword(i) {
      this.password = i;
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
}

#login-now {
  color: #1a75ff;
  text-decoration: none;
  margin-left: 10px;
}
</style>
