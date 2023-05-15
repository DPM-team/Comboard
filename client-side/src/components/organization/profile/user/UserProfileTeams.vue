<template>
  <div class="teams-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <team-item v-for="team in teams" :key="team.id" :teamID="team.id" :teamName="team.name" :teamDescription="team.description"></team-item>
  </div>
</template>

<script>
import TeamItem from "../../teams/TeamItem.vue";
export default {
  components: { TeamItem },
  props: {
    userID: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      teams: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadUserTeams() {
      try {
        this.isLoading = true;

        this.teams = await this.$store.dispatch("getUserTeams", {
          userID: this.userID || this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (this.teams.length === 0) {
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
    this.loadUserTeams();
  },
};
</script>
<style scoped>
.teams-container {
  display: inline-block;
}
@media (max-width: 900px) {
  .teams-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
