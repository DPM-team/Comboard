<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>My Teams</h1>
    <div v-if="isLoading && teams?.length === 0 && !message">
      <base-spinner></base-spinner>
    </div>
    <h4 v-if="message">{{ message }}</h4>
    <h4 v-else-if="teams?.length === 0 && !isLoading">You aren't member of any team!</h4>
    <ul class="ul" v-else>
      <team-item v-for="team in teams" :key="team.id" :teamID="team.id" :teamName="team.name" :teamDescription="team.description"></team-item>
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
      isLoading: false,
      message: "",
    };
  },
  computed: {
    teams() {
      return this.$store.getters.getMyTeams;
    },
  },
  methods: {
    async loadUserTeams() {
      try {
        this.isLoading = true;

        await this.$store.dispatch("getUserTeams", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;
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
.ul {
  height: 70vh;
  overflow-y: auto;
}
h1,
h4 {
  text-align: center;
}
</style>
