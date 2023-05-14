<template>
  <organization-page-tab :layout="'block'">
    <div class="calendar-tab-container">
      <!-- <div class="calendar-container"> -->
      <base-spinner v-if="isLoading"></base-spinner>
      <VCalendar v-else class="calendar" expanded :attributes="attributes" :color="selectedColor" ref="calendar">
        <template #footer>
          <div class="">
            <button class="" @click="moveToday()">Today</button>
          </div>
        </template>
      </VCalendar>
      <!-- </div> -->
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";

export default {
  components: { OrganizationPageTab },
  data() {
    return {
      updateNeeded: false,
      isLoading: false,
      selectedColor: "blue",
      attributes: [
        {
          key: "today",
          highlight: {
            color: "red",
            fillMode: "light",
          },
          dates: new Date(),
          popover: {
            label: "Today",
            visibility: "click",
          },
        },
      ],
    };
  },
  methods: {
    async loadTodos() {
      try {
        this.isLoading = true;

        const successData = await this.$store.dispatch("loadTaskDates", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.attributes = [
          ...this.attributes,
          ...successData.taskDates.map((todoObj) => {
            return {
              key: todoObj._id,
              highlight: {
                color: "blue",
              },
              dates: todoObj.dates,
              popover: {
                label: todoObj.title,
                visibility: "click",
              },
            };
          }),
        ];

        this.isLoading = false;
        this.updateNeeded = true;
      } catch (error) {
        console.log(error);
      }
    },
    fetchDataOnRouteChange() {
      if (this.updateNeeded) {
        this.loadTodos();
      }
    },
    moveToday() {
      this.$refs.calendar.move(new Date());
    },
  },
  created() {
    this.loadTodos();
    this.updateNeeded = false;
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchDataOnRouteChange();
    });
  },
};
</script>

<style scoped>
.calendar-tab-container {
  width: calc(100% - 200px);
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.calendar-container {
  margin-top: 50px;
  width: 70%;
}

:deep(.vc-day) {
  padding: 40px;
}

:deep(.vc-day:not(.on-right)) {
  border-right: 1px solid rgb(226, 232, 240);
}

:deep(.vc-day) {
  border-bottom: 1px solid rgb(226, 232, 240);
}

/* Responsiveness */
@media (max-width: 1250px) {
  .calendar-tab-container {
    width: calc(100% - 180px);
  }
}
@media (max-width: 1200px) {
  .calendar {
    width: 50%;
  }
}
@media (max-width: 1150px) {
  .calendar-tab-container {
    width: calc(100% - 80px);
  }
}
@media (max-width: 900px) {
  :deep(.vc-day) {
    padding: 30px;
  }
}
@media (max-width: 700px) {
  :deep(.vc-day) {
    padding: 20px;
  }
}
@media (max-width: 550px) {
  :deep(.vc-day) {
    padding: 10px;
  }
}
@media (max-width: 400px) {
  :deep(.vc-day) {
    padding: 3px;
  }
}
@media (max-width: 700px) {
  .calendar-tab-container {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .calendar-tab-container {
    width: calc(100% - 45px);
  }
}
</style>
