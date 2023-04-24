<template>
  <div class="task-board-container">
    <base-card :width="'80%'">
      <div class="content">
        <base-spinner v-if="isLoading"></base-spinner>
        <h3 v-if="taskBoards.length === 0 && !isLoading">No Task boards</h3>
        <task-board-list-item v-else v-for="taskBoard in taskBoards" :key="taskBoard._id" :id="taskBoard._id" :title="taskBoard.name"></task-board-list-item>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../../basic-components/BaseCard.vue";
import TaskBoardListItem from "./TaskBoardListItem.vue";

export default {
  components: { BaseCard, TaskBoardListItem },
  data() {
    return {
      taskBoards: new Array(),
      isLoading: false,
    };
  },
  methods: {
    async loadTaskBoards() {
      try {
        this.isLoading = true;

        this.taskBoards = await this.$store.dispatch("getTaskBoards", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loadTaskBoards();
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 70px;
  box-sizing: border-box;
}
.task-board-container {
  /* background: rgb(110, 211, 255); */
  width: calc(100% - 200px);
  overflow-x: auto;
  margin-top: 10%;
}
.task-board-container h1 {
  color: rgb(30, 30, 30);
  font-size: 23px;
  /* margin-bottom: 2px; */
  font-weight: 600;
  padding-top: 25px;
  padding-left: 25px;
  display: inline-block;
}

/* Responsiveness */

@media (max-width: 1250px) {
  .task-board-container {
    width: calc(100% - 180px);
  }
}
@media (max-width: 1150px) {
  .task-board-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 700px) {
  .task-board-container {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .task-board-container {
    width: calc(100% - 45px);
  }
}
</style>
