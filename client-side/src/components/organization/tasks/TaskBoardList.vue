<template>
  <div class="task-board-container">
    <div class="content">
      <base-spinner v-if="isLoading"></base-spinner>
      <h3 v-if="taskBoards.length === 0 && !isLoading">No Task boards</h3>
      <task-board-list-item v-else v-for="taskBoard in taskBoards" :key="taskBoard._id" :boardID="taskBoard._id" :title="taskBoard.name" @openOptions="showContextMenu"></task-board-list-item>
      <form class="create-task-board-form" @submit.prevent="createTaskBoard()">
        <input id="taskboard--input" type="text" name="taskboard-name" placeholder="Task board name..." v-model="newTaskBoardName" />
        <input id="taskboard-create--btn" type="submit" value="Create Taskboard" />
      </form>
    </div>
    <base-context-menu v-if="activeTaskBoardID !== null" :position="menuPosition">
      <template #options>
        <li @click="viewTaskBoard()">View</li>
        <li class="warning" @click="deleteTaskBoard()">Delete</li>
      </template>
    </base-context-menu>
  </div>
</template>

<script>
import TaskBoardListItem from "./TaskBoardListItem.vue";
import BaseContextMenu from "../../basic-components/BaseContextMenu.vue";

export default {
  components: { TaskBoardListItem, BaseContextMenu },
  data() {
    return {
      taskBoards: new Array(),
      isLoading: false,
      newTaskBoardName: "",
      activeTaskBoardID: null,
      menuPosition: {
        x: 0,
        y: 0,
      },
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
    async createTaskBoard() {
      if (this.newTaskBoardName.trim()) {
        try {
          const successData = await this.$store.dispatch("createTaskBoard", {
            userID: this.$store.getters.loggedUserID,
            organizationID: this.$store.getters.selectedOrganizationID,
            taskBoardName: this.newTaskBoardName,
          });

          this.taskBoards.push(successData.savedTaskBoard);

          this.newTaskBoardName = "";
        } catch (error) {
          console.log(error);
        }
      }
    },
    showContextMenu(positionX, positionY, taskBoardID) {
      this.activeTaskBoardID = taskBoardID;
      this.menuPosition = {
        x: positionX,
        y: positionY,
      };
    },
    closeContextMenu() {
      this.activeTaskBoardID = null;
    },
    removeEventListeners() {
      document.removeEventListener("click", this.closeContextMenu);
    },
    viewTaskBoard() {
      this.$router.push(`/organization/tasks/boards/${this.activeTaskBoardID}`);
    },
    async deleteTaskBoard() {
      try {
        const successData = await this.$store.dispatch("deleteTaskBoard", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
          taskBoardID: this.activeTaskBoardID,
        });

        if (successData?.updatesDone) {
          this.taskBoards = successData?.updatedTaskBoards || this.taskBoards;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loadTaskBoards();
    document.addEventListener("click", this.closeContextMenu);
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
};
</script>

<style scoped>
.create-task-board-form {
  background: var(--tab-grey-background);
  /* border-radius: 2px; */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.445);
  width: 200px;
  height: 120px;
  display: block;
  margin-left: 20px;
  margin-top: 40px;
}
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
  /* margin-top: 10%; */
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

#taskboard-create--btn {
  display: block;
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
  margin-left: 25px;
  margin-top: 10px;
}
#taskboard--input {
  background-color: rgb(244, 244, 244);
  padding: 8px;
  width: 180px;
  border-radius: 2px;
  margin-left: 10px;
  margin-top: 20px;
  border: 0;
}

.context-menu ul li {
  cursor: pointer;
  padding: 8px 15px 8px 15px;
  width: 80px;
}

.context-menu ul li:hover {
  background-color: #eee;
}

.warning {
  color: red;
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
