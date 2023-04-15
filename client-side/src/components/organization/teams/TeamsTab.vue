<template>
  <organization-page-tab :layout="'block'">
    <router-link to="/organization/teams/new">Create Tam</router-link>
    <router-view name="dialog"></router-view>
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
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";

export default {
  components: { OrganizationPageTab },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
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
