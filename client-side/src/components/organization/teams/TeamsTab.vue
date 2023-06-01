<template>
  <organization-page-tab :layout="'block'" class="scroll">
    <div class="teams-page-container">
      <div class="links-container">
        <font-awesome-icon class="sort-team--icon" icon="fa-solid fa-arrow-down-a-z" size="xl" style="color: #0a3c5f" title="Sort teams in ascending order" @click="ascendingTeamsSort()" />
        <font-awesome-icon class="sort-team--icon" icon="fa-solid fa-arrow-up-a-z" size="xl" style="color: #0a3c5f" title="Sort teams in descending order" @click="descendingTeamsSort()" />
        <router-link to="/organization/teams/participate">My Teams</router-link>
        <router-link to="/organization/teams/all">All Teams</router-link>
        <font-awesome-icon class="create-team--icon" icon="fa-regular fa-square-plus" size="2xl" style="color: #0a3c5f" @click="createTeamLink()" title="Create team" />
      </div>
      <router-view></router-view>
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";

export default {
  components: { OrganizationPageTab },
  data() {
    return {};
  },
  methods: {
    createTeamLink() {
      let createTeamLink = this.$route.path;

      if (this.$route.path === "/organization/teams/participate") {
        createTeamLink = "/organization/teams/participate/new";
      } else if (this.$route.path === "/organization/teams/all") {
        createTeamLink = "/organization/teams/all/new";
      }

      this.$router.push(createTeamLink);
    },
    ascendingTeamsSort() {
      if (this.$route.path === "/organization/teams/participate") {
        this.$store.getters.getMyTeams.sort((teamA, teamB) => {
          return teamA.name.localeCompare(teamB.name);
        });
      } else if (this.$route.path === "/organization/teams/all") {
        this.$store.getters.getAllTeams.sort((teamA, teamB) => {
          return teamA.name.localeCompare(teamB.name);
        });
      }
    },
    descendingTeamsSort() {
      if (this.$route.path === "/organization/teams/participate") {
        this.$store.getters.getMyTeams.sort((teamA, teamB) => {
          return teamB.name.localeCompare(teamA.name);
        });
      } else if (this.$route.path === "/organization/teams/all") {
        this.$store.getters.getAllTeams.sort((teamA, teamB) => {
          return teamB.name.localeCompare(teamA.name);
        });
      }
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}

.create-team--icon {
  cursor: pointer;
  margin-left: 5px;
}

.sort-team--icon {
  cursor: pointer;
  margin-right: 5px;
}

.teams-page-container {
  margin-top: 20px;
  width: calc(100% - 200px);
}

.links-container {
  text-align: center;
  padding: 20px;
}

a {
  text-decoration: none;
  color: black;
  font-size: 20px;
  border: solid 1px white;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
}

a:hover,
a:active {
  color: white;
  background-color: var(--color-third);
}

.router-link-active,
.router-link-exact-active {
  background-color: var(--color-primary);
  color: white;
}

/* Responsiveness */

@media (max-width: 1250px) {
  .teams-page-container {
    width: calc(100% - 180px);
  }
}

@media (max-width: 1150px) {
  .teams-page-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 700px) {
  .teams-page-container {
    width: calc(100% - 55px);
  }
}

@media (max-width: 450px) {
  .teams-page-container {
    width: calc(100% - 45px);
  }
}
</style>
