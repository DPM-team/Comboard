<template>
  <div class="organization-side-navbar-container">
    <nav class="organization-side-navbar">
      <ul>
        <li>
          <a href="#"><span class="nav-item organization-title">Organization name</span></a>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-people-group"></i><span class="nav-item">Network</span></a>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-calendar-days"></i><span class="nav-item">Calendar</span></a>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-list-check"></i><span class="nav-item">Tasks</span></a>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-diagram-project"></i><span class="nav-item">Projects</span></a>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-handshake-simple"></i><span class="nav-item">Teams</span></a>
        </li>
        <li>
          <a href="#"><i class="fa-solid fa-box-open"></i><span class="nav-item">Storage</span></a>
        </li>
        <li>
          <div class="env-lighting-buttons">
            <i class="fa-solid fa-sun"></i>
            <i class="fa-solid fa-moon"></i>
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
  width: 15%;
  overflow: hidden;
  transition: width 0.2s linear;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  background: var(--color-primary);
}
.organization-title {
  font-weight: bold;
  font-size: 26px;
}
a {
  position: relative;
  color: #fff;
  font-size: 20px;
  display: table;
  width: 300px;
  padding: 15px;
}
.fa-solid {
  position: relative;
  width: 70px;
  height: 40px;
  top: 14px;
  font-size: 24px;
  text-align: center;
}
.nav-item {
  position: relative;
  top: 12px;
  margin-left: 10px;
}
a:hover {
  background: var(--color-secondary);
}

/* .organization-side-navbar:hover {
  width: 280px;
  transition: all 0.5s ease;
} */
.fa-sun,
.fa-moon {
  color: var(--color-primary);
  font-size: 18px;
  background: white;
  border-radius: 5px;
  margin-left: 30px;
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 50%;
}
.fa-sun:hover,
.fa-moon:hover {
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
</style>
