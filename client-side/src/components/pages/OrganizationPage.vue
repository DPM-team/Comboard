<template>
  <div class="organization-page-container">
    <organization-side-navigation-bar></organization-side-navigation-bar>
    <!-- Change between components -->
    <component :is="selectedComponent" @selectedTab="changeTab"></component>
    <organization-page-header></organization-page-header>
  </div>
</template>

<script>
import OrganizationSideNavigationBar from "../organization/OrganizationSideNavigationBar.vue";
import OrganizationPageHeader from "../layout/headers/OrganizationPageHeader.vue";
import NetworkTab from "../organization/network/NetworkTab.vue";
export default {
  data() {
    return {
      // Initial component shown
      selectedComponent: "network-tab",
    };
  },
  methods: {
    changeTab(tab) {
      console.log(tab);
      this.selectedComponent = tab;
    },
  },
  components: { OrganizationSideNavigationBar, OrganizationPageHeader, NetworkTab },
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
