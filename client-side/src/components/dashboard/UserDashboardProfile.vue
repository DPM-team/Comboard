<template>
  <div>
    <dashboard-header></dashboard-header>
    <user-profile-settings></user-profile-settings>
  </div>
</template>
<script>
import DashboardHeader from "../layout/headers/DashboardHeader.vue";
import UserProfileSettings from "../organization/profile/user/UserProfileSettings.vue";

export default {
  components: { DashboardHeader, UserProfileSettings },
};
</script>
