<template>
  <div>
    <h1>My Projects</h1>
    <div v-if="isLoading && projects.length === 0 && !message">
      <base-spinner></base-spinner>
    </div>
    <h4 v-if="message">{{ message }}</h4>
    <h4 v-else-if="projects?.length === 0 && !isLoading">You aren't member of any project!!</h4>
    <ul class="ul" v-else>
      <project-item
        v-for="project in projects"
        :key="project.id"
        :projectID="project.id"
        :projectName="project.name"
        :projectDescription="project.description"
        :supervisorID="project.supervisorID"
      ></project-item>
    </ul>
  </div>
</template>

<script>
import ProjectItem from "./ProjectItem.vue";
import BaseSpinner from "../../basic-components/BaseSpinner.vue";

export default {
  components: { ProjectItem, BaseSpinner },
  data() {
    return {
      isLoading: false,
      message: "",
    };
  },
  computed: {
    projects() {
      return this.$store.getters.getMyProjects;
    },
  },
  methods: {
    async loadUserProjects() {
      try {
        this.isLoading = true;

        await this.$store.dispatch("getUserProjects", { userID: this.$store.getters.loggedUserID, organizationID: this.$store.getters.selectedOrganizationID });

        this.isLoading = false;
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadUserProjects();
  },
};
</script>

<style scoped>
.ul {
  height: 70vh;
  overflow-y: auto;
}
h1,
h4 {
  text-align: center;
}
</style>
