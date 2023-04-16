<template>
  <div class="teams-container">
    <team-item v-for="team in teams" :key="team.id" :teamName="team.teamName" :teamDescription="team.teamDescription"></team-item>
  </div>
</template>

<script>
import TeamItem from "../teams/TeamItem.vue";
export default {
  components: { TeamItem },
  data() {
    return {
      teams: new Array(
        { id: "4", teamName: "Team4", teamDescription: "Description4" },
        { id: "5", teamName: "Team5", teamDescription: "Description5" },
        { id: "6", teamName: "Team6", teamDescription: "Description6" }
      ),
    };
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
