<template>
  <div>
    <h1>All Projects</h1>
    <div v-if="isLoading && projects.length === 0 && !message">
      <base-spinner></base-spinner>
    </div>
    <h4 v-if="message">{{ message }}</h4>
    <ul v-else>
      <project-item v-for="project in projects" :key="project.id" :projectName="project.name" :projectDescription="project.description"></project-item>
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
      projects: [],
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadOrganizationProjects() {
      try {
        this.isLoading = true;

        this.projects = await this.$store.dispatch("getOrganizationProjects", { organizationID: this.$store.getters.selectedOrganizationID });

        this.isLoading = false;

        if (this.projects.length === 0) {
          this.message = "No projects exists!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadOrganizationProjects();
  },
};
</script>

<style scoped>
h1,
h4 {
  text-align: center;
}
</style>
