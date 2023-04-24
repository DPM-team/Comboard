<template>
  <div>
    <organization-page-header><button class="rtn-button">Return to Dashboard</button><font-awesome-icon class="back-icon" :icon="['fas', 'circle-chevron-left']" /></organization-page-header>
    <div class="header__wrapper">
      <div class="profile-header"><img class="backgroundImage" :src="backgroundImage" alt="User Background Image" /></div>
    </div>
    <div class="img__container">
      <img :src="pfp" alt="User Profile Pic" />
      <span></span>
    </div>
    <div class="main-area">
      <div class="settings">
        <h2>Organization name</h2>
        <h3>Email</h3>
        <h3>Location</h3>
      </div>
      <div class="lists-container">
        <button-options-item-list v-for="member in members" :key="member.id" :text="member.fullname" :isPrivateProfile="true"></button-options-item-list>
        <button-options-item-list v-for="project in projects" :key="project.id" :text="project.title" :isPrivateProfile="true"></button-options-item-list>
      </div>
      <news-list></news-list>
    </div>
  </div>
</template>
<script>
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import NewsList from "../../network/NewsList.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList, NewsList },
  data() {
    return {
      userID: "",
      organizationID: "",
      firstname: "Dionisis",
      lastname: "Lougaris",
      location: "Thessaloniki",
      phoneLink: "tel:69999999999",
      linkedinLink: "https://www.linkedin.com/in/dionisis-lougaris/",
      mailLink: "mailto:example@gmail.com",
      bio: "Hello fellow Uom Members, I am Dionisis and I am a senior at the Uom Computer Science Dept.",
      pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
      backgroundImage: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000",
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
  created() {
    // document.body.classList.add("no-scrolling");

    this.userID = this.$store.getters.loggedUserID;
    this.organizationID = this.$store.getters.selectedOrganizationID;
  },
};
</script>
<style scoped>
.org-profile-container {
  display: flex;
}
.settings {
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
  width: 50%;
}
.settings,
.sensitive-information {
  margin-left: 2%;
}
.personal-information {
  width: 90%;
  padding: 20px;
  background: white;
}

.personal-information h2 {
  font-size: 28px;
  color: var(--color-fourth);
  font-weight: 600;
}

.personal-information .inputBox {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.personal-information .inputBox input[type="text"],
.personal-information .inputBox input[type="email"],
.personal-information .inputBox input[type="password"],
.personal-information .inputBox textarea {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid var(--color-fourth);
  outline: none;
  resize: none;
}
.personal-information .inputBox input[type="file"] {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;

  outline: none;
  resize: none;
}

.personal-information .inputBox span {
  position: absolute;
  left: 0;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  pointer-events: none;
  transition: 0.5s;
  color: #666;
}

.personal-information .inputBox input:focus ~ span,
.personal-information .inputBox input:valid ~ span,
.personal-information .inputBox textarea:focus ~ span,
.personal-information .inputBox textarea:valid ~ span {
  color: var(--color-primary);
  font-size: 12px;
  transform: translateY(-20px);
}

.personal-information .inputBox input[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

.personal-information .inputBox input[type="submit"]:hover,
.personal-information .inputBox input[type="submit"]:active {
  background-color: #000875;
  border-color: #000875;
}
.back-icon {
  position: absolute;
  top: 15px;
  left: 30px;
  font-size: 28px;
  color: var(--color-primary);
  display: none;
}
.rtn-button {
  position: absolute;
  top: 10px;
  left: 40px;
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}
.rtn-button:hover,
.rtn-button:active {
  background-color: #000875;
  border-color: #000875;
}

.profile-header img {
  width: 100%;
  background: no-repeat 50% 20% / cover;
  height: calc(100px + 15vw);
}

.profile-ul {
  list-style-type: none;
  margin: 0;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
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

.header__wrapper .cols__container .content ul {
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
.header__wrapper .cols__container .content ul li {
  display: flex;
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
@media (max-width: 600px) {
  .rtn-button {
    display: none;
  }
  .back-icon {
    display: block;
  }
}
@media (max-width: 900px) {
  .menu-ul {
    display: flex;
    justify-content: center;
  }
}
</style>
