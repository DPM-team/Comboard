<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>All Teams</h1>
    <div v-if="isLoading && teams?.length === 0 && !message">
      <base-spinner></base-spinner>
    </div>
    <h4 v-if="message">{{ message }}</h4>
    <h4 v-if="teams?.length === 0">No teams exists!</h4>
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
      return this.$store.getters.getAllTeams;
    },
  },
  methods: {
    async loadOrganizationTeams() {
      try {
        this.isLoading = true;

        await this.$store.dispatch("getOrganizationTeams", { organizationID: this.$store.getters.selectedOrganizationID });

        this.isLoading = false;
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadOrganizationTeams();
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
