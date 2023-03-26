<template>
  <organization-page-tab :layout="'block'">
    <div class="calendar-tab-container">
      <div class="calendar-container">
        <VCalendar class="calendar" expanded borderless :color="selectedColor" :attributes="data" ref="calendar"></VCalendar>
      </div>
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
.calendar-tab-container {
  width: calc(100% - 200px);
  overflow-x: auto;
  display: flex;
  justify-content: center;
  height: 100%;
}
.calendar-container {
  margin-top: 50px;
  width: 70%;
}

.calendar-container :deep(.vc-day) {
  padding: 50px;
}

.calendar-container :deep(.vc-day:not(.on-right)) {
  border-right: 1px solid rgb(226, 232, 240);
}
.calendar-container :deep(.vc-day:not(.on-left)) {
  border-right: 1px solid rgb(226, 232, 240);
}
.calendar-container :deep(.vc-day:not(.on-bottom)) {
  border-bottom: 1px solid rgb(226, 232, 240);
}

/* Responsiveness */

@media (max-width: 1250px) {
  .calendar-tab-container {
    width: calc(100% - 180px);
  }
}
@media (max-width: 1150px) {
  .calendar-tab-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 700px) {
  .calendar-tab-container {
    width: calc(100% - 55px);
  }
  .calendar-container {
    width: 80%;
  }
}
@media (max-width: 450px) {
  .calendar-tab-container {
    width: calc(100% - 45px);
  }
  .calendar-container {
    width: 90%;
  }
}
.calendar-container :deep(.vc-weekday-7) {
  color: #6366f1;
}
</style>
