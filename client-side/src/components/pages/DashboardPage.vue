<template>
  <div>
    <dashboard-header></dashboard-header>
    <base-dialog v-if="true" title="Create organization" @close="closeDialog">
      <template #main>
        <p>Heeloo</p>
      </template>
    </base-dialog>
    <div class="main">
      <dashboard-card>
        <dashboard-searchbar-container></dashboard-searchbar-container>
        <organization-list></organization-list>
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
// import CreateOrganization from "../dashboard/CreateOrganization.vue";

export default {
  components: { DashboardHeader, DashboardFooter, DashboardCard, OrganizationList, DashboardSearchbarContainer },
  data() {
    return {
      dialogIsOpen: false,
    };
  },
  methods: {
    closeDialog() {
      this.dialogIsOpen = false;
    },
  },
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
