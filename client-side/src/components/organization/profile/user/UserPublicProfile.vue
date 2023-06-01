<template>
  <div>
    <organization-page-header>
      <back-header-button></back-header-button>
    </organization-page-header>
    <div v-if="userObj" class="header__wrapper">
      <div class="profile-header"><img class="backgroundImage" :src="backgroundImage" alt="User Background Image" /></div>
      <div class="cols__container">
        <div class="left__col">
          <profile-picture :userID="userID"></profile-picture>
          <h2 class="name">{{ userObj.firstname }} {{ userObj.lastname }}</h2>
          <h4 v-if="userObj.specialization" class="specialization">{{ userObj.specialization }}</h4>
          <h4 v-if="userObj.address" class="location">{{ userObj.address }}</h4>
          <p v-if="userObj.bio" class="bio">{{ userObj.bio }}</p>
          <user-data-area :phoneLink="userObj.telephone" :linkedinLink="userObj.linkedinLink" :mailLink="userObj.email"></user-data-area>
        </div>
        <div class="right__col">
          <div class="menu-ul">
            <router-link class="link" :to="'/organization/user/' + userID + '/posts'">Posts</router-link>
            <router-link class="link" :to="'/organization/user/' + userID + '/teams'">Teams</router-link>
            <router-link class="link" :to="'/organization/user/' + userID + '/projects'">Projects</router-link>
            <base-button class="add-con-button">Add connection</base-button>
            <font-awesome-icon class="add-con-button-icon" :icon="['fas', 'user-plus']" />
          </div>
          <router-view class="dynamic-area"></router-view>
        </div>
      </div>
    </div>
    <loading-spinner v-if="isLoading"></loading-spinner>
  </div>
</template>

<script>
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import ProfilePicture from "../../../organization/profile/user/ProfilePicture.vue";
import UserDataArea from "./UserDataArea.vue";

export default {
  components: { OrganizationPageHeader, BackHeaderButton, ProfilePicture, UserDataArea },
  props: {
    userID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userObj: null,
      isLoading: false,
      pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
      backgroundImage: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000",
    };
  },
  methods: {
    async loadUserPublicData() {
      try {
        this.isLoading = true;

        this.userObj = await this.$store.dispatch("getUserDataForAnOrganization", {
          userID: this.userID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (!this.userObj) {
          this.$router.push("/not-found");
        }
      } catch (error) {
        console.log(error.message || "Something went wrong!");
        this.$router.push("/not-found");
      }
    },
  },
  created() {
    this.loadUserPublicData();
  },
};
</script>

<style scoped>
.dynamic-area {
  width: 90%;
  margin-top: 20px;
}

.add-con-button {
  float: right;
  margin-top: -10px;
}

.add-con-button-icon {
  display: none;
  margin-left: 15px;
  background: var(--color-primary);
  color: white;
  padding: 3px;
}

.profile-header img {
  width: 100%;
  background: no-repeat 50% 20% / cover;
  height: calc(100px + 15vw);
}

.menu-ul {
  list-style-type: none;
  margin-top: 30px;
  padding: 0;
}
.menu-ul .link {
  margin-left: 25px;
  font-size: 18px;
  text-decoration: none;
  color: black;
}

.profile-a {
  text-decoration: none;
}

.header__wrapper .cols__container .left__col {
  padding: 25px 20px;
  text-align: center;
  max-width: 350px;
  position: relative;
  margin: 0 auto;
}

.name {
  margin-top: 70px;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 5px;
}
.location {
  font-size: 17px;
  font-weight: 500;
}

.specialization {
  font-size: 19px;
  font-weight: 500;
}

.bio {
  font-size: 15px;
  padding-top: 10px;
}

.header__wrapper .cols__container .left__col p {
  font-size: 0.9rem;
  color: #818181;
  margin: 0;
}

.header__wrapper .cols__container .right__col nav {
  display: flex;
  align-items: center;
  padding: 30px 0;
  justify-content: space-between;
  flex-direction: column;
}

.header__wrapper .cols__container .right__col nav ul {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.profile-ul li {
  cursor: pointer;
  text-align: center;
}

.is-invalid-update {
  border-bottom: 2px solid red !important;
}

.invalid-feedback-form {
  color: red;
  font-size: 15px;
}

.success-message {
  margin-top: 10px;
  border: 1px solid rgb(38, 144, 38);
  background-color: #4bb543;
  display: flex;
  width: 30%;
  padding: 5px 2px;
}

.success-message h3 {
  color: white;
  font-weight: bold;
  width: max-content;
  padding-left: 7px;
}

.reject-message {
  margin-top: 10px;
  border: 1px solid rgb(94, 16, 16);
  background-color: rgb(177, 87, 86);
  display: flex;
  width: 30%;
  padding: 5px 2px;
}

.reject-message h3 {
  color: white;
  font-weight: bold;
  width: max-content;
  padding-left: 7px;
}

.handle-visibility {
  animation: cssAnimation 0s 3s forwards;
  visibility: visible;
}

@keyframes cssAnimation {
  to {
    visibility: hidden;
  }
}

/* Responsiveness */
@media (max-width: 900px) {
  .add-con-button {
    margin-left: 20px;
  }
}
@media (max-width: 450px) {
  .add-con-button-icon {
    display: block;
  }

  .add-con-button {
    display: none;
  }
}

@media (min-width: 900px) {
  .header__wrapper .cols__container {
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 50px;
  }

  .header__wrapper .cols__container .left__col {
    padding: 25px 0px;
  }

  .header__wrapper .cols__container .right__col nav ul {
    flex-direction: row;
    gap: 30px;
  }
}

@media (min-width: 1017px) {
  .header__wrapper .cols__container .left__col {
    margin: 0;
    margin-right: auto;
  }

  .header__wrapper .cols__container .right__col nav {
    flex-direction: row;
  }

  .header__wrapper .cols__container .right__col nav button {
    margin-top: 0;
  }
}

@media (max-width: 867px) {
  .updates-message {
    text-align: center;
  }
}

@media (max-width: 900px) {
  .menu-ul {
    display: flex;
    justify-content: center;
  }
}
</style>
