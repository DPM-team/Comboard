<template>
  <div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="content">
      <organization-item v-for="organization in organizations" :key="organization._id" :id="organization._id" :name="organization.name"></organization-item>
      <div class="no-org-message" v-if="organizations.length === 0 && !isLoading">
        <h2>No organizations..</h2>
        <h4>Join your organization using its license key or create one with a few steps!</h4>
      </div>
    </div>
  </div>
</template>

<script>
import OrganizationItem from "../dashboard/OrganizationItem.vue";

export default {
  components: { OrganizationItem },
  data() {
    return {
      isLoading: false,
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
  },
  created() {
    this.loadOrganizations();
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
