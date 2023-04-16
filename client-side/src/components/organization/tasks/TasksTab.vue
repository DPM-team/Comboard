<template>
  <organization-page-tab :layout="'flex'">
    <task-board-list></task-board-list>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import TaskBoardList from "./TaskBoardList.vue";

export default {
  components: { OrganizationPageTab, TaskBoardList },
};
</script>

<style scoped></style>
