<template>
  <div class="organization-page-container">
    <organization-side-navigation-bar @selectedTab="changeTab"></organization-side-navigation-bar>
    <!-- Change between components -->
    <keep-alive>
      <component :is="selectedComponent"></component>
    </keep-alive>

    <organization-page-header></organization-page-header>
  </div>
</template>

<script>
import OrganizationSideNavigationBar from "../organization/OrganizationSideNavigationBar.vue";
import OrganizationPageHeader from "../layout/headers/OrganizationPageHeader.vue";
import NetworkTab from "../organization/network/NetworkTab.vue";
import StorageTab from "../organization/storage/StorageTab.vue";
import ProjectsTab from "../organization/projects/ProjectsTab.vue";

export default {
  components: { OrganizationSideNavigationBar, OrganizationPageHeader, NetworkTab, StorageTab, ProjectsTab },
  data() {
    return {
      // Initial component shown
      selectedComponent: "network-tab",
    };
  },
  methods: {
    changeTab(tab) {
      this.selectedComponent = tab;
    },
  },
};
</script>

<style scoped>
.organization-page-container {
  min-height: 80vh;
  /* overflow: hidden; */
  /* background: linear-gradient(#ffffff, var(--color-primary));
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto; */
}
</style>
