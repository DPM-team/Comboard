<template>
  <div>
    <div class="raw-line">
      <div class="hr-line">
        <hr />
      </div>
      <div class="hr-line">
        <p>or</p>
      </div>
      <div class="hr-line">
        <hr />
      </div>
    </div>
    <h4 id="alternative-sign-in">Sign in with</h4>
    <ul>
      <li>
        <button class="alternative-login"><img class="alternative-login-img" src="../../../../public/resources/images/login-register/google-logo-48px.png" /></button>
      </li>
      <li>
        <button class="alternative-login"><img class="alternative-login-img" src="../../../../public/resources/images/login-register/apple-logo-48px.png" /></button>
      </li>
      <li>
        <button class="alternative-login"><img class="alternative-login-img" src="../../../../public/resources/images/login-register/linkedin-logo-48px.png" /></button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.alternative-login {
  border: none;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
}

ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.alternative-login-img {
  width: 35px;
  height: 35px;
}

hr {
  width: 6rem;
}

.raw-line {
  display: flex;
  justify-content: space-around;
}

#alternative-sign-in {
  background-color: #d9d9d9;
  border-radius: 15px;
  margin: auto;
  text-align: center;
  width: 30%;
}
</style>
