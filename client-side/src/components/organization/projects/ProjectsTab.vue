<template>
  <organization-page-tab>
    <div>
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
a {
  text-decoration: none;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}

a:hover,
a:active {
  color: blue;
}
</style>
