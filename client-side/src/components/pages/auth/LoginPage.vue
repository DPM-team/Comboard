<template>
  <div>
    <auth-form>
      <auth-header>
        <h2>Login</h2>
        <h4>Sign In to your account</h4>
      </auth-header>
      <auth-form-input id="username" type="text" name="username" placeholder="Username" required />
      <auth-form-input id="password" type="password" name="password" placeholder="Password" minlength="8" required />
      <a id="forgot-password" href="/retrieve-account/step-1">Forgot Password?</a>
      <auth-form-input id="login-btn" type="submit" name="submit" value="Login" @click.prevent="submitLoginForm" />
      <auth-choices></auth-choices>
    </auth-form>
    <p id="create-account">New to Comboard?<a id="join-now" href="/register">Join Now!</a></p>
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
      username: "minfgfddasfdch",
      password: "12345678!",
    };
  },
  methods: {
    submitLoginForm() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      };

      fetch("/api/login", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
          }
        });
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
