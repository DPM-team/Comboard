<template>
  <div class="task-board-container">
    <font-awesome-icon class="back-button" :icon="['fas', 'circle-chevron-left']" @click="goBack()" />
    <h1 v-if="taskBoard">{{ taskBoard.name }}</h1>
    <div class="all-lists">
      <draggable v-if="taskBoard" class="draggable" :list="taskBoard.taskLists" group="entire-list" itemKey="_id" @change="moveList">
        <board-list v-for="listObj in taskBoard.taskLists" :key="listObj._id" :listID="listObj._id" :listTitle="listObj.name" :tasks="listObj?.taskItems"></board-list>
      </draggable>
      <form class="create-task-list-form" @submit.prevent="createTaskList()">
        <input id="tasklist--input" type="text" name="tasklist-name" placeholder="Add another list..." v-model="newTaskListName" />
        <input id="tasklist-create--btn" type="submit" value="Done" />
      </form>
      <span style="padding-right: 25px"></span>
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
      isLoading: false,
      newTaskListName: "",
    };
  },
  computed: {
    taskBoard() {
      return this.$store.getters.getSelectedTaskBoard;
    },
  },
  methods: {
    async loadTaskBoardData() {
      try {
        this.isLoading = true;

        await this.$store.dispatch("getTaskBoard", { taskBoardID: this.boardID });

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
    async createTaskList() {
      if (this.newTaskListName.trim()) {
        try {
          await this.$store.dispatch("addTaskList", {
            taskBoardID: this.boardID,
            taskListName: this.newTaskListName,
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    goBack() {
      this.$router.push("/organization/tasks/boards/");
    },
  },
  created() {
    this.$store.dispatch("selectBoardID", { boardID: this.boardID });
    this.loadTaskBoardData();
  },
};
</script>

<style scoped>
#tasklist-create--btn {
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}
.create-task-list-form {
  width: 300px;
  display: flex;
  margin-left: 25px;
  box-shadow: 1px 3px #929292;
  margin-top: 20px;
  padding: 12px;
  border-radius: 2px;
  /* background: var(--tab-grey-background); */
  background: rgb(229, 229, 229);
}
#tasklist--input {
  background-color: rgb(244, 244, 244);
  padding: 8px;
  width: 280px;
  border-radius: 2px;
  /* margin-top: px; */
  border: 0;
}
#tasklist--input::placeholder {
  color: black;
  opacity: 0.8;
  font-size: 14px;
}
.task-board-container {
  background: rgb(211, 238, 250);
  width: calc(100% - 200px);
  overflow-x: auto;
}

.task-board-container h1 {
  color: rgb(30, 30, 30);
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 600;
  padding-top: 30px;
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
  height: 320px;
}

.back-button {
  font-size: 30px;
  display: inline;
  cursor: pointer;
  margin-left: 20px;
}

#tasklist-create--btn {
  display: block;
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
