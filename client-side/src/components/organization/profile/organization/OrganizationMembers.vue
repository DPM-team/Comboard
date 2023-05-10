<template>
  <div class="members-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <h4 v-else v-for="member in members" :key="member.id">{{ member.fullname }}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadOrganizationMembers() {
      try {
        this.isLoading = true;

        this.members = await this.$store.dispatch("getOrganizationUsers", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (this.members.length === 0) {
          this.message = "No member in any team!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadOrganizationMembers();
  },
};
</script>

<style scoped>
.members-container {
  display: inline-block;
}

@media (max-width: 900px) {
  .members-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
