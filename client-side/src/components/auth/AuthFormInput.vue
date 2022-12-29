<template>
  <input :id="id" :type="type" :name="name" :placeholder="placeholder" :minlength="numberLength" />
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
  padding-left: 25px;
  margin: 1rem auto;
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
  background-image: url("../../assets/logo.png");
  background-size: 24px;
}

#newPassword {
  background-size: 24px;
}

#newConfirmPassword {
  background-size: 24px;
}

#username {
  background-size: 24px;
}

#password,
#confirm-password {
  background-size: 24px;
}
</style>
