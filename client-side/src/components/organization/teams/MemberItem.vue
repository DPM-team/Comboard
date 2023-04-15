<template>
  <div class="user-item--container">
    <h4>{{ fullname }}</h4>
    <h5>Speciality: {{ speciality }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    fullname: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: false,
      default: "None",
    },
  },
};
</script>

<style scoped>
.user-item--container {
  padding: 5px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: rgb(238, 238, 238);
}
</style>
