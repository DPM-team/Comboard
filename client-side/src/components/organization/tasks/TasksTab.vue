<template>
  <organization-page-tab><h1>Tasks</h1></organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
export default {
  components: { OrganizationPageTab },
};
</script>

<style scoped>
.tasks-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
