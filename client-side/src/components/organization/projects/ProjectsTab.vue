<template>
  <organization-page-tab :layout="'block'">
    <div class="projects-page-container">
      <div class="links-container">
        <router-link to="/organization/projects/participate">My Projects</router-link>
        <router-link to="/organization/projects/all">All Projects</router-link>
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
};
</script>

<style scoped>
.projects-page-container {
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
  .projects-page-container {
    width: calc(100% - 180px);
  }
}
@media (max-width: 1150px) {
  .projects-page-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 700px) {
  .projects-page-container {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .projects-page-container {
    width: calc(100% - 45px);
  }
}
</style>
