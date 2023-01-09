<template>
  <div class="content">
    <organization-item v-for="organization in organizations" :key="organization.title" :organizationFileName="organization.organizationFileName" :title="organization.title"></organization-item>
  </div>
</template>

<script>
import OrganizationItem from "../dashboard/OrganizationItem.vue";

export default {
  components: { OrganizationItem },
  data() {
    return {
      organizations: [
        {
          organizationFileName: "pamak.png",
          title: "Pamak",
        },
        {
          organizationFileName: "asoe.jpg",
          title: "Asoe",
        },
        {
          organizationFileName: "IEEE.jpg",
          title: "IEEE",
        },
      ],
    };
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>
