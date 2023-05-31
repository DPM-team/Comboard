<template>
  <div>
    <header>
      <nav class="header-nav">
        <a class="header-logo" href="/dashboard">
          <img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" />
        </a>
        <ul class="header-ul">
          <li class="header-li">
            <a class="header-a">
              <font-awesome-icon class="image-menu" :icon="['fas', 'bell']" @click="toggleNotificationOptions" />
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
    <header-toggle-option v-if="notificationOptionsAreVisible" :position="'notifications-toggle'">
      <base-spinner class="notification-item" v-if="spinner"></base-spinner>
      <div v-if="notifications.length > 0">
        <li class="notification-item" v-for="notification in notifications" :key="notification._id"></li>
      </div>
      <p class="notification-item" v-else>No Notifications</p>
    </header-toggle-option>
  </div>
</template>

<script>
import HeaderToggleOption from "../../organization/HeaderToggleOption.vue";

export default {
  data() {
    return { notificationOptionsAreVisible: false, notifications: [] };
  },
  components: { HeaderToggleOption },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error.message || "Failed to logout.");
      }
      this.$router.push("/");
    },
    async toggleNotificationOptions() {
      this.notificationOptionsAreVisible = !this.notificationOptionsAreVisible;
    },
  },
};
</script>

<style scoped>
.list-item {
  padding: 15px;
  color: white;
  border-bottom: solid white 1px;
  cursor: pointer;
}
.notification-item {
  padding: 15px;
  color: var(--color-primary);
  border-bottom: solid var(--color-primary) 1px;
  background-color: white;
}
.list-item:hover {
  background: white;
  color: var(--color-primary);
}
.notification-item:hover {
  cursor: pointer;
}

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
