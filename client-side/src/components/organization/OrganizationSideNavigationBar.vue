<template>
  <div class="organization-side-navbar-container">
    <nav id="organization-left-navbar" class="organization-side-navbar">
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <font-awesome-icon icon="fa-solid fa-square-caret-down" />
      </label>
      <ul>
        <li class="organization-logo--item">
          <img v-if="organizationImage" class="organization-logo" :src="organizationImage" alt="Organization name" @click="viewMyOrganization()" />
          <img v-else class="organization-logo" src="../../assets/images/common-images/default-organization-photo.png" alt="Organization name" @click="viewMyOrganization()" />
        </li>
        <li>
          <p class="user-fullname--view">Welcome, {{ displayUserFullname }}</p>
        </li>
        <li>
          <router-link to="/organization/network">
            <font-awesome-icon class="icon" icon="fa-solid fa-people-group" />
            <span class="nav-item">Network</span>
          </router-link>
        </li>
        <li>
          <router-link to="/organization/calendar">
            <font-awesome-icon class="icon" icon="fa-solid fa-calendar-days" />
            <span class="nav-item">Calendar</span>
          </router-link>
        </li>
        <li>
          <router-link to="/organization/tasks">
            <font-awesome-icon class="icon" icon="fa-solid fa-list-check" />
            <span class="nav-item">Tasks</span>
          </router-link>
        </li>
        <li>
          <router-link to="/organization/projects">
            <font-awesome-icon class="icon" icon="fa-solid fa-diagram-project" />
            <span class="nav-item">Projects</span>
          </router-link>
        </li>
        <li>
          <router-link to="/organization/teams">
            <font-awesome-icon class="icon" icon="fa-solid fa-handshake-simple" />
            <span class="nav-item">Teams</span>
          </router-link>
        </li>
        <li>
          <router-link to="/organization/storage">
            <font-awesome-icon class="icon" icon="fa-solid fa-box-open" />
            <span class="nav-item">Storage</span>
          </router-link>
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
export default {
  data() {
    return {
      organizationImage: "",
    };
  },
  computed: {
    displayUserFullname() {
      return this.$store.getters.name;
    },
  },
  methods: {
    viewMyOrganization() {
      this.$router.push("/organization/my-organization");
    },
    async takeOrganizationImage() {
      try {
        const blob = await this.$store.dispatch("takeOrganizationImage", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        if (blob.size !== 0) {
          this.changeBlobToImage(blob);
        }
      } catch (e) {
        console.log(e);
      }
    },
    changeBlobToImage(blob) {
      const fileSend = new File([blob], "");
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.organizationImage = fileReader.result;
      };

      fileReader.readAsDataURL(fileSend);
    },
  },
  async created() {
    this.takeOrganizationImage();
    const blob = await this.$store.dispatch("getUserProfile", {
      userID: this.$store.getters.loggedUserID,
      organizationID: this.$store.getters.selectedOrganizationID,
    });
    console.log(blob);

    if (blob.size !== 0) {
      const file = new File([blob], "", {
        type: "image/png",
      });
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const profilePhoto = fileReader.result;
        localStorage.setItem("profilephoto", profilePhoto);
        this.$store.commit("setProfilePhoto", {
          profilePhoto,
        });
      };

      fileReader.readAsDataURL(file);
    }
  },
};
</script>

<style scoped>
* {
  outline: none;
  border: none;
  text-decoration: none;
  box-sizing: border-box;
}

.organization-logo--item {
  margin-top: 20px;
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

.checkbtn {
  font-size: 22px;
  color: white;
  float: left;
  line-height: 60px;
  margin-left: 20px;
  cursor: pointer;
  display: none;
}

#check {
  display: none;
}

.organization-logo {
  height: 120px;
  width: 120px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

a {
  position: relative;
  color: #fff;
  font-size: 20px;
  display: table;
  width: 300px;
  padding: 20px;
}

.user-fullname--view {
  color: white;
  margin-top: 5px;
  text-align: center;
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
    /* font-size: 19px; */
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

@media (max-width: 700px) {
  .organization-side-navbar {
    width: 55px;
  }

  a {
    width: 55px;
    padding: 18px;
    text-align: center;
  }

  .icon {
    font-size: 18px;
  }

  .organization-logo {
    margin-top: 9px;
    height: 55px;
    width: 55px;
  }

  .sun,
  .moon {
    margin-left: 10px;
    height: 16px;
    width: 16px;
    line-height: 16px;
  }
}
@media (max-width: 450px) {
  .organization-side-navbar {
    width: 45px;
  }

  a {
    width: 45px;
    padding: 14px;
  }

  .icon {
    font-size: 16px;
  }

  .organization-logo {
    height: 45px;
    width: 45px;
  }

  .sun,
  .moon {
    margin-left: 10px;
    height: 14px;
    width: 14px;
    line-height: 14px;
  }
}

/*  TO BE DISCUSSED
@media (max-width: 550px) {
  .checkbtn {
    display: block;
  }
  nav {
    height: 100px;
  }
  ul {
    z-index: 10;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: var(--color-primary);
    top: 80px;
    left: -100%;
    text-align: center;
    transition: all 0.5s;
  }
  li {
    display: block;
    margin: 50px;
    line-height: 30px;
  }

  #check:checked ~ ul {
    left: 0;
  }

  .organization-side-navbar {
    width: 50px;
  }
} */
</style>
