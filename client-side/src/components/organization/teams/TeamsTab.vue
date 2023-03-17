<template>
  <organization-page-tab>
    <div class="links-container">
      <router-link to="/organization/teams/participate">My Teams</router-link>
      <router-link to="/organization/teams/all">All Teams</router-link>
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
</style>
