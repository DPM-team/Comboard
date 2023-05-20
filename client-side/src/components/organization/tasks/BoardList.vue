<template>
  <div class="list">
    <h3>
      <span v-if="!editingName" @click="renameTaskList()">{{ updatedTaskListName || listTitle }}</span>
      <input class="rename--input" v-if="editingName" type="text" v-model="updatedTaskListName" v-focus @blur="finishTaskListRename()" @keydown.enter="finishTaskListRename()" />
    </h3>
    <draggable class="scroll" :list="tasks" group="tasks" itemKey="_id" @change="log">
      <board-list-item
        v-for="task in tasks"
        :key="task._id"
        :taskListID="listID"
        :taskID="task._id"
        :title="task.title"
        :description="task.description"
        :dateStarts="task.fromDate"
        :dateExpires="task.toDate"
      ></board-list-item>
    </draggable>
    <input class="task-input" type="text" name="task-input" placeholder=" + Add list item.." v-model="newTask" @keyup.enter="addTask()" />
    <loading-spinner v-if="isLoading"></loading-spinner>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import BoardListItem from "./BoardListItem.vue";

export default {
  components: { draggable: VueDraggableNext, BoardListItem },
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
    };
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
</style>
