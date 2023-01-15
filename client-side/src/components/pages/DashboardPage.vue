<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="main">
      <!-- <dashboar-title></dashboar-title> -->
      <dashboard-card>
        <dashboard-searchbar-container></dashboard-searchbar-container>
        <organization-list> </organization-list>
      </dashboard-card>
    </div>
    <dashboard-footer></dashboard-footer>
  </div>
</template>

<script>
import DashboardFooter from "../layout/footers/DashboardFooter.vue";
import DashboardHeader from "../layout/headers/DashboardHeader.vue";
import DashboardCard from "../dashboard/DashboardCard.vue";
import OrganizationList from "../dashboard/OrganizationList.vue";
import DashboardSearchbarContainer from "../dashboard/DashboardSearchbarContainer.vue";
// import DashboarTitle from "../secondary-components/dashboard/DashboardTitle.vue";

export default {
  components: { DashboardHeader, DashboardFooter, DashboardCard, OrganizationList, DashboardSearchbarContainer },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background: linear-gradient(#ffffff, var(--color-primary));
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
</style>
