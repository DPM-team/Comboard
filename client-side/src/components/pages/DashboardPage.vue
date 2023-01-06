<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="content">
      <h1>Your available organizations</h1>
      <base-card style="max-width: 80rem"></base-card>
    </div>
    <dashboard-footer></dashboard-footer>
  </div>
</template>

<script>
import DashboardFooter from "../footers/DashboardFooter.vue";
import DashboardHeader from "../headers/DashboardHeader.vue";
import BaseCard from "../basic-components/BaseCard.vue";

export default {
  components: { DashboardHeader, DashboardFooter, BaseCard },
};
</script>

<style scoped>
.content {
  min-height: 700px;
  background: linear-gradient(#ffffff, #1576bb);
}
</style>
