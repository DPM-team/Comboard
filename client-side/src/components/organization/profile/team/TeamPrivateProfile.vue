<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
    <div v-if="teamObj">
      <router-view name="dialog"></router-view>
      <div class="team-page-container">
        <div class="left-col">
          <h1 class="team-name">
            <!-- Blue highlight effect -->
            <span class="highlight">{{ teamObj.name }}</span>
          </h1>
          <form enctype="multipart/form-data" class="team-information" action="" method="post">
            <h2>Update your teams profile</h2>
            <h3>Param: {{ teamID }}</h3>
            <div class="inputBox">
              <span class="input-title">Team name</span>
              <input type="text" name="teamName" class="" value="" :placeholder="teamObj.name" required />
            </div>
            <span class="input-title">Supervisor id</span>
            <h3>{{ teamObj.supervisor }}</h3>
            <div class="inputBox">
              <span class="input-title">Description</span>
              <textarea type="text" name="description" value="" :placeholder="teamObj.description" />
            </div>
            <div class="inputBox">
              <input type="submit" name="submit-non-sensitive" value="Save" />
            </div>
          </form>
        </div>
        <div class="right-col">
          <h3 class="create-project-title">Create a project for {{ teamObj.name }}</h3>
          <router-link class="router-button" :to="createProjectLink()">Create Project</router-link>
          <h4 class="search-area-demo">Search area</h4>
          <div class="members-list">
            <h2>Team members</h2>
            <ul>
              <button-options-item-list v-for="member in members" :key="member.id" :text="member.fullname" :isPrivateProfile="true"></button-options-item-list>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <h3 v-else>{{ errorMessage }}</h3>
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
    };
  },
  methods: {
    async loadTeamData() {
      try {
        this.teamObj = await this.$store.dispatch("getTeamData", { teamID: this.teamID });
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = error.message || "Something went wrong!";
      }
    },
    createProjectLink() {
      return {
        name: "create-project",
        params: { teamID: this.teamID },
      };
    },
  },
  created() {
    this.loadTeamData();
    document.body.classList.remove("no-scrolling");
  },
};
</script>
<style scoped>
.members-list {
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
  padding-top: 40px;
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

.team-page-container {
  display: flex;
  flex-wrap: wrap;
}
.left-col {
  width: 60%;
  padding-left: 40px;
  box-sizing: border-box;
}
.right-col {
  width: 40%;
  padding-left: 40px;

  box-sizing: border-box;
}
.input-title {
  color: var(--color-primary);
  font-size: 14px;
}
.team-information {
  width: 90%;
  padding: 20px;
  /* background: white; */
}

.team-information h2 {
  margin-bottom: 10px;
  font-size: 28px;
  color: var(--color-fourth);
  font-weight: 600;
}
.team-information h3 {
  font-size: 20px;
  color: var(--color-fourth);
  font-weight: 600;
}

.team-information .inputBox {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.team-information .inputBox input[type="text"],
.team-information .inputBox textarea {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid var(--color-fourth);
  outline: none;
  resize: none;
}

.team-information .inputBox input[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

.team-information .inputBox input[type="submit"]:hover,
.team-information .inputBox input[type="submit"]:active {
  background-color: #000875;
  border-color: #000875;
}
@media (max-width: 800px) {
  .left-col {
    width: 100%;
  }
  .right-col {
    width: 100%;
  }
}
</style>
