<template>
  <div class="wrapper">
    <div class="container">
      <h1>Access Denied! (401)</h1>
      <img src="../../assets/images/common-images/unauthorized-error.jpg" alt="Error Image" width="300" />
      <p>
        You don't have permission to view this page!
        <br />
        401 - Unauthorized
        <br />
        Here are some useful links.
      </p>
      <div class="links">
        <router-link to="/">Home page</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 40px;
  background-color: #ffffff;
}

h1 {
  font-size: 36px;
  color: #333333;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  color: #666666;
  margin-bottom: 30px;
}

.links {
  display: flex;
  justify-content: space-between;
}

.links a {
  width: 30%;
  padding: 10px;
  color: var(--color-primary);
  text-decoration: none;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  margin-left: 10px;
}

.links a:hover {
  background-color: var(--color-primary);
  color: #ffffff;
}
</style>
