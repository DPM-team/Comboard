<template>
  <div>
    <h1>My Projects</h1>
    <ul>
      <project-item v-for="project in projects" :key="project.id" :projectName="project.projectName" :projectDescription="project.projectDescription"></project-item>
    </ul>
  </div>
</template>

<script>
import ProjectItem from "./ProjectItem.vue";

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
h1 {
  text-align: center;
}
</style>
