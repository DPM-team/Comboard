<template>
  <header>
    <nav class="header-nav">
      <input type="checkbox" id="check" />
      <label v-on:click="noScrolling" for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <a class="header-logo" href=""><img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" /></a>
      <ul class="header-ul">
        <li class="header-li">
          <a class="header-a" href=""><font-awesome-icon icon="fa-solid fa-bell" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><font-awesome-icon icon="fa-solid fa-inbox" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><font-awesome-icon icon="fa-solid fa-video" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""
            ><div class="img-container">
              <img class="user-icon" src="../../../assets/images/common-images/user.png" /></div
          ></a>
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
.img-container {
  width: 1em;
  height: 1em;
  background-color: var(--color-fourth);
  padding: 0.5em;
  border-radius: 50%;
}
.user-icon {
  width: 100%;
  border-radius: 50%;
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
  margin-right: 100px;
}
.header-nav .header-ul .header-li {
  display: inline-block;
  /* line-height: 99px; */
  margin: 0 5px;
}
.header-nav .header-ul .header-li .header-a {
  font-size: 15px;
  font-weight: 600;
  padding: 7px 13px;
  border-radius: 3px;
  text-decoration: none;
  height: 1rem;
}
.nav__logo {
  height: 100px;
  /* margin-left: 100px; */
  text-align: center;
  margin: 0 auto;
  /* Needs to be fixed */
}

.image-menu:hover {
  opacity: 0.8;
}
.image-menu {
  height: 24px;
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

@media (max-width: 650px) {
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

  .header-a:hover {
    background: none;
    opacity: 0.8;
  }
  #check:checked ~ .header-ul {
    left: 0;
  }
}
</style>
