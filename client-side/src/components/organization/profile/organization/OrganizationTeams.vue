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
  data() {
    return {
      teams: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {},
  created() {},
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
