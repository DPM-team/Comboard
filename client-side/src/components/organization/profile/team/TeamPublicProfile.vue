<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
    <div v-if="teamObj">
      <router-view name="dialog"></router-view>
      <div class="team-page-container">
        <div class="left-col">
          <div class="image-container"><img class="team-picture" src="../../../../assets/images/common-images/team-photo.jpg" alt="Team photo" /></div>
          <h1 class="team-name">
            <span class="highlight">{{ teamObj?.name }}</span>
          </h1>
          <p>{{ teamObj?.description }}</p>
          <h2 class="supervisor" v-if="supervisorObj">Supervisor: {{ supervisorObj?.fullname }}</h2>
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
        </div>
      </div>
    </div>
    <loading-spinner v-if="!loaded"></loading-spinner>
  </div>
</template>

<script>
import LoadingSpinner from "../../../basic-components/LoadingSpinner.vue";
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList, BackHeaderButton, LoadingSpinner },
  props: {
    teamID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      teamObj: null,
      supervisorObj: null,
      members: [],
      projects: [],
      loaded: false,
    };
  },
  methods: {
    async loadTeamData() {
      try {
        this.teamObj = await this.$store.dispatch("getTeamData", { teamID: this.teamID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
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
        this.supervisorObj = await this.$store.dispatch("getTeamSupervisor", { teamID: this.teamID });
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
  },
  async created() {
    this.loaded = false;

    if (await this.loadTeamData()) {
      await this.loadTeamMembers();
      await this.getTeamSupervisor();
      await this.loadTeamProjects();
      this.loaded = true;
      document.body.classList.remove("no-scrolling");
    }
  },
};
</script>

<style scoped>
.supervisor {
  font-size: 30px;
  text-align: center;
}

.my-h2 {
  color: var(--color-primary);
}

.my-p {
  padding-top: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
}

.team-picture {
  width: 70%;
}

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
  width: 70%;
  margin: 20px auto;
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
  /* padding-left: 40px; */
  box-sizing: border-box;
  display: block;
}

@media (max-width: 900px) {
  .left-col {
    width: 100%;
    padding-bottom: 40px;
    padding-left: 0;
  }

  .right-col {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .team-name {
    font-size: 45px;
    padding-top: 40px;
    line-height: 1.35;
    margin-top: 40px;
    text-align: center;
  }

  .supervisor {
    font-size: 25px;
  }
}

@media (max-width: 400px) {
  .supervisor {
    font-size: 22px;
  }
}
</style>
