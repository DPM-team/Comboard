<template>
  <div class="projects-tab-container">
    <div>
      <button @click="toogleTab(0)">My Projects</button>
      <button @click="toogleTab(1)">All Projects</button>
    </div>
    <router-view v-if="selectedTab === 0">
      <my-projects-tab></my-projects-tab>
    </router-view>
    <router-view v-if="selectedTab === 1">
      <all-projects-tab></all-projects-tab>
    </router-view>
  </div>
</template>

<script>
import MyProjectsTab from "./MyProjectsTab.vue";
import AllProjectsTab from "./AllProjectsTab.vue";

export default {
  components: { MyProjectsTab, AllProjectsTab },

  data() {
    return {
      selectedTab: 0, // the index of the selected tab,
    };
  },
  methods: {
    toogleTab(index) {
      this.selectedTab = index;
    },
  },
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
