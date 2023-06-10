<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
    <div v-if="teamObj && gotAccess">
      <router-view name="dialog"></router-view>
      <div class="team-page-container">
        <div class="left-col">
          <h1 class="team-name">
            <!-- Blue highlight effect -->
            <span class="highlight">{{ teamObj.name }}</span>
          </h1>
          <form enctype="multipart/form-data" class="team-information" method="post" @submit.prevent="updateTeam">
            <h2>Update your team's profile</h2>
            <div class="inputBox">
              <span class="input-title">Team name</span>
              <input type="text" name="teamName" class="" value="" :placeholder="teamObj.name" required />
            </div>
            <span class="input-title">Team Supervisor</span>
            <h3>{{ supervisorName }}</h3>
            <div class="inputBox">
              <span class="input-title">Description</span>
              <textarea type="text" name="description" value="" :placeholder="teamObj.description" />
            </div>
            <div class="inputBox">
              <span class="team-profile--banner" id="fixed">Team banner</span>
              <input type="file" name="profile-banner" ref="file" />
            </div>
            <div class="inputBox">
              <input type="submit" name="submit-non-sensitive" value="Save" />
            </div>
          </form>
        </div>
        <div class="right-col">
          <div class="projects-list">
            <h2 class="my-h2">Projects of {{ teamObj?.name }}</h2>
            <p class="my-p" v-if="projects.length === 0 && loaded">No projects found</p>
            <ul v-else>
              <button-options-item-list v-for="project in projects" :key="project.id" :text="project.name" :isPrivateProfile="false"></button-options-item-list>
            </ul>
          </div>
          <div class="members-list">
            <h2 class="my-h2">Team members</h2>
            <p class="my-p" v-if="members.length === 0 && loaded">No members found</p>
            <ul v-else>
              <button-options-item-list v-for="member in members" :key="member.id" :text="member.fullname" :isPrivateProfile="false"></button-options-item-list>
            </ul>
          </div>
          <h3 class="create-project-title">Create a project for {{ teamObj.name }}</h3>
          <router-link class="router-button" :to="createProjectLink()">Create Project</router-link>
        </div>
      </div>
    </div>
    <loading-spinner v-if="!loaded"></loading-spinner>
  </div>
</template>

<script>
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList, BackHeaderButton },
  props: {
    teamID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      teamObj: null,
      gotAccess: false,
      supervisorName: "",
      errorMessage: "",
      photo: "",
      members: [],
      projects: [],
      loaded: false,
    };
  },
  methods: {
    async loadTeamData() {
      try {
        this.teamObj = await this.$store.dispatch("getTeamData", { teamID: this.teamID });

        if (this.teamObj.supervisor != this.$store.getters.loggedUserID) {
          this.$router.push("/permission-denied");
        }

        this.gotAccess = true;
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = error.message || "Something went wrong!";
        this.$router.push("/not-found");
      }

      return this.teamObj;
    },
    async loadTeamMembers() {
      try {
        this.members = await this.$store.dispatch("getTeamMembers", { teamID: this.teamID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async getTeamSupervisor() {
      try {
        const supervisorObj = await this.$store.dispatch("getTeamSupervisor", { teamID: this.teamID });

        this.supervisorName = supervisorObj.fullname;
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async loadTeamProjects() {
      try {
        this.projects = await this.$store.dispatch("getTeamProjects", { teamID: this.teamID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    updateTeam() {
      this.updateTeamPhoto();
    },
    createProjectLink() {
      return {
        name: "create-project",
        params: { teamID: this.teamID },
      };
    },
    async updateTeamPhoto() {
      try {
        const file = this.$refs.file?.files[0] || null;

        if (!file) {
          return;
        }

        const blob = await this.$store.dispatch("updateTeamPhoto", {
          file,
          teamID: this.teamID,
        });

        if (blob.size !== 0) {
          const file = new File([blob]);
          const fileReader = new FileReader();

          fileReader.onload = () => {
            this.photo = fileReader.result;
          };

          fileReader.readAsDataURL(file);
        }
      } catch (e) {
        this.errorMessage = e;
      }
    },
  },
  async created() {
    this.loaded = false;

    if (await this.loadTeamData()) {
      await this.loadTeamMembers();
      await this.getTeamSupervisor();
      await this.loadTeamProjects();
      this.loaded = true;
    }

    document.body.classList.remove("no-scrolling");
  },
};
</script>

<style scoped>
.my-h2 {
  color: var(--color-primary);
}

.members-list {
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 70%;
  margin-top: 40px;
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
  font-size: 64px;
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

.team-profile--banner {
  margin-right: 10px;
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

@media (max-width: 900px) {
  .left-col {
    width: 100%;
    padding-left: 0;
  }

  .right-col {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .create-project-title {
    font-size: 22px;
  }
}
</style>
