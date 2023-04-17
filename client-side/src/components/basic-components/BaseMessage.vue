<template>
  <h4 :class="configureMessageClass">{{ message }}</h4>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
      validator: function (value) {
        return value === "error" || value === "success";
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    configureMessageClass() {
      return { "success-message": this.mode === "success", "error-message": this.mode === "error" };
    },
  },
};
</script>

<style scoped>
.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
