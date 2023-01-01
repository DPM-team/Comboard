<template>
  <input :id="id" :type="type" :name="name" :placeholder="placeholder" :minlength="numberLength" :value="value" />
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
  border: 1.5px solid var(--secondary-bright-color);
  border-color: var(--primary-blue-color);
  border-radius: 0.25rem;
  background: no-repeat left;
  padding-left: 35px;
  margin: 1rem auto;
}

input[type="submit"] {
  padding: 0.75rem;
  display: block;
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--primary-bright-color);
  text-align: center;
  border-radius: 0.25rem;
  border: 2px solid var(--primary-dark-color);
  transition-duration: 0.4s;
  font-weight: bold;
}

input[type="button"]:hover,
input[type="submit"]:hover {
  filter: brightness(0.8);
}

/* Images for inputs */
#email {
  background-size: 24px;
}

#code {
  /* background-image: url("../../assets/logo.png"); */
  background-size: 24px;
}

#newPassword {
  background-size: 24px;
}

#newConfirmPassword {
  background-image: u;
  background-size: 24px;
}

#username {
  background-image: url("../../../../public/resources/images/login-register/user-24px.png");
  background-size: 24px;
}

#password,
#confirm-password {
  background-size: 24px;
}
</style>
