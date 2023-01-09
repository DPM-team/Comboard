<template>
  <div class="search-bar-container">
    <dashboard-searchbar></dashboard-searchbar>
    <base-button mode="primary">Join</base-button>
    <base-button mode="secondary">Create</base-button>
  </div>
</template>

<script>
import DashboardSearchbar from "../dashboard/DashboardSearchbar.vue";
import BaseButton from "../basic-components/BaseButton.vue";

export default {
  components: { DashboardSearchbar, BaseButton },
  data() {
    return {};
  },
};
</script>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: end;
  /* float: right; */
  /* flex-wrap: wrap; */
  width: 100%;
  padding-top: 20px;
  padding-right: 20px;
}
</style>
