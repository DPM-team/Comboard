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
          <a class="header-a" href=""><font-awesome-icon class="menu-icon" icon="fa-solid fa-bell" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><font-awesome-icon class="menu-icon" icon="fa-solid fa-inbox" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><font-awesome-icon class="menu-icon" icon="fa-solid fa-video" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""
            ><div class="img-container">
              <img class="user-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s" /></div
          ></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><font-awesome-icon class="more-menu-icon" icon="fa-solid fa-ellipsis-vertical" /></a>
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
.more-menu-icon {
  color: var(--color-primary);
  display: none;
  font-size: 18px;
}

.menu-icon {
  color: var(--color-primary);
}
.menu-icon:hover {
  opacity: 0.9;
}
.img-container {
  width: 1.2em;
  height: 1.2em;
  background-color: var(--color-fourth);
  padding: 0.2em;
  border-radius: 50%;
  margin-left: 5px;
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
  background: rgb(255, 255, 255);
  height: 60px;
  width: 100%;
  display: block;
}
.header-nav .header-ul {
  float: right;
  margin-right: 100px;
  height: 60px;
  display: flex;
  align-items: center;
}
.header-nav .header-ul .header-li {
  display: inline-block;
  margin: 0 3px;
}
.header-nav .header-ul .header-li .header-a {
  font-size: 16px;
  padding: 3px 7px;
  text-decoration: none;
}
.nav__logo {
  height: 60px;
  margin-left: 45%;
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

@media (max-width: 900px) {
  .header-nav .header-ul {
    margin-right: 70px;
  }
  .nav__logo {
    margin-left: 40%;
  }
}
@media (max-width: 750px) {
  .header-nav .header-ul {
    margin-right: 40px;
  }
}

@media (max-width: 650px) {
  /* .checkbtn {
    display: block;
  }
  .nav__logo {
    margin-left: 40%;
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
  } */
  .more-menu-icon {
    display: block;
  }

  .menu-icon {
    display: none;
  }
  .img-container {
    display: none;
  }
}
</style>
