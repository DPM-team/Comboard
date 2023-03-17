<template>
  <organization-page-tab>
    <div class="links-container">
      <router-link to="/organization/projects/participate">My Projects</router-link>
      <router-link to="/organization/projects/all">All Projects</router-link>
    </div>
    <router-view></router-view>
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
.links-container {
  text-align: center;
  padding: 20px;
}

a {
  text-decoration: none;
  color: black;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  border: solid 1px black;
  margin-left: 10px;
  padding: 5px;
}

a:hover,
a:active {
  color: var(--color-primary);
}
</style>
