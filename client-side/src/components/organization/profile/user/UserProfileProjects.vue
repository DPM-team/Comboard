<template>
  <div class="projects-container">
    <project-item v-for="project in projects" :key="project.id" :projectName="project.projectName" :projectDescription="project.projectDescription"></project-item>
  </div>
</template>

<script>
import ProjectItem from "../../projects/ProjectItem.vue";
export default {
  components: { ProjectItem },
  data() {
    return {
      projects: new Array(
        { id: "4", projectName: "Project4", projectDescription: "Description4" },
        { id: "5", projectName: "Project5", projectDescription: "Description5" },
        { id: "6", projectName: "Project6", projectDescription: "Description6" }
      ),
    };
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
