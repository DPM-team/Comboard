<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>All Teams</h1>
    <div v-if="isLoading && teams.length === 0 && !message">
      <base-spinner></base-spinner>
    </div>
    <h4 v-if="message">{{ message }}</h4>
    <ul v-else>
      <team-item v-for="team in teams" :key="team.id" :teamName="team.name" :teamDescription="team.description"></team-item>
    </ul>
  </div>
</template>

<script>
import TeamItem from "./TeamItem.vue";
import BaseSpinner from "../../basic-components/BaseSpinner.vue";

export default {
  components: { TeamItem, BaseSpinner },
  data() {
    return {
      teams: [],
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadOrganizationTeams() {
      try {
        this.isLoading = true;

        this.teams = await this.$store.dispatch("getOrganizationTeams", { organizationID: this.$store.getters.selectedOrganizationID });

        this.isLoading = false;

        if (this.teams.length === 0) {
          this.message = "No teams exists!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadOrganizationTeams();
  },
  // With this hook, we get again the organization's teams after the new teams is added
  updated() {
    this.loadOrganizationTeams();
  },
};
</script>

<style scoped>
h1,
h4 {
  text-align: center;
}
</style>
