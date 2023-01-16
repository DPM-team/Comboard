<template>
  <div>
    <auth-form>
      <auth-header>
        <h2>Login</h2>
        <h4>Sign In to your account</h4>
      </auth-header>
      <auth-form-input id="username" type="text" name="username" placeholder="Username" required />
      <auth-form-input id="password" type="password" name="password" placeholder="Password" :minLength="8" required />
      <a id="forgot-password" href="/retrieve-account/step-1">Forgot Password?</a>
      <auth-form-input id="login-btn" type="submit" name="submit" value="Login" @click.prevent="submitLoginForm" />
      <auth-choices></auth-choices>
    </auth-form>
    <p id="create-account">
      New to Comboard?
      <router-link id="join-now" to="/register">Join Now!</router-link>
    </p>
  </div>
</template>

<script>
import AuthForm from "../../auth/AuthForm.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
import AuthChoices from "../../auth/AuthChoices.vue";
import AuthHeader from "../../auth/AuthHeader.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthChoices,
    AuthHeader,
  },
  data() {
    return {
      username: "minas434343",
      password: "12345678!",
    };
  },
  methods: {
    async submitLoginForm() {
      try {
        // Call login action from Auth module
        // We want await because we need to finish first the api call. We need to wait for call to end
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
      } catch (error) {
        this.error = error.message || "Failed to authenticate.";
      }

      console.log(this.$store.getters.loggedUserID);
      this.$router.push("/dashboard");
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

#create-account {
  text-align: center;
  font-size: medium;
}

#join-now {
  color: #1a75ff;
  text-decoration: none;
  margin-left: 10px;
}
</style>
