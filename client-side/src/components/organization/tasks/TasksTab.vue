<template>
  <organization-page-tab><task-board></task-board></organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import TaskBoard from "./TaskBoard.vue";

export default {
  components: { OrganizationPageTab, TaskBoard },
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
