<template>
  <auth-form>
    <img src="../../../../public/resources/comboard-logo/logo-only-symbol.png" width="70" />
    <h2>Login</h2>
    <h4>Sign In to your account</h4>
    <auth-form-input id="username" type="text" name="username" placeholder="Username" required />
    <auth-form-input id="password" type="password" name="password" placeholder="Password" minlength="8" required />
    <a id="forgot-password" href="/retrieve-account/step-1">Forgot Password?</a>
    <auth-form-input id="login-btn" type="submit" name="submit" value="Login" />
    <auth-choices></auth-choices>
  </auth-form>
</template>

<script>
import AuthForm from "../auth/AuthForm.vue";
import AuthFormInput from "../auth/AuthFormInput.vue";
import AuthChoices from "../auth/AuthChoices.vue";
export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthChoices,
  },
};
</script>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
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

#forgot-password {
  display: flex;
  justify-content: space-around;
  padding-right: 170px;
  color: #1a75ff;
}
</style>
