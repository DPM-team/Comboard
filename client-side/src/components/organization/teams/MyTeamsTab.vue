<template>
  <div>
    <h1>My Teams</h1>
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
        { id: "4", teamName: "Team4", teamDescription: "Description4" },
        { id: "5", teamName: "Team5", teamDescription: "Description5" },
        { id: "6", teamName: "Team6", teamDescription: "Description6" }
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
