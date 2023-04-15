<template>
  <div>
    <!-- For the pop up dialog for the team creation -->
    <router-view name="dialog"></router-view>
    <h1>All Teams</h1>
    <ul>
      <team-item v-for="team in teams" :key="team.id" :teamName="team.teamName" :teamDescription="team.teamDescription"></team-item>
    </ul>
  </div>
</template>

<script>
import TeamItem from "./TeamItem.vue";

export default {
  components: { TeamItem },
  data() {
    return {
      teams: new Array(
        { id: "1", teamName: "Team1", teamDescription: "Description1" },
        { id: "2", teamName: "Team2", teamDescription: "Description2" },
        { id: "3", teamName: "Team3", teamDescription: "Description3" }
      ),
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
