<template>
  <div>
    <h1>{{ boardTitle }}</h1>
    <div class="all-lists">
      <draggable class="dragArea" :list="toDolist" @change="log" group="tasks">
        <div class="to-do-list-item" v-for="element in toDolist" :key="element.id">
          {{ element.name }}
        </div>
      </draggable>
      <draggable class="dragArea" :list="donelist" @change="log" group="tasks">
        <div class="done-list-item" v-for="element in donelist" :key="element.id">
          {{ element.name }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: { draggable: VueDraggableNext },
  data() {
    return {
      boardTitle: "Personal Tasks",
      enabled: true,
      toDolist: [
        { name: "Task1", id: 1 },
        { name: "Task2", id: 2 },
        { name: "Task3", id: 3 },
        { name: "Task4", id: 4 },
      ],
      donelist: [
        { name: "Task5", id: 5 },
        { name: "Task6", id: 6 },
        { name: "Task7", id: 7 },
        { name: "Task8", id: 8 },
      ],
      dragging: false,
    };
  },
  methods: {
    log(event) {
      console.log(event);
      console.log(this.toDolist);
      console.log(this.donelist);
    },
  },
};
</script>

<style scoped>
.to-do-list-item {
  background: black;
  color: white;
}
.done-list-item {
  background: grey;
  color: white;
}
</style>
