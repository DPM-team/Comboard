<template>
  <auth-form>
    <auth-header>
      <h2>Join Our Community!</h2>
      <h4>Create an account fast and simple!</h4>
    </auth-header>
    <auth-form-input id="firstname" name="name" type="text" placeholder="Firstname" required />
    <auth-form-input id="surname" name="surname" type="text" placeholder="Surname" required />
    <auth-form-input id="username" name="username" type="text" placeholder="Username" required />
    <auth-form-input id="email" name="email" type="email" placeholder="Email" required />
    <auth-form-input id="password" name="password" type="password" placeholder="Password" minlength="8" required />
    <p id="password-mandatory">Use 8 or more characters with a combination of letters, numbers and symbols</p>
    <auth-form-input id="confirm-password" name="confirmedPassword" type="password" placeholder="Confirm Password" minlength="8" required />
    <auth-form-input id="login-btn" type="submit" value="Agree & Join" />
    <p id="agreement">
      By clicking Agree & Join, you agree to the comboard <a href="/user-agreement">User Agrement</a>, <a href="/privacy-policy">Privacy Policy</a> and <a href="#">CooKie Policy</a>
    </p>
    <auth-choices></auth-choices>
  </auth-form>
</template>

<script>
import AuthForm from "../../auth/AuthForm.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import AuthChoices from "../../auth/AuthChoices.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthHeader,
    AuthChoices,
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
</style>