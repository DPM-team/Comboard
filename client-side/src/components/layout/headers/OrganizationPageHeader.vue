<template>
  <div>
    <header>
      <nav class="header-nav">
        <input type="checkbox" id="check" />
        <label v-on:click="noScrolling" for="check" class="checkbtn">
          <i class="fas fa-bars"></i>
        </label>
        <slot></slot>
        <a class="header-logo" href="">
          <img src="../../../assets/comboard-logo/main-logo-transparent.png" alt="Comboard logo" class="nav__logo" id="logo" />
        </a>
        <ul class="header-ul">
          <li class="header-li" @click="toggleNotificationOptions">
            <a class="header-a"><font-awesome-icon class="menu-icon" icon="fa-solid fa-bell" /></a>
          </li>
          <li class="header-li" @click="toggleMessageOptions">
            <a class="header-a"><font-awesome-icon class="menu-icon" icon="fa-solid fa-inbox" /></a>
          </li>
          <li class="header-li" @click="toggleVideoOptions">
            <a class="header-a"><font-awesome-icon class="menu-icon" icon="fa-solid fa-video" /></a>
          </li>
          <li @click="toggleUserOptions" class="header-li">
            <a class="header-a">
              <div class="img-container">
                <img v-if="profilePhoto !== ''" class="user-icon" :src="`/api/users/${this.$store.getters.loggedUserID}/profilephoto`" />
                <font-awesome-icon v-else class="user-icon" :icon="['fas', 'user']"></font-awesome-icon>
              </div>
            </a>
          </li>
          <li class="header-li" @click="toggleMobileOptionsMenu">
            <a class="header-a"><font-awesome-icon class="more-menu-icon" icon="fa-solid fa-ellipsis-vertical" /></a>
          </li>
        </ul>
      </nav>
    </header>
    <header-toggle-option v-if="userOptionsAreVisible" :position="'user-toggle'">
      <li class="list-item">View profile</li>
      <li class="list-item">View organization</li>
      <li class="list-item">Profile settings</li>
      <li class="list-item">Logout</li>
    </header-toggle-option>
    <header-toggle-option v-if="videoOptionsAreVisible" :position="'video-toggle'">
      <li class="list-item">Join meeting</li>
      <li class="list-item">Start a meeting</li>
      <li class="list-item">Schedule a meeting for later</li>
    </header-toggle-option>
    <header-toggle-option v-if="messageOptionsAreVisible" :position="'messages-toggle'">
      <div class="message">
        <div class="pfp-container">
          <img class="user-pfp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" />
        </div>
        <p>This is a message</p>
      </div>
      <div class="message">
        <div class="pfp-container">
          <img class="user-pfp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" />
        </div>
        <p>This is a message</p>
      </div>
      <div class="message">
        <div class="pfp-container">
          <img class="user-pfp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" />
        </div>
        <p>This is a message</p>
      </div>
      <div class="message">
        <div class="pfp-container">
          <img class="user-pfp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" />
        </div>
        <p>This is a message</p>
      </div>
    </header-toggle-option>
    <header-toggle-option v-if="notificationOptionsAreVisible" :position="'notifications-toggle'">
      <base-spinner class="notification-item" v-if="spinner"></base-spinner>
      <div v-if="notifications.length > 0">
        <li class="notification-item" v-for="notification in notifications" :key="notification._id">
          <div v-if="notification.type === 'connection'"><button @click="acceptConnection(notification.from, true)">Accept</button> <button>Delete</button></div>
        </li>
      </div>
      <p class="notification-item" v-else>No Notifications Now</p>
    </header-toggle-option>
  </div>
</template>

<script>
import HeaderToggleOption from "../../organization/HeaderToggleOption.vue";
import BaseSpinner from "../../basic-components/BaseSpinner.vue";

export default {
  components: { HeaderToggleOption, BaseSpinner },
  data() {
    return {
      userOptionsAreVisible: false,
      videoOptionsAreVisible: false,
      messageOptionsAreVisible: false,
      notificationOptionsAreVisible: false,
      notifications: [],
      spinner: null,
      profilePhoto: "",
    };
  },
  methods: {
    async setPhoto() {
      this.profilePhoto = await fetch(`/api/users/${this.$store.getters.loggedUserID}/profilephoto`);
    },
    noScrolling() {
      document.getElementById("check").addEventListener("change", function () {
        if (this.checked) {
          document.body.classList.add("no-scrolling");
        } else {
          document.body.classList.remove("no-scrolling");
        }
      });
    },
    toggleUserOptions() {
      if (this.videoOptionsAreVisible === true) {
        this.videoOptionsAreVisible = !this.videoOptionsAreVisible;
      }
      if (this.messageOptionsAreVisible === true) {
        this.messageOptionsAreVisible = !this.messageOptionsAreVisible;
      }
      if (this.notificationOptionsAreVisible === true) {
        this.notificationOptionsAreVisible = !this.notificationOptionsAreVisible;
      }
      this.userOptionsAreVisible = !this.userOptionsAreVisible;
    },
    toggleVideoOptions() {
      if (this.userOptionsAreVisible === true) {
        this.userOptionsAreVisible = !this.userOptionsAreVisible;
      }
      if (this.messageOptionsAreVisible === true) {
        this.messageOptionsAreVisible = !this.messageOptionsAreVisible;
      }
      if (this.notificationOptionsAreVisible === true) {
        this.notificationOptionsAreVisible = !this.notificationOptionsAreVisible;
      }
      this.videoOptionsAreVisible = !this.videoOptionsAreVisible;
    },
    toggleMessageOptions() {
      if (this.userOptionsAreVisible === true) {
        this.userOptionsAreVisible = !this.userOptionsAreVisible;
      }
      if (this.videoOptionsAreVisible === true) {
        this.videoOptionsAreVisible = !this.videoOptionsAreVisible;
      }
      if (this.notificationOptionsAreVisible === true) {
        this.notificationOptionsAreVisible = !this.notificationOptionsAreVisible;
      }
      this.messageOptionsAreVisible = !this.messageOptionsAreVisible;
    },
    async toggleNotificationOptions() {
      if (this.userOptionsAreVisible === true) {
        this.userOptionsAreVisible = !this.userOptionsAreVisible;
      }
      if (this.videoOptionsAreVisible === true) {
        this.videoOptionsAreVisible = !this.videoOptionsAreVisible;
      }
      if (this.messageOptionsAreVisible === true) {
        this.messageOptionsAreVisible = !this.messageOptionsAreVisible;
      }
      this.notificationOptionsAreVisible = !this.notificationOptionsAreVisible;
      if (this.notificationOptionsAreVisible) {
        this.spinner = true;
        await this.loadNotifications();
        this.spinner = false;
      }
    },
    toggleMobileOptionsMenu() {
      console.log("clicked");
    },
    async loadNotifications() {
      try {
        const notifications = await this.$store.dispatch("loadNotifications", {
          orgID: this.$store.getters.selectedOrganizationID,
        });
        this.notifications = notifications.notifications;
      } catch (error) {
        console.log(error);
      }
    },
    async acceptConnection(id, acceptConnection) {
      try {
        await this.$store.dispatch("acceptConnection", {
          accept: acceptConnection,
          userConnectionID: id,
          orgID: this.$store.getters.selectedOrganizationID,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.setPhoto();
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
  cursor: pointer;
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
.list-item {
  padding: 15px;
  color: white;
  border-bottom: solid white 1px;
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
.message {
  background-color: white;
  padding: 13px 10px 13px 10px;
  display: flex;
  cursor: pointer;
}

.message p {
  margin-top: 4px;
}
.pfp-container {
  width: 20px;
  height: 20px;
  background-color: var(--color-fourth);
  padding: 0.2em;
  border-radius: 50%;
  margin-right: 5px;
}
.user-pfp {
  width: 100%;
  border-radius: 50%;
}

@media (max-width: 900px) {
  .header-nav .header-ul {
    margin-right: 70px;
  }
  .nav__logo {
    margin-left: 40%;
  }
}
@media (max-width: 600px) {
  .nav__logo {
    margin-left: 30%;
  }
}
@media (max-width: 750px) {
  .header-nav .header-ul {
    margin-right: 40px;
  }
}
@media (max-width: 500px) {
  .nav__logo {
    margin-left: 20%;
  }
  .header-nav .header-ul {
    margin-right: 10px;
  }
}
/* @media (max-width: 380px) {
  .nav__logo {
    margin-left: 15%;
  }
} */
</style>
