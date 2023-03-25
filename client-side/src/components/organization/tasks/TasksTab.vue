<template>
  <organization-page-tab :layout="'flex'"><task-board></task-board></organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import TaskBoard from "./TaskBoard.vue";

export default {
  components: { OrganizationPageTab, TaskBoard },
};
</script>

<style scoped></style>
