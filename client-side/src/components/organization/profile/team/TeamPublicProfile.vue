<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
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
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList, BackHeaderButton },
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
  methods: {
    created() {
      document.body.classList.remove("no-scrolling");
    },
  },
};
</script>
<style scoped>
.left-col p {
  text-align: center;
  font-size: 18px;
  padding: 40px;
  margin-top: 10px;
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

.search-area-demo {
  height: 100px;
  margin-top: 50px;
}

.team-name {
  font-size: 64px;
  padding-top: 50px;
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

.team-page-container {
  display: flex;
  flex-wrap: wrap;
}
.left-col {
  width: 60%;
  box-sizing: border-box;
  padding-left: 40px;
}
.right-col {
  width: 40%;
  padding-left: 40px;
  box-sizing: border-box;
}

@media (max-width: 800px) {
  .left-col {
    width: 100%;
    padding-bottom: 40px;
  }
  .right-col {
    width: 100%;
  }
}
</style>
