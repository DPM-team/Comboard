<template>
  <organization-page-tab :layout="'block'" class="scroll">
    <base-button @click="createTeamLink()">Create Team</base-button>
    <div class="teams-page-container">
      <div class="links-container">
        <router-link to="/organization/teams/participate">My Teams</router-link>
        <router-link to="/organization/teams/all">All Teams</router-link>
      </div>
      <router-view></router-view>
    </div>
  </organization-page-tab>
</template>

<script>
import BaseButton from "../../basic-components/BaseButton.vue";
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";

export default {
  components: { OrganizationPageTab, BaseButton },
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
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
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
