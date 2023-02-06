<template>
  <div class="organization-page-container">
    <organization-side-navigation-bar></organization-side-navigation-bar>
    <organization-page-header></organization-page-header>
  </div>
</template>

<script>
import OrganizationSideNavigationBar from "../organization/OrganizationSideNavigationBar.vue";
import OrganizationPageHeader from "../layout/headers/OrganizationPageHeader.vue";
export default {
  components: { OrganizationSideNavigationBar, OrganizationPageHeader },
};
</script>

<style scoped>
.organization-page-container {
  min-height: 80vh;
  /* background: linear-gradient(#ffffff, var(--color-primary));
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto; */
}
</style>
