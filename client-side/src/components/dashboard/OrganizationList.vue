<template>
  <div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="content">
      <organization-item v-for="organization in organizations" :key="organization.id" :id="organization.id" :name="organization.name" @openOptions="showContextMenu"></organization-item>
      <div class="no-org-message" v-if="organizations.length === 0 && !isLoading">
        <h2>No organizations..</h2>
        <h4>Join your organization using its license key or create one with a few steps!</h4>
      </div>
    </div>
    <organization-context-menu v-if="activeOrganizationID !== null" :position="menuPosition" :organizationID="activeOrganizationID"></organization-context-menu>
  </div>
</template>

<script>
import OrganizationItem from "../dashboard/OrganizationItem.vue";
import OrganizationContextMenu from "./OrganizationContextMenu.vue";

export default {
  components: { OrganizationItem, OrganizationContextMenu },
  data() {
    return {
      isLoading: false,
      activeOrganizationID: null,
      menuPosition: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    organizations() {
      return this.$store.getters.organizations;
    },
  },
  methods: {
    async loadOrganizations() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("getUserOrganizations", { userID: this.$store.getters.loggedUserID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }

      this.isLoading = false;
    },
    showContextMenu(positionX, positionY, organizationID) {
      this.activeOrganizationID = organizationID;
      this.menuPosition = {
        x: positionX,
        y: positionY,
      };
    },
    closeContextMenu() {
      this.activeOrganizationID = null;
    },
    removeEventListeners() {
      document.removeEventListener("click", this.closeContextMenu);
    },
  },
  created() {
    this.loadOrganizations();
    document.addEventListener("click", this.closeContextMenu);
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 70px;
  box-sizing: border-box;
}
.no-org-message {
  height: 180px;
  width: 100%;
}
</style>
