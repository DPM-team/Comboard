<template>
  <input @change="input" :id="id" :type="type" :name="name" :placeholder="placeholder" :minlength="numberLength" :value="value" ref="data" />
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    minLength: {
      type: Number,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  methods: {
    input() {
      this.$emit("data", this.$refs.data.value);
    },
  },
};
</script>

<style scoped>
:root {
  --primary-blue-color: #50a3c5;
  --secondary-bright-color: #ccc;
}

input {
  display: block;
  width: 75%;
  padding: 0.75rem;
  border: 1.5px solid #ccc;
  border-color: #50a3c5;
  border-radius: 0.25rem;
  background: no-repeat left;
  padding-left: 35px;
  margin: 1rem auto;
}

input[type="submit"],
input[type="button"] {
  padding: 0.75rem;
  display: block;
  cursor: pointer;
  background-color: #1a75ff;
  color: #ffffff;
  text-align: center;
  border-radius: 0.25rem;
  border: 2px solid #000000;
  transition-duration: 0.4s;
  font-weight: bold;
}

input[type="button"]:hover,
input[type="submit"]:hover {
  filter: brightness(0.8);
}

/* Images for inputs */
#email {
  background-image: url("../../../../public/resources/images/common-images/at-sign-24px.png");
  background-size: 24px;
}

#code {
  background-image: url("../../../../public/resources/images/forgot-password/verification-code-24px.png");
  background-size: 24px;
}

#newPassword {
  background-image: url("../../../../public/resources/images/forgot-password/reset-password-24px.png");
  background-size: 24px;
}

#newConfirmPassword {
  background-image: url("../../../../public/resources/images/forgot-password/confirm-password-24px.png");
  background-size: 24px;
}

#username {
  background-image: url("../../../../public/resources/images/login-register/user-24px.png");
  background-size: 24px;
}

#password,
#confirm-password {
  background-image: url("../../../../public/resources/images/login-register/password-24px.png");
  background-size: 24px;
}
</style>
