<template>
  <div>
    <dashboard-header></dashboard-header>
    <faqs></faqs>
  </div>
</template>

<script>
import DashboardHeader from "../layout/headers/DashboardHeader.vue";
import Faqs from "./FAQs.vue";

export default {
  components: { Faqs, DashboardHeader },
};
</script>
