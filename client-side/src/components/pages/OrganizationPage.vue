<template>
  <div class="organization-page-container">
    <organization-side-navigation-bar></organization-side-navigation-bar>
    <organization-page-header></organization-page-header>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :userID="userID" :organizationID="organizationID" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import OrganizationSideNavigationBar from "../organization/OrganizationSideNavigationBar.vue";
import OrganizationPageHeader from "../layout/headers/OrganizationPageHeader.vue";
import { socket } from "@/socket";

export default {
  components: { OrganizationSideNavigationBar, OrganizationPageHeader },
  data() {
    return {
      userID: "",
      organizationID: "",
    };
  },
  created() {
    this.userID = this.$store.getters.loggedUserID;
    this.organizationID = this.$store.getters.selectedOrganizationID;

    document.body.classList.add("no-scrolling");
    socket.connect();
    socket.emit("organization-dashboard", { room: this.organizationID });
  },
};
</script>

<style scoped>
.organization-page-container {
  /* min-height: 80vh; */
  height: 100%;
  overflow: hidden;
  /* background: linear-gradient(#ffffff, var(--color-primary));
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto; */
}
</style>
