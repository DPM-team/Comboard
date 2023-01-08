<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="content">
      <h1>Your available organizations</h1>
      <base-card style="max-width: 80rem"> <dashboard-searchbar></dashboard-searchbar></base-card>
    </div>
    <dashboard-footer></dashboard-footer>
  </div>
</template>

<script>
import DashboardFooter from "../layout/footers/DashboardFooter.vue";
import DashboardHeader from "../layout/headers/DashboardHeader.vue";
import BaseCard from "../basic-components/BaseCard.vue";
import DashboardSearchbar from "../dashboard/DashboardSearchbar.vue";

export default {
  components: { DashboardHeader, DashboardFooter, BaseCard, DashboardSearchbar },
};
</script>

<style scoped>
.content {
  min-height: 700px;
  background: linear-gradient(#ffffff, #1576bb);
}
</style>
