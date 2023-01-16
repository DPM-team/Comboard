<template>
  <div class="organization-page-container"><organization-side-navigation-bar></organization-side-navigation-bar></div>
</template>

<script>
import OrganizationSideNavigationBar from "../organization/OrganizationSideNavigationBar.vue";
export default {
  components: { OrganizationSideNavigationBar },
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
