<template>
  <div>
    <h1>{{ boardTitle }}</h1>

    <div class="all-lists">
      <draggable @change="log" group="entire-list">
        <div class="list">
          <h2>To do</h2>
          <draggable :list="toDolist" @change="log" group="tasks">
            <div class="to-do-list-item" v-for="element in toDolist" :key="element.id">
              {{ element.content }}
            </div>
          </draggable>
        </div>
      </draggable>
      <draggable @change="log" group="entire-list">
        <div class="list">
          <h2>Done</h2>
          <draggable :list="donelist" @change="log" group="tasks">
            <div class="done-list-item" v-for="element in donelist" :key="element.id">
              {{ element.content }}
            </div>
          </draggable>
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
        { content: "Task1", id: 1 },
        { content: "Task2", id: 2 },
        { content: "Task3", id: 3 },
        { content: "Task4", id: 4 },
      ],
      donelist: [
        { content: "Task5", id: 5 },
        { content: "Task6", id: 6 },
        { content: "Task7", id: 7 },
        { content: "Task8", id: 8 },
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
.all-lists {
  display: flex;
  flex-wrap: nowrap;
  width: 500px;
  height: 80px;
}
.list {
  width: 200px;
  margin-left: 20px;
}
.to-do-list-item {
  background: black;
  color: white;
}
.done-list-item {
  background: grey;
  color: white;
}
</style>