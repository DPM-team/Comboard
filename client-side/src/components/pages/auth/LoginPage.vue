<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }} </base-card>
    <auth-form @submit.prevent="submitLoginForm">
      <auth-header>
        <h2>Login</h2>
        <h4 style="padding-bottom: 10px">Sign in to your account</h4>
      </auth-header>
      <auth-form-input @data="getUsername" id="username" type="text" name="username" placeholder="Username" required />
      <auth-form-input @data="getPassword" id="password" type="password" name="password" placeholder="Password" :minLength="8" required />
      <router-link id="forgot-password--link-login" to="/retrieve-password/step-1">Forgot Password?</router-link>
      <auth-form-input id="login-btn" type="submit" name="submit" value="Login" />
      <!-- <auth-choices></auth-choices> -->
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
// import AuthChoices from "../../auth/AuthChoices.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import BaseSection from "../../basic-components/BaseSection.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,

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
          .then((error) => {
            if (error instanceof Error) {
              throw error;
            }

            this.$router.push("/dashboard");
          });
      } catch (error) {
        this.errorMessage = error.message || "Failed to authenticate.";
      }
    },
    getUsername(inputValue) {
      this.username = inputValue;
    },
    getPassword(inputValue) {
      this.password = inputValue;
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

#forgot-password--link-login {
  display: flex;
  justify-content: space-around;
  color: var(--color-primary);
  font-size: 15px;
}

#create-account {
  margin-top: 10px;
  text-align: center;
  font-size: medium;
}

#join-now {
  color: #1a75ff;
  text-decoration: none;
  margin-left: 10px;
}

@media screen and (max-width: 1283.2px) {
  #forgot-password--link {
    padding-right: 60px;
  }
}

@media screen and (max-width: 750.4px) {
  #forgot-password--link {
    padding-right: 70px;
  }
}

@media screen and (max-width: 326.4px) {
  #forgot-password--link {
    padding-right: 0px;
  }
}
</style>
