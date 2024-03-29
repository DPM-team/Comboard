<template>
  <div class="list">
    <div class="list--header">
      <h3 class="list-title--h3">
        <span v-if="!editingName" @click="renameTaskList()" :title="updatedTaskListName || listTitle">{{ formattedTitle }}</span>
        <input class="rename--input" v-if="editingName" type="text" v-model="updatedTaskListName" v-focus @blur="handleTaskListRenameBlur()" @keydown.enter="handleTaskListRenameEnter()" />
      </h3>
      <font-awesome-icon class="list-menu" icon="fa-solid fa-ellipsis-vertical" style="color: #000000" size="lg" @click="openOptions($event)" />
    </div>
    <draggable class="scroll" :list="tasks" group="tasks" itemKey="_id" @change="log">
      <task-item
        v-for="task in tasks"
        :key="task._id"
        :taskListID="listID"
        :taskID="task._id"
        :title="task.title"
        :description="task.description"
        :dateStarts="task.fromDate"
        :dateExpires="task.toDate"
      ></task-item>
    </draggable>
    <input class="task-input" type="text" name="task-input" placeholder=" + Add list item.." v-model="newTask" @keyup.enter="addTask()" />
    <loading-spinner v-if="isLoading"></loading-spinner>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import TaskItem from "./TaskItem.vue";

export default {
  components: { draggable: VueDraggableNext, TaskItem },
  props: {
    listID: {
      type: String,
      required: true,
    },
    listTitle: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: false,
      default: new Array(),
    },
  },
  data() {
    return {
      newTask: "",
      isLoading: false,
      editingName: false,
      updatedTaskListName: "",
      enterKeyPressed: false,
    };
  },
  computed: {
    formattedTitle() {
      const currTitle = this.updatedTaskListName || this.listTitle;

      if (currTitle.length > 20) {
        return currTitle.substring(0, 20) + "...";
      } else {
        return currTitle;
      }
    },
  },
  methods: {
    async addTask() {
      if (this.newTask.trim() !== "") {
        try {
          this.isLoading = true;

          await this.$store.dispatch("addTask", {
            taskBoardID: this.$store.getters.getSelectedBoardID,
            taskListID: this.listID,
            taskObj: { title: this.newTask },
          });

          this.isLoading = false;
        } catch (error) {
          console.log(error);
        }

        this.newTask = "";
      }
    },
    async log(evt) {
      if (evt?.moved) {
        try {
          this.isLoading = true;

          await this.$store.dispatch("moveTaskBetweenCurrList", {
            taskBoardID: this.$store.getters.getSelectedBoardID,
            taskListID: this.listID,
            movedTaskNewIndex: evt.moved.newIndex,
            movedTaskOldIndex: evt.moved.oldIndex,
          });

          this.isLoading = false;
        } catch (error) {
          console.log(error);
        }
      } else if (evt?.added) {
        try {
          this.isLoading = true;

          await this.$store.dispatch("moveTaskToOtherList", {
            taskBoardID: this.$store.getters.getSelectedBoardID,
            listIDToMove: this.listID,
            taskObj: evt.added.element,
            moveToIndex: evt.added.newIndex,
          });

          this.isLoading = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    renameTaskList() {
      this.editingName = true;
      this.updatedTaskListName = this.updatedTaskListName || this.listTitle;
    },
    handleTaskListRenameBlur() {
      if (!this.enterKeyPressed) {
        this.finishTaskListRename();
      }

      this.enterKeyPressed = false; // Reset the flag
    },
    handleTaskListRenameEnter() {
      this.enterKeyPressed = true; // Set a flag to indicate Enter key was pressed
      this.finishTaskListRename();
    },
    async finishTaskListRename() {
      this.editingName = false;
      if (this.listTitle !== this.updatedTaskListName && this.updatedTaskListName.trim() !== "") {
        try {
          await this.$store.dispatch("renameTaskList", {
            taskBoardID: this.$store.getters.getSelectedBoardID,
            taskListID: this.listID,
            updatedTaskListName: this.updatedTaskListName,
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    openOptions(evt) {
      const rect = evt.target.getBoundingClientRect();
      const leftNavBarWidth = document.querySelector("#organization-left-navbar").getBoundingClientRect()?.width || 150;
      this.$emit("open-tasklist-options", rect.left - leftNavBarWidth + 10, rect.top - 60, this.listID);
    },
  },
};
</script>

<style scoped>
.list {
  width: 250px;
  margin-left: 25px;
  box-shadow: 2px 4px #929292;
  margin-top: 20px;
  padding: 15px;
  border-radius: 2px;
  /* background: var(--tab-grey-background); */
  background: rgb(229, 229, 229);
}

.list h3 {
  color: rgb(30, 30, 30);
  font-size: 17px;
  margin-bottom: 4px;
  font-weight: 600;
  padding: 5px;
}

.rename--input {
  color: rgb(30, 30, 30);
  font-size: 17px;
  font-weight: 600;
  display: inline-block;
  border: 0ch;
}

.task-input {
  background-color: rgb(244, 244, 244);
  padding: 7px;
  width: 240px;
  border-radius: 2px;
  margin-top: 8px;
  border: 0;
}

.task-input::placeholder {
  color: black;
  opacity: 0.8;
}

.scroll {
  overflow-y: auto;
  height: 200px;
}

.list--header {
  display: flex;
}

.list-title--h3 {
  width: 95%;
}

.list-menu {
  cursor: pointer;
  margin-top: 7px;
}
</style>
