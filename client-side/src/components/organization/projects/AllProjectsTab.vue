<template>
  <div>
    <h1>All Projects</h1>
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
        { id: "1", projectName: "Project1", projectDescription: "Description1" },
        { id: "2", projectName: "Project2", projectDescription: "Description2" },
        { id: "3", projectName: "Project3", projectDescription: "Description3" }
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
