<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>My Teams</h1>
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
    async loadUserTeams() {
      try {
        this.isLoading = true;

        this.teams = await this.$store.dispatch("getUserTeams", { userID: this.$store.getters.loggedUserID, organizationID: this.$store.getters.selectedOrganizationID });

        this.isLoading = false;

        if (this.teams.length === 0) {
          this.message = "You aren't member of any team!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadUserTeams();
  },
};
</script>

<style scoped>
h1,
h4 {
  text-align: center;
}
</style>
