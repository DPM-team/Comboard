<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>My Teams</h1>
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
    async loadUserTeams() {
      try {
        this.teams = await this.$store.dispatch("getUserTeams", { userID: this.$store.getters.loggedUserID });

        if (this.teams.length === 0) {
          this.message = "You aren't member of any team!";
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
    this.loadUserTeams();
  },
  // With this hook, we get again the organization's teams after the new teams is added
  updated() {
    this.loadUserTeams();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
