<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
    <div class="header__wrapper">
      <div class="profile-header"><img class="backgroundImage" :src="backgroundImage" alt="User Background Image" /></div>
    </div>
    <div class="img__container">
      <img :src="organizationPfp" alt="User Profile Pic" />
    </div>
    <div class="main-area">
      <div class="organization-data">
        <h2>{{ organizationName }}</h2>
        <h3>{{ email }}</h3>
        <h3>{{ location }}</h3>
        <p>{{ bio }}</p>
      </div>
      <div class="lists-container">
        <ul class="members-list">
          <button-options-item-list v-for="member in members" :key="member.id" :text="member.fullname" :isPrivateProfile="false"></button-options-item-list>
        </ul>
        <ul class="projects-list">
          <button-options-item-list v-for="project in projects" :key="project.id" :text="project.title" :isPrivateProfile="false"></button-options-item-list>
        </ul>
      </div>
      <news-list></news-list>
    </div>
  </div>
</template>
<script>
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import NewsList from "../../network/NewsList.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList, NewsList, BackHeaderButton },
  data() {
    return {
      organizationName: "Comboard",
      location: "Thessaloniki",
      email: "example@gmail.com",
      bio: "Comboard is an organization that blah blah blah blah blah blah blah blah blah blah blah blah",
      organizationPfp: "https://www.uom.gr/site/images/logos/UOMLOGOGR.jpg",
      backgroundImage: "https://parallaximag.gr/wp-content/uploads/pamak-1280x720.jpg",
      members: [
        { id: 1, fullname: "Dionisis Lougaris" },
        { id: 2, fullname: "Panos Machairas" },
        { id: 3, fullname: "Minas Charakopoulos" },
        { id: 4, fullname: "Giorgos Stefou" },
      ],
      projects: [
        { id: 1, title: "Project1" },
        { id: 2, title: "Project2" },
        { id: 3, title: "Project3" },
        { id: 4, title: "Project4" },
      ],
    };
  },
};
</script>
<style scoped>
.members-list,
.projects-list {
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 250px;
}
ul {
  list-style-type: none;
}
.organization-data h2 {
  font-size: 48px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: -10px;
}
.organization-data h3 {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.organization-data p {
  font-size: 17px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 80%;
  text-align: center;
}
.org-profile-container {
  display: flex;
}
.organization-data {
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 40px;
  padding-right: 10px;
  box-sizing: border-box;
  width: 50%;
}
.organization-data {
  margin-left: 2%;
}

.profile-header img {
  width: 100%;
  background: no-repeat 50% 20% / cover;
  height: calc(100px + 15vw);
}

.icon {
  color: var(--color-primary);
  font-size: 19px;
}

.profile-a {
  text-decoration: none;
}

.img__container {
  display: flex;
  justify-content: center;
}

.img__container img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.18);
  margin-top: -70px;
}

.main-area {
  display: flex;
  flex-wrap: wrap;
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
.bio {
  font-size: 15px;
  padding-top: 10px;
}
.header__wrapper .cols__container .left__col p {
  font-size: 0.9rem;
  color: #818181;
  margin: 0;
}

@keyframes cssAnimation {
  to {
    visibility: hidden;
  }
}

/* Responsiveness */

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
</style>
