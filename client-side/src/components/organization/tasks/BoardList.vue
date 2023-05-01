<template>
  <div class="list">
    <h3>{{ listTitle }}</h3>
    <draggable :list="tasks" group="tasks" itemKey="_id" @change="log">
      <board-list-item v-for="task in tasks" :key="task._id" :title="task.title"></board-list-item>
    </draggable>
    <input class="task-input" type="text" name="task-input" placeholder=" + Add list item.." v-model="newTask" @keyup.enter="addTask()" />
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
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.$emit("add-task", { title: this.newTask, listID: this.listID });
        this.newTask = "";
      }
    },
    log(evt) {
      if (evt?.moved) {
        this.$emit("move-task-same", { listID: this.listID, newIndex: evt.moved.newIndex, oldIndex: evt.moved.oldIndex });
      } else {
        console.log(evt);
      }
    },
  },
};
</script>

<style scoped>
.list {
  width: 200px;
  margin-left: 20px;
  box-shadow: 2px 4px #929292;
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  background: var(--tab-grey-background);
}
.list h3 {
  color: rgb(30, 30, 30);
  font-size: 14px;
  margin-bottom: 2px;
  font-weight: 600;
  padding: 5px;
}
.task-input {
  background-color: var(--tab-grey-background);
  padding: 5px;
  width: 190px;
  border-radius: 5px;
  margin-top: 5px;
  border: 0;
}
.task-input::placeholder {
  color: black;
  opacity: 0.8;
}
</style>
