<template>
  <div class="projects-tab-container">
    <div>
      <router-link to="/organization/projects/all">All Projects</router-link>
      <router-link to="/organization/projects/participate">My Projects</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.projects-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: red;
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
