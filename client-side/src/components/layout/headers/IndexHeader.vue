<template>
  <header>
    <nav class="header-nav">
      <!-- <input type="checkbox" id="check" />
      <label v-on:click="noScrolling" for="check" class="checkbtn">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </label> -->
      <a class="header-logo" href=""><img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" /></a>
      <ul class="header-ul desktop">
        <li class="header-li">
          <a class="header-a" href="#features-section">Features</a>
        </li>
        <li class="header-li">
          <a class="header-a" href="#packages-section">Packages</a>
        </li>
        <li class="header-li">
          <a class="header-a" href="#testimonials-section">Testimonials</a>
        </li>
        <li class="header-li">
          <router-link class="header-a" to="/login"><font-awesome-icon :icon="['fas', 'user']" /></router-link>
        </li>
      </ul>
      <ul class="header-ul mobile">
        <li class="header-li">
          <router-link class="header-a" to="/login"><font-awesome-icon class="login-icon" :icon="['fas', 'user']" /></router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.login-icon {
  font-size: 24px;
}
/* Bug fix */
.mobile {
  display: none;
}
.desktop {
  margin-right: 100px;
}
/* Bug fix */
.header-logo:hover {
  background: none;
}
.header-nav {
  background: white;
  height: 100px;
  width: 100%;
}
.header-nav .header-ul {
  float: right;
}
.header-nav .header-ul .header-li {
  display: inline-block;
  line-height: 100px;
  margin: 0 5px;
}
.header-nav .header-ul .header-li .header-a {
  color: var(--color-primary);
  font-size: 15px;
  /* font-weight: semi-bold; */
  padding: 7px 13px;
  border-radius: 3px;
  text-decoration: none;
}
.nav__logo {
  height: 100px;
  margin-left: 100px;
}

.header-a:hover {
  opacity: 0.8;
  transition: 0.5s;
}
.checkbtn {
  font-size: 30px;
  color: var(--color-primary);
  float: right;
  line-height: 80px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}
#check {
  display: none;
}

#user__icon {
  height: 24px;
  margin-bottom: -5px;
}

@media (max-width: 850px) {
  .mobile {
    display: inline-block;
    margin-right: 40px;
  }
  .desktop {
    display: none;
  }
}
@media (max-width: 600px) {
  .nav__logo {
    margin-left: 40px;
  }
}
</style>
