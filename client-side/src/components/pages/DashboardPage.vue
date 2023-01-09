<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="main">
      <h1>Your available organizations</h1>
      <base-card style="max-width: 80rem">
        <dashboard-searchbar></dashboard-searchbar>
        <base-button mode="primary">Join</base-button>
        <base-button mode="secondary">Create</base-button>
        <organization-list> </organization-list>
      </base-card>
    </div>
    <dashboard-footer></dashboard-footer>
  </div>
</template>

<script>
import DashboardFooter from "../layout/footers/DashboardFooter.vue";
import DashboardHeader from "../layout/headers/DashboardHeader.vue";
import BaseCard from "../basic-components/BaseCard.vue";
import DashboardSearchbar from "../dashboard/DashboardSearchbar.vue";
import BaseButton from "../basic-components/BaseButton.vue";
import OrganizationList from "../dashboard/OrganizationList.vue";

export default {
  components: { DashboardHeader, DashboardFooter, BaseCard, DashboardSearchbar, BaseButton, OrganizationList },
};
</script>

<style scoped>
.main {
  min-height: 700px;
  background: linear-gradient(#ffffff, #1576bb);
}
</style>
