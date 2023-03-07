<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" colorEr="error">{{ errorMessage }} </base-card>
    <auth-form @submit.prevent="submitLoginForm">
      <auth-header>
        <h2>Login</h2>
        <h4>Sign In to your account</h4>
      </auth-header>
      <auth-form-input @data="getUsername" id="username" type="text" name="username" placeholder="Username" required />
      <auth-form-input @data="getPassword" id="password" type="password" name="password" placeholder="Password" :minLength="8" required />
      <a id="forgot-password" href="/retrieve-password/step-1">Forgot Password?</a>
      <auth-form-input id="login-btn" type="submit" name="submit" value="Login" />
      <auth-choices></auth-choices>
    </auth-form>
    <p id="create-account">
      New to Comboard?
      <router-link id="join-now" to="/register">Join Now!</router-link>
    </p>
  </base-section>
</template>

<script>
import AuthForm from "../../auth/AuthForm.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
import AuthChoices from "../../auth/AuthChoices.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import BaseSection from "../../basic-components/BaseSection.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthChoices,
    AuthHeader,
    BaseSection,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitLoginForm() {
      try {
        // Call login action from Auth module
        // We want await because we need to finish first the api call. We need to wait for call to end
        await this.$store
          .dispatch("login", {
            username: this.username,
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
    getUsername(i) {
      this.username = i;
    },
    getPassword(i) {
      this.password = i;
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

#forgot-password {
  display: flex;
  justify-content: space-around;
  padding-right: 170px;
  color: #1a75ff;
}

#create-account {
  text-align: center;
  font-size: medium;
}

#join-now {
  color: #1a75ff;
  text-decoration: none;
  margin-left: 10px;
}

@media screen and (max-width: 1283.2px) {
  #forgot-password {
    padding-right: 60px;
  }
}

@media screen and (max-width: 750.4px) {
  #forgot-password {
    padding-right: 70px;
  }
}

@media screen and (max-width: 326.4px) {
  #forgot-password {
    padding-right: 0px;
  }
}
</style>
