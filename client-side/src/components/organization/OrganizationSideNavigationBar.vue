<template>
  <div class="organization-side-navbar-container">
    <nav class="organization-side-navbar">
      <ul>
        <li><img class="organization-logo" src="../../assets/comboard-logo/logo-white.png" alt="Organization name" /></li>
        <li>
          <a href="#"><font-awesome-icon class="icon" icon="fa-solid fa-people-group" /><span class="nav-item">Network</span></a>
        </li>
        <li>
          <a href="#"><font-awesome-icon class="icon" icon="fa-solid fa-calendar-days" /><span class="nav-item">Calendar</span></a>
        </li>
        <li>
          <a href="#"><font-awesome-icon class="icon" icon="fa-solid fa-list-check" /><span class="nav-item">Tasks</span></a>
        </li>
        <li>
          <a href="#"><font-awesome-icon class="icon" icon="fa-solid fa-diagram-project" /><span class="nav-item">Projects</span></a>
        </li>
        <li>
          <a href="#"><font-awesome-icon class="icon" icon="fa-solid fa-handshake-simple" /><span class="nav-item">Teams</span></a>
        </li>
        <li>
          <a href="#"><font-awesome-icon class="icon" icon="fa-solid fa-box-open" /><span class="nav-item">Storage</span></a>
        </li>
        <li>
          <div class="env-lighting-buttons">
            <font-awesome-icon class="icon sun" icon="fa-solid fa-sun" />
            <font-awesome-icon class="icon moon" icon="fa-solid fa-moon" />
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  outline: none;
  border: none;
  text-decoration: none;
  box-sizing: border-box;
}
.organization-side-navbar {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  left: 0;
  background: #fff;
  width: 200px;
  overflow: hidden;
  transition: width 0.2s linear;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  background: var(--color-primary);
}
.organization-logo {
  height: 120px;
  width: 120px;
  display: block;
  margin: 0 auto;
}
a {
  position: relative;
  color: #fff;
  font-size: 20px;
  display: table;
  width: 300px;
  padding: 20px;
}

.icon {
  position: relative;
  top: 2px;
  font-size: 24px;
  text-align: center;
}
.nav-item {
  position: relative;
  /* top: 12px; */
  margin-left: 10px;
}
a:hover {
  background: var(--color-secondary);
}

/* .organization-side-navbar:hover {
  width: 280px;
  transition: all 0.5s ease;
} */
.sun,
.moon {
  color: var(--color-primary);
  padding: 5px;
  background: white;
  margin-left: 20px;
  height: 20px;
  width: 20px;
  line-height: 20px;
  border-radius: 50%;
}
.sun:hover,
.moon:hover {
  cursor: pointer;
  color: white;
  background: var(--color-primary);
  border: solid 1px white;
}

.env-lighting-buttons {
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;

  /* display: flex; */
}

/* Responsiveness */

@media (max-width: 1250px) {
  .organization-side-navbar {
    width: 180px;
  }
  .organization-logo {
    height: 100px;
    width: 100px;
    display: block;
  }
  a {
    font-size: 19px;
    width: 280px;
    padding: 18px;
  }

  .icon {
    font-size: 22px;
  }

  .sun,
  .moon {
    height: 19px;
    width: 19px;
    line-height: 19px;
  }
}
@media (max-width: 1150px) {
  .nav-item {
    display: none;
  }
  .organization-side-navbar {
    width: 80px;
  }
  a {
    width: 80px;
    padding: 20px;
    text-align: center;
  }

  .organization-logo {
    margin-top: 10px;
    height: 60px;
    width: 60px;
  }
  .sun,
  .moon {
    display: inline;
    margin-left: 5px;
  }
  .env-lighting-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
