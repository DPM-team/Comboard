<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="main">
      <!-- <dashboar-title></dashboar-title> -->
      <base-card style="width: 80%; height: 70vh">
        <dashboard-searchbar-container></dashboard-searchbar-container>
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
import OrganizationList from "../dashboard/OrganizationList.vue";
import DashboardSearchbarContainer from "../dashboard/DashboardSearchbarContainer.vue";
// import DashboarTitle from "../secondary-components/dashboard/DashboardTitle.vue";

export default {
  components: { DashboardHeader, DashboardFooter, BaseCard, OrganizationList, DashboardSearchbarContainer },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background: linear-gradient(#ffffff, #1576bb);
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
</style>
