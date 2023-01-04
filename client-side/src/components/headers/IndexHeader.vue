<template>
  <header>
    <nav class="header-nav">
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <a class="header-logo" href=""><img src="../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" /></a>
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
          <a class="header-a" href=""><img id="user__icon" src="../../assets/images/common-images/user.png" alt="Login" /></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
:root {
  --color-primary: #2a4078;
  --color-secondary: #d6dfed;
  --color-third: #4dd2c4;
  --color-fourth: #1fa496;
  --color-fifth: #063e37;
  --color-sixth: #f4efb7;
  --color-seventh: #74330e;
  --color-eighth: #ffc163;
  --color-ninth: #dff1db;
  --color-primary-gradient: #2a407897;
  --color-secondary-gradient: #ebf3d44a;
}

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

/* Bug fix */
.header-logo:hover {
  background: none;
}
.header-nav {
  background: var(--color-sixth);
  height: 70px;
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
  color: var(--color-seventh);
  font-size: 15px;
  font-weight: 600;
  padding: 7px 13px;
  border-radius: 3px;
  text-decoration: none;
}
.nav__logo {
  height: 100px;
  margin-left: 100px;
}

.header-a:hover {
  background: var(--color-eighth);
  transition: 0.5s;
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
#user__icon {
  height: 1.8rem;
  margin-bottom: -5px;
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
