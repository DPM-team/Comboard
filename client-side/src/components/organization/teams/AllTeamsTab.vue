<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>All Teams</h1>
    <h4 v-if="message">{{ message }}</h4>
    <ul v-else>
      <team-item v-for="team in teams" :key="team.id" :teamName="team.name" :teamDescription="team.description"></team-item>
    </ul>
  </div>
</template>

<script>
import TeamItem from "./TeamItem.vue";

export default {
  components: { TeamItem },
  data() {
    return {
      teams: [],
      message: "",
    };
  },
  methods: {
    async loadOrganizationTeams() {
      try {
        this.teams = await this.$store.dispatch("getOrganizationTeams", { organizationID: this.$store.getters.selectedOrganizationID });

        if (this.teams.length === 0) {
          this.message = "No teams exists!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
        console.log(error.message || "Something went wrong!");
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
