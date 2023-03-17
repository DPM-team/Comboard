<template>
  <div class="search-bar-container">
    <dashboard-searchbar></dashboard-searchbar>
    <div class="buttons-container">
      <dashboard-button mode="primary">Join</dashboard-button>
      <dashboard-button mode="secondary" @click="$emit('open-creation-form')">Create</dashboard-button>
    </div>
  </div>
</template>

<script>
import DashboardSearchbar from "../dashboard/DashboardSearchbar.vue";
import DashboardButton from "./DashboardButton.vue";

export default {
  components: { DashboardSearchbar, DashboardButton },
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
.buttons-container {
  display: flex;
}

/* Responsiveness */
@media (max-width: 800px) {
  .search-bar-container {
    display: block;
  }
}
@media (max-width: 580px) {
  .buttons-container {
    /* width: 100%; */
    display: inline-block;
    margin-left: 35px;
    margin-top: -20px;
  }
}
@media (max-width: 430px) {
  .buttons-container {
    margin-left: 15px;
  }
}
</style>
