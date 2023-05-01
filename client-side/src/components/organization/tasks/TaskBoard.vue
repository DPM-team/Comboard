<template>
  <div class="task-board-container">
    <font-awesome-icon class="back-button" :icon="['fas', 'circle-chevron-left']" @click="goBack()" />
    <h1 v-if="taskBoard">{{ taskBoard.name }}</h1>
    <div class="all-lists" v-if="taskBoard">
      <draggable class="draggable" :list="taskBoard.taskLists" group="entire-list" itemKey="_id" @change="moveList">
        <board-list
          v-for="listObj in taskBoard.taskLists"
          :key="listObj._id"
          :listID="listObj._id"
          :listTitle="listObj.name"
          :tasks="listObj?.taskItems"
          @addTask="addNewTask"
          @moveTaskSame="moveTaskInTheCurrList"
          @moveTaskToOtherList="moveTaskToOtherList"
        ></board-list>
      </draggable>
      <loading-spinner v-if="isLoading"></loading-spinner>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import BoardList from "./BoardList.vue";

export default {
  components: { draggable: VueDraggableNext, BoardList },
  props: {
    boardID: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      taskBoard: null,
      isLoading: false,
    };
  },
  methods: {
    async loadTaskBoardData() {
      try {
        this.isLoading = true;

        this.taskBoard = await this.$store.dispatch("getTaskBoard", { taskBoardID: this.boardID });

        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async addNewTask({ listID, title }) {
      try {
        this.isLoading = true;

        const successData = await this.$store.dispatch("addTask", {
          taskBoardID: this.boardID,
          taskListID: listID,
          taskObj: { title },
        });

        this.taskBoard = successData.updatedTaskBoard || this.taskBoard;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async moveList(evt) {
      if (evt?.moved) {
        try {
          await this.$store.dispatch("moveTaskList", {
            taskBoardID: this.boardID,
            movedListNewIndex: evt.moved.newIndex,
            movedListOldIndex: evt.moved.oldIndex,
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async moveTaskInTheCurrList({ listID, newIndex, oldIndex }) {
      try {
        this.isLoading = true;

        await this.$store.dispatch("moveTaskBetweenCurrList", {
          taskBoardID: this.boardID,
          taskListID: listID,
          movedTaskNewIndex: newIndex,
          movedTaskOldIndex: oldIndex,
        });

        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async moveTaskToOtherList({ listIDToMove, taskObj, newIndex }) {
      try {
        this.isLoading = true;

        await this.$store.dispatch("moveTaskToOtherList", {
          taskBoardID: this.boardID,
          listIDToMove: listIDToMove,
          taskObj: taskObj,
          moveToIndex: newIndex,
        });

        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.push("/organization/tasks/boards/");
    },
  },
  created() {
    this.loadTaskBoardData();
  },
};
</script>

<style scoped>
.task-board-container {
  background: rgb(110, 211, 255);
  width: calc(100% - 200px);
  overflow-x: auto;
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
.all-lists {
  display: flex !important;
  flex-wrap: nowrap;
  width: 1000px;
  height: 80px;
}
.draggable {
  display: flex;
  height: 220px;
}
.back-button {
  font-size: 30px;
  display: inline;
  cursor: pointer;
  margin-left: 20px;
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
