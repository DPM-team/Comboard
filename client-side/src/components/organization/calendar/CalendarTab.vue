<template>
  <organization-page-tab :layout="'block'">
    <div class="calendar-container">
      <VCalendar class="calendar" expanded borderless :color="selectedColor" :attributes="data" ref="calendar"></VCalendar>
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";

export default {
  components: { OrganizationPageTab },
  data() {
    return {
      selectedColor: "red",
      data: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
        {
          key: "test",
          highlight: true,
          dates: { start: new Date(2023, 3, 15), end: new Date(2023, 3, 19) },
        },
        {
          key: "test",
          highlight: true,
          dates: { start: new Date(2023, 3, 11), end: new Date(2023, 3, 13) },
        },
      ],
    };
  },
  methods: {
    moveToday() {
      this.$refs.calendar.move(new Date());
    },
  },
};
</script>

<style scoped>
.calendar-container {
  margin-top: 50px;
  width: 60%;
  /* margin: 0 auto; */
}
</style>
