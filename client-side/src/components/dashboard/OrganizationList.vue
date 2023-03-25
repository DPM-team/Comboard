<template>
  <div class="content">
    <organization-item v-for="organization in organizations" :key="organization._id" :name="organization.name"></organization-item>
  </div>
</template>

<script>
import OrganizationItem from "../dashboard/OrganizationItem.vue";

export default {
  components: { OrganizationItem },
  data() {
    return {};
  },
  computed: {
    organizations() {
      return this.$store.getters.organizations;
    },
  },
  methods: {
    async loadOrganizations() {
      try {
        await this.$store.dispatch("getUserOrganizations", { userID: this.$store.getters.loggedUserID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
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
