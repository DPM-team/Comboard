<template>
  <organization-page-tab :layout="'flex'">
    <router-view></router-view>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";

export default {
  components: { OrganizationPageTab },
};
</script>

<style scoped></style>
