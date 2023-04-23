<template>
  <div>
    <organization-page-header><button class="rtn-button">Return to Dashboard</button><font-awesome-icon class="back-icon" :icon="['fas', 'circle-chevron-left']" /></organization-page-header>
    <div>
      <router-view name="dialog"></router-view>
      <div class="team-page-container">
        <div class="left-col">
          <h1 class="team-name">
            <!-- Blue highlight effect -->
            <span class="highlight">Team name</span>
          </h1>
          <p>{{ bio }}</p>
          <h2>{{ supervisorName }}</h2>
        </div>
        <div class="right-col">
          <div class="projects-list">
            <h2>Projects of teamName</h2>
            <ul>
              <button-options-item-list v-for="project in projects" :key="project.id" :text="project.title" :isPrivateProfile="false"></button-options-item-list>
            </ul>
          </div>

          <h4 class="search-area-demo">Search area</h4>
          <div class="members-list">
            <h2>Team members</h2>
            <ul>
              <button-options-item-list v-for="member in members" :key="member.id" :text="member.fullname" :isPrivateProfile="false"></button-options-item-list>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList },
  props: ["teamID"],
  data() {
    return {
      teamObj: null,
      errorMessage: "",
      members: [
        { id: 1, fullname: "Dionisis Lougaris" },
        { id: 2, fullname: "Panos Machairas" },
        { id: 3, fullname: "Minas Charakopoulos" },
        { id: 4, fullname: "Giorgos Stefou" },
      ],
      projects: [
        { id: 1, title: "Frontend" },
        { id: 2, title: "Backend" },
      ],
      bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      supervisorName: "Chatzigeorgiou Alexander",
    };
  },
};
</script>
<style scoped>
.left-col p {
  text-align: center;
  font-size: 18px;
  padding: 20px;
}
.left-col h2 {
  text-align: center;
}
.members-list,
.projects-list {
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 250px;
}
ul {
  list-style-type: none;
}
.create-project-title {
  font-size: 24px;
  padding-top: 50px;
  padding-bottom: 20px;
}
.search-area-demo {
  height: 100px;
  margin-top: 50px;
}
.router-button {
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
  text-decoration: none;
}
.router-button:hover,
.router-button:active {
  background-color: #000875;
  border-color: #000875;
}
.team-name {
  font-size: 58px;
  line-height: 1.35;
  margin-top: 40px;
  text-align: center;
}
.highlight {
  position: relative;
}

.highlight::after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.7;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: var(--gradient-team);
}
.team-name {
  font-size: 64px;
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
.team-page-container {
  display: flex;
  flex-wrap: wrap;
}
.left-col {
  width: 60%;
}
.right-col {
  width: 40%;
  padding: 10px;
  box-sizing: border-box;
}
.input-title {
  color: var(--color-primary);
  font-size: 14px;
}
.personal-information {
  width: 90%;
  padding: 20px;
  /* background: white; */
}

.personal-information h2 {
  margin-bottom: 10px;
  font-size: 28px;
  color: var(--color-fourth);
  font-weight: 600;
}
.personal-information h3 {
  font-size: 20px;
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

@media (max-width: 600px) {
  .rtn-button {
    display: none;
  }
  .back-icon {
    display: block;
  }
  .right-col,
  .left-col {
    width: 100%;
  }
}
</style>
