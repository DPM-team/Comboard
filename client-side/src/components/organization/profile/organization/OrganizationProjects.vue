<template>
  <div class="projects-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <organization-profile-list-item v-else v-for="project in projects" :key="project.id" :itemTitle="project.name" :itemDescription="project.description"></organization-profile-list-item>
  </div>
</template>

<script>
import OrganizationProfileListItem from "./OrganizationProfileListItem.vue";

export default {
  components: { OrganizationProfileListItem },
  data() {
    return {
      projects: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadOrganizationProjects() {
      try {
        this.isLoading = true;

        this.projects = await this.$store.dispatch("getOrganizationProjects", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (this.projects.length === 0) {
          this.message = "No member in any team!";
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
.projects-container {
  display: inline-block;
}

@media (max-width: 900px) {
  .projects-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
