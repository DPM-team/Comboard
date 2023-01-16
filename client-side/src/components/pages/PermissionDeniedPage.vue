<template>
  <div class="w3-display-middle wrapper">
    <h1 class="w3-jumbo w3-center"><code>Access Denied</code></h1>
    <hr class="w3-border-white" />
    <h3 class="w3-center">You dont have permission to view this page. Login first!</h3>
    <h6 class="w3-center">error code: 401 Unauthorized</h6>
    <h5 class="w3-center"><router-link to="/login">Login</router-link></h5>
    <h5 class="w3-center">Move to <router-link to="/">Home</router-link> page</h5>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper hr {
  height: 1px;
  background-color: rgb(97, 97, 97);
  border: none;
  margin: auto;
  width: 50%;
}
</style>
