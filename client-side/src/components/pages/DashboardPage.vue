<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="content">
      <h1>Your available organizations</h1>
      <base-card style="max-width: 80rem">
        <dashboard-searchbar></dashboard-searchbar>
        <base-button mode="primary">Join</base-button>
        <base-button mode="secondary">Create</base-button>
        <organization-item :organizationFileName="'pamak.png'" :title="'Pamak'"></organization-item>
        <organization-item :organizationFileName="'asoe.jpg'" :title="'Asoe'"></organization-item>
        <organization-item :organizationFileName="'IEEE.jpg'" :title="'IEEE'"></organization-item>
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
import OrganizationItem from "../dashboard/OrganizationItem.vue";

export default {
  components: { DashboardHeader, DashboardFooter, BaseCard, DashboardSearchbar, BaseButton, OrganizationItem },
};
</script>

<style sc, OrganizationItemoped>
.content {
  min-height: 700px;
  background: linear-gradient(#ffffff, #1576bb);
}
</style>
