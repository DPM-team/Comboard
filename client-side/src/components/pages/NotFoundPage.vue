<template>
  <div class="wrapper">
    <div class="container">
      <h1>404 Not Found</h1>
      <img src="../../assets/images/common-images/not-found.jpg" alt="Error Image" width="300" />
      <p>
        We're sorry, but the page you requested could not be found.
        <br />
        Here are some useful links.
      </p>
      <div class="links">
        <router-link to="/">Home page</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/organization">Organization</router-link>
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
