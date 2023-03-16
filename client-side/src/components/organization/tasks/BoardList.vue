<template>
  <div class="list">
    <h3>{{ listTitle }}</h3>
    <draggable :list="aList" @change="log" group="tasks">
      <board-list-item v-for="element in aList" :key="element.id" :content="element.content"></board-list-item>
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import BoardListItem from "./BoardListItem.vue";

export default {
  props: {
    listTitle: String,
  },
  components: { draggable: VueDraggableNext, BoardListItem },
  data() {
    return {
      boardTitle: "Personal Tasks",
      enabled: true,
      aList: [
        { content: "Task1", id: 1 },
        { content: "Task2", id: 2 },
        { content: "Task3", id: 3 },
        { content: "Task4", id: 4 },
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
</style>
