<template>
  <input @change="input" :id="id" :type="type" :name="name" :placeholder="placeholder" :min="minLength" :accept="accept" :value="value" ref="data" />
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
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    minLength: {
      type: Number,
      required: false,
    },
    accept: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
    },
  },
  methods: {
    input() {
      if (this.$refs.data.type !== "file") {
        this.$emit("data", this.$refs.data.value);
      } else {
        this.$emit("data", this.$refs.data);
      }
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
  background-image: url("../../assets/images/common-images/at-sign-24px.png");
  background-size: 24px;
}

#code {
  background-image: url("../../assets/images/forgot-password/verification-code-24px.png");
  background-size: 24px;
}

#phone {
  background-image: url("../../assets/images/forgot-password/verification-code-24px.png");
  background-size: 24px;
}

#newPassword {
  background-image: url("../../assets/images/forgot-password/reset-password-24px.png");
  background-size: 24px;
}

#newConfirmPassword {
  background-image: url("../../assets/images/forgot-password/confirm-password-24px.png");
  background-size: 24px;
}

#username {
  background-image: url("../../assets/images/login-register/user-24px.png");
  background-size: 24px;
}

#password,
#confirm-password {
  background-image: url("../../assets/images/login-register/password-24px.png");
  background-size: 24px;
}
</style>
