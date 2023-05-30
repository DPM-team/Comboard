<template>
  <header>
    <nav class="header-nav">
      <a class="header-logo" href="/dashboard">
        <img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" />
      </a>
      <ul class="header-ul">
        <li class="header-li">
          <a class="header-a">
            <font-awesome-icon class="image-menu" :icon="['fas', 'bell']" />
          </a>
        </li>
        <li class="header-li">
          <a class="header-a" href="/dashboard/my-profile">
            <font-awesome-icon class="image-menu" :icon="['fas', 'user']" />
          </a>
        </li>
        <li class="header-li">
          <a class="header-a" href="/dashboard/help">
            <font-awesome-icon class="image-menu" :icon="['fas', 'circle-question']" />
          </a>
        </li>
        <li class="header-li">
          <a class="header-a" @click.prevent="logout">
            <font-awesome-icon class="image-menu" :icon="['fas', 'right-from-bracket']" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error.message || "Failed to logout.");
      }
      this.$router.push("/");
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
  height: 80px;
  width: 100%;
}

.header-nav .header-ul {
  float: right;
  margin-right: 100px;
}

.header-nav .header-ul .header-li {
  display: inline-block;
  line-height: 79px;
  margin: 0 5px;
}

.header-nav .header-ul .header-li .header-a {
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 3px;
  text-decoration: none;
  height: 1rem;
  cursor: pointer;
}

.nav__logo {
  height: 100px;
  margin-left: 100px;
}

.image-menu:hover {
  opacity: 0.8;
}

.image-menu {
  height: 18px;
  color: var(--color-primary);
}

@media (max-width: 600px) {
  .nav__logo {
    margin-left: 40px;
  }
  .header-nav .header-ul {
    margin-right: 40px;
  }
  .header-nav .header-ul .header-li {
    margin: 0 3px;
  }

  .header-nav .header-ul .header-li .header-a {
    padding: 5px 5px;
  }
}

@media (max-width: 400px) {
  .header-nav .header-ul {
    margin-right: 20px;
  }
}
</style>
