<template>
  <div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="content">
      <organization-item v-for="organization in organizations" :key="organization._id" :name="organization.name"></organization-item>
      <h2 v-if="organizations.length === 0 && !isLoading">No organizations</h2>
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
}
</style>
