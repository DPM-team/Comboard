<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
    <div v-if="projectObj">
      <router-view name="dialog"></router-view>
      <div class="project-page-container">
        <div class="left-col">
          <h1 class="project-name">
            <span class="highlight">{{ projectObj?.name }}</span>
          </h1>
          <p>{{ projectObj?.description }}</p>
          <h2 v-if="supervisorObj">Supervisor: {{ supervisorObj?.fullname }}</h2>
        </div>
        <div class="right-col">
          <h4 class="search-area-demo">Search area</h4>
          <div class="members-list">
            <h2>Project members</h2>
            <p v-if="members.length === 0 && loaded">No members found</p>
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
    projectID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      projectObj: null,
      supervisorObj: null,
      members: [],
      projects: [],
      loaded: false,
    };
  },
  methods: {
    async loadProjectData() {
      try {
        this.projectObj = await this.$store.dispatch("getProjectData", { projectID: this.projectID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
        this.$router.push("/not-found");
      }

      return this.projectObj;
    },
    async loadProjectMembers() {
      try {
        this.members = await this.$store.dispatch("getProjectMembers", { projectID: this.projectID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async getProjectSupervisor() {
      try {
        this.supervisorObj = await this.$store.dispatch("getProjectSupervisor", { projectID: this.projectID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
  },
  async created() {
    this.loaded = false;
    if (await this.loadProjectData()) {
      await this.loadProjectMembers();
      await this.getProjectSupervisor();
      this.loaded = true;
      document.body.classList.remove("no-scrolling");
    }
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

.project-name {
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
  background-image: var(--gradient-project);
}

.project-page-container {
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