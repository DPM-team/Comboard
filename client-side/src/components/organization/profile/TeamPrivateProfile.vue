<template>
  <div>
    <div v-if="teamObj">
      <router-view name="dialog"></router-view>
      <router-link :to="createProjectLink()">Create Project</router-link>
      <h2>Param: {{ teamID }}</h2>
      <h2>{{ teamObj.name }}</h2>
      <h2>{{ teamObj.description }}</h2>
      <h2>{{ teamObj._id }}</h2>
      <h2>{{ teamObj.supervisor }}</h2>
    </div>
    <h3 v-else>{{ errorMessage }}</h3>
  </div>
</template>

<script>
export default {
  props: ["teamID"],
  data() {
    return {
      teamObj: null,
      errorMessage: "",
    };
  },
  methods: {
    async loadTeamData() {
      try {
        this.teamObj = await this.$store.dispatch("getTeamData", { teamID: this.teamID });
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = error.message || "Something went wrong!";
      }
    },
    createProjectLink() {
      return {
        name: "create-project",
        params: { teamID: this.teamID },
      };
    },
  },
  created() {
    this.loadTeamData();
  },
};
</script>
