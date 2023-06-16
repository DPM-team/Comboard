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
      <p v-if="invitations.length === 0 && invitationsLoaded" class="notification-item">No invitations</p>
      <div v-else-if="invitations.length > 0 && invitationsLoaded" class="scroll">
        <li class="notification-item" v-for="invitation in invitations" :key="invitation._id">
          <p>You have invited to join '{{ invitation?.organizationName }}'</p>
          <div class="options--buttons">
            <button class="invitation--option invitation-accept--option" @click="joinOrganization(invitation?.organizationKey)">Accept</button>
            <button class="invitation--option invitation-decline--option" @click="declineInvitation(invitation?.organizationKey)">Decline</button>
          </div>
        </li>
      </div>
      <div class="general--buttons">
        <button class="notifications--btn clear--btn" @click="clearInvitations()">Clear All</button>
        <button class="notifications--btn close--btn" @click="closeInvitations()">Close</button>
      </div>
    </header-toggle-option>
  </div>
</template>

<script>
import HeaderToggleOption from "../../organization/HeaderToggleOption.vue";

export default {
  components: { HeaderToggleOption },
  data() {
    return {
      notificationOptionsAreVisible: false,
      invitations: [],
      invitationsLoaded: false,
    };
  },
  methods: {
    async loadInvitations() {
      try {
        const successData = await this.$store.dispatch("getOrganizationInvitations");
        this.invitations = successData.invitations;
        this.invitationsLoaded = true;
      } catch (error) {
        console.log(error.message || "Failed to load invitations.");
      }
    },
    async joinOrganization(organizationKey) {
      try {
        await this.$store.dispatch("joinOrganization", { organizationKey, userID: this.$store.getters.loggedUserID });
      } catch (error) {
        console.log(error.message || "Failed to join organization.");
      }

      this.removeInvitation(organizationKey);
    },
    declineInvitation(organizationKey) {
      this.removeInvitation(organizationKey);
    },
    async removeInvitation(organizationKey) {
      try {
        await this.$store.dispatch("removeOrganizationInvitation", { organizationKey });

        this.invitations = this.invitations.filter((invitationObj) => {
          return invitationObj.organizationKey !== organizationKey;
        });
      } catch (error) {
        console.log(error.message || "Failed to remove the invitation.");
      }
    },
    async clearInvitations() {
      if (this.invitations.length > 0) {
        try {
          await this.$store.dispatch("clearOrganizationInvitations");

          this.invitations = [];
        } catch (error) {
          console.log(error.message || "Failed to remove all invitations");
        }
      }
    },
    closeInvitations() {
      this.notificationOptionsAreVisible = false;
    },
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
  created() {
    this.loadInvitations();
  },
};
</script>

<style scoped>
.options--buttons {
  margin-top: 5px;
}

.scroll {
  overflow-y: auto;
  max-height: 300px;
}

.invitation--option {
  margin-right: 7px;
  color: white;
  padding: 6px 5px 6px 5px;
  cursor: pointer;
  border: none;
}

.invitation--option:hover {
  opacity: 0.8;
}

.invitation-accept--option {
  background-color: var(--color-third);
}

.invitation-decline--option {
  background-color: var(--color-warning);
}

.list-item {
  padding: 15px;
  color: white;
  border-bottom: solid white 1px;
  cursor: pointer;
}

.notification-item {
  padding: 15px 15px 5px 15px;
  color: var(--color-primary);
  border-bottom: solid var(--color-primary) 1px;
  border-left: solid var(--color-primary) 1px;
  border-right: solid var(--color-primary) 1px;
  background-color: white;
}

.general--buttons {
  display: flex;
}

.notifications--btn {
  width: 50%;
  padding: 7px 3px 7px 3px;
  border: none;
  cursor: pointer;
}

.notifications--btn:hover {
  opacity: 0.8;
}

.clear--btn {
  background-color: var(--color-warning);
  color: white;
}

.close--btn {
  background-color: var(--color-third);
  color: white;
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
