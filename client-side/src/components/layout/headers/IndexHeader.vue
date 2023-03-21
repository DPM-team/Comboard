<template>
  <header>
    <nav class="header-nav">
      <input type="checkbox" id="check" />
      <label v-on:click="noScrolling" for="check" class="checkbtn">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </label>
      <a class="header-logo" href=""><img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" /></a>
      <ul class="header-ul">
        <li class="header-li">
          <a class="header-a" href="">Features</a>
        </li>
        <li class="header-li">
          <a class="header-a" href="">Packages</a>
        </li>
        <li class="header-li">
          <a class="header-a" href="">Testimonials</a>
        </li>
        <li class="header-li">
          <router-link class="header-a" to="/login"><font-awesome-icon :icon="['fas', 'user']" /></router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    noScrolling() {
      document.getElementById("check").addEventListener("change", function () {
        if (this.checked) {
          document.body.classList.add("no-scrolling");
        } else {
          document.body.classList.remove("no-scrolling");
        }
      });
    },
  },
};
</script>

<style scoped>
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
  margin-right: 100px;
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
  .checkbtn {
    display: block;
  }
  .nav__logo {
    margin-left: 20px;
  }
  .header-nav {
    height: 100px;
  }
  .header-nav .header-ul {
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: var(--color-primary);
    top: 100px;
    left: -100%;
    text-align: center;
    transition: all 0.5s;
  }
  .header-nav .header-ul .header-li {
    display: block;
    margin: 50px;
    line-height: 30px;
  }
  .header-nav .header-ul .header-li .header-a {
    font-size: 20px;
  }
  .header-nav .header-ul .header-li .header-a {
    color: white;
  }

  .header-a:hover {
    background: none;
    opacity: 0.8;
  }
  #check:checked ~ .header-ul {
    left: 0;
  }
}
</style>
