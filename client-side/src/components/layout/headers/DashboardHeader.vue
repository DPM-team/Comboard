<template>
  <header>
    <nav class="header-nav">
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <a class="header-logo" href=""><img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" /></a>
      <ul class="header-ul">
        <li class="header-li">
          <a class="header-a" href=""><img class="image-menu" src="../../../assets/images/common-images/user.png" alt="User profile" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><img class="image-menu" src="../../../assets/images/common-images/settings.png" alt="Settings" /></a>
        </li>
        <li class="header-li">
          <a class="header-a" href=""><img class="image-menu" src="../../../assets/images/common-images/question_mark.png" alt="Help" /></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

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
  line-height: 99px;
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
  height: 120px;
  margin-left: 100px;
}

.image-menu:hover {
  opacity: 0.8;
}
.image-menu {
  height: 26px;
}
.checkbtn {
  font-size: 30px;
  color: var(--color-eighth);
  float: right;
  line-height: 80px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}
#check {
  display: none;
}
.no-scrolling {
  overflow: hidden;
}

@media (max-width: 858px) {
  .checkbtn {
    display: block;
  }
  .nav__logo {
    margin-left: 20px;
  }
  .header-nav {
    height: 80px;
  }
  .header-nav .header-ul {
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: var(--color-eighth);
    top: 70px;
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
    color: var(--color-seventh);
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
